var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose");
var CampGround = require("./models/campGround");

var seedDB = require("./seeds");

seedDB();
mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
 mongoose.set('useCreateIndex', true);
 mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/yelp_camp");

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	//res.send("home page will be landed soom....");
	res.render("home");
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
		res.render("index",{campgrounds:allcamps});
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
	res.render("new");
});

//SHOW route--to show detail information about a specific data object
app.get('/campgrounds/:id',function(req,res){
	//find the campground with provided ID
	CampGround.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
		if(err){
			console.log(err);
		}else{
			// then show template with that campground
			res.render("show",{campground:foundcamp});
		};
	});
});


app.listen(3000,function(){
	console.log("The YelpCamp server has started!")
});