var request = require("request");
// request("http://www.google.com", function(error,response,body){
// 	if(error){
// 		console.log(error);
// 	}else{
// 		if(response.statusCode == 200){
// 			console.log(body);
// 		}
		
// 	}
// })

// request("https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22",function(error,response,body){
// 	if(!error && response.statusCode == 200){
// 		var data = JSON.parse(body);
// 		//console.log(data);
// 		console.log(data["main"]["temp"]);
// 	}
// });

request("https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22",function(error,response,body){
	if(!error && response.statusCode == 200){
		eval(require('locus'));
		var data = JSON.parse(body);
		//console.log(data);
		console.log(data["main"]["temp"]);
	}
});


//http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
//http://www.omdbapi.com/?i=tt3896198&apikey=thewdb