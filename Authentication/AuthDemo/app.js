var express = require("express"),
	//session = require("express-session"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),//constructor
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),//constructor
	passportLocalMongoose = require("passport-local-mongoose");
var app = express();	

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/authentication_app");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

//set passport up
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//these 2 methods are from passport-local-mongoose package
passport.serializeUser(User.serializeUser());//encoding and putting the data back to session
passport.deserializeUser(User.deserializeUser());//reading the session and taking the data from the session that encoded and unencoding it



//======================================
//ROUTES
//======================================


app.get("/",function(req,res){
	res.render("home");
});

//isLoggedIn function will check if the user is logged in, when it is, he can see the page
app.get("/secret", isLoggedIn,function(req,res){
	res.render("secret");
});

//Auth routes
//show sign up form
app.get("/register",function(req,res){
	res.render("register");
});
//handling user sign up
app.post("/register",function(req,res){
	//create a new User object and pass the username which user entered to the object and then save it into db,but not pass the password, instead use it as the second parameter(because the system will hash it), and then save the hashed password into db.
		User.register(new User({username:req.body.username}),req.body.password,function(err,user){
			if(err){
				console.log(err);
				return res.render("register");
			}
				//this method is to log the user in, store the correct info, and run the serializeUser method, we specify it as local strategy
				passport.authenticate("local")(req,res,function(){
					res.redirect("/secret");
				})
		});
});

//LOGIN ROUTES
//render login form
app.get("/login",function(req,res){
	res.render("login");
});
//handling data from login form
//login logic
//middleware--the passport part--runs before the final callback function, can have multiple middlewares
app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}),function(req,res){	
});

//LOGOUT ROUTE
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

//a function to check whether a user is logged in when he/she is on secret page
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		//next() is the method to run the code/function after isLoggedIn method when it used as middleware
		return next();
	}
		res.redirect("/login");
};

app.listen(3000,function(){
	console.log("Authentication Server Has Started.....")
})