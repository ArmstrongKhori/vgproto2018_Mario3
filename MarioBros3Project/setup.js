
var GameManager = (function() {
	this.LOADING = 0;
	this.PLAYING = 1;

	this.frameRate = 30;

	this.gameState = undefined;


	this.cameraObj = undefined;
	this.AssignCamera = function(thisCam) {
		this.cameraObj = thisCam;
	};

	this.roomData = undefined;
	this.SetRoomData = function(thisData) {
		this.roomData = thisData;
	};
	this.GetRoomData = function() {
		var data = this.roomData;
		//
		return data;
	};


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



	this.FindByLogic = function(thisLogic) {
		for (var i = 0; i<this.actorList.length; i++) {
			var act = this.actorList[i];
			if (act.__logic == thisLogic) { return act; }
		}
	};
	this.FindAllByLogic = function(thisLogic) {
		var allList = new Array();
		//
		for (var i = 0; i<this.actorList.length; i++) {
			var act = this.actorList[i];
			if (act.__logic == thisLogic) { allList.push(act); }
		}
		//
		return allList;
	};

	
	this.CreateActor = function(x, y, params) {
		var actor = new Actor(x, y);
		//
		if (typeof params == "string") {
			var lgc = params;
			params = this.GetLogic(lgc);
			//
			params.__logic = lgc;
		}
		//
		if (params !== undefined) {
			for (var key in params) {
				actor[key] = params[key];
			}
		}
		//
		//
		if (actor.OnCreate) {
			actor.OnCreate();
		}
		//
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
	this.MakeBoundingBox = function(x, y, width, height, offsetx, offsety, solid) {
		var box = new BBox(x, y, width, height, offsetx, offsety, solid);
		//
		//
		return box;
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
			/*
			var persistList = new Array();
			for (var i = 0; i<this.actorList.length; i++) {

				persistList.push();
			}
			*/

			// ??? <-- This is REALLY bad. Work on "persistence" later...
			this.tileBackList = new Array();
			this.tileForeList = new Array();
			this.actorList = new Array();
			this.solidList = new Array();



			this.currentScene = sceneID;
			//
			this.gameScenes[sceneID]();
		}
	};



	// *** Gives the Actor behaviors and parameters for operating under physical properties (such as solid objects, gravity, acceleration, etc...)
	this.BecomePhysical = function(thisActor) {
		if (thisActor._type == "actor") {
			thisActor.vx = thisActor.vx || 0;
			thisActor.vy = thisActor.vy || 0;

			thisActor.ax = thisActor.ax || 0;
			thisActor.ay = thisActor.ay || 0;

			thisActor.isOnGround = false;

			
			thisActor.DoPhysics = this._objFunction_DoPhysics;
			thisActor.BumpInto = thisActor.BumpInto || undefined;
		}
	};
	this.solidList = new Array();
	this.BecomeSolid = function(thisActor) {
		if (thisActor._type == "actor") {
			thisActor.solid = thisActor.solid || true;

			this.solidList.push(thisActor);
		}
	};

	// =========================================================================================================
	// *** Here are some special utility functions to make everyone's lives easier!
	// =========================================================================================================

	this.Overlap = function(lowbounds, value, highbounds) {
		return ((lowbounds < value) && (value <= highbounds));
	};


	// =========================================================================================================
	// *** This is engine logic! Don't touch, or you might break something and it won't work!
	// =========================================================================================================





	this.gameSprites = {};
	// *** Sprites that can later be referenced by "Actors" and "Tiles" to show up on the screen.
	this.AddSprite = function(key, imgid, sx, sy, sw, sh, frameCount, offsetx, offsety) {
		this.gameSprites[key] = new Sprite(imgid, sx, sy, sw, sh, frameCount, offsetx, offsety);
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
		// *** We "queue up" the change of scene so that we do not interrupt anything important that may be happening.
		// *** This also serves as a safety measure for if it is called multiple times in one step.
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
		if (this.visible) {
			var xx,yy;
			if (gm.cameraObj) { xx = gm.cameraObj.x; yy = gm.cameraObj.y; }
			else { xx = 0; yy = 0; }
			//
			if (this.SpriteExists()) { this.sprite.Draw(gm._context, this.sprite_index, this.x-xx, this.y-yy, this.xscale, this.yscale); };
		}
	};
	// *** Allows for "special" drawing (for example, the chain link on a Roto-Disk trap). Make sure to call "DrawMe()" if you want the base sprite to appear as well!
	this._objFunction_Draw = function() {
		this.DrawMe();
	};

	this._objFunction_SpriteExists = function() {
		return (typeof this.sprite !== "undefined" && this.sprite._type === "sprite");
	};
	this._objFunction_Exists = function() {
		return gm.actorList.indexOf(this) >= 0;
	};


	this._objFunction_Left = function() {
		var v = this.x;
		if (this.bbox != undefined) { v += this.bbox.x -this.bbox.offsetx; }
		return v;
	};
	this._objFunction_Right = function() {
		var v = this.x;
		if (this.bbox != undefined) { v += this.bbox.x +this.bbox.width  -this.bbox.offsetx; }
		return v;
	};
	this._objFunction_Top = function() {
		var v = this.y;
		if (this.bbox != undefined) { v += this.bbox.y -this.bbox.offsety; }
		return v;
	};
	this._objFunction_Bottom = function() {
		var v = this.y;
		if (this.bbox != undefined) { v += this.bbox.y +this.bbox.height  -this.bbox.offsety; }
		return v;
	};
	this._objFunction_Width = function() {
		var v = 0;
		if (this.bbox != undefined) { v += this.bbox.width; }
		return v;
	};
	this._objFunction_Height = function() {
		var v = 0;
		if (this.bbox != undefined) { v += this.bbox.height; }
		return v;
	};
	this._objFunction_DoPhysics = function(readjust) {
		this.xprevious = this.x;
		this.yprevious = this.y;
		//
		//
		// *** Acceleration...
		this.vx += this.ax;
		this.vy += this.ay;
		//
		// *** Velocity...
		this.x += this.vx;
		this.y += this.vy;


		// *** We "presume" we are no longer on the ground-- Unless a collision proves otherwise.
		this.isOnGround = false;
		//
		//
		var room = gm.GetRoomData();

		for (var i = 0; i<gm.solidList.length; i++) {

			var Q = gm.solidList[i];
			//
			if (Q.solid) {
				var collisionSide = this.CollideWith(Q, readjust);
				if (this.BumpInto) {
					this.BumpInto(Q, collisionSide);
				}
			}
		}
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
		thisThing.Exists = this._objFunction_Exists;
		//
		thisThing.visible = true;
		thisThing.Left = this._objFunction_Left;
		thisThing.Right = this._objFunction_Right;
		thisThing.Top = this._objFunction_Top;
		thisThing.Bottom = this._objFunction_Bottom;
		thisThing.Width = this._objFunction_Width;
		thisThing.Height = this._objFunction_Height;
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

var Sprite = (function(imageID, sourceX, sourceY, sourceWidth, sourceHeight, numberOfFrames, offsetx, offsety) {
	this.id = imageID;
	this.sx = sourceX;
	this.sy = sourceY;
	this.sw = sourceWidth;
	this.sh = sourceHeight;
	this.frameCount = numberOfFrames;
	this.offsetx = offsetx || 0;
	this.offsety = offsety || 0;
	//
	//
	this._type = "sprite";
	//
	//
	//
	this._image = this.id;



	this.Draw = function(context, index, x, y, xscale, yscale) {
		xscale = xscale || 1;
		yscale = yscale || 1;

		context.save();
		//
		context.translate(x-this.offsetx*xscale, y-this.offsety*yscale);
		//
		context.scale(xscale,yscale);
		//
		context.drawImage(this._image, this.sx+this.sw*(Math.floor(index) % this.frameCount), this.sy, this.sw, this.sh, 0, 0, this.sw, this.sh);
		//
		context.restore();
	};
});

var Actor = (function(x, y) {
	this.x = x;
	this.y = y;
	this.xprevious = x;
	this.yprevious = y;
	this.sprite_index = 0;
	this.sprite_speed = 1;
	this.xscale = 1;
	this.yscale = 1;
	//
	//
	this.sprite = undefined;
	this.persistent = false;
	//
	//
	this._type = "actor";


	// *** This is my top-secret "perfect collision checking" logic! Now you know...
	this.CollideWith = function(r2, readjust) {
		// *** Initial state
		var collstate;
		collstate = "none";

		// *** Distances between yourself and the collision
		var distL,distR,distT,distB;
		distL = Math.max(0,(r2.Right()+1) - this.Left());
		distR = Math.max(0,(this.Right()+1) - r2.Left());
		distT = Math.max(0,(r2.Bottom()+1) - this.Top());
		distB = Math.max(0,(this.Bottom()+1) - r2.Top());

		// *** Determine where you "originally" were (for collide-correction purposes)
		var diffHori,diffVert;
		diffHori = this.x-this.xprevious;
		diffVert = this.y-this.yprevious;
		//
		// *** Determine in what ways you are "entering" the collision
		var passingL,passingR,passingT,passingB;
		passingL = gm.Overlap(this.Left(),r2.Right()+1,Math.ceil(this.Left()-diffHori));
		passingR = gm.Overlap(Math.floor(this.Right()-diffHori),r2.Left(),this.Right());
		passingT = gm.Overlap(this.Top(),r2.Bottom()+1,Math.ceil(this.Top()-diffVert));
		passingB = gm.Overlap(Math.floor(this.Bottom()-diffVert),r2.Top(),this.Bottom());
		//
		// *** Optionally "disable" certain directions of collision
		if (r2.ignore_solid) {
			if (r2.ignore_solid.left) { passingL = false; }
			if (r2.ignore_solid.right) { passingR = false; }
			if (r2.ignore_solid.top) { passingT = false; }
			if (r2.ignore_solid.bottom) { passingB = false; }
		}
		//
		// *** If overlapping the top...
		if (passingT) {
			// *** ... And you are also overlapping left/right...
			if (distL > 0 && distR > 0) {
				collstate = "top"; // *** "We are colliding the top"
				if (readjust) { this.y += Math.max(0,distT); }
			}
		}
		// *** If overlapping the bottom...
		if (passingB) {
			console.log(Math.ceil(distL), Math.ceil(distR));
			// *** ... And you are also overlapping left/right...
			if (distL > 0 && distR > 0) {
				collstate = "bottom"; // *** "We are colliding the bottom"
				if (readjust) { this.y -= Math.max(0,distB); }
			}
		}

		// *** If overlapping the left...
		if (passingL) {
			// *** ... And you are also overlapping top/bottom...
			if (distT > 0 && distB > 0) {
				collstate = "left"; // *** "We are colliding the left"
				if (readjust) { this.x += Math.max(0,distL); }
			}
		}
		// *** If overlapping the right...
		if (passingR) {
			// *** ... And you are also overlapping top/bottom...
			if (distT > 0 && distB > 0) {
				collstate = "right"; // *** "We are colliding the right"
				if (readjust) { this.x -= Math.max(0,distR); }
			}
		}


		return collstate;
	},
	this.CollideWith2 = function(r2, readjust) {
		if (typeof readjust === "undefined") {
			readjust = false;
		}
		var r1 = this;
		//
		var ignores = r2.ignore_solid || {};
		//
		//
		var collisionSide = "";

		var vX = (r1.Left()+r1.Right())/2 - (r2.Left()+r2.Right())/2;
		var vY = (r1.Top()+r1.Bottom())/2 - (r2.Top()+r2.Bottom())/2;


		var combinedHalfWidths = r1.Width()/2 + r2.Width()/2;
		var combinedHalfHeights = r1.Height()/2 + r2.Height()/2;

		if (Math.abs(vX) < combinedHalfWidths) {
			if (Math.abs(vY) < combinedHalfHeights) {
				var overlapX = combinedHalfWidths - Math.abs(vX);
				var overlapY = combinedHalfHeights - Math.abs(vY);

				if (overlapX >= overlapY) {
					if (vY > 0 && ignores.top == undefined) {
						collisionSide = "top";

						if (readjust) { r1.y = r1.y+overlapY; }
					} else if (vY < 0 && ignores.bottom == undefined) {
						collisionSide = "bottom";

						if (readjust) { r1.y = r1.y-overlapY; }
					}
				} else {
					if (vX > 0 && ignores.left == undefined) {
						collisionSide = "left";

						if (readjust) { r1.x = r1.x+overlapX; }
					} else if (vX < 0 && ignores.right == undefined) {
						collisionSide = "right";

						if (readjust) { r1.x = r1.x-overlapX; }
					}
				}
			} else {
				collisionSide = "none";
			}
		} else {
			collisionSide = "none";
		}


		return collisionSide;
	};


	gm._RegisterActor(this);
});

var Tile = (function(x, y, foreground) {
	this.x = x;
	this.y = y;
	this.offsetx = 0;
	this.offsety = 0;
	//
	//
	this.sprite_index = 0;
	this.sprite = undefined;
	//
	//
	this._type = "tile";



	gm._RegisterTile(this, foreground);
});

var BBox = (function(x, y, width, height, offsetx, offsety, colMode) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.offsetx = offsetx;
	this.offsety = offsety;
	this.colMode = colMode || 0;
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
		/*
		if (this.keyState[keyCode] === undefined || this.lastKeyState[keyCode] === undefined) {
			return false;
		}
		else { 
			*/
		return this.keyState[keyCode] && !this.lastKeyState[keyCode];
	};
	this.KeyWasReleased = function(keyCode) {
		/*
		if (this.keyState[keyCode] === undefined || this.lastKeyState[keyCode] === undefined) {
			return false;
		}
		else { 
			*/
		return this.lastKeyState[keyCode] && !this.keyState[keyCode];
	};
});




// ==============================================================================================================




var il = new ImageLoader();
var ct = new Controller();
//
var gm = new GameManager();
gm.imageLoader = il;
gm.input = ct;
