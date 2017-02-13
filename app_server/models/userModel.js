var db = require('../utils/db');
var auth = require('../utils/auth');


module.exports.userAdd = function(req, emailToSet, firstnameToSet, lastnameToSet, passwordToSet, saltToSet, callback){
    var session = db.getSession(req);
    session.run('CREATE (user:Person {email: {emailToSet}, firstname: {firstnameToSet}, lastname: {lastnameToSet}, password: {passwordToSet}, salt: {saltToSet}, admin: 0, created_at:{created_at}, updated_at:{updated_at}})', {emailToSet: emailToSet, firstnameToSet: firstnameToSet, lastnameToSet: lastnameToSet, passwordToSet: passwordToSet, saltToSet: saltToSet, created_at: new Date().toISOString(), updated_at: new Date().toISOString()}).then(function(result)
    {
        callback({success:true, message:"user added", log:result});
    }).catch(function(err)
    {
        callback({success:false, message:err.fields[0].message});
    });
};

module.exports.getUserByEmail = function(req, callback)
{
    var session = db.getSession(req);
    session.run("MATCH (a:Person) WHERE a.email = {email} RETURN a.email AS email, a.password AS password, a.salt AS salt, a.firstname AS firstname, a.lastname AS lastname, a.admin AS admin, a.created_at AS created_at, a.updated_at AS updated_at, id(a)", {email: req.body.email}).
    then(function(result){
        callback(result);
    });
};

module.exports.remove = function(req, callback)
{
    var session = db.getSession(req);
    session.run('MATCH (a:Person) WHERE ID(a) = {id} DELETE a', {id:parseInt(req.params.id)})
    .then(function(result){
        callback(result);
    });
};

module.exports.update = function(req, callback)
{
    var session = db.getSession(req);
    if(!req.body.password)
    {
        if(!req.body.gender)
            req.body.gender = '';

        if(!req.body.studies)
            req.body.studies = '';

        if(!req.body.job)
            req.body.job = '';

        if(!req.body.religion)
            req.body.religion = '';

        session.run('MATCH (a:Person) WHERE ID(a) = {id} SET a.email = {email}, a.firstname = {firstname}, a.lastname = {lastname}, a.address = {address}, a.updated_at = {updated_at}, a.birthdate = {birthdate}, a.gender = {gender}, a.religion = {religion}, a.studies = {studies}, a.job = {job}', {id: parseInt(req.params.id), email:req.body.email, firstname:req.body.firstname, lastname:req.body.lastname, address:req.body.address, updated_at:new Date().toISOString(), birthdate:req.body.birthdate, gender:req.body.gender, religion:req.body.religion, studies:req.body.studies, job:req.body.job})
        .then(function(result){
            callback(result);
        }).catch(function(err){
            console.log(err);
            callback(err);
        });
    }
    else
    {
        var hash = auth.setPassword(req.body.password);
        session.run('MATCH (a:Person) WHERE ID(a) = {id} SET a.email = {email}, a.firstname = {firstname}, a.lastname = {lastname}, a.salt = {salt}, a.password = {password}, a.updated_at = {updated_at}', {id: parseInt(req.params.id), email:req.body.email, firstname:req.body.firstname, lastname:req.body.lastname, salt:hash.salt, password:hash.password, updated_at:new Date().toISOString()})
        .then(function(result){
            callback(result);
        }).catch(function(err){
            callback(err);
        });
    }
};

module.exports.getUserById = function(req, callback)
{
    var session = db.getSession(req);
    session.run("MATCH (a:Person) WHERE ID(a) = {id} RETURN ID(a) AS id, a.email AS email, a.firstname AS firstname, a.lastname AS lastname, a.admin AS admin, a.created_at AS created_at, a.updated_at AS updated_at, a.address AS address, a.gender AS gender, a.religion AS religion, a.studies AS studies, a.job AS job, a.birthdate AS birthdate, id(a)", {id: parseInt(req.params.id)}).
    then(function(result){
        callback(result);
    }).catch(function(err){
        callback(err);
    });
};

module.exports.getUserAutocomplete = function(req, callback)
{
    var session = db.getSession(req);
    session.run("MATCH (p:Person) WHERE lower(p.firstname) STARTS WITH lower({data}) RETURN *", {data:req.body.data}).then(function(result){
        callback(result);
    }).catch(function(err){
        callback(err);
    });
};

module.exports.searchUserGlobal = function(req, callback)
{
    var session = db.getSession(req);
    session.run("Match (p:Person) WHERE lower(p.firstname) CONTAINS lower({data}) OR lower(p.lastname) CONTAINS lower({data}) RETURN *", {data:req.body.data}).then(function(result){
        callback(result);
    }).catch(function(err){
        callback(err);
    });
};
