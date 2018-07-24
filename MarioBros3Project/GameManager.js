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




	this.tileBackList = new Array();
	this.tileForeList = new Array();
	this.actorList = new Array();
	// *** These are how everything shows up on the screen.
	this._RegisterSprite = function(thisTile, foreground) {
		if (foreground) { this.tileForeList.push(thisSprite); }
		else { this.tileBackList.push(thisSprite); }
	};
	this._RegisterActor = function(thisActor) {
		this.actorList.push(thisActor);
	};





	
	this.Update = function() {

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
});
