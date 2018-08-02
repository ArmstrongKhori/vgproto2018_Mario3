var SECOND = gm.frameRate;

il.AddTask("mario", "Mario.png");

gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1, 64/2, 64);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2, 64/2, 64);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2, 64/2, 64);


il.AddTask("houseScene", "HouseScene.png");

gm.AddSprite("mushroomhouse", "houseScene", 0, 0, 256, 256, 1);



gm.CreateScene("mushroomHouse", function() {

	gm.SetRoomData({
		width: 256,
		height: 256,
	});



	var mushroomHouse = gm.CreateTile(0, 0, false, {
		sprite: "mushroomhouse"
	});
	

	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	gm.BecomePhysical(actor);
	



	// Lower Floor
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 168, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, room.width, 16, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Upper Floor
	// *Fix the 104 value*
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 104, "SolidBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 80, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Upper Floor
	// *Fix the 104 value*
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(208, 104, "SolidBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 80, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Wall
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 56, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 54, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Wall
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(240, 56, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 54, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left First Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 26, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right First Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(224, 26, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Second Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 8, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Second Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(208, 8, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Third Ceiling
	// *Ceiling too low*
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 0, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 80, 24, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Third Ceiling
	// *Ceiling too low*
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(176, 0, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 80, 24, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;



	// Chest bounding boxes
	var room = gm.GetRoomData();
	var chest = gm.CreateActor(64+48*0, 136, "Chest");
	chest.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);

	var chest = gm.CreateActor(64+48*1, 136, "Chest");
	chest.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);

	var chest = gm.CreateActor(64+48*2, 136, "Chest");
	chest.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);
});



gm.AddLogic("SolidBlock", {
	sprite: " ",
	solid: true,
	// *** Our sprite is a bit big, so I'm shrinking the sprite down!
	xscale: 1/4,
	yscale: 1/4,
	bbox: undefined,
});

gm.AddLogic("Chest", {
	bbox: undefined,
	Update: function() {

		var mario = gm.FindByLogic("Mario");


		if (ct.KeyWasPressed(ct.KEY_X)) {
			if (mario.isOnGround) {
				if (mario.CollideWith(this) != "none") {
					alert("WHOAAAAAAAAAAAAAAA!");
				}
			}
		}

	}
});


gm.AddLogic("Mario", {
	vx: 0,
	vy: 0,
	ax: 0,
	ay: 0,
	jumpHold: 0,
	isOnGround: false,
	bbox: gm.MakeBoundingBox(0, 0, 16, 16, 16/2, 16),
	Jump: function() {
		this.vy = -150/SECOND;
		this.ay = 0;
		this.isOnGround = false;


		this.jumpHold = SECOND*0.4;
		// *** Mario can jump higher if he's moving faster!
		this.jumpHold += SECOND*0.2*(Math.max(0, Math.abs(this.vx*SECOND) -120)/(60));
	},
	Update: function() {
		var motionHori = ct.KeyIsDown(ct.KEY_LEFT)*-1 + 1*ct.KeyIsDown(ct.KEY_RIGHT);
		var motionVert = ct.KeyIsDown(ct.KEY_UP)*-1 + 1*ct.KeyIsDown(ct.KEY_DOWN);
		//
		//
		var doingDash = ct.KeyIsDown(ct.KEY_X);



		// *** Walk (or run)
		var speedLimit;
		if (doingDash) { speedLimit = 180; } // *** We are dashing!
		else { speedLimit = 120; } // *** Otherwise, we are walking
		//
		if (Math.abs(this.vx) > speedLimit/SECOND) { // *** If we're going too fast...
			this.ax = -Math.sign(this.vx) *Math.min(8/SECOND, Math.abs(this.vx)); // *** ... Slow down.
		}
		else if (motionHori == 0) { // *** If we stopped moving...
			this.ax = -Math.sign(this.vx) *Math.min(8/SECOND, Math.abs(this.vx)); // *** ... Slow down.
		}
		else if (motionHori == -Math.sign(this.vx)) { // *** If we are fighting our momentum...
			this.ax = -Math.sign(this.vx) *Math.min(12/SECOND, Math.abs(this.vx)); // *** ... Slow down A LOT.
			// ??? <-- Skid!
		}
		else {
			// *** Otherwise: Accelerate us!
			if (doingDash) {
				this.ax = 6/SECOND*motionHori;
			}
			else {
				this.ax = 4/SECOND*motionHori;
			}
			// this.vx = Math.sign(this.vx) *(speedLimit/gm.frameRate);
		}

		// *** JUMP!
		if (ct.KeyWasPressed(ct.KEY_Z)) {
			if (this.isOnGround) {
				this.Jump();
			}
		}

		// *** Make Mario face the right direction!
		if (motionHori != 0) {
			this.xscale = motionHori*1;
			this.yscale = 1;
		}




		// *** Gravity takes effect if you're airborne!
		if (this.isOnGround) {
			// ??? <-- Check if there's something solid below you...
		}
		else {
			if (this.jumpHold > 0) {
				if (ct.KeyIsDown(ct.KEY_Z)) {
					this.jumpHold -= 1;
				}
				else {
					this.jumpHold = 0;
				}
			}
			else
			{
				this.ay = 1500/SECOND/SECOND;
			}
		}


		//
		//
		// *** Automatically do the physics ("gm.BecomePhysical" automatically )
		this.DoPhysics(true);
		//
		//
		// *** Bound against the screen edges!
		var room = gm.GetRoomData();
		if (this.x < 0) {
			this.x = 0;
			this.vx = 0;
			this.ax = 0;
		}
		//
		if (this.x > room.width) {
			this.x = room.width;
			this.vx = 0;
			this.ax = 0;
		}
		//
		if (this.y > room.height) {
			this.y = room.height;

			this.vy = 0;
			// this.ay = 0;
			this.isOnGround = true;
			this.jumpHold = 0;
		}






		if (this.isOnGround && Math.abs(this.vx) > 1/SECOND)
		{
			if (Math.abs(this.vx) > 120/SECOND && doingDash) {
				// *** When we're moving really fast, we change to a running sprite.
				this.sprite = "smallMarioRun"; 
			}
			else {
				// *** When we're moving, we change to a walking sprite.
				this.sprite = "smallMarioWalk"; 
			}


			// *** DON'T set index! Let it animate~~
			this.sprite_speed = 12/SECOND;
		}
		else {
			// *** When we're NOT moving, we change to an idle sprite and stop animating.
			this.sprite = "smallMarioIdle";
			this.sprite_index = 0; // *** Set index to 0 so that new animations will start from the beginning.
			this.sprite_speed = 0;
		}




		// *** Remove it!
		if (ct.KeyIsDown(ct.KEY_SPACE)) { this.Destroy(); }

		// *** Go to another scene
		if (ct.KeyIsDown(ct.KEY_SHIFT)) { gm.StartScene("example2"); }



		// *** Mandatory call to the "me" function to make sure everything still works smoothly!
		this.UpdateMe();
	},
	BumpInto: function(bumpObj, side) {
		if (side === "bottom" && this.vy >= 0) {
			this.vy = 0;
			// this.ay = 0;
			this.isOnGround = true;
			this.jumpHold = 0;


			// this.vy = -this.gravity;
		} else if (side === "top" && this.vy <= 0) {
			this.vy = 0;
			this.jumpHold = 0;
		} else if (side === "right" && this.vx >= 0) {
			this.vx = 0;
			this.ax = 0;
		} else if (side === "left" && this.vx <= 0) {
			this.vx = 0;
			this.ax = 0;
		}
	}
});

gm.StartScene("mushroomHouse");

