var Post = require('../models/postModel');

module.exports.create = function(req, res)
{
	Post.postAdd(req, req.body.email, req.body.content, function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Post submitted'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.display = function(req, res)
{
	Post.postShow(req, parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, records: log.records, message:'Posts retrieved'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}