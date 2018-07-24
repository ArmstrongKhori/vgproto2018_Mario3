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
			break;
		}
	};



	
	this.SetUpGame = function() {
		this.SetGameState(this.LOADING);
		//
		this.imageLoader.AddTask("mario", "Mario.png");
	};

	this.InitializeGame = function() {
		this.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1);
		this.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
		this.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);
	};


	this.gameSprites = {};
	// *** Sprites that can later be referenced by "Actors" and "Tiles" to show up on the screen.
	this.AddSprite = function(key, imgid, sx, sy, sw, sh, frameCount) {
		this.gameSprites[key] = new Sprite(imgid, sx, sy, sw, sh, frameCount);
	};




	





	
	this.Update = function() {
		for (var i = 0; i<this.actorList.length; i++) {
			this.actorList[i].Update();
		}
	};
	this.Draw = function() {
		for (var i = 0; i<this.tileBackList.length; i++) {
			this.tileBackList[i].Draw(gm._context);
		}
		//
		for (var i = 0; i<this.actorList.length; i++) {
			this.actorList[i].Draw(gm._context);
		}
		//
		for (var i = 0; i<this.tileForeList.length; i++) {
			this.tileForeList[i].Draw(gm._context);
		}
	};




	this.GameEventLoop = function() {
		setTimeout(this.GameEventLoop, 1000/this.frameRate);
		

		this.Update();
		//
		this.Draw();
	};




	




	
	// *** These are "universal" functions I intend for EVERY object in the game to use.
	// *** Removes the object entirely.
	this._objFunction_Destroy = function() {
		gm.Destroy(this);
	};
	// *** Some empty updating code (for the sake of keeping the program sane).
	this._objFunction_UpdateMe = function() {
		// ... Nothing, at the moment.
	};
	// *** Allows for "special" updating logic (pretty much EVERY actor in the game will use this). Call "UpdateMe()" at some point for the sake of code cleaniness.
	this._objFunction_Update = function() {
		this.UpdateMe();
	};
	// *** Displays the object on screen in the most simple way
	this._objFunction_DrawMe = function() {
		if (this.sprite !== undefined) { this.sprite.Draw(gm._context, this.x, this.y); };
	};
	// *** Allows for "special" drawing (for example, the chain link on a Roto-Disk trap). Make sure to call "DrawMe()" if you want the base sprite to appear as well!
	this._objFunction_Draw = function() {
		this.DrawMe();
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
