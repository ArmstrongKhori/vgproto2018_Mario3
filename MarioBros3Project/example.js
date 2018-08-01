

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
ct ~ "Controller" object. Use it for reading keyboard inputs.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.
il.AddTask("mario", "Mario.png");
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1, 64/2, 64);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2, 64/2, 64);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2, 64/2, 64);
// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames, x offset, y offset
// *** Important note: For now, it only works for spritesheets that go "horizontally" and have no gaps... It can't do "up and down" yet.



// *** Same as above-- Different image.
il.AddTask("backdrop", "level.png");
//
// *** Create a usable sprite out of it. Crop out an interesting bit (rather than the sky)-- Only 1 frame, of course.
gm.AddSprite("level1background", "backdrop", 0, 432-256, 512, 256, 1);
gm.AddSprite("level2background", "backdrop", 300, 432-256, 256, 256, 1);



il.AddTask("MARIO", "mario image hub1.png");
gm.AddSprite("spritehud", "MARIO",0,0,256,28,1);


il.AddTask("PINK","mario image hub2 - Copy.png")
gm.AddSprite("pinkhud", "PINK",0,0,256,28,1);



gm.AddLogic("Camera", {
	target: undefined,
	Update: function() {
		// *** If the camera doesn't have a target...
		if (!this.target) {
			// *** ... Find a "Mario" object and use that!
			this.target = gm.FindByLogic("Mario");
		}
		//
		// *** If you have a target...
		if (this.target) {
			// *** ... Follow the target, but from half a screen away!
			this.x = this.target.x - 256/2;
			this.y = 0;
		}
		//
		// *** Clamp the X and Y so that they don't go past the room's boundaries.
		var room = gm.GetRoomData();
		this.x = Math.max(0, Math.min(this.x, room.width-256));
		this.y = Math.max(0, Math.min(this.y, room.height-256));
		//
		// *** Finally, tell the game manager that THIS object is the camera!
		gm.AssignCamera(this);
	}
})

gm.AddLogic("Mario", {
	vx: 0,
	vy: 0,
	ax: 0,
	ay: 0,
	isOnGround: false,
	bbox: gm.MakeBoundingBox(0, 0, 16, 16, 16/2, 16, false),
	Update: function() {
		var motionHori = ct.KeyIsDown(ct.KEY_LEFT)*-1 + 1*ct.KeyIsDown(ct.KEY_RIGHT);
		var motionVert = ct.KeyIsDown(ct.KEY_UP)*-1 + 1*ct.KeyIsDown(ct.KEY_DOWN);
		//
		//
		if (motionHori == 0 && motionVert == 0) {
			// *** We're using Mario's "idle" sprite-- You know, the one we created earlier!
			// *** When we're NOT moving, we change to an idle sprite and stop animating.
			this.sprite = "smallMarioIdle";
			this.sprite_index = 0; // *** Set index to 0 so that new animations will start from the beginning.
			this.sprite_speed = 0;
		}
		else {
			// *** We're using Mario's "walking" sprite-- You know, the one we created earlier!
			// *** When we're moving, we change to a walking sprite and start animating.
			this.sprite = "smallMarioWalk"; 
			// *** DON'T set index! Let it animate~~
			this.sprite_speed = 12/gm.frameRate;
		}
		//
		//
		// *** Gravity takes effect if you're airborne!
		if (!this.isOnGround) {
			this.ay = 800/gm.frameRate/gm.frameRate;
		}
		//
		// *** Walk (or run)
		if (ct.KeyIsDown(ct.KEY_X)) {
			this.x += 6*motionHori;
		}
		else {
			this.x += 4*motionHori;
		}

		// *** JUMP!
		if (ct.KeyWasPressed(ct.KEY_Z)) {
			if (this.isOnGround) {
				this.vy = -200/gm.frameRate;
				this.isOnGround = false;
			}
		}

		// *** Make Mario face the right direction!
		if (motionHori != 0) {
			this.xscale = motionHori*1;
			this.yscale = 1;
		}




		// *** Acceleration...
		this.vx += this.ax;
		this.vy += this.ay;
		//
		// *** Velocity...
		this.x += this.vx;
		this.y += this.vy;




		// *** Bound against the bottom of the screen (for now).
		var room = gm.GetRoomData();
		if (this.Bottom() > room.height) {
			this.y -= (this.Bottom() - room.height);
			this.vy = 0;
			this.isOnGround = true;

			this.ay = 0;
		}




		// *** Remove it!
		if (ct.KeyIsDown(ct.KEY_SPACE)) { this.Destroy(); }

		// *** Go to another scene
		if (ct.KeyIsDown(ct.KEY_SHIFT)) { gm.StartScene("example2"); }



		// *** Mandatory call to the "me" function to make sure everything still works smoothly!
		this.UpdateMe();
	}
});


