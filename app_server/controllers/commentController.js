var Comment = require('../models/commentModel');

module.exports.create = function(req, res)
{
	Comment.commentAdd(req, req.body.userId, req.body.postId, req.body.content, function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Comment submitted'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.populate = function(req, res)
{
	Comment.commentGet(req, parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, records: log.log, message:'Comments retrieved'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}