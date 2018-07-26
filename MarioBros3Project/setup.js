
var GameManager = (function() {
	this.LOADING = 0;
	this.PLAYING = 1;

	this.frameRate = 30;

	this.gameState = undefined;


	this.SetGameState = function(state) {
		// State has ended.
		switch (this.gameState)
		{
			case this.LOADING:
				console.log("Loading has ended.");
				//
				this.InitializeGame();
			break;
			case this.PLAYING:
			break;
		}
		//
		this.gameState = state;
		//
		// State has begun.
		switch (this.gameState)
		{
			case this.LOADING:
				console.log("Now loading...");
			break;
			case this.PLAYING:
				console.log("Gameplay has begun.");

				console.log(gm.actorList);
				console.log(gm.tileBackList);
			break;
		}
	};



	
	// *** This is called the moment the engine boots up. We assign all the "tasks" that need to be performed during loading (IE: get all our images and stuff).
	this.SetUpGame = function() {
		this.SetGameState(this.LOADING);
		//
		this.GameEventLoop();
	};

	// *** This is called the moment the engine has finished loading. Create new sprites or begin game logic-- Stuff like that goes here!
	this.InitializeGame = function() {
		// *** This allows sprites to be created BEFORE the game has finished loading!
		for (var i in this.gameSprites) {
			if (typeof this.gameSprites[i]._image == "string") {
				this.gameSprites[i]._image = il.get(this.gameSprites[i]._image);
			}
		}

		ct.Initialize();
	};


	
	this.CreateActor = function(x, y, params) {
		var actor = new Actor(x, y);
		//
		if (typeof params == "string") {
			params = this.GetLogic(params);
		}
		//
		if (params !== undefined) {
			for (var key in params) {
				actor[key] = params[key];
			}
		}
		//
		return actor;
	};
	this.CreateTile = function(x, y, foreground, params) {
		var tile = new Tile(x, y, foreground);
		//
		if (params !== undefined) {
			for (var key in params) {
				tile[key] = params[key];
			}
		}
		//
		return tile;
	};



	this.currentScene = undefined;
	//
	this.gameScenes = {};
	this.CreateScene = function(sceneID, startUpFunction) {
		if (startUpFunction === undefined) { startUpFunction = function(){}; }
		//
		this.gameScenes[sceneID] = startUpFunction;
	};
	

	this.StartScene = function(sceneID) {
		this._queuedScene = sceneID;
	};
	this._queuedScene = undefined;
	this._StartScene = function(sceneID) {
		if (this.gameScenes[sceneID] !== undefined) {
			// ??? <-- This is REALLY bad. Work on "persistence" later...
			this.tileBackList = new Array();
			this.tileForeList = new Array();
			this.actorList = new Array();



			this.currentScene = sceneID;
			//
			this.gameScenes[sceneID]();
		}
	};






	// =========================================================================================================
	// *** This is engine logic! Don't touch, or you might break something and it won't work!
	// =========================================================================================================





	this.gameSprites = {};
	// *** Sprites that can later be referenced by "Actors" and "Tiles" to show up on the screen.
	this.AddSprite = function(key, imgid, sx, sy, sw, sh, frameCount) {
		this.gameSprites[key] = new Sprite(imgid, sx, sy, sw, sh, frameCount);
	};
	this.GetSprite = function(key) {
		return this.gameSprites[key];
	};


	this.gameLogics = {};
	this.AddLogic = function(key, thisLogic) {
		this.gameLogics[key] = thisLogic;
	};
	this.GetLogic = function(key) {
		return this.gameLogics[key];
	};




	





	
	this.Update = function() {
		for (var i = 0; i<this.actorList.length; i++) {
			this.actorList[i].Update();
		}
	};
	this.Draw = function() {
		this._context.clearRect(0, 0, 256, 256); // ??? <-- Magic numbers...


		for (var i = 0; i<this.tileBackList.length; i++) {
			this.tileBackList[i].Draw(this._context);
		}
		//
		for (var i = 0; i<this.actorList.length; i++) {
			this.actorList[i].Draw(this._context);
		}
		//
		for (var i = 0; i<this.tileForeList.length; i++) {
			this.tileForeList[i].Draw(this._context);
		}
	};


	this.Destroy = function(thisThing) {
		if (thisThing._type == "actor") {
			var index = this.actorList.indexOf(thisThing);
			if (index >= 0) { this.actorList.splice(index, 1); }
		}
		else if (thisThing._type == "tile") {
			var index = this.tileBackList.indexOf(thisThing);
			if (index >= 0) { this.tileBackList.splice(index, 1); }
			else {

				index = this.tileForeList.indexOf(thisThing);
				if (index >= 0) { this.tileForeList.splice(index, 1); }

			}
		}
	};




	// =========================================================================================================
	// *** Ignore the stuff below! This is gross stuff you don't need to pay any attention to!
	// =========================================================================================================
	

	this.GameEventLoop = function() {
		switch (gm.gameState)
		{
			case gm.LOADING:
				if (il.assetsLoaded > 0 && il.assetsLoaded === il.assetsTotal) {
					gm.SetGameState(gm.PLAYING);
				};
			break;
			case gm.PLAYING:
				if (gm.currentScene === undefined) {
					console.log("ERROR: No scene is active! Terminating loop...");
					return;
				}

				// *** Update controller input first! Actors may need it!
				ct.Update();
				//
				//
				gm.Update();
				//
				gm.Draw();
			break;
		}
		//
		//
		if (gm._queuedScene !== undefined) {
			gm._StartScene(gm._queuedScene);
			//
			gm._queuedScene = undefined;
		}
		//
		//
		setTimeout(gm.GameEventLoop, 1000/gm.frameRate);
	};


	
	// *** These are "universal" functions I intend for EVERY object in the game to use.
	// *** Removes the object entirely.
	this._objFunction_Destroy = function() {
		gm.Destroy(this);
	};
	// *** Some empty updating code (for the sake of keeping the program sane).
	this._objFunction_UpdateMe = function() {
		this.sprite_index += this.sprite_speed;
		//
		if (this.SpriteExists()) {
			this.sprite_index = (this.sprite_index % this.sprite.frameCount) + this.sprite.frameCount - this.sprite.frameCount;
		}
	};
	// *** Allows for "special" updating logic (pretty much EVERY actor in the game will use this). Call "UpdateMe()" at some point for the sake of code cleaniness.
	this._objFunction_Update = function() {
		this.UpdateMe();
	};
	// *** Displays the object on screen in the most simple way
	this._objFunction_DrawMe = function() {
		// *** Find the sprite associated with this name and use it.
		if (typeof this.sprite == "string") {
			this.sprite = gm.GetSprite(this.sprite);
		}
		//
		if (this.SpriteExists()) { this.sprite.Draw(gm._context, this.sprite_index, this.x, this.y); };
	};
	// *** Allows for "special" drawing (for example, the chain link on a Roto-Disk trap). Make sure to call "DrawMe()" if you want the base sprite to appear as well!
	this._objFunction_Draw = function() {
		this.DrawMe();
	};

	this._objFunction_SpriteExists = function() {
		return (typeof this.sprite !== "undefined" && this.sprite._type === "sprite");
	};
	//
	//
	// *** These are how everything shows up on the screen and "interacts" with the engine. You never need to call these yourself.
	this.tileBackList = undefined;
	this.tileForeList = undefined;
	this.actorList = undefined;
	this._Register = function(thisThing) {
		thisThing.DrawMe = this._objFunction_DrawMe;
		thisThing.Draw = this._objFunction_Draw;
		thisThing.Destroy = this._objFunction_Destroy;
		thisThing.UpdateMe = this._objFunction_UpdateMe;
		thisThing.Update = this._objFunction_Update;
		thisThing.SpriteExists = this._objFunction_SpriteExists;
	}
	this._RegisterTile = function(thisTile, foreground) {
		if (foreground) { this.tileForeList.push(thisTile); }
		else { this.tileBackList.push(thisTile); }
		//
		this._Register(thisTile);
	};
	this._RegisterActor = function(thisActor) {
		this.actorList.push(thisActor);
		//
		this._Register(thisActor);
	};
});

