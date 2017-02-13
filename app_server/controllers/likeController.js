var Like = require('../models/likeModel');

module.exports.createC = function(req, res)
{
	Like.commentLike(req, req.body.userId, req.body.commentId, function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Like submitted'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.createP = function(req, res)
{
	Like.postLike(req, req.body.userId, req.body.postId, function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Like submitted'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.unlikeC = function(req, res)
{
	Like.commentUnlike(req, parseInt(req.params.u_id), parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Like deleted'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.unlikeP = function(req, res)
{
	Like.postUnlike(req, parseInt(req.params.u_id), parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Like deleted'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.getC = function(req, res)
{
	Like.commentGetLikes(req, parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Likes retrieved', result: log.log});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.getP = function(req, res)
{
	Like.postGetLikes(req, parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Likes retrieved', result: log.log});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.checkC = function(req, res)
{
	Like.commentCheckLike(req, parseInt(req.params.u_id), parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Like checked', result: log.log});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.checkP = function(req, res)
{
	Like.postCheckLike(req, parseInt(req.params.u_id), parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Like checked', result: log.log});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}
