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

		il.AddTask("mario", "Mario.png");
		il.AddTask("minigameMario", "MarioMiniGameSprites.png");
		il.AddTask("shopscene", "MiniGameBackground.png");
		il.AddTask("table", "Table.png");
		il.AddTask("toad", "Toad.png");

		gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1);
		gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
		gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);

		gm.AddSprite("shopbackground", "shopscene", 0, 0, 256, 256, 1);
		gm.AddSprite("table", "table", 0, 0, 96, 32, 1);
		gm.AddSprite("small", "minigameMario", 0, 0, 48, 64, 1);
		gm.AddSprite("big", "minigameMario", 0, 0, 96, 128, 1);
		gm.AddSprite("shop", "toad", 0, 0, 32, 48, 1);


		var shopBackground = gm.CreateActor(0, 0);
		shopBackground.sprite = "shopbackground";

		var table = gm.CreateActor(80, 160);
		table.sprite = "table"

	
		var actor = gm.CreateActor(16, 128);
		actor.sprite = "small";

		var toad = gm.CreateActor(192, 144);
		toad.sprite = "toad";



});