$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");

	// Set Controls
	var UP = 38;
	var DOWN = 40;
	var LEFT = 37;
	var RIGHT = 39;
	var A = 88;
	var B = 90;
	var START = 13;
	var SELECT = 8;

	// Game states
	var PUSHING = 0;
	var PLAYING = 1;
	var gameState = PUSHING;


	// Loading Sprites
	var sprites = new Array();


	var Sprite = function(sx,sy, sw,sh, x,y, w,h,) {
		this.sourceX = sx;
		this.sourceY = sy;
		this.sourceWidth = sw;
		this.sourceHeight = sh;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	};

	// Background
	var background = new Image();
	background.src = "MiniGameBackground.png";
	var shopScene = new Sprite(0,0, 256,240, 0,0, 256,256, true);
	sprites.push(background)

	
});