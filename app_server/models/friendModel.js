var db = require('../utils/db');

module.exports.friendAdd = function(req, asker, answerer, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u1:Person) WHERE ID(u1) = {asker} MATCH (u2:Person) WHERE ID(u2) = {answerer} CREATE (u1)-[r:IS_FRIENDS_WITH{status:"unconfirmed", notified: false}]->(u2)',
	{asker: asker, answerer: answerer})
	.then(function(result)
	{
		callback({success: true, message: 'Friend request submitted'});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.friendConfirm = function(req, asker, answerer, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u1:Person) WHERE ID(u1) = {asker} MATCH (u2:Person) WHERE ID(u2) = {answerer} MATCH (u1)-[r1:IS_FRIENDS_WITH{status:"unconfirmed"}]->(u2) SET r1.status = "confirmed" SET r1.since = {since} CREATE (u2)-[r2:IS_FRIENDS_WITH{status:"confirmed", since: {since}, notified: false}]->(u1)',
	{asker:asker, answerer:answerer, since: new Date().toISOString()})
	.then(function(result)
	{
		callback({success: true, message: 'Friend request accepted'});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.friendReject = function(req, asker, answerer, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u1:Person) WHERE ID(u1) = {asker} MATCH (u2:Person) WHERE ID(u2) = {answerer} MATCH (u1)-[r:IS_FRIENDS_WITH{status:"unconfirmed"}]->(u2) DELETE r',
	{asker: asker, answerer: answerer})
	.then(function(result)
	{
		callback({success: true, message: 'Friend request rejected'});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.friendDelete = function(req, asker, answerer, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u1:Person) WHERE ID(u1) = {asker} MATCH (u2:Person) WHERE ID(u2) = {answerer} MATCH (u1)-[r1:IS_FRIENDS_WITH{status:"confirmed"}]->(u2) MATCH (u2)-[r2:IS_FRIENDS_WITH{status:"confirmed"}]->(u1) DELETE r1,r2',
	{asker: asker, answerer: answerer})
	.then(function(result)
	{
		callback({success: true, message: 'Friendship erased'});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.friendCheck = function(req, asker, answerer, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u1:Person) WHERE ID(u1) = {asker} MATCH (u2:Person) WHERE ID(u2) = {answerer} MATCH (u1)-[r:IS_FRIENDS_WITH]->(u2) RETURN COUNT(r), r.status, u2.firstname',
	{asker: asker, answerer: answerer})
	.then(function(result)
	{
		callback({success: true, message: 'Friendship checked', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.friendRequestList = function(req, userId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (q)-[r:IS_FRIENDS_WITH{status:"unconfirmed"}]->(u) RETURN q',
	{userId: userId})
	.then(function(result)
	{
		callback({success: true, message: 'Friend requests retrieved', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.friendList = function(req, userId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (q)-[r:IS_FRIENDS_WITH{status:"confirmed"}]->(u) RETURN q',
	{userId: userId})
	.then(function(result)
	{
		callback({success: true, message: 'Friend requests retrieved', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}
