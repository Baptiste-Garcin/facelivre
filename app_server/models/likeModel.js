var db = require('../utils/db');

module.exports.commentGetLikes = function(req, commentId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person)-[r:LIKES]->(c:Comment) WHERE ID(c) = {commentId} RETURN COUNT(r)',
	{commentId: commentId})
	.then(function(result)
	{
		callback({success: true, message: 'Likes counted', log: result.records});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.commentCheckLike = function(req, userId, commentId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (c:Comment) WHERE ID(c) = {commentId} MATCH (u)-[r:LIKES]->(c) RETURN COUNT(r)',
	{userId: userId, commentId: commentId})
	.then(function(result)
	{
		callback({success: true, message: 'Like checked', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.commentLike = function(req, userId, commentId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (c:Comment) WHERE ID(c) = {commentId} CREATE (u)-[:LIKES{notified: false}]->(c)',
	{userId: userId, commentId: commentId})
	.then(function(result)
	{
		callback({success: true, message: 'Like submitted', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.commentUnlike = function(req, userId, commentId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (c:Comment) WHERE ID(c) = {commentId} MATCH (u)-[r:LIKES]->(c) DELETE r',
	{userId: userId, commentId: commentId})
	.then(function(result)
	{
		callback({success: true, message: 'Like deleted', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.postGetLikes = function(req, postId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person)-[r:LIKES]->(p:Post) WHERE ID(p) = {postId} RETURN COUNT(r)',
	{postId: postId})
	.then(function(result)
	{
		callback({success: true, message: 'Likes counted', log: result.records});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.postCheckLike = function(req, userId, postId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (p:Post) WHERE ID(p) = {postId} MATCH (u)-[r:LIKES]->(p) RETURN COUNT(r)',
	{userId: userId, postId: postId})
	.then(function(result)
	{
		callback({success: true, message: 'Like checked', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.postLike = function(req, userId, postId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (p:Post) WHERE ID(p) = {postId} CREATE (u)-[:LIKES{notified: false}]->(p)',
	{userId: userId, postId: postId})
	.then(function(result)
	{
		callback({success: true, message: 'Like deleted', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}

module.exports.postUnlike = function(req, userId, postId, callback)
{
	var session = db.getSession(req);
	session
	.run('MATCH (u:Person) WHERE ID(u) = {userId} MATCH (p:Post) WHERE ID(p) = {postId} MATCH (u)-[r:LIKES]->(p) DELETE r',
	{userId: userId, postId: postId})
	.then(function(result)
	{
		callback({success: true, message: 'Like submitted', log: result});
		return true;
	})
	.catch(function(err)
	{
		callback({success: false, message: err.fields[0].message});
	});
}