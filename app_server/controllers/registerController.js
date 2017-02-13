var passport = require('passport');
var User = require('../models/userModel');
var auth = require('../utils/auth');




module.exports.register = function(req, res){
    User.getUserByEmail(req, function(result){
        if(result.records[0])
            res.status(400).json({success:false, message:"email already taken"});
        else if(!req.body.email.match(/\S+\@\S+\.\w{2,4}$/))
            res.status(400).json({success:false, message:"invalid email"});
        else if(!req.body.firstname ||
                !req.body.lastname ||
                !req.body.email ||
                !req.body.password)
            res.status(400).json({success:false, message:"missing parameter"});
            else
            {
                var cred = auth.setPassword(req.body.password);
                User.userAdd(req, req.body.email, req.body.firstname, req.body.lastname, cred.password, cred.salt, function(log){
                    if(log.success)
                    {
                        User.getUserByEmail(req, function(result){
                            var token = auth.generateJWT(result.records[0].get('id(a)').low,
                                                        result.records[0].get('email'),
                                                        result.records[0].get('firstname'),
                                                        result.records[0].get('lastname'),
                                                        result.records[0].get('admin').low,
                                                        result.records[0].get('created_at'));

                            res.status(200).json({success:true, token:token, message:'User added'});
                        });

                    }
                    else
                        res.status(400).json(log);
                });
            }
        });
    };

    module.exports.login = function(req, res){
        passport.authenticate('local', function(err, user, info){
            if(err)
                res.status(404).json({success:false, message:err});

            if(user)
            {
                User.getUserByEmail(req, function(result){
                    var token = auth.generateJWT(result.records[0].get('id(a)').low,
                                                result.records[0].get('email'),
                                                result.records[0].get('firstname'),
                                                result.records[0].get('lastname'),
                                                result.records[0].get('admin').low,
                                                result.records[0].get('created_at'));
                    res.status(200).json({success:true, token: token, message:"user logged"});
                });
            }
            else
                res.status(401).json(info);
        })(req, res);
    };
