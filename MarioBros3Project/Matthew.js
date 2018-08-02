

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
ct ~ "Controller" object. Use it for reading keyboard inputs.
*/



il.AddTask("mario", "Mario.png");
//
gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1, 64/2, 64);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2, 64/2, 64);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2, 64/2, 64);


// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.

il.AddTask("Items", "shroomsAndLeaves.png");

il.AddTask("questionBlock2", "questionBlock2.png");

il.AddTask("coin2", "coin2.png");

il.AddTask("pBlock", "pBlock.png");

il.AddTask("emptyBlock", "emptyBlock.png");

il.AddTask("reverseLeaf", "leaf.png");

il.AddTask("brick", "brick.png");

gm.AddSprite("brick", "brick", 0, 0, 16, 16, 4);

gm.AddSprite("reverseLeaf", "reverseLeaf", 16, 0, 16, 14, 1);

gm.AddSprite("emptyBlock", "emptyBlock", 0, 0, 16, 16, 1);

gm.AddSprite("pBlock", "pBlock", 0, 0, 16, 16, 2);

gm.AddSprite("pBlockDown", "pBlock", 32, 0, 16, 16, 1);

gm.AddSprite("coin2", "coin2", 0, 0, 16, 16, 5);

gm.AddSprite("questionBlock2", "questionBlock2", 0, 0, 16, 16, 4);
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!

gm.AddSprite("mushroom", "Items", 0, 0, 16, 16, 1);
gm.AddSprite("leaf", "reverseLeaf", 0, 0, 16, 16, 2);
gm.AddSprite("1up", "Items", 32, 0, 16, 16, 1);

gm.AddLogic("SolidBlock", {
	sprite: "questionBlock2",

	solid: true,
	// *** Our sprite is a bit big, so I'm shrinking the sprite down!
	bbox: undefined,
});

// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames
// *** Important note: For now, it only works for spritesheets that go "horizontally" and have no gaps... It can't do "up and down" yet.



// *** Same as above-- Different image.
il.AddTask("backdrop", "level.png");
//
// *** Create a usable sprite out of it. Crop out an interesting bit (rather than the sky)-- Only 1 frame, of course.
gm.AddSprite("level1background", "backdrop", 0, 432-256, 256, 256, 1);
gm.AddSprite("level2background", "backdrop", 300, 432-256, 256, 256, 1);

var SECOND = gm.frameRate;



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


			if (bumpObj.pSwitch) {
				bumpObj.TriggerSwitch();
			}
		} else if (side === "top" && this.vy <= 0) {
			this.vy = 0;
			this.jumpHold = 0;

			if (bumpObj.ChangeBlock) {
				bumpObj.ChangeBlock();
			}
		} else if (side === "right" && this.vx >= 0) {
			this.vx = 0;
			this.ax = 0;
		} else if (side === "left" && this.vx <= 0) {
			this.vx = 0;
			this.ax = 0;
		}
	}
});

gm.AddLogic("leaf", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

	Launch: function() {
		this.ay = 900/SECOND/SECOND;
		this.vy = -11.5;

		this.sprite = "leaf";
		this.sprite_index = 0;
		this.sprite_speed = 3/SECOND;
	},
	Update: function(){
		
		var direction = (this.x <= this.myBlock.x + 16);

		/*var RIGHT = 1;
		var LEFT = 2;*/

		if (this.vy > 10/SECOND) {
			this.vy = 10/SECOND;
		}

		/*if (this.y > 16) {
			this.y ++;
			this.x ++;*/

		/*if (this.y > 16){

			switch (direction){

				case RIGHT:
					this.vx += +1;
					this.vy += +1;
					break;

				case LEFT:
					this.vx += -1;
					this.vy += +1;	
					break;*/
			//}
		//}

		if (this.isActive == true){

			if (direction) {
				this.x += 1;
				//this.out = true;

			}else{
			 	(this.x >= 16);
				this.x += -16;
			}
		}

		//need to add if statements here to make the animation of the leaf work




		this.DoPhysics();
		this.UpdateMe();

	}
});


gm.AddLogic("coin2", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),
	sprite: "coin2",
	sprite_index: 0,
	sprite_speed: 8/SECOND,

	Launch: function() {
		this.ay = 900/SECOND/SECOND;
		this.vy = -11.5;


		this.poofTimer = (Math.abs(this.vy) / this.ay) *1.8;
	},
	Update: function(){

		if (this.poofTimer > 0) {
			this.poofTimer -= 1;

			if (this.poofTimer <= 0) {
				this.Destroy();
			}
		}

		//add if statements for coin logic
		
		this.DoPhysics();
		this.UpdateMe();
	}
});


