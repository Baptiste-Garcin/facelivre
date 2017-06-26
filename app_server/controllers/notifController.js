var Notif = require('../models/notifModel');

module.exports.getAllNotif = function(req, res)
{
    var data = {};
    Notif.getLikeNotif(req, function(result){
        data.like = result;
        Notif.getFriendRequestNotif(req, function(result){
            data.friendsRequest = result;
            res.status(200).json({success:true, messsage:"notif fetched", result:data});
        });
    });
};

module.exports.read = function(req, res)
{
    Notif.read(req, function(result){
          res.status(200).json({success:true, messsage:"notif read"});
    })
};

// module.exports.friendAccept = function(req, res)
// {
//     Notif.accept(req, function(result){
//         res.status(200).json({success:true, message:"friend accepted"});
//     });
// };

// module.exports.friendDenied = function(req, res)
// {
//     Notif.denied(req, function(result){})
// }
