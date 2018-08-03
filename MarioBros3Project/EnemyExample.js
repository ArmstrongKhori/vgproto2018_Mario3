

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
ct ~ "Controller" object. Use it for reading keyboard inputs.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.

il.AddTask("mario", "Mario.png");
il.AddTask("goomba", "goomba with wings2.png");
il.AddTask("koopatroopa", "KoopawithWings(good2).png")
il.AddTask("piranhaFire", "fireball piranha red-left.png")
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1, 64/2, 64);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2, 64/2, 64);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2, 64/2, 64);

//goomba
gm.AddSprite("darkGoombawalking", "goomba", 30*0, 0, 30, 24, 2, 30/2, 24);
gm.AddSprite("darkGoombaDead", "goomba", 19*2, 0, 19, 19, 1, 19/2, 19);
//koopatroopa
gm.AddSprite("koopatroopaWalking", "koopatroopa", 20*0, 0, 20, 27, 3, 20/2, 27);
//gm.AddSprite("koopatroopaShell", "koopatroopa", 24*2, 0, 24, 24, 4, 19/2, 23);

gm.AddSprite("piranhaFiring","piranhaFire", 16*0, 0, 16, 32, 4, 16/2, 32)
// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames

il.AddTask("mario", "MarioComposite.png");
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
var offsetx, offsety;
offsetx = 32/2;
offsety = 32;
gm.AddSprite("smallMarioIdle", "mario", 32*0, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("smallMarioWalk", "mario", 32*0, 0, 32, 32, 2, offsetx, offsety);
gm.AddSprite("smallMarioRun", "mario", 32*2, 0, 32, 32, 2, offsetx, offsety);
gm.AddSprite("smallMarioSkid", "mario", 32*4, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("smallMarioJump", "mario", 32*5, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("smallMarioFall", "mario", 32*5, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("smallMarioDive", "mario", 32*6, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("smallMarioPipe", "mario", 32*7, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("smallMarioDuck", "mario", 32*0, 0, 32, 32, 1, offsetx, offsety);

gm.AddSprite("bigMarioIdle", "mario", 32*8, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("bigMarioWalk", "mario", 32*8, 0, 32, 32, 2, offsetx, offsety);
gm.AddSprite("bigMarioRun", "mario", 32*10, 0, 32, 32, 3, offsetx, offsety);
gm.AddSprite("bigMarioSkid", "mario", 32*13, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("bigMarioJump", "mario", 32*14, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("bigMarioFall", "mario", 32*15, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("bigMarioDive", "mario", 32*16, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("bigMarioPipe", "mario", 32*17, 0, 32, 32, 1, offsetx, offsety);


gm.AddSprite("tailMarioIdle", "mario", 32*18, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("tailMarioWalk", "mario", 32*18, 0, 32, 32, 2, offsetx, offsety);
gm.AddSprite("tailMarioRun", "mario", 32*20, 0, 32, 32, 3, offsetx, offsety);
gm.AddSprite("tailMarioSkid", "mario", 32*23, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("tailMarioJump", "mario", 32*24, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("tailMarioFall", "mario", 32*25, 0, 32, 32, 4, offsetx, offsety);
gm.AddSprite("tailMarioDive", "mario", 32*29, 0, 32, 32, 3, offsetx, offsety);
gm.AddSprite("tailMarioPipe", "mario", 32*32, 0, 32, 32, 3, offsetx, offsety);

gm.AddSprite("marioDead", "mario", 32*0, 0, 32, 32, 1, offsetx, offsety);


gm.AddSprite("bigMarioDuck", "mario", 32*18, 0, 32, 32, 1, offsetx, offsety);

offsetx = 32/1.5;
gm.AddSprite("tailMarioIdle", "mario", 32*19, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("tailMarioWalk", "mario", 32*19, 0, 32, 32, 2, offsetx, offsety);
gm.AddSprite("tailMarioRun", "mario", 32*21, 0, 32, 32, 3, offsetx, offsety);
gm.AddSprite("tailMarioSkid", "mario", 32*24, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("tailMarioJump", "mario", 32*25, 0, 32, 32, 1, offsetx, offsety);
gm.AddSprite("tailMarioFall", "mario", 32*26, 0, 32, 32, 4, offsetx, offsety);
gm.AddSprite("tailMarioDive", "mario", 32*30, 0, 32, 32, 3, offsetx, offsety);
gm.AddSprite("tailMarioPipe", "mario", 32*33, 0, 32, 32, 3, offsetx, offsety);
gm.AddSprite("tailMarioDuck", "mario", 32*34, 0, 32, 32, 1, offsetx, offsety);

gm.AddSprite("marioDead", "mario", 32*35, 0, 32, 32, 1, offsetx, offsety);

// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames, x offset, y offset

// *** Important note: For now, it only works for spritesheets that go "horizontally" and have no gaps... It can't do "up and down" yet.



// *** Same as above-- Different image.
il.AddTask("backdrop", "level.png");
//
// *** Create a usable sprite out of it. Crop out an interesting bit (rather than the sky)-- Only 1 frame, of course.

gm.AddSprite("level1background", "backdrop", 0, 432-256, 256, 256, 1);
gm.AddSprite("level2background", "backdrop", 300, 432-256, 256, 256, 1);



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
		if (!this.isOnGround) {
			this.ay = 800/gm.frameRate/gm.frameRate;
		}
		//
		if (ct.KeyIsDown(ct.KEY_X)) {
			this.x += 6*motionHori;
		}
		else {
			this.x += 4*motionHori;
		}

		if (ct.KeyWasPressed(ct.KEY_Z)) {
			if (this.isOnGround) {
				this.vy = -200/gm.frameRate;
				this.isOnGround = false;
			}
		}

		if (motionHori != 0) {
			this.xscale = motionHori*1;
			this.yscale = 1;
		}




		this.vx += this.ax;
		this.vy += this.ay;
		//
		this.x += this.vx;
		this.y += this.vy;

gm.AddSprite("level1background", "backdrop", 0, 432-256, 512, 256, 1);
gm.AddSprite("level2background", "backdrop", 300, 432-256, 256, 256, 1);



il.AddTask("box", "box.png");
//
gm.AddSprite("solidBoxFull", "box", 0, 0, 64, 64, 1);

		if (this.Bottom() > 256) {
			this.y -= (this.Bottom() - 256);
			this.vy = 0;
			this.isOnGround = true;

var SECOND = gm.frameRate;

			this.ay = 0;
		}
		
var SECOND = gm.frameRate;



gm.AddLogic("SolidBlock", {
	sprite: "solidBoxFull",
	solid: true,
	// *** Our sprite is a bit big, so I'm shrinking the sprite down!
	xscale: 1/4,
	yscale: 1/4,
	bbox: undefined,
});

gm.AddLogic("PhaseBlock", {
	sprite: "solidBoxFull",
	solid: true,
	ignore_solid: {
		left: true,
		top: true,
		right: true
	},
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
			this.y = this.target.y - 256/2;
		}
		//
		// *** Clamp the X and Y so that they don't go past the room's boundaries.
		var room = gm.GetRoomData();
		this.x = Math.max(0, Math.min(this.x, room.width-256));
		this.y = Math.min(Math.max(0, this.y), room.height-256 +60);
		//
		// *** Finally, tell the game manager that THIS object is the camera!
		gm.AssignCamera(this);
	}
});

gm.AddLogic("Mario", {
	jumpHold: 0,
	isOnGround: false,
	box_small: gm.MakeBoundingBox(4, 0, 16-4*2, 16, 16/2, 16),
	box_big: gm.MakeBoundingBox(4, 0, 16-4*2, 32, 16/2, 32),
	bbox: undefined,

	STATE_SMALL: 0,
	STATE_BIG: 1,
	STATE_TAIL: 2,
	STATE_DEAD: 3,
	state: 0,

	ANIM_IDLE: 0,
	ANIM_WALK: 1,
	ANIM_RUN: 2,
	ANIM_SKID: 3,
	ANIM_JUMP: 4,
	ANIM_FALL: 5,
	ANIM_DIVE: 6,
	ANIM_PIPE: 7,
	ANIM_DUCK: 8,
	ANIM_DEAD: 9,
	anim: 0,

	spriteGroup: undefined,


	invulnTime: 0,
	starTime: 0,
	grabObj: undefined,


	OnCreate: function() {
		this.spriteGroup = {
			[this.STATE_SMALL]: {
				[this.ANIM_IDLE]:	"smallMarioIdle",
				[this.ANIM_WALK]:	"smallMarioWalk",
				[this.ANIM_RUN]:	"smallMarioRun",
				[this.ANIM_SKID]:	"smallMarioSkid",
				[this.ANIM_JUMP]:	"smallMarioJump",
				[this.ANIM_FALL]:	"smallMarioFall",
				[this.ANIM_DIVE]:	"smallMarioDive",
				[this.ANIM_PIPE]:	"smallMarioPipe",
				[this.ANIM_DUCK]:	"smallMarioDuck",
				[this.ANIM_DEAD]:	"marioDead",
			},
			[this.STATE_BIG]: {
				[this.ANIM_IDLE]:	"bigMarioIdle",
				[this.ANIM_WALK]:	"bigMarioWalk",
				[this.ANIM_RUN]:	"bigMarioRun",
				[this.ANIM_SKID]:	"bigMarioSkid",
				[this.ANIM_JUMP]:	"bigMarioJump",
				[this.ANIM_FALL]:	"bigMarioFall",
				[this.ANIM_DIVE]:	"bigMarioDive",
				[this.ANIM_PIPE]:	"bigMarioPipe",
				[this.ANIM_DUCK]:	"bigMarioDuck",
				[this.ANIM_DEAD]:	"marioDead",
			},
			[this.STATE_TAIL]: {
				[this.ANIM_IDLE]:	"tailMarioIdle",
				[this.ANIM_WALK]:	"tailMarioWalk",
				[this.ANIM_RUN]:	"tailMarioRun",
				[this.ANIM_SKID]:	"tailMarioSkid",
				[this.ANIM_JUMP]:	"tailMarioJump",
				[this.ANIM_FALL]:	"tailMarioFall",
				[this.ANIM_DIVE]:	"tailMarioDive",
				[this.ANIM_PIPE]:	"tailMarioPipe",
				[this.ANIM_DUCK]:	"tailMarioDuck",
				[this.ANIM_DEAD]:	"marioDead",
			},
			[this.STATE_DEAD]: {
				[this.ANIM_DEAD]:	"marioDead",
			},
		};

		this.bbox = this.box_small;
	},
	ChangeState: function(state) {
		this.state = state;
		//
		if (this.state == this.STATE_SMALL) {
			this.bbox = this.box_small;
		}
		else {
			this.bbox = this.box_big;
		}
	},
	PowerUp_Mushroom: function() {
		// *** Mushrooms only transform Mario when he's small!
		if (this.state == this.STATE_SMALL) {
			this.ChangeState(this.STATE_BIG);
		}
	},
	PowerUp_Leaf: function() {
		// *** Super Leaf overpowers any form EXCEPT for the Tanooki Suit (which doesn't exist at the moment)
		this.ChangeState(this.STATE_TAIL);
	},
	PowerUp_Star: function(state) {
		this.starTime = SECOND*10;
	},
	GetHit: function() {
		if (this.invulnTime <= 0) {
			if (this.state == this.STATE_TAIL) {
				this.ChangeState(this.STATE_BIG);

				this.invulnTime = SECOND;
			}
			else if (this.state == this.STATE_BIG) {
				this.ChangeState(this.STATE_SMALL);

				this.invulnTime = SECOND*2;
			}
			else {
				this.Die();
			}
		}
	},
	Die: function() {
		this.invulnTime = 0;
		this.ChangeState(this.STATE_DEAD);
	},
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
		// ============================================================================================================
		// *** Physics time!


		// *** Automatically do the physics (a function created by "gm.BecomePhysical" that automatically performs velocity, acceleration, and collision-checking)
		this.DoPhysics(true); // *** "true" means we will be "pushed out" by solid actors
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


		// ============================================================================================================
		// *** This part handles the animations (that is, how Mario should currently look!)
		if (this.state == this.STATE_DEAD) {
			this.anim = this.ANIM_DEAD;
		}
		else if (this.isOnGround) {
			if (Math.abs(this.vx) > 1/SECOND)
			{
				if (motionHori == -Math.sign(this.vx)) {
					// *** Skid if we are fighting our momentum!
					this.anim = this.ANIM_SKID;
				}
				else if (Math.abs(this.vx) > 120/SECOND && doingDash) {
					// *** When we're moving really fast, we change to a running sprite.
					this.anim = this.ANIM_RUN;
				}
				else {
					// *** When we're moving, we change to a walking sprite.
					this.anim = this.ANIM_WALK;
				}


				// *** DON'T set index! Let it animate~~
				this.sprite_speed = 12/SECOND;
			}
			else {
				// *** When we're NOT moving, we change to an idle sprite and stop animating.
				this.anim = this.ANIM_IDLE;
				this.sprite_index = 0; // *** Set index to 0 so that new animations will start from the beginning.
				this.sprite_speed = 0;
			}
		}
		else
		{
			if (Math.abs(this.vx) > 120/SECOND && doingDash) {
				this.anim = this.ANIM_DIVE;
			}
			else {
				if (this.vy < 0) {
					this.anim = this.ANIM_JUMP;
				}
				else {
					this.anim = this.ANIM_FALL;
				}
			}
		}
		//
		//
		// *** This is a nested array that contains the sprite that matches Mario's state/animation. Complicated, but also VERY simplified!
		this.sprite = this.spriteGroup[this.state][this.anim];


		// *** Remove it!
		if (ct.KeyIsDown(ct.KEY_SPACE)) { this.Destroy(); }

		if (ct.KeyIsDown(ct.KEY_SHIFT)) { gm.StartScene("example2"); }

		// *** Go to another scene
		if (ct.KeyIsDown(ct.KEY_SHIFT)) { gm.StartScene("example2"); }

		if (this.invulnTime > 0) { this.visible = (Math.round(this.invulnTime) % 2 == 0); }
		else { this.visible = true; } 



		// ============================================================================================================
		// *** Various timers.
		if (this.invulnTime > 0) { this.invulnTime -= 1; }

		if (this.starTime > 0) { this.starTime -= 1; }




		// ============================================================================================================
		// *** Mandatory call to the "me" function to make sure everything still works smoothly!
		this.UpdateMe();


		if (ct.KeyWasPressed(ct.KEY_ENTER)) {
			if (this.state == this.STATE_SMALL) { this.PowerUp_Mushroom(); }
			else { this.PowerUp_Leaf(); }
		}

		if (ct.KeyWasPressed(ct.KEY_SHIFT)) {
			this.GetHit();
		}
	},
	BumpInto: function(bumpObj, side) {
		if (side === "bottom" && this.vy >= 0) {
			this.vy = 0;
			// this.ay = 0;
			this.isOnGround = true;
			this.jumpHold = 0;


			if (bumpObj.Stomped) {
				bumpObj.Stomped(this, side);
			}

			if (bumpObj.Bounce) {
				bumpObj.Bounce(this, side);
			}
		} else if (side === "top" && this.vy <= 0) {
			this.vy = 0;
			this.jumpHold = 0;

			if (bumpObj.Struck) {
				bumpObj.Struck(this, side);
			}

			if (bumpObj.Bounce) {
				bumpObj.Bounce(this, side);
			}
		} else if (side === "right" && this.vx >= 0) {
			this.vx = 0;
			this.ax = 0;

			if (bumpObj.Bounce) {
				bumpObj.Bounce(this, side);
			}
		} else if (side === "left" && this.vx <= 0) {
			this.vx = 0;
			this.ax = 0;

			if (bumpObj.Bounce) {
				bumpObj.Bounce(this, side);
			}
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
		
		this.y += this.gravity;
	
		if(this.y >= this.maxHeight){
			this.x += this.vx;
			this.y = 240;
		}

		if(this.x == this.maxWidth){
			if(this.vx > 0 && this.xscale == 1){
				this.xscale *= -1;
			}
			this.vx *= -1;
			this.x += this.vx;
		}
	},
	
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
	},
	
	Update: function(){
		if(this.onGround){
			this.Jump();
			this.onGround = false;
		}else{
			this.ay = 150/SECOND/SECOND;
		}
		
		this.x += 1;
		
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
	isTouched: true,
	Jumped: false,
	Time: 100,
	Jump: function() {
		this.vy = -100/SECOND;
		this.ay = 0;
		this.onGround = false;
		console.log("jump");
	},
	Walk: function(){
		this.x += 1;
	},
	
	Update: function(){
		if(!this.onGround){
			this.ay = 150/SECOND/SECOND;
		}
		
		
		this.Time -= 1;
		if(this.Time <= 0){
			this.Jump();
			this.Time = 100;
		}
		this.Walk();
		this.DoPhysics(true);
		this.UpdateMe();

	},
	
	BumpInto: function(bumpObj, side){
		if(side == "bottom" && this.isTouched){			
			this.isTouched = false;	
			console.log("sample");
			
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
		
		this.x += this.vx;
		
		if(this.x == this.maxWidth){
			this.vx *= -1;
			this.x += this.vx;
		}
		
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

gm.AddLogic("PiranhaFire",{
	sprite: "piranhaFiring",
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
				this.xscale *= -1;
			}
		}else{
			this.vy = 1;
			if(this.y >= this.firstpos){
				this.UP = true;
			}
		}
	
		this.y += this.vy;
		
		this.FiringBall();
		this.UpdateMe();
	},
	
	FiringBall: function(){
		var actorFB = gm.CreateActor(140, this.y, "FireBallAnim");
		actorFB.vy = 1;
		actorFB.vx = 1;
		
	}
	
});

gm.AddLogic("FireBallAnim", {
	sprite: "fireBall",
	sprite_speed: 5/gm.frameRate,
	
	Update: function(){
		this.x += this.vx;
		this.y += this.vy;
	}
	
});

gm.CreateScene("example1", function() {
	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	var actor = gm.CreateActor(200,200, "Enemies");
	var actor = gm.CreateActor(150,150,{
		sprite: "koopatroopaWalking",
		sprite_speed: 5/gm.frameRate,
	});
	var actor = gm.CreateActor(50,50,{
		sprite: "piranhaFiring",
		sprite_speed: 5/gm.frameRate,
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


	var actor = gm.CreateActor(200, 200, "PhaseBlock");
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
	var actorGo = gm.CreateActor(60, 240, "GoombaWings");
	gm.BecomePhysical(actorGo);
	var actorPF = gm.CreateActor(150, 200, "PiranhaFire");
	actorPF.firstpos = 200;


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
