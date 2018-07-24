
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
<<<<<<< HEAD
		this.imageLoader.AddTask("mario", "Mario.png");
		this.imageLoader.AddTask("minigameMario", "MarioMiniGameSprites.png");
		this.imageLoader.AddTask("shop", "CardMatchingGame.png");
=======
		this.GameEventLoop();
>>>>>>> master
	};

	// *** This is called the moment the engine has finished loading. Create new sprites or begin game logic-- Stuff like that goes here!
	this.InitializeGame = function() {
<<<<<<< HEAD
		this.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1);
		this.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
		this.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);
		this.AddSprite("small", "minigameMario", 0, 0, 48, 64, 1);
		this.AddSprite("shop", "shop", 0, 0, 256, 176, 1);
		//
		//
		/*
		var actor = gm.CreateActor(100, 100);
		actor.sprite = "smallMarioWalk";
		actor.sprite_speed = 12/gm.frameRate;
		*/

		


=======
		// *** This allows sprites to be created BEFORE the game has finished loading!
		for (var i in this.gameSprites) {
			if (typeof this.gameSprites[i]._image == "string") {
				this.gameSprites[i]._image = il.get(this.gameSprites[i]._image);
			}
		}
>>>>>>> master
	};


	
	this.CreateActor = function(x, y) {
		var actor = new Actor(x, y);
		//
		return actor;
	};
	this.CreateTile = function(x, y, foreground) {
		var tile = new Tile(x, y, foreground);
		//
		return tile;
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




	// =========================================================================================================
	// *** Ignore the stuff below! This is gross stuff you don't need to pay any attention to!
	// =========================================================================================================
	

	this.GameEventLoop = function() {
		setTimeout(gm.GameEventLoop, 1000/gm.frameRate);
		//
		//
		switch (gm.gameState)
		{
			case gm.LOADING:
				if (il.assetsLoaded > 0 && il.assetsLoaded === il.assetsTotal) {
					gm.SetGameState(gm.PLAYING);
				};
			break;
			case gm.PLAYING:
				gm.Update();
				//
				gm.Draw();
			break;
		}
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
	this.tileBackList = new Array();
	this.tileForeList = new Array();
	this.actorList = new Array();
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




// ==============================================================================================================




var il = new ImageLoader();
//
var gm = new GameManager();
gm.imageLoader = il;
