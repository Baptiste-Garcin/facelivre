var db = require('../utils/db');

module.exports.commentAdd = function(req, userId, postId, content, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (p:Post) WHERE ID(p) = {postId} CREATE (u)<-[r1:WRITTEN_BY{created_at: {created_at}}]-(c:Comment{content: {content}})-[r2:RELATES_TO]->(p)',
	{userId: userId, postId: postId, content: content, created_at: new Date().toISOString()})
	.then(function(result)
	{
		callback({success: true, message: 'Comment submitted', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.commentGet = function(req, postId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (p:Post)<-[r1:RELATES_TO]-(c:Comment)-[r2:WRITTEN_BY]->(u:Person) WHERE ID(p) = {postId} RETURN p,c,r2,u ORDER BY r.created_at DESC',
	{postId: postId})
	.then(function(result)
	{
		callback({success: true, message: 'Comments retrieved', log: result.records});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}
