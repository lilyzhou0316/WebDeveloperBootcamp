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
//requiring routes
var campgroundRouters = require("./routes/campgrounds");
var commentRouters = require("./routes/comments");
var registerRouters = require("./routes/register");

//connect to mongodb
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

//use all routes
//first way:
// app.use(campgroundRouters);
// app.use(commentRouters);
// app.use(registerRouters);

//second way:
app.use("/campgrounds",campgroundRouters);//it means get all routes from campgroundRouters and append "/campgrounds" in front of them
app.use("/campgrounds/:id/comments",commentRouters);
app.use("/",registerRouters);

app.listen(3000,function(){
	console.log("The YelpCamp server has started!")
});