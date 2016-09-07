var mongojs = require("mongojs");
var db = mongojs("localhost:27017/simpleGamesDB", ["userpws", "snakescores"]);
var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);
app.use(express.static("./client"));
console.log("Starting Socket App - http://localhost:3000");

var HEIGHT = 500;
var WIDTH = 500;

var clients = {};
	
isValidPassword = function(data, cb){
	
	db.userpws.find({username:data.username, password:data.password}, function(err, res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});

};

isUsernameTaken = function(data, cb){
	
	db.userpws.find({username:data.username}, function(err, res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});

};

addUser = function(data, cb){
	
	db.userpws.insert({username:data.username, password:data.password}, function(err){
		db.snakescores.insert({username:data.username, score:0}, function(err){
			cb();
		});
	});

};

updateHighscore = function(data, cb){
	db.snakescores.update({username:data.username}, {$set: {score:data.highscore}}, function(err){
		console.log("Score of " + data.username + " updated to " + data.highscore);
		cb();
	});
};
	

retrieveHighscore = function(data, cb){
	
	db.snakescores.find({username:data.username}, {_id: 0, score: 1} , function(err, res){
		if(res.length > 0)
			cb(true, res[0].score);
		else
			cb(false, 0);
	});

};


getHighscoresSnake = function(cb){
	db.snakescores.find({},{_id: 0, username:1, score: 1}).limit(10).sort({score: -1}, function (err, docs) {
		console.dir(docs);
		
		cb(docs);
	});
	

};

	
io.on("connection", function(socket) {

	socket.on("register", function(data){
		isUsernameTaken(data, function(res){
			if(res)
				socket.emit("registerResponse", {success:false});
			else{
				addUser(data,function(){
					socket.emit("registerResponse", {success:true});				
				});
			}
		});
	});
	
	
	socket.on("login", function(data){
	
	
		isValidPassword(data,function(res){
			if(res)
				socket.emit('loginResponse',{success:true});
			else
				socket.emit('loginResponse',{success:false});			
		});
	});
	
	
	socket.on("highscoreSnake", function(data){
	
		
		retrieveHighscore(data,function(ok, res){
			if(ok)
				socket.emit('highscoreSnakeResponse',{success:true, score:res});
			else
				socket.emit('highscoreSnakeResponse',{success:false, score:0});			
		});
	});
	
	
	socket.on("newHighscore", function(data){
		
		updateHighscore(data,function(){
			//if()
				socket.emit('newHighscoreResponse',{success:true});
			// else
				// socket.emit('newHighscoreResponse',{success:false});
							
		});
	});
		
	socket.on("highscoresMenuSnake", function(){
		console.log("OI");
		getHighscoresSnake(function(data){
			console.log("enviei resposta");
			socket.emit("highscoresMenuSnakeResponse", data);
		});
	
	});
			
});
