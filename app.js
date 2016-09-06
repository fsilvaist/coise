var mongojs = require("mongojs");
var db = mongojs("localhost:27017/simpleGamesDB", ["userpws"]);
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
		cb();
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
		
			
});
