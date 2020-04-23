var express = require("express");
var app = express();
app.listen(3000);
app.set('view engine','ejs');
app.get('/home/:thing',function(req,res){
	var thing = req.params.thing;
	res.render('home',{thingVar:thing});
});
app.use(express.static('public'));