gm.AddLogic("Mushroom", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

//mushrooms update function. all logic for the mushroom goes in this update function
	Update: function(){
		this.sprite = "mushroom";
		this.sprite_index = 0;
		
		var isOutOfBox = (this.y <= this.myBlock.y - 16);
		if (this.isActive == true){

			if (isOutOfBox) {
				//these two values are affecting the way the mushroom moves and falls. need to adjust numbers
				this.ay = 4670/SECOND/SECOND;
				this.vx = 1.5;
				this.out = true;
				//this.vx = 1;
				//console.log("if");

			}else{
				this.vy = -1;
				//console.log("else");
			}


		}
		if (ct.KeyIsDown(ct.KEY_Z)){
			this.isActive = true;


		}

		//updateMe must be the last thing in the function

		this.DoPhysics(this.out);
		//
		this.UpdateMe();
		},

		BumpInto: function(bumpObj, side) {
		if (side === "bottom" && this.vy >= 0) {
			this.vy = 0;
			// this.ay = 0; 
			
			this.isOnGround = true;
			


			// this.vy = -this.gravity;
		} else if (side === "top" && this.vy <= 0) {
			this.vy = 0;

			
		} else if (side === "right" && this.vx >= 0) {
			this.vx *= -1;
			this.ax = 0;

		} else if (side === "left" && this.vx <= 0) {
			this.vx *= -1;
			this.ax = 0;

		}

		if (side !== "none") {
			
		}

		/*
		if (side !== "bottom" && this.vy > 0) {
			this.isOnGround = false;
		}
		*/
		}
	});

gm.AddLogic("1up", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

//mushrooms update function. all logic for the mushroom goes in this update function
	Update: function(){
		this.sprite = "1up";
		this.sprite_index = 0;
		
		var isOutOfBox2 = (this.y <= this.myBlock.y - 16);
		if (this.isActive == true){

			if (isOutOfBox2) {
				//these two values are affecting the way the mushroom moves and falls. need to adjust numbers
				this.ay = 4670/SECOND/SECOND;
				this.vx = 1.5;
				this.out = true;
				//this.vx = 1;
				//console.log("if");

			}else{
				this.vy = -1;
				//console.log("else");
			}
			this.DoPhysics(this.out);
			this.UpdateMe();
				}

			},
			BumpInto: function(bumpObj, side) {
		if (side === "bottom" && this.vy >= 0) {
			this.vy = 0;
			// this.ay = 0; 
			
			this.isOnGround = true;
			


			// this.vy = -this.gravity;
		} else if (side === "top" && this.vy <= 0) {
			this.vy = 0;

			
		} else if (side === "right" && this.vx >= 0) {
			this.vx *= -1;
			this.ax = 0;

		} else if (side === "left" && this.vx <= 0) {
			this.vx *= -1;
			this.ax = 0;

		}

		if (side !== "none") {
			
		}

		/*
		if (side !== "bottom" && this.vy > 0) {
			this.isOnGround = false;
		}
		*/
	}

});


gm.AddLogic("pBlock",{
	isActive: false,
	out: false,
	pSwitch: true,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),
	sprite: "pBlock",
	sprite_index: 0,
	sprite_speed: 8/SECOND,



	TriggerSwitch: function() {
		
		this.sprite = "pBlockDown";
		this.solid = false;

		
	},

	ChangeBlock: function(){
		if (this.sprite == "pBlockDown"){
			brickOne.sprite = "coin2";
		}
	},

	Update: function(){
		

		if (this.y <= this.myBlock.y - 16) {
			this.out = true;
		}

		var pBlockPress = (this.y <= this.myBlock.y - 16);
		if (this.isActive == true){

			if (this.out){

				// this.ay = 800/SECOND/SECOND;
				this.vx = 0;
				this.vy = 0;
				this.out = true;
			}else{
				this.vy = -1;
			}
		}

		this.DoPhysics();
		this.UpdateMe();
	}
});

gm.AddLogic("questionBlock2", {
	isActive: true,
	startingY: this.y,
	sprite_index: 0,
	sprite_speed: 8/gm.frameRate,
	sprite: "questionBlock2",
	type: undefined,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

	ChangeBlock: function(){
		if (this.isActive) {
			this.isActive = false;

			this.sprite = "emptyBlock";
			//
			// *** We create an "actor"-- These are objects that can "interact" with the engine.
			switch(this.type){
				case "mushroom":
					var mushroom = gm.CreateActor(this.x, this.y, "Mushroom");
					gm.BecomePhysical(mushroom);
			
					mushroom.myBlock = this;
					mushroom.isActive = true;
					break;

				case "coin2":
					var coin2 = gm.CreateActor(this.x, this.y, "coin2");
					gm.BecomePhysical(coin2);


					coin2.myBlock = this;
					coin2.isActive = true;

					coin2.Launch();
					break;

				case "1up":
					var oneUp = gm.CreateActor(this.x, this.y, "1up");
					gm.BecomePhysical(oneUp);

					oneUp.myBlock = this;
					oneUp.isActive = true;
					break;

				case "leaf":
					var leaf = gm.CreateActor(this.x, this.y, "leaf");
					gm.BecomePhysical(leaf);

					leaf.myBlock = this;
					leaf.isActive = true;

					leaf.Launch();
					break;

				case "pBlock":
					var pBlock = gm.CreateActor(this.x, this.y, "pBlock");
					gm.BecomePhysical(pBlock);
					gm.BecomeSolid(pBlock);

					pBlock.myBlock = this;
					pBlock.isActive = true;
					break;

				default: 
					console.log("no type");
					break;
			}
			
		}
	},

	Update: function(){
		//this.sprite = "questionBlock2";

		if (ct.KeyIsDown(ct.KEY_Z)){
			//this.sprite = "emptyBlock"; 
		}
		
		this.UpdateMe();
	}

});

