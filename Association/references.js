var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017/blog_demo_2");


var Post = require("./models/posts");

var User = require("./models/users");
// //add a new user to mongodb
// User.create({
// 	email:"bcde@gmail.com",
// 	name:"bcde"
// });

//add a post to mongodb
// Post.create({
// 	title:"how to feed a cat",
// 	content:"blah blah"
// },function(err,post){
// 	console.log(post)
// });

//add a post to a specific user
// Post.create({
// 	title:"how to feed a cat 789",
// 	content:"blah"
// },function(err,post){
// 		User.findOne({name:"bcde"},function(err,user){
// 			user.posts.push(post);
// 			user.save(function(err,data){
// 				console.log(data)
// 			})
// 		})
// });

//find all posts for a specific user
User.findOne({name:"bcde"}).populate("posts").exec(function(err,user){
	console.log(user)
});




