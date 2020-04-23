var CampGround = require("../models/campGround");
var Comment = require("../models/comment");

var middlewareObj = {};

 middlewareObj.checkCommentOwnership = function(req,res,next){
	//first to check is user logged in ? if not, redirect
	if(req.isAuthenticated()){
		//if is
		Comment.findById(req.params.comment_id,function(err,foundComm){
			if(err){
				res.redirect("back")//back means the page where user came from
			}else{
					//does the user own the comment?
					//caution: foundComm.author.id is an object, need to be convert to string
					if(foundComm.author.id.equals(req.user._id)){
					//if is, then he/she can edit/update/delete the page
						next();
					}else{
					//if not, then he/she can not edit/update/delete current campground
						res.redirect("back")
				    }
				
			     }
		 });
	}else{
		res.redirect("back");
	}
	 
 };

 middlewareObj.checkCampgroundOwnership = function(req,res,next){
	//first to check is user logged in ? if not, redirect
	if(req.isAuthenticated()){
		//if is
		CampGround.findById(req.params.id,function(err,foundCamp){
			if(err){
				res.redirect("back")//back means the page where user came from
			}else{
					//does the user own the campground?
					//caution: foundCamp.author.id is an object, need to be convert to string
					if(foundCamp.author.id.equals(req.user._id)){
					//if is, then he/she can edit/update/delete the page
						next();
					}else{
					//if not, then he/she can not edit/update/delete current campground
						res.redirect("back")
				    }
				
			     }
		 });
	}else{
		res.redirect("back");
	}
	 
 };

 middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
	 
 };

module.exports = middlewareObj;