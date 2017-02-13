var Feed = require('../models/feedModel.js');

module.exports.getPost = function(req, res){
    Feed.getPost(req, function(resultat){
        res.status(200).json({success:true, message:'Posts fetched', resultat:resultat});
    });
};
