var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/blog_demo");

//post: title, content  define post first, because it will be used in userSchema
var postSchema = new mongoose.Schema({
	title: String,
	content:String
});

var Post = mongoose.model("Post",postSchema);


//user: email, name
var userSchema = new mongoose.Schema({
	email: String,
	name:String,
	posts:[postSchema]
});

var User = mongoose.model("User",userSchema);




//add user data
// var newUser = new User({
// 	email:"abc@hotmail.com",
// 	name:"abc"
// });

// newUser.save(function(err,returnUser){
// 	if(err){
// 		console.log("error");
// 	}else{
// 		console.log(returnUser);
// 	};
// });

//add post data
// var newPost = new Post({
// 	title:"reflection on apples",
// 	content:"great!"
// });

// newPost.save(function(err,returnPost){
// 	if(err){
// 		console.log("error");
// 	}else{
// 		console.log(returnPost);
// 	};
// });

//add an user with posts
// var newUser = new User({
// 	email:"dfead@hotmail.com",
// 	name:"dfead"
// });

// newUser.posts.push({
// 	title:"how do you think of cat?",
// 	content:"they are so cute!!!!"
// });

// newUser.save(function(err,returnUser){
// 	if(err){
// 		console.log("error");
// 	}else{
// 		console.log(returnUser);
// 	};
// });

//find an existing user data and add posts to it
// User.findOne({name:"dfead"},function(err,returnUser){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		//console.log(returnUser);
// 		returnUser.posts.push({
// 			title:"i don\'t like cat",
// 			content:"kidding!"
// 		})
// 	}
// 	returnUser.save(function(err,user){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log(user);
// 		}
// 	});
// });