gm.AddLogic("brick", {
	isActive: true,
	startingY: this.y,
	sprite_index: 0,
	sprite_speed: 8/gm.frameRate,
	sprite: "brick",
	type: undefined,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

});

// gm.AddLogic()


gm.CreateScene("example1", function() {
	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	//var actor = gm.CreateActor(100, 100, "Mario");

	gm.SetRoomData({
		width: 512,
		height: 256,
	});


	var mario = gm.CreateActor(40, 0, "Mario");
	gm.BecomePhysical(mario);


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false, {
		sprite: "level1background" // *** Use that background sprite we made!
	});

	

	var coin = gm.CreateActor(150, 70);
	coin.sprite = "coin2";
	coin.sprite_speed = 8/gm.frameRate;

	var pBlock = gm.CreateActor(100,134);
	pBlock.sprite = "pBlock";
	pBlock.sprite_speed = 8/gm.frameRate;

	pBlock.Update = function(){
		this.UpdateMe();

		if (ct.KeyIsDown(ct.KEY_X)){ this.sprite = "pBlockDown";}
	}

	/*var reverseLeaf = gm.CreateActor(50,150);
	reverseLeaf.sprite = "reverseLeaf";
	reverseLeaf.sprite_speed = 8/gm.frameRate;*/

	/*var leaf = gm.CreateActor(50,150);
	leaf.sprite = "leaf";
	leaf.sprite_speed = 6/gm.frameRate;*/

	var oneUp = gm.CreateActor(200,200);
	oneUp.sprite = "1up";
	oneUp.sprite_speed = 8/gm.frameRate;

	var brickOne = gm.CreateActor(175, 150, "brick");
	brickOne.sprite_speed = 5/SECOND;
	gm.BecomeSolid(brickOne);
	brickOne.name = "brick";
	brickOne.type = "brick";

	//mushroom.sprite = "mushroom"; // *** We're using Mario's "walking" sprite-- You know, the one we created earlier!
	//mushroom.sprite_speed = 12/gm.frameRate;
	var qBlock = gm.CreateActor(100,200, "questionBlock2");
	qBlock.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlock);
	qBlock.name = "question block";
	qBlock.type = "mushroom";

	var qBlockTwo = gm.CreateActor(148,200, "questionBlock2");
	qBlockTwo.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockTwo);
	qBlockTwo.name = "question block";
	qBlockTwo.type = "coin2";

	var qBlockThree = gm.CreateActor(50,200, "questionBlock2");
	qBlockThree.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockThree);
	qBlockThree.name = "question block";
	qBlockThree.type = "leaf";

	var qBlockFour = gm.CreateActor(116,200, "questionBlock2");
	qBlockFour.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockFour);
	qBlockFour.name = "question block";
	qBlockFour.type = "1up";

	var qBlockFive = gm.CreateActor(66,200, "questionBlock2");
	qBlockFive.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockFive);
	qBlockFive.name = "question block";
	qBlockFive.type = "pBlock";

	
	

	 // *** Every "frame", this is how many frames we move forward in the sprite's animation. This code says "12 frames per second".

	var actor = gm.CreateActor(200, 256-32, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 16, 0, 0);
	actor.xscale = 1;
	actor.visible = true;
	actor.name = "turn around block right";

	var actor = gm.CreateActor(0, 256-32, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 16, 0, 0);
	actor.xscale = 1;
	actor.visible = true;
	actor.name = "turn around block left";

	
	var actor = gm.CreateActor(0, 256-16, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 1000, 16, 0, 0);
	actor.xscale = 500/64;
	actor.visible = false;
	actor.name = "ground block";
});




gm.CreateScene("example2", function() {
	var actor = gm.CreateActor(10, 10, "Mario");


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false);
	background.sprite = "level2background"; // *** Use that background sprite we made!
});
//
//
gm.StartScene("example1");
