var express = require("express");
var router = express.Router({mergeParams:true});//this merge the params from campgrounds and comments together
var CampGround = require("../models/campGround");
var Comment = require("../models/comment");

//get new comment's content from the form
//isLoggedIn is to check whether a user is logged in ,if it is the case, then he/she can add a new comment.
router.get("/new",isLoggedIn,function(req,res){
	CampGround.findById(req.params.id,function(err,returnData){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:returnData});
		}
	});
	
});

//add the new comment's content to the specific campground's comments page
router.post("/",isLoggedIn,function(req,res){
		CampGround.findById(req.params.id,function(err,returnData){
			if(err){
				console.log(err);
				res.redirect("/campgrounds");
			}else{
				Comment.create(req.body.comment,function(err,newComment){
					if(err){
						console.log(err);
					}else{
						returnData.comments.push(newComment);
						returnData.save();
						res.redirect("/campgrounds/"+returnData._id);
					}
				})
				
			}
		});
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};

module.exports = router;