var db = require('../utils/db');


module.exports.getLikeNotif = function(req, callback){
    var session = db.getSession(req);


    session.run('MATCH (a:Person)-[r:LIKES]-(b)-[s:WRITTEN_BY]-(c:Person) WHERE r.notified = false AND ID(c) = {id} RETURN a,r,b,s,c', {id:parseInt(req.body.data)})
    .then(function(result){
        callback(result);
    })
    .catch(function(result){
        callback({success:false, message:'Something wen\'t wrong'});
    });
};

module.exports.getFriendRequestNotif = function(req, callback){
    var session = db.getSession(req);

    session.run('MATCH (a:Person)<-[r:IS_FRIENDS_WITH]-(b:Person) WHERE ID(a) = {id} AND r.status = "unconfirmed" RETURN a,r,b', {id:parseInt(req.body.data)})
    .then(function(result){
            callback(result);
    })
    .catch(function(result){
        callback({success:false, message:'Something wen\'t wrong'});
    });
};

module.exports.read = function(req, callback){
    console.log(typeof parseInt(req.params.id));
    var session = db.getSession(req);
    session.run('MATCH (a)-[r]-(b) WHERE ID(r) = {id} SET r.notified = "true" RETURN a', {id: require('neo4j-driver').v1.int(parseInt(req.params.id))})
    .then(function(result){
        callback(result);
    })
    .catch(function(err){
      console.log(err);
    })
};

module.exports.accept = function(req, callback){
    var session = db.getSession(req);
    session.run('MATCH (a)-[r]-(b) WHERE ID(r) = {id} SET r.status = "confirmed"', {id:parseInt(req.body.relation)})
    .then(function(result){
        session.run('')
    })
}
