

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
ct ~ "Controller" object. Use it for reading keyboard inputs.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.
il.AddTask("mario", "Mario.png");
il.AddTask("goomba", "goomba.png");
il.AddTask("koopatroopa", "koopa-right.png");
il.AddTask("koopatroopaWings", "KoopawithWings(good2)right.png");
il.AddTask("goombaWings", "good-goomba-wings.png");
il.AddTask("piranhaPlain", "piranha2.png");
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1, 64/2, 64);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2, 64/2, 64);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2, 64/2, 64);

//goomba
gm.AddSprite("darkGoombawalking", "goomba", 16*0, 0, 16, 16, 2, 16/2, 16);
//gm.AddSprite("darkGoombaDead", "goomba", 19*2, 0, 19, 19, 1, 19/2, 19);
//koopatroopa
gm.AddSprite("koopatroopaWalking", "koopatroopa", 20*0, 0, 20, 27, 2, 20/2, 27);
//gm.AddSprite("koopatroopaShell", "koopatroopa", 24*2, 0, 24, 24, 4, 19/2, 23);
//koopatroopaWings
gm.AddSprite("koopatroopaWalkingWings", "koopatroopaWings", 20*0, 0, 20, 27, 3, 20/2, 27);

//gm.AddSprite("piranhaFiring","piranhaFire", 16*0, 0, 16, 32, 4, 16/2, 32);
//goombaWings
gm.AddSprite("goombaWalkingWings", "goombaWings", 24*0, 0, 24, 24, 4, 24/2, 24);
//piranha
gm.AddSprite("plainPiranha", "piranhaPlain", 16*0, 0, 16, 32, 2, 16/2, 32);
// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames

// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames, x offset, y offset

// *** Important note: For now, it only works for spritesheets that go "horizontally" and have no gaps... It can't do "up and down" yet.



// *** Same as above-- Different image.
il.AddTask("backdrop", "level.png");
//
// *** Create a usable sprite out of it. Crop out an interesting bit (rather than the sky)-- Only 1 frame, of course.

gm.AddSprite("level1background", "backdrop", 0, 432-256, 256, 256, 1);
gm.AddSprite("level2background", "backdrop", 300, 432-256, 256, 256, 1);


il.AddTask("box", "box.png");
//
gm.AddSprite("solidBoxFull", "box", 0, 0, 64, 64, 1);


		/*if (this.Bottom() > 256) {
			this.y -= (this.Bottom() - 256);
			this.vy = 0;
			this.isOnGround = true;*/

			var SECOND = gm.frameRate;

			/*this.ay = 0;
		}*/


gm.AddLogic("SolidBlock", {
	sprite: "solidBoxFull",
	solid: true,
	// *** Our sprite is a bit big, so I'm shrinking the sprite down!
	xscale: 1/4,
	yscale: 1/4,
	bbox: undefined,
});

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

		if (ct.KeyIsDown(ct.KEY_SHIFT)) { gm.StartScene("example2"); }

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


gm.AddLogic("GreenKoopa", {
	
	sprite: "koopatroopaWalking",
	sprite_speed: 5/gm.frameRate,
	maxHeight: 200,
	maxWidth: 100,
	gravity: 20,
	force: -10,
	vx: 1,
	ax: 0,
	fliptime: 0,
	currentPos: 0,
	
	Update: function(){
		this.UpdateMe();
		
		/*this.fliptime += 1;
		if (this.fliptime >= 30) {
			this.xscale *= -1;
			
			this.fliptime = 0;
		}*/
		
		
		
		// this.xscale = -1;
		//this.x = this.x + 1;
		//var movCount = this.x;
		
		
		//console.log(movCount);
		
		//console.log(movCount);
		//console.log(this.x);
		
		/*this.sprite_index += 5/gm.frameRate;
		if (this.sprite_index >= 3) {
			this.y -= 10;
			
			this.sprite_index -= 3;
		}*/
		
		
		//this.ay = 0.09;
		
		//this.DoPhysics(true);
		//this.xscale = -1;
		
		this.y += this.gravity;
		
		
		
		if(this.y >= this.maxHeight){
			this.x += this.vx;
			this.y = 240;
		}
		//this.x += 1;
		//console.log(this.x);
		if(this.x == this.maxWidth){
			//this.xscale = -1;
			if(this.vx > 0 && this.xscale == 1){
				this.xscale *= -1;
			}
			
			this.vx *= -1;
			this.x += this.vx;
			
			//this.x = 250;
			//console.log(this.xscale);
			//console.log(this.x);
			//this.x += -1;
		}
		
		
		/*do{
			this.x += 1;
			if(this.y >= this.maxHeight){
				this.y = 240;
			}
		}while(this.x != 200);
		
		if(this.x >= 200){
			this.x += 1;
			this.y -= 1;
		}
		
		
		//if(this.y >= 240){this.x = 240}
		
		/*if(this.x > this.maxWidth){
			
			this.y -= 1;
		}*/
		
		
	},
	/*BumpInto: function(bumpObj, side) {
		if (side != "none") {
			console.log("WHOA!");
			
		}
	},*/
	
	
});