//================================================================================================
gm.AddLogic("HUD2",{
	sprite:"pinkhud",
	frameCount: 0,
	visible: true,

	PadText: function(num, size){
		var m = num+"";
		while (s.length < size) m = "0" + m;
		return m;
	},
	update: function(){
		var marioWorld = 1;
		var marioLives = 0;

	},

	AddAllTheLives: function(HIGHonMARIOlives){
		this.lives += HIGHonMARIOlives;
	},
	AddAllTheWorlds: function(whatevmariodid){
		this.world += whatevmariodid;
	},

	Draw: function() {
		var camera = gm.FindByLogic("Camera");
		this.x = camera.x;
		this.y = camera.y +256-28;



		this.DrawMe();


		var hud = gm.FindByLogic("HUD");

		var text = "WORLD:"+hud.world;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 5, this.y+14);

		var text = "[M] X: "+hud.lives;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 0, this.y+24);



	},

});
//================================================================================================


gm.AddLogic("HUD", {
	sprite: "spritehud",
	frameCount: 0,


	PadText: function(num, size) {
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	},
	Update: function() {
		var marioScore = 1000;
		var marioLives = 0;
		var marioCoins = 0;
		var marioWorld = 8;

		var addLives = ct.KeyWasPressed(ct.KEY_U);

		// ========================================================================================
 	if (ct.KeyWasPressed(ct.KEY_U)) {
 		this.AddAllTheLives = this.AddAllTheLives + 100;
 	}


		
		if(this.timer>0){
			this.frameCount += 1;
			if (this.frameCount >= 30) {
				this.timer -= 1;
				this.frameCount = 0;
			}
		}
/*
		this.AddALLTHESCORES(1000);
		
		this.AddAllTheLives(0)
		*/
		this.AddAllTheCoins(0);
	},
		
	


	score: 0,
	lives: 4,
	coins: 0,
	world: 1,
	timer: 300,

	/*PowerInMarioPants: function(powerMARIO){
		this.pictures = powerMARIO;
	}*/

	AddAllTheWorlds: function(whatevmariodid){
		this.world += whatevmariodid;
	},

	AddALLTHESCORES: function(theSCoreValueWereLookingFor){
		this.score += theSCoreValueWereLookingFor;
	},
	AddAllTheCoins: function(shinyThingInMarioPants){
		this.coins += shinyThingInMarioPants;
		//
		if(this.coins >= 100){
			this.coins -= 100;
			this.lives += 1;                     
		}
	},
	AddAllTheLives: function(HIGHonMARIOlives){
		this.lives += HIGHonMARIOlives;
		
	},

	Draw: function() {
		var camera = gm.FindByLogic("Camera");
		this.x = camera.x;
		this.y = camera.y +256-28;



		this.DrawMe();
		//
		//
		var text = "O: "+this.timer;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 120, this.y+24);

		var text = this.PadText(this.score,7)+"  ";
		gm._context.font = "8px lol";
		gm._context.fillText(text, 60, this.y+24);

		var text = "WORLD:"+this.world;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 5, this.y+14);

		var text = "$ "+this.coins;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 120, this.y+14);

		var text = "[M] X: "+ this.lives;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 0, this.y+24);

		
	}
});

//================================================================================================================


//================================================================================================================


gm.CreateScene("example1", function() {
	
	gm.SetRoomData({
		width: 512,
		height: 256,
	});


	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	var actor = gm.CreateActor(0, 0, "Camera");

	var hud = gm.CreateActor(0, 256-28, "HUD");
	var hud2 = gm.CreateActor(0,256-28, "HUD2");
	


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false, {
		sprite: "level1background" // *** Use that background sprite we made!
	});
});



gm.CreateScene("example2", function() {
	
	gm.SetRoomData({
		width: 256,
		height: 256,
	});

	var actor = gm.CreateActor(10, 10, "Mario");
	var actor = gm.CreateActor(0, 0, "Camera");
	var hud = gm.CreateActor(0, 256-28, "HUD");


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false);
	background.sprite = "level2background"; // *** Use that background sprite we made!
});
//
//
gm.StartScene("example1");
