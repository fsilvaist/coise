var socket = io("http://localhost:3000");
//var ctx = document.getElementById("ctx").getContext("2d");
//var p = document.getElementById("p");
var i = 0;
var HEIGHT = 500;
var WIDTH = 500;
var username;
var registeredUsers = {};
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
	var user = document.getElementById("usernameform");
	var pw = document.getElementById("passwordform");
	
	username = user.value;
	password = pw.value;
	console.log("USERNAME:" + username);
	
	var body = document.getElementById("body");
	var form = document.getElementById("form");
	var loginbutton = document.getElementById("login");
	var registerbutton = document.getElementById("register");
	body.removeChild(form);
	body.removeChild(loginbutton);
	body.removeChild(registerbutton);
	//parent.removeChild(child);
	
	setUserAndLogOffButton();
	
	setCookie("username", username, 1);
	console.log("COOKIE: ||" + getCookie("username") + "||");
	createMenu();
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
	var items = document.body.getElementsByTagName("*");
    for (var i = items.length - 1; i >= 0; i--) {
        if(!(items[i].tagName === "SCRIPT")){
			document.body.removeChild(items[i]);
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
	var user = userform.value;
	var pw = pwform.value;
	if(!registeredUsers.hasOwnProperty(user)){
		registeredUsers[user] = pw;
		alert("REGIST SUCCESSFUL");
	}
	else{
		console.log("USERNAME ALREADY IN USE " + registeredUsers[user]);
		alert("USERNAME ALREADY IN USER - REGIST SUCCESSFUL");
	}
	
//registar user na db
//etc etc

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
	buttonHighscoresSnake.disabled = true;
	body.appendChild(buttonHighscoresSnake);
	
	var buttonBackToMainMenu = document.createElement("button");
	buttonBackToMainMenu.setAttribute("id", "buttonBackToMainMenu");
	buttonBackToMainMenu.setAttribute("type", "button");
	buttonBackToMainMenu.setAttribute("onclick", "backToMainMenu()");
	buttonBackToMainMenu.innerHTML = "BACK TO MAIN MENU";
	body.appendChild(buttonBackToMainMenu);
	
	
	
	
	console.log("snakemenu");
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

/*
socket.on("idmsg", function(id){

    console.log(id);

});

var externalPlayers = {};
socket.on("enemy", function(id, x, y){
    
    externalPlayers[id] = new Player(x, y, "warrior");

});

socket.on("playerexit", function(id){
    delete externalPlayers[id];
});

socket.on("refreshPlayers", function(id, x, y){
    if (id in externalPlayers){
        console.log("UPDATE PLAYER EXTERNO");
        externalPlayers[id].x = x;
        externalPlayers[id].y = y;
    }
});
socket.on("init", function(x, y){

    LocalPlayer.player = new Player(x, y, "warrior");
    requestAnimationFrame(mainLoop);

});

var classes = {
    warrior: {
				color: '#A52A2A',
				radius: 20,
				hp:200,
				velocity:5,
			 },
				
    mage: {
			color: '#00BFFF',
			radius: 15,
			hp:100,
			velocity:3,
		  },
		
    hunter: {
				color: '#228B22',
				radius: 15,
				hp:125,
				velocity:5,
			},
};

Player = function(x, y, type){
	this.x = x;
	this.y = y;
	this.hp = classes[type].hp;
	this.velocity = classes[type].velocity;
	this.radius = classes[type].radius;
	this.type = type;
	this.draw = function (){
		ctx.fillStyle = classes[type].color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillText(this.hp/classes[type].hp*100 + "%", this.x-10, this.y-this.radius-3);
	}
};

var LocalPlayer = {
	pressingRight: false,
	pressingDown: false,
	pressingLeft: false,
	pressingUp: false,
	player: null,
};	
	


drawEntity = function(entity){
	entity.draw();
}

document.onkeydown = function(event){
    if(event.keyCode === 68)        //d
			LocalPlayer.pressingRight = true;
    else if(event.keyCode === 83)   //s
            LocalPlayer.pressingDown = true;
    else if(event.keyCode === 65) //a
            LocalPlayer.pressingLeft = true;
    else if(event.keyCode === 87) // w
            LocalPlayer.pressingUp = true;
}

document.onkeyup = function(event){
    if(event.keyCode === 68)        //d
            LocalPlayer.pressingRight = false;
    else if(event.keyCode === 83)   //s
            LocalPlayer.pressingDown = false;
    else if(event.keyCode === 65) //a
            LocalPlayer.pressingLeft = false;
    else if(event.keyCode === 87) // w
            LocalPlayer.pressingUp = false;
}

updatePlayerPosition = function(){
    if(LocalPlayer.pressingRight)
            LocalPlayer.player.x += LocalPlayer.player.velocity;
    if(LocalPlayer.pressingLeft)
            LocalPlayer.player.x -= LocalPlayer.player.velocity;
    if(LocalPlayer.pressingDown)
            LocalPlayer.player.y += LocalPlayer.player.velocity;
    if(LocalPlayer.pressingUp)
            LocalPlayer.player.y -= LocalPlayer.player.velocity;
   
    //ispositionvalid
    if(LocalPlayer.player.x < LocalPlayer.player.radius)
            LocalPlayer.player.x = LocalPlayer.player.radius;
    if(LocalPlayer.player.x > WIDTH-LocalPlayer.player.radius)
            LocalPlayer.player.x = WIDTH - LocalPlayer.player.radius;
    if(LocalPlayer.player.y < LocalPlayer.player.radius)
            LocalPlayer.player.y = LocalPlayer.player.radius;
    if(LocalPlayer.player.y > HEIGHT - LocalPlayer.player.radius)
            LocalPlayer.player.y = HEIGHT - LocalPlayer.player.radius;
   
}



var lastFrameTimeMs = 0, // The last time the loop was run
    maxFPS = 30; // The maximum FPS we want to allow
var fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0;
draw = function (){
	ctx.clearRect(0,0,WIDTH,HEIGHT);
    
    for(var c in externalPlayers){
        drawEntity(externalPlayers[c]);
    }

	drawEntity(LocalPlayer.player);
	ctx.fillText(fps, 450, 450);
}
function mainLoop(timestamp) {
	
	
	p.innerHTML = "" + i;
	i++;
	 if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
	
	if (timestamp > lastFpsUpdate + 1000) { // update every second
        fps = 0.25 * framesThisSecond + (1 - 0.25) * fps; // compute the new FPS
 
        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;
 
	
    lastFrameTimeMs = timestamp;
	
    updatePlayerPosition();
    draw();

    socket.emit("newPos", LocalPlayer.player.x, LocalPlayer.player.y);

    
    requestAnimationFrame(mainLoop);
}

*/




 
// Start things off

