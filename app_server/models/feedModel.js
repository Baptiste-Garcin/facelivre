var db = require('../utils/db');

module.exports.getPost = function(req, callback){
    console.log(req.params.id);
    var session = db.getSession(req);
    session.run('MATCH (a:Post)-[r:WRITTEN_BY]-(b:Person)-[s:IS_FRIENDS_WITH]-(c:Person) WHERE ID(c)= {id} RETURN a,b,c', {id:parseInt(req.params.id)})
    .then(function(res){
        callback(res);
    })
    .catch(function(res){
        callback({success:false, message:"something wen't wrong"});
    });
};