var ImageLoader = (function() {
	
	this.assetsToLoad = new Array();
	this.assetsLoaded = 0;
	this.assetsTotal = 0;

	this.images = new Array();



	this.AddTask = function(thisKey, thisFile) {
		var image = new Image();
		image.src = thisFile;
		//
		image.addEventListener("load", this.LoadHandler, false);
		//
		this.assetsToLoad.push(image);
		this.images[thisKey] = image;
		//
		//
		this.assetsTotal++;
	};

	this.LoadHandler = function(event) {
		// ??? <-- I wish I could reference "this" instead...
		il.assetsLoaded++;
	};


	this.get = function(thisKey) {
		return this.images[thisKey];
	}
});

var Sprite = (function(imageID, sourceX, sourceY, sourceWidth, sourceHeight, numberOfFrames) {
	this.id = imageID;
	this.sx = sourceX;
	this.sy = sourceY;
	this.sw = sourceWidth;
	this.sh = sourceHeight;
	this.frameCount = numberOfFrames;
	//
	//
	this._type = "sprite";
	//
	//
	//
	this._image = this.id;



	this.Draw = function(context, index, x, y) {
		context.drawImage(this._image, this.sx+this.sw*(Math.floor(index) % this.frameCount), this.sy, this.sw, this.sh, x, y, this.sw, this.sh);
	};
});

