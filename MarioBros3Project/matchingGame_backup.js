$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");

	var audio = new Audio("SpadePuzzle.mp3");

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

	var pressUp = false;
	var pressDown = false;
	var pressLeft = false;
	var pressRight = false;
	var pressA = false;
	var pressB = false;
	var pressStart = false;
	var pressSelect = false;

	window.addEventListener("key", function(event) {
		switch(event.keyCode) {
			case A:
				pressA = true; 
				swapScene();
				break;
		}
		switch(event.keyCode) {
			case UP:
				pressUp = true; 
				break;
		}
		switch(event.keyCode) {
			case DOWN:
				pressDown = true; 
				break;
		}
		switch(event.keyCode) {
			case LEFT:
				pressLeft = true;
				break;
		}
		switch(event.keyCode) {
			case RIGHT:
				pressRight = true; 
				break;
		}
	}, false);

	window.addEventListener("keyup", function(event) {
		switch(event.keyCode) {
			case A:
				pressA = false;
				swapScene();
				break;
		}
		switch(event.keyCode) {
			case UP:
				pressUp = false; 
				break;
		}
		switch(event.keyCode) {
			case DOWN:
				pressDown = false; 
				break;
		}
		switch(event.keyCode) {
			case LEFT:
				pressLeft = false; 
				break;
		}
		switch(event.keyCode) {
			case RIGHT:
				pressRight = false; 
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
	il.AddTask("playerCursor", "playercursor.png");

	// Creating Shop Sprites
	gm.AddSprite("shopscene", "shopbackground", 0, 0, 256, 256, 1);
	gm.AddSprite("table", "table", 0, 0, 96, 32, 1);
	gm.AddSprite("smallMinigameM", "smallMinigameMario", 0, 0, 48, 64, 1);
	gm.AddSprite("largeMinigameM", "largeMinigameMario", 0, 0, 96, 128, 1);
	gm.AddSprite("tanukiMinigameM", "tanukiMinigameMario", 0, 0, 144, 192, 1);
	gm.AddSprite("toad", "toad", 0, 0, 32, 48, 1);


	// Creating Minigame Sprites
	gm.AddSprite("MiniGameBackground", "matchingGameBackground", 0, 0, 256, 256, 1);
	gm.AddSprite("cursor", "playerCursor", 0, 0, 32, 48, 1);


	gm.AddLogic("Cursor", {
		Update: function() {

		}

	});


	// Creating shop scene
	gm.CreateScene("shop", function() {	

		var shopBackground = gm.CreateTile(0, 0, false);
		shopBackground.sprite = "shopscene";

		var table = gm.CreateTile(80, 104, true);
		table.sprite = "table"
		
		var toad = gm.CreateTile(192, 88, true);
		toad.sprite = "toad";

		var small = gm.CreateTile(16, 72, true);
		small.sprite = "smallMinigameM";

	});

	// Creat matching game scene
	gm.CreateScene("matchingGame", function() {

		var matchingGameBackground = gm.CreateTile(0, 0, false);
		matchingGameBackground.sprite = "MiniGameBackground"
	});


	gm.StartScene("shop");

	// Create new screen on key press
	function swapScene(){


		if(pressA = true){
			// Clear shop scene and start minigame scene
			gm.StartScene("matchingGame");

				
		};
		var cursor = gm.CreateActor(25, 31);
			cursor.sprite = "cursor";
	};
	//
	//




});