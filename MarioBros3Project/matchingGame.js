$(document).ready(function() {
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");

	var audio = new Audio('SpadePuzzle.mp3');
	audio.play();



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

	//0 = mushroom
	//1 = star

	var map = [ [0,2,0,0,0,0],
				[1,0,0,0,0,0],
				[0,2,0,0,1,0]];

	var r = 0;
	var c = 0;

	//When player pressed A use this code
	var player = map[r][c];

	var first = player;
	var second = player;


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

		var actor = gm.CreateActor(0, 0);
		actor.Update = function() {
			if(ct.KeyIsDown(ct.KEY_X)) {gm.StartScene("matchingGame"); }
		}

	});

	// Creat matching game scene
	gm.CreateScene("matchingGame", function() {

		var matchingGameBackground = gm.CreateTile(0, 0, false);
		matchingGameBackground.sprite = "MiniGameBackground"

		var cursor = gm.CreateActor(25, 32, "Cursor");
	});


	gm.StartScene("shop");

	//while(gm.StartScene("shop") === true){


	//};

	// Cursor moving logic
	gm.AddLogic("Cursor", {
		cx: 0,
		cy: 0,
		sprite: "cursor",
		Update: function() {
			if(ct.KeyWasPressed(ct.KEY_LEFT)) {
				this.cx -= 1;
				c--;
			}
			if(ct.KeyWasPressed(ct.KEY_RIGHT)) {
				this.cx += 1;

			}
			if(ct.KeyWasPressed(ct.KEY_DOWN)) {
				this.cy += 1;
			}
			if(ct.KeyWasPressed(ct.KEY_UP)) {
				this.cy -= 1;
			}

			if(this.cx > 5){
				this.cx = 0;
				c = 0;
			}
			if(this.cx < 0){
				this.cx = 6-1;
				c = 5;
			}
			if(this.cy > 2){
				this.cy = 0;
				r = 0;
			}
			if(this.cy < 0){
				this.cy = 3-1;
				r = 2;
			}
			

			//this.cx = (this.cx % 6 +6) % 6;
			//this.cy = (this.cy % 3 +3) % 3;
			//
			this.x = 25+this.cx*32;
			this.y = 32+this.cy*48;
		}
	});

	

	switch(player){
		case 0: 

		break;

		case 1:

		break;

	}


});