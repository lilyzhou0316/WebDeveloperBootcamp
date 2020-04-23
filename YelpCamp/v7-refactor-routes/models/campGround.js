var mongoose = require("mongoose");

//create campgrounds schema
var campgroundsSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
	
});
//save it to a model
module.exports = mongoose.model("CampGround",campgroundsSchema);