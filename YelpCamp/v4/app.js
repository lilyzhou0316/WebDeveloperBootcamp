var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose");
var CampGround = require("./models/campGround");
var Comment = require("./models/comment");

var seedDB = require("./seeds");


mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/yelp_camp");

app.use(bodyparser.urlencoded({extended:true}));
// app.use(express.static("public"));


app.set("view engine","ejs");

seedDB();

app.get("/",function(req,res){
	//res.send("home page will be landed soom....");
	res.render("campgrounds/home");
});

//INDEX route--to list all data
app.get("/campgrounds",function(req,res){
//res.send("this is campgrounds page")
	// res.render("campgrounds",{campgrounds:campgroundsVar});
	
	//get all campgrounds from db
	CampGround.find({},function(err,allcamps){
		if(err){
		console.log(err);
	}else{
		res.render("campgrounds/index",{campgrounds:allcamps});
	  }
	});
});

//CREATE route--to create new data
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/new",function(req,res){
	res.render("campgrounds/new");
});

//SHOW route--to show detail information about a specific data object
app.get('/campgrounds/:id',function(req,res){
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


//=======================
//COMMNETS routes(nested routes)
//=======================
//get new comment's content from the form
app.get("/campgrounds/:id/comments/new",function(req,res){
	CampGround.findById(req.params.id,function(err,returnData){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:returnData});
		}
	});
	
});
//add the new comment's content to the specific campground's comments page
app.post("/campgrounds/:id/comments",function(req,res){
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

app.listen(3000,function(){
	console.log("The YelpCamp server has started!")
});