var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports.setPassword = function(passwordToSet)
{
    var salt = crypto.randomBytes(16).toString('hex');
    var password = crypto.pbkdf2Sync(passwordToSet, salt, 1000, 64, 'sha1').toString('hex');
    return {password:password, salt:salt};
};

module.exports.validPassword = function(passwordToCheck, salt, hash)
{
    var hashToCheck = crypto.pbkdf2Sync(passwordToCheck, salt, 1000, 64, 'sha1').toString('hex');
    return hashToCheck === hash;
};

module.exports.generateJWT = function(idToSet, emailToSet, firstnameToSet, lastnameToSet, adminToSet, created_atToSet)
{
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        id:idToSet,
        email:emailToSet,
        firstname:firstnameToSet,
        lastname:lastnameToSet,
        admin:adminToSet,
        created_at:created_atToSet,
        exp: parseInt(expiry.getTime() / 1000)
        },
        "MY_SECRET");
};
