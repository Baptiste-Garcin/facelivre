var User = require('../models/userModel');
var auth = require('../utils/auth');

module.exports.create = function(req, res){
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
                        res.status(200).json({success:true, message:'User added'});
                    else
                        res.status(400).json(log);
                });
            }
    });
};

module.exports.delete = function(req, res)
{
    User.remove(req, function(result)
    {
        if(result.summary.updateStatistics._stats.nodesDeleted == 1)
            res.status(200).json({success:true, message:"User deleted"});
        else
            res.status(400).json({success:false, message:'Something wen\'t wrong'});
    });
};

module.exports.edit = function(req, res)
{
    User.getUserByEmail(req, function(result){
        if((result.records[0]) && (result.records[0].get('id(a)').low != req.params.id))
            res.status(400).json({success:false, message:"email already taken"});
        else if(!req.body.email.match(/\S+\@\S+\.\w{2,4}$/))
            res.status(400).json({success:false, message:"invalid email"});
        else
        {
            console.log(req.body);
            User.update(req, function(result)
            {

                User.getUserById(req, function(result){
                    var token = auth.generateJWT(result.records[0].get('id(a)').low,
                                                result.records[0].get('email'),
                                                result.records[0].get('firstname'),
                                                result.records[0].get('lastname'),
                                                result.records[0].get('admin').low,
                                                result.records[0].get('created_at'),
                                                result.records[0].get('address'),
                                                result.records[0].get('birthdate')
                                                );

                    res.status(200).json({success:true, token:token, message:'User updated'});
                });
            });
        }
    });
};

module.exports.show = function(req, res)
{
    User.getUserById(req, function(result){
        if(result)
        {
            var data = {id:result.records[0].get('id').low,
                        firstname:result.records[0].get('firstname'),
                        lastname:result.records[0].get('lastname'),
                        email:result.records[0].get('email'),
                        admin:result.records[0].get('admin').low,
                        created_at:result.records[0].get('created_at'),
                        updated_at:result.records[0].get('updated_at'),
                        gender:result.records[0].get('gender'),
                        job:result.records[0].get('job'),
                        studies:result.records[0].get('studies'),
                        religion:result.records[0].get('religion'),
                        address:result.records[0].get('address'),
                        birthdate:result.records[0].get('birthdate')
                    };
            res.status(200).json({success:true, result:data});
        }
        else
            res.status(400).json({success:false, message:'user not found'});
    });
};

module.exports.userSearch = function(req, res)
{
    User.getUserAutocomplete(req, function(result){
        res.status(200).json({success:true, result:result});
    });
};

module.exports.search = function(req, res)
{
    User.searchUserGlobal(req, function(result){
        res.status(200).json({success:true, result:result});
    });
};

module.exports.askFriend = function(req, res)
{

};