var Actor = (function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite_index = 0;
	this.sprite_speed = 1;
	//
	//
	this.sprite = undefined;
	//
	//
	this._type = "actor";


	gm._RegisterActor(this);
});

var Tile = (function(x, y, foreground) {
	this.x = x;
	this.y = y;
	//
	//
	this.sprite_index = 0;
	this.sprite = undefined;
	//
	//
	this._type = "tile";



	gm._RegisterTile(this, foreground);
});



var Controller = (function() {
	
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_RIGHT = 39;
	this.KEY_DOWN = 40;
	this.KEY_Z = 90;
	this.KEY_X = 88;
	this.KEY_SHIFT = 16;
	this.KEY_ENTER = 13;
	this.KEY_SPACE = 32;
	this.allKeys = undefined;
	//
	/*
	this.MO_A = 0;
	this.MO_B = 1;
	this.MO_SELECT = 2;
	this.MO_START = 3;
	this.MO_HORI = 4;
	this.MO_VERT = 5;
	*/


	this.keyStrokes = {};

	this.keyState = {};
	this.lastKeyState = {};



	this.Initialize = function() {
		this.allKeys = new Array();
		this.allKeys.push(this.KEY_LEFT);
		this.allKeys.push(this.KEY_UP);
		this.allKeys.push(this.KEY_RIGHT);
		this.allKeys.push(this.KEY_DOWN);
		this.allKeys.push(this.KEY_Z);
		this.allKeys.push(this.KEY_X);
		this.allKeys.push(this.KEY_SHIFT);
		this.allKeys.push(this.KEY_ENTER);
		this.allKeys.push(this.KEY_SPACE);



		window.addEventListener("keydown", function(event) {
			switch (event.keyCode) {
				case ct.KEY_LEFT:
				case ct.KEY_UP:
				case ct.KEY_RIGHT:
				case ct.KEY_DOWN:
				case ct.KEY_Z:
				case ct.KEY_X:
				case ct.KEY_SHIFT:
				case ct.KEY_ENTER:
				case ct.KEY_SPACE:
					ct.keyStrokes[event.keyCode] = true;
					break;
			}
		}, false);
		window.addEventListener("keyup", function(event) {
			switch (event.keyCode) {
				case ct.KEY_LEFT:
				case ct.KEY_UP:
				case ct.KEY_RIGHT:
				case ct.KEY_DOWN:
				case ct.KEY_Z:
				case ct.KEY_X:
				case ct.KEY_SHIFT:
				case ct.KEY_ENTER:
				case ct.KEY_SPACE:
					ct.keyStrokes[event.keyCode] = false;
					break;
			}
		}, false);
	};


	this.Update = function() {
		for (var key in this.allKeys) {
			var value = this.allKeys[key];
			this.lastKeyState[value] = this.keyState[value];
			//
			this.keyState[value] = this.keyStrokes[value];
		}
	};



	this.KeyIsDown = function(keyCode) {
		if (this.keyState[keyCode] === undefined) {
			return false;
		}
		else { return this.keyState[keyCode]; }
	};
	this.KeyWasPressed = function(keyCode) {
		if (this.keyState[keyCode] === undefined || this.lastKeyState[keyCode] === undefined) {
			return false;
		}
		else { return this.keyState[keyCode] && !this.lastKeyState[keyCode]; }
	};
	this.KeyWasReleased = function(keyCode) {
		if (this.keyState[keyCode] === undefined || this.lastKeyState[keyCode] === undefined) {
			return false;
		}
		else { return this.lastKeyState[keyCode] && !this.keyState[keyCode]; }
	};
});




// ==============================================================================================================




var il = new ImageLoader();
var ct = new Controller();
//
var gm = new GameManager();
gm.imageLoader = il;
gm.input = ct;
