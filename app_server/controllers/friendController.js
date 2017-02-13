var Friend = require('../models/friendModel');

module.exports.getFriends = function(req, res)
{
	Friend.friendList(req, parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'List retrieved', result: log.log});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.getRequests = function(req, res)
{
	Friend.friendRequestList(req, parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'List retrieved', result: log.log});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.request = function(req, res)
{
	Friend.friendAdd(req, parseInt(req.params.u_id), parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Request send'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.accept = function(req, res)
{
	Friend.friendConfirm(req, parseInt(req.params.id), parseInt(req.params.u_id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Request accepted'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.reject = function(req, res)
{
	Friend.friendReject(req, parseInt(req.params.id), parseInt(req.params.u_id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Request rejected'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.delete = function(req, res)
{
	Friend.friendDelete(req, parseInt(req.params.u_id), parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Friendship destroyed'});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}

module.exports.check = function(req, res)
{
	Friend.friendCheck(req, parseInt(req.params.u_id), parseInt(req.params.id), function(log)
	{
		if (log.success)
		{
			res.status(200).json({success:true, message:'Friendship checked', result: log.log});
		}
		else
		{
			res.status(400).json(log);
		}
	});
}
