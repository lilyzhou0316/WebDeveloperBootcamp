var express = require("express");
var router = express.Router();
var CampGround = require("../models/campGround");


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

//CREATE route--to create new data
router.post("/",function(req,res){
	//res.send("you reach the post route")
	//get data from form and add it to the campgroundsVar array
	var name = req.body.name;
	var image = req.body.url;
	var description = req.body.description;
	var newCampground = {name:name,image:image,description:description};
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
router.get("/new",function(req,res){
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

module.exports = router;