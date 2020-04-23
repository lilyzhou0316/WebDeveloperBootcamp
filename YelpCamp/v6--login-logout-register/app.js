var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
    mongoose = require("mongoose");
var CampGround = require("./models/campGround");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

seedDB();
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp");

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


//passport configuration
app.use(require("express-session")({
	secret:"cats are cute",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	//pass the req.user(include loggedin user's info) to all routes
	res.locals.currentUser = req.user;
	next();
});

app.get("/",function(req,res){
	//res.send("home page will be landed soom....");
	res.render("campgrounds/home");
});

//INDEX route--to list all data
app.get("/campgrounds",function(req,res){
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
//isLoggedIn is to check whether a user is logged in ,if it is the case, then he/she can add a new comment.
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
	CampGround.findById(req.params.id,function(err,returnData){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:returnData});
		}
	});
	
});
//add the new comment's content to the specific campground's comments page
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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

//REGISTER ROUTES
//show register form
app.get("/register",function(req,res){
	res.render("register");
});

//handle sign up logic
app.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,returnUser){
		if(err){
			console.log(err);
			return res.redirect("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("campgrounds");
		})
	});
});

//LOGIN ROUTES
//show login form
app.get("/login",function(req,res){
	res.render("login");
});

//handle login logic
app.post("/login", passport.authenticate("local",{
		successRedirect:"/campgrounds",
		failureRedirect:"/login"
	}), function(req,res){
	
});

//LOGOUT ROUTES
//handle login logic
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};


app.listen(3000,function(){
	console.log("The YelpCamp server has started!")
});