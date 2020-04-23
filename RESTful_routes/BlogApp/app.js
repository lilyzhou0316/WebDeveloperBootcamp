var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	bodyparser = require("body-parser"),
	methodoverride = require("method-override"),
	expressSanitizer = require("express-sanitizer");

//app configuration
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/blog_app");

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(expressSanitizer());//this line must after bodyparser line
app.use(express.static("public"));
app.use(methodoverride("_method"));//in order to use method override

//mongoose configuration
//create the blog schema
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	content:String,
	created:{
		type:Date,
		default:Date.now
	}
});

//save the schema to a model
var Blog = mongoose.model("BLOG",blogSchema);

//create a data and save it into the mongodb
// Blog.create({
// 	title:"Test",	
// 	image:"https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
// 	content:"hello from blog post"
// });

//7 kinds of RESTfule routes

//home page
app.get("/",function(req,res){
	res.redirect("/blogs");
});

//first: INDEX route--to list all data info
//passing all data of mongodb to index page
app.get("/blogs",function(req,res){	
	Blog.find({},function(errs,datablogs){
		if(errs){
			console.log("ERROR!");
		}else{
			res.render("index",{blogs:datablogs});
		}
	});	
});

//second: NEW route-- to create a form in order to add new data
app.get("/blogs/new",function(req,res){
	res.render("new");
});

//third: CREATE route--according to the new route, get the new data info and add it to home page
app.post("/blogs",function(req,res){
	//sanitzer code
	req.body.blog.body = req.sanitze(req.body.blog.body);
	//create blog
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			res.render("new");
		}else{
			//redirect to index page
			res.redirect("/blogs");
		}
	})
	
});

//forth: SHOW route--according to a specific id to show the whole info of that data 
app.get("/blogs/:id",function(req,res){
	//find the specific blog by its id
	Blog.findById(req.params.id,function(err,returnBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show.ejs",{blog:returnBlog});
		}
	})
});

//fifth:EDIT route--create a form to change existing data's info
app.get("/blogs/:id/edit",function(req,res){
	//find the specific blog by its id
	Blog.findById(req.params.id,function(err,returnBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit.ejs",{blog:returnBlog});
		}
	});
});

//sixth:UPDATE route--according to edit route to upadate the specific data's info
app.put("/blogs/:id",function(req,res){
	//sanitzer code
	req.body.blog.body = req.sanitze(req.body.blog.body);
	
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

//seventh: DELETE route--delete a data from home page
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
	// res.redirect("/blogs");
});


app.listen(3000,function(){
	console.log("The Blog APP server has started!")
});


