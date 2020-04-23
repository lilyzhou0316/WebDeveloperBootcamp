var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/demo');
//create a pattern to follow
var catSchema = new mongoose.Schema({
	name:String,
	age:Number
});

//compile the pattern to a model so that we can use create, find, update, remove methods
var Cat = mongoose.model('Cat', catSchema);
//one way to add data
//add a new data into the database
//the var name geogre doesn't impact anything in db
// var geogre = new Cat({
// 	name:"Geogre",
// 	age:10
// });
// //save the new data to db
// //the parameter cat refers to the data sent back by the db
// geogre.save(function(err,cat){
// 	if(err){
// 		console.log("something went wrong");
// 	}else{
// 		console.log(cat);
// 	}
// });

//another way to add new data to db
Cat.create({
	name:"snow white",
	age:2
},function(err,cat){
	if(err){
		console.log("something went wrong");
	}else{
		console.log(cat);
	}
})

//retrieve all data from the database
//the parameter cats refer to all data sent back by the db
Cat.find({},function(err,cats){
	if(err){
		console.log("something went wrong");
	}else{
		console.log(cats);
	}
})