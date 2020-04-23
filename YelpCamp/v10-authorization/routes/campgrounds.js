var express = require("express");
var router = express.Router();
var CampGround = require("../models/campGround");
var middleware = require("../middleware");//if only give the directory name, it will automatically require the file called index

//INDEX route--to list all data
router.get("/",function(req,res){
	//console.log(req.user);
	//get all campgrounds from db
	CampGround.find({},function(err,allcamps){
		if(err){
		console.log(err);
	}else{
		res.render("campgrounds/index",{campgrounds:allcamps,currentUser:req.user});//,currentUser:req.user
	  }
	});
});

//CREATE route--to create new data and add it to the db
router.post("/",middleware.isLoggedIn,function(req,res){
	//res.send("you reach the post route")
	//get data from form and add it to the campgroundsVar array
	var name = req.body.name;
	var image = req.body.url;
	var description = req.body.description;
	var author ={
		id:req.user._id,
		username: req.user.username
	};
	var newCampground = {name:name,image:image,description:description,author:author};
	
	// campgroundsVar.push(newCampground);
	
	//create a new data and save it into db
	CampGround.create(newCampground,function(err,newcamp){
		if(err){
		console.log(err);
	}else{
		//redirect back to campgrounds page
	res.redirect("/campgrounds");
	  }
	});	
});

//NEW route--to show form to create a new data
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

//SHOW route--to show detail information about a specific data object
router.get('/:id',function(req,res){
	//find the campground with provided ID
	CampGround.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
		if(err){
			console.log(err);
		}else{
			// then show template with that campground
			res.render("campgrounds/show",{campground:foundcamp});
		};
	});
});

//EDIT ROUTE
//to show edit form to user and get the info that user entered
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	CampGround.findById(req.params.id,function(err,foundCamp){
		res.render("campgrounds/edit",{campground: foundCamp});
	})
});

//UPDATE ROUTE
//to update the specific campground according to the info that user entered in db
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find the campground and update it, the second param is the form returned to us
	CampGround.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
		if(err){
			res.redirect("/campgrounds")
		}else{
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
	
});

//DELETE ROUTE
//to delete a campground
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	CampGround.findByIdAndDelete(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds")
		}else{
			res.redirect("/campgrounds")
		}
	});
});


module.exports = router;