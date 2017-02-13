var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');
var db = require('../utils/db');
var auth = require('../utils/auth');


passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, done){
    var session = db.getSessionOnce();
    session.run('MATCH (user:Person) WHERE user.email = {email} RETURN user.email AS email, user.password AS password, user.salt AS salt', {email: username}).then(function(result){
        if(result.records.length !== 1)
            return done(null, false, { success:false, message: 'User not found'});

        if(!auth.validPassword(password, result.records[0].get('salt'), result.records[0].get('password')))
            return done(null, false, { success:false, message: 'Password wrong'});

        return done(null, result);
    }).catch(function(err)
    {
        return done(null, false, {success:false, message:err});

    });
}
));
