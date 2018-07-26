$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");

	



	// Game states
	var PUSHING = 0;
	var PLAYING = 1;
	var gameState = PUSHING;

	// Set Controls
	var UP = 38;
	var DOWN = 40;
	var LEFT = 37;
	var RIGHT = 39;
	var A = 88;
	var B = 90;
	var START = 13;
	var SELECT = 8;

	var pressA = false;
	var pressB = false;

	window.addEventListener("keydown", function(event) {
		switch(event.keyCode) {
			case A:
				pressA = true; 
				APress();
				break;
		}
	}, false);

	window.addEventListener("keyup", function(event) {
		switch(event.keyCode) {
			case A:
				pressA = false;
				APress();
				break;
		}
	}, false);

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

		// Pulling sprite files for shop
		il.AddTask("smallMinigameMario", "smallMinigameMario.png");
		il.AddTask("largeMinigameMario", "largeMinigameMario.png");
		il.AddTask("tanukiMiniGameMario", "tanukiMinigameMario.png")
		il.AddTask("shopbackground", "MiniGameBackground.png");
		il.AddTask("table", "Table.png");
		il.AddTask("toad", "Toad.png");


		// Pulling sprites for the actual matching game
		il.AddTask("matchingGameBackground", "MatchingGameBackground.png");

		// Creating Shop Sprites
		gm.AddSprite("shopscene", "shopbackground", 0, 0, 256, 256, 1);
		gm.AddSprite("table", "table", 0, 0, 96, 32, 1);
		gm.AddSprite("smallMinigameM", "smallMinigameMario", 0, 0, 48, 64, 1);
		gm.AddSprite("largeMinigameM", "largeMinigameMario", 0, 0, 96, 128, 1);
		gm.AddSprite("tanukiMinigameM", "tanukiMinigameMario", 0, 0, 144, 192, 1);
		gm.AddSprite("toad", "toad", 0, 0, 32, 48, 1);


		// Creating Minigame Sprites
		gm.AddSprite("MiniGameBackground", "matchingGameBackground", 0, 0, 256, 176, 1);




		var shopBackground = gm.CreateTile(0, 0, false);
		shopBackground.sprite = "shopscene";

		var table = gm.CreateTile(80, 104, true);
		table.sprite = "table"
		
		var toad = gm.CreateTile(192, 88, true);
		toad.sprite = "toad";


		var small = gm.CreateTile(16, 72, true);
		small.sprite = "smallMinigameM";


	function APress(){


		if(pressA = true){
			// Clear shop scene
			context.clearRect(0, 0, 256, 256);
			

			this._objFunction_Destroy = function() {
			gm.Destroy(toad);
	};

			// Draw matching game background
			var minigame = gm.CreateTile(0,0, false);
			minigame.sprite = "MiniGameBackground";

		}
	}



});