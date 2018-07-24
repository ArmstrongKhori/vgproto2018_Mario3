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

		this.imageLoader.AddTask("mario", "Mario.png");
		this.imageLoader.AddTask("minigameMario", "MarioMiniGameSprites.png");
		this.imageLoader.AddTask("shop", "CardMatchingGame.png");

		this.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1);
		this.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
		this.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);
		this.AddSprite("small", "minigameMario", 0, 0, 48, 64, 1);
		this.AddSprite("shop", "shop", 0, 0, 256, 176, 1);

		var actor = gm.CreateActor(0, 0);
		actor.sprite = "shop";

	
		var actor = gm.CreateActor(40, 160);
		actor.sprite = "smallMiniGameMario";
		actor.sprite_speed = 1/gm.frameRate;

});