var mongoose = require("mongoose");

//create comment schema
var commentSchema = new mongoose.Schema({
	text: String,
    author: String
});
//save it to a model
module.exports = mongoose.model("Comment",commentSchema);