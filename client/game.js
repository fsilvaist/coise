var socket = io("http://localhost:3000");
//var ctx = document.getElementById("ctx").getContext("2d");
//var p = document.getElementById("p");
var i = 0;
var HEIGHT = 500;
var WIDTH = 500;
var username;
var registeredUsers = {};

var inGame = false;
createLoginMenu = function(){
	console.log("MENU CREATED BY JS FUNCTION");
	var body = document.getElementById("body");
	
	var form = document.createElement("form");
	form.setAttribute("id", "form");
	
	var input1 = document.createElement("input");
	input1.setAttribute("type", "text");
	input1.setAttribute("id", "usernameform");
	input1.setAttribute("name", "username");
	input1.setAttribute("placeholder", "Username");
	input1.focus();
	
	var br1 = document.createElement("br");
	
	var input2 = document.createElement("input");
	input2.setAttribute("type", "password");
	input2.setAttribute("id", "passwordform");
	input2.setAttribute("name", "password");
	input2.setAttribute("placeholder", "Password");
	
	var br2 = document.createElement("br");
	
	
	var button1 = document.createElement("button");
	button1.setAttribute("id", "login");
	button1.setAttribute("type", "button");
	button1.setAttribute("onclick", "login()");
	button1.innerHTML = "Log In";
	
	var button2 = document.createElement("button");
	button2.setAttribute("id", "register");
	button2.setAttribute("type", "button");
	button2.setAttribute("onclick", "register()");
	button2.innerHTML = "Register";
	
	form.appendChild(input1);
	form.appendChild(br1);
	form.appendChild(input2);
	form.appendChild(br2);
	
	body.appendChild(form);
	body.appendChild(button1);
	body.appendChild(button2);
	
}


login = function(){
	var userform = document.getElementById("usernameform");
	var pwform = document.getElementById("passwordform");
	
	socket.emit("login", {username:userform.value, password:pwform.value});
	username = userform.value;
	
	socket.on("loginResponse", function(data){
		if(data.success){
			//LOGIN SUCCESSFUL
			
			console.log("LOGIN SUCCESSFUL");
			
			// var body = document.getElementById("body");
			// var form = document.getElementById("form");
			// var loginbutton = document.getElementById("login");
			// var registerbutton = document.getElementById("register");
			// body.removeChild(form);
			// body.removeChild(loginbutton);
			// body.removeChild(registerbutton);
			
			var items = document.body.getElementsByTagName("*");
			for (var i = items.length - 1; i >= 0; i--) {
				if(!(items[i].tagName === "SCRIPT")){
					items[i].parentNode.removeChild(items[i]);
				}
			}
			//parent.removeChild(child);
			
			setUserAndLogOffButton();
			
			setCookie("username", username, 1);
			console.log("COOKIE: ||" + getCookie("username") + "||");
			createMenu();
			}
		else{
		
			//LOGIN UNSUCCESSFUL
			console.log("LOGIN UNSUCCESSFUL");
			}
			
	});
	
	
	
}

setUserAndLogOffButton = function(){
	var body = document.getElementById("body");
	
	var usernamep = document.createElement("p");
	usernamep.setAttribute("id", "username");
	var node = document.createTextNode(username);
	usernamep.appendChild(node);
	
	var button1 = document.createElement("button");
	button1.setAttribute("id", "logoff");
	button1.setAttribute("type", "button");
	button1.setAttribute("onclick", "logoff()");
	button1.innerHTML = "Log Off";
	
	body.appendChild(usernamep);
	body.appendChild(button1);
}

logoff = function(){
	
	setCookie("username", "", 0);
	//delete cookie
	inGame = false;
	var items = document.body.getElementsByTagName("*");
		for (var i = items.length - 1; i >= 0; i--) {
			if(!(items[i].tagName === "SCRIPT")){
				items[i].parentNode.removeChild(items[i]);
			}
		}
	
	createLoginMenu();

}




createMenu = function(){
	
	var buttonsnake = document.createElement("button");
	buttonsnake.setAttribute("id", "buttonsnake");
	buttonsnake.setAttribute("type", "button");
	buttonsnake.setAttribute("onclick", "snakemenu()");
	buttonsnake.innerHTML = "SNAKE";
	body.appendChild(buttonsnake);
	
	var buttonsueca = document.createElement("button");
	buttonsueca.setAttribute("id", "buttonsueca");
	buttonsueca.setAttribute("type", "button");
	buttonsueca.setAttribute("onclick", "suecamenu()");
	buttonsueca.innerHTML = "SUECA";
	buttonsueca.disabled = true;
	body.appendChild(buttonsueca);
	
	var buttonpoker = document.createElement("button");
	buttonpoker.setAttribute("id", "buttonpoker");
	buttonpoker.setAttribute("type", "button");
	buttonpoker.setAttribute("onclick", "pokermenu()");
	buttonpoker.innerHTML = "POKER";
	buttonpoker.disabled = true;
	body.appendChild(buttonpoker);

}


register = function(){
	var userform = document.getElementById("usernameform");
	var pwform = document.getElementById("passwordform");
	
	socket.emit("register", {username:userform.value, password:pwform.value});
	
	
	socket.on("registerResponse", function(data){
		if(data.success){
			//REGIST SUCCESSFUL
			
			console.log("REGIST SUCCESSFUL");
			}
		else{
		
			//REGIST UNSUCCESSFUL
			console.log("REGIST UNSUCCESSFUL");
			}
			
	});
}


snakemenu = function(){
	
	var body = document.getElementById("body");
	
	var buttonsnake = document.getElementById("buttonsnake");
	var buttonsueca = document.getElementById("buttonsueca");
	var buttonpoker = document.getElementById("buttonpoker");
	
	body.removeChild(buttonsnake);
	body.removeChild(buttonsueca);
	body.removeChild(buttonpoker);
	
	var buttonNewSnakeGame = document.createElement("button");
	buttonNewSnakeGame.setAttribute("id", "newSnakeGameButton");
	buttonNewSnakeGame.setAttribute("type", "button");
	buttonNewSnakeGame.setAttribute("onclick", "newSnakeGame()");
	buttonNewSnakeGame.innerHTML = "NEW GAME";
	body.appendChild(buttonNewSnakeGame);
	
	var buttonHighscoresSnake = document.createElement("button");
	buttonHighscoresSnake.setAttribute("id", "buttonHighscoresSnake");
	buttonHighscoresSnake.setAttribute("type", "button");
	buttonHighscoresSnake.setAttribute("onclick", "highscoresSnake()");
	buttonHighscoresSnake.innerHTML = "HIGHSCORES";
	body.appendChild(buttonHighscoresSnake);
	
	var buttonBackToMainMenu = document.createElement("button");
	buttonBackToMainMenu.setAttribute("id", "buttonBackToMainMenu");
	buttonBackToMainMenu.setAttribute("type", "button");
	buttonBackToMainMenu.setAttribute("onclick", "backToMainMenu()");
	buttonBackToMainMenu.innerHTML = "BACK TO MAIN MENU";
	body.appendChild(buttonBackToMainMenu);
	
	
	
	
	console.log("snakemenu");
}


socket.on("highscoresMenuSnakeResponse", function(data){
	
		console.log("TAM DATA: " + data.length);
		
		for(var i=0; i < data.length ; i++){
			var p;
			p = document.createElement("p");
			p.innerHTML = data[i].username + " : " + data[i].score;
			document.body.appendChild(p);
		}
		
		var buttonPreviousMenu = document.createElement("button");
		buttonPreviousMenu.setAttribute("id", "buttonPreviousMenuButton");
		buttonPreviousMenu.setAttribute("type", "button");
		buttonPreviousMenu.setAttribute("onclick", "buttonPreviousMenu()");
		buttonPreviousMenu.innerHTML = "BACK";
		document.body.appendChild(buttonPreviousMenu);
			//data is an ordered array
	});

highscoresSnake = function(){
	
	console.log("OI");
	var b1 = document.getElementById("newSnakeGameButton");
	var b2 = document.getElementById("buttonHighscoresSnake");
	var b3 = document.getElementById("buttonBackToMainMenu");
	
	document.body.removeChild(b1);
	document.body.removeChild(b2);
	document.body.removeChild(b3);
	
	socket.emit("highscoresMenuSnake");
	

}

buttonPreviousMenu = function(){
	
	var items = document.body.getElementsByTagName("*");
		for (var i = items.length - 1; i >= 0; i--) {
			console.log(items[i].tagName);
			if(items[i].tagName === "P"){
				items[i].parentNode.removeChild(items[i]);
			}
		}
		
	var b1 = document.getElementById("buttonPreviousMenuButton");
	document.body.removeChild(b1);
	
	var buttonNewSnakeGame = document.createElement("button");
	buttonNewSnakeGame.setAttribute("id", "newSnakeGameButton");
	buttonNewSnakeGame.setAttribute("type", "button");
	buttonNewSnakeGame.setAttribute("onclick", "newSnakeGame()");
	buttonNewSnakeGame.innerHTML = "NEW GAME";
	body.appendChild(buttonNewSnakeGame);
	
	var buttonHighscoresSnake = document.createElement("button");
	buttonHighscoresSnake.setAttribute("id", "buttonHighscoresSnake");
	buttonHighscoresSnake.setAttribute("type", "button");
	buttonHighscoresSnake.setAttribute("onclick", "highscoresSnake()");
	buttonHighscoresSnake.innerHTML = "HIGHSCORES";
	body.appendChild(buttonHighscoresSnake);
	
	var buttonBackToMainMenu = document.createElement("button");
	buttonBackToMainMenu.setAttribute("id", "buttonBackToMainMenu");
	buttonBackToMainMenu.setAttribute("type", "button");
	buttonBackToMainMenu.setAttribute("onclick", "backToMainMenu()");
	buttonBackToMainMenu.innerHTML = "BACK TO MAIN MENU";
	body.appendChild(buttonBackToMainMenu);

}



newSnakeGame = function(){

	var body = document.getElementById("body");
	
	var b1 = document.getElementById("newSnakeGameButton");
	var b2 = document.getElementById("buttonHighscoresSnake");
	var b3 = document.getElementById("buttonBackToMainMenu");
	
	body.removeChild(b1);
	body.removeChild(b2);
	body.removeChild(b3);
	
	var snakeGame = new SnakeGame();
	snakeGame.start();
}

backToMainMenu = function(){
	
	var body = document.getElementById("body");
	
	var b1 = document.getElementById("newSnakeGameButton");
	var b2 = document.getElementById("buttonHighscoresSnake");
	var b3 = document.getElementById("buttonBackToMainMenu");
	
	body.removeChild(b1);
	body.removeChild(b2);
	body.removeChild(b3);
	
	createMenu();

}


suecamenu = function(){

	console.log("suecamenu");
}

pokermenu = function(){

	console.log("pokermenu");
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

var usernameInCookie = getCookie("username");
if(usernameInCookie === "")
	createLoginMenu();
else{
	username = usernameInCookie;
	setUserAndLogOffButton();
	createMenu();
}
