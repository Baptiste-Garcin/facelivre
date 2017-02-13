var db = require('../utils/db');

module.exports.postAdd = function(req, authorEmail, content, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (user:Person {email: {email}}) CREATE (message:Post {content: {content}})-[:WRITTEN_BY{created_at: {created_at}}]->(user)',
	{email: authorEmail, content: content, created_at: new Date().toISOString()})
	.then(function(result)
	{
		callback({success: true, message: 'Post submitted', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.postShow = function(req, userId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (p:Post)-[r:WRITTEN_BY]->(u:Person) WHERE ID(u) = {id} RETURN p,r,u ORDER BY r.created_at DESC',
	{id: userId})
	.then(function(result)
	{
		callback({success: true, records: result.records});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}