gm.AddLogic("GreenKoopaWings", {
	
	sprite: "koopatroopaWalkingWings",
	sprite_speed: 5/gm.frameRate,
	bbox: gm.MakeBoundingBox(0, 0, 16, 32, 16/2, 32, false),
	maxHeight: 200,
	maxWidth: 150,
	gravity: 5,
	force: -10,
	vx: 1,
	vy: 0,
	ax: 0,
	ay: 0,
	onGround: true,
	Jump: function() {
		this.vy = -100/SECOND;
		this.ay = 0;
		//this.isOnGround = false;
	},
	
	Update: function(){
		if(this.onGround){
			this.Jump();
			console.log("anything");
			this.onGround = false;
		}else{
			this.ay = 150/SECOND/SECOND;
			console.log("else");
		}
		
		this.x += 1;
		//this.ay = 10/SECOND/SECOND;
		//console.log(this.isOnGround);
		/*
		this.vy += this.force;
		
		this.vy = this.gravity;
		this.y += this.vy;
		
		
		if(this.vy > 10){
			 this.vy = 10;
		 }*/
		
		
		/*if(this.y >= this.maxHeight){
			this.x += this.vx;
			this.y = 240;
		}*
		//console.log(this.x);
		/*if(this.x == this.maxWidth){
			this.vy += this.force;
			this.vy *= 1;
			this.y -= this.vy;
		}*/ 
		
		
		/*if(this.x == this.maxWidth){
			//this.xscale = -1;
			if(this.vx > 0 && this.xscale == 1){
				this.xscale *= -1;
			}
			
			this.vx *= -1;
			this.x += this.vx;
		}*/
		
		
		this.DoPhysics(true);
		this.UpdateMe();

	},
	
	BumpInto: function(bumpObj, side){
		if(side == "bottom"){
			this.Jump();
		}
	}

});

gm.AddLogic("GoombaWings", {
	
	sprite: "goombaWalkingWings",
	sprite_speed: 5/gm.frameRate,
	bbox: gm.MakeBoundingBox(0, 0, 16, 32, 16/2, 32, false),
	maxHeight: 200,
	maxWidth: 150,
	gravity: 5,
	force: -10,
	vx: 1,
	vy: 0,
	ax: 0,
	ay: 0,
	onGround: true,
	Jump: function() {
		this.vy = -100/SECOND;
		this.ay = 0;
		//this.isOnGround = false;
	},
	
	Update: function(){
		if(this.onGround){
			this.Jump();
			console.log("anything");
			this.onGround = false;
		}else{
			this.ay = 150/SECOND/SECOND;
			console.log("else");
		}
		
		this.x += 1;
		//this.ay = 10/SECOND/SECOND;
		//console.log(this.isOnGround);
		/*
		this.vy += this.force;
		
		this.vy = this.gravity;
		this.y += this.vy;
		
		
		if(this.vy > 10){
			 this.vy = 10;
		 }*/
		
		
		/*if(this.y >= this.maxHeight){
			this.x += this.vx;
			this.y = 240;
		}*
		//console.log(this.x);
		/*if(this.x == this.maxWidth){
			this.vy += this.force;
			this.vy *= 1;
			this.y -= this.vy;
		}*/ 
		
		
		/*if(this.x == this.maxWidth){
			//this.xscale = -1;
			if(this.vx > 0 && this.xscale == 1){
				this.xscale *= -1;
			}
			
			this.vx *= -1;
			this.x += this.vx;
		}*/
		
		
		this.DoPhysics(true);
		this.UpdateMe();

	},
	
	BumpInto: function(bumpObj, side){
		if(side == "bottom"){
			
			this.Jump();
		}
	}

});

gm.AddLogic("Goomba", {
	
	sprite: "darkGoombawalking",
	sprite_speed: 5/gm.frameRate,
	maxWidth: 200,
	vx: 1,
	ax: 0,
	
	Update: function(){
		
		
		
		//console.log(this.x);
		this.x += this.vx;
		
		if(this.x == this.maxWidth){
			this.vx *= -1;
			this.x += this.vx;
		}
		
		
		/*if(this.x < this.maxWidth){
			this.x = this.x + 1;
		}else{
			//this.x = this.x - 1;
		}*/
		this.UpdateMe();
	}
	
	
	
});

gm.AddLogic("Piranha",{
	sprite: "plainPiranha",
	sprite_speed: 5/gm.frameRate,
	firstpos: 0,
	UP: false,
	vy: 0,
	ay: 0,
	
	Update: function(){
		
		if(this.UP){
			this.vy = -1;
			if(this.y <= this.firstpos - this.sprite.sh + 5){
				this.UP = false;
			}
		}else{
			this.vy = 1;
			if(this.y >= this.firstpos){
				this.UP = true;
			}
		}
		

		
		this.y += this.vy;
		
		
		this.UpdateMe();
	}
	
});


gm.CreateScene("example1", function() {
	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	
});

gm.CreateScene("example1", function() {
	
	gm.SetRoomData({
		width: 512,
		height: 256,
	});


	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	gm.BecomePhysical(actor);
	
	var actor = gm.CreateActor(0, 0, "Camera");


	var actor = gm.CreateActor(200, 200, "SolidBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 16, 0, 0);


	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, room.height-16, "SolidBlock");
	gm.BecomeSolid(actor);


	actor.bbox = gm.MakeBoundingBox(0, 0, room.width, 16, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;
	
	var actor = gm.CreateActor(75, 240, "Goomba");
	var actor = gm.CreateActor(50, 50, "GreenKoopa");
	var actorG = gm.CreateActor(90,240, "GreenKoopaWings");
	gm.BecomePhysical(actorG);
	actorG.isOnGround = false;
	var actorP = gm.CreateActor(200,200, "Piranha");
	actorP.firstpos = 200;
	var actorGo = gm.CreateActor(10, 240, "GoombaWings");
	gm.BecomePhysical(actorGo);
	


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



	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false);
	background.sprite = "level2background"; // *** Use that background sprite we made!
});
//
//
gm.StartScene("example1");
