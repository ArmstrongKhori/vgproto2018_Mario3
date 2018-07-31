

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
ct ~ "Controller" object. Use it for reading keyboard inputs.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.

il.AddTask("Items", "shroomsAndLeaves.png");

il.AddTask("questionBlock2", "questionBlock2.png");

il.AddTask("coin2", "coin2.png");

il.AddTask("pBlock", "pBlock.png");

gm.AddSprite("pBlock", "pBlock", 0, 0, 16, 16, 2);

gm.AddSprite("pBlockDown", "pBlock", 32, 0, 16, 16, 1);

gm.AddSprite("coin2", "coin2", 0, 0, 16, 16, 5);

gm.AddSprite("questionBlock2", "questionBlock2", 0, 0, 16, 16, 4);
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!

gm.AddSprite("mushroom", "Items", 0, 0, 16, 16, 1);
gm.AddSprite("leaf", "Items", 16, 0, 16, 16, 1);
gm.AddSprite("1up", "Items", 32, 0, 16, 16, 1);

gm.AddLogic("SolidBlock", {
	sprite: "solidBoxFull",
	solid: true,
	// *** Our sprite is a bit big, so I'm shrinking the sprite down!
	xscale: 1/4,
	yscale: 1/4,
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

gm.AddLogic("Mushroom", {
	vx: 0,
	vy: 0,
	ax: 0,
	ay: 0,
	isOnGround: false,
	isActive: false,


	sprite: "solidBoxFull",
	solid: true,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

//mushrooms update function. all logic for the mushroom goes in this update function
	Update: function(){
		this.sprite = "mushroom";
		this.sprite_index = 0;
		
		if (this.isActive == true){

			if (this.y <= 200 - 16) {
				//these two values are affecting the way the mushroom moves and falls. need to adjust numbers
				this.ay = 4670/SECOND/SECOND;
				this.vx = 1.5;

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

		//if (this.startingY ==)

		//updateMe must be the last thing in the function

		// *** Acceleration...
		this.vx += this.ax;
		this.vy += this.ay;
		//
		// *** Velocity...
		this.x += this.vx;
		this.y += this.vy;

		for (var i = 0; i<gm.actorList.length; i++) {

			var Q = gm.actorList[i];

			//
			if (Q.solid) {
				var collisionSide = this.CollideWith(Q, true);
				//
				//
				if (collisionSide === "bottom" && this.vy >= 0) {
					this.vy = 0;
					// this.ay = 0; 
					
					this.isOnGround = true;
					


					// this.vy = -this.gravity;
				} else if (collisionSide === "top" && this.vy <= 0) {
					this.vy = 0;
	
					
				} else if (collisionSide === "right" && this.vx >= 0) {
					this.vx = 0;
					this.ax = 0;

				} else if (collisionSide === "left" && this.vx <= 0) {
					this.vx = 0;
					this.ax = 0;

				}

				/*
				if (collisionSide !== "bottom" && this.vy > 0) {
					this.isOnGround = false;
				}
				*/
			}
		}


		this.UpdateMe();


	}


});

gm.AddLogic("questionBlock2", {
	isActive: false,
	startingY: this.y,
	sprite: "solidBoxFull",
	solid: true,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

	Update: function(){
		this.sprite = "questionBlock2";
		this.sprite_index = 0;
		this.sprite_speed = 8/gm.frameRate;



		this.UpdateMe();

	}



});


gm.CreateScene("example1", function() {
	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	//var actor = gm.CreateActor(100, 100, "Mario");


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

	

	var leaf = gm.CreateActor(50,150);
	leaf.sprite = "leaf";
	leaf.sprite_speed = 6/gm.frameRate;

	var oneUp = gm.CreateActor(200,200);
	oneUp.sprite = "1up";
	oneUp.sprite_speed = 8/gm.frameRate;

	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var mushroom = gm.CreateActor(100, 200, "Mushroom");
	//mushroom.sprite = "mushroom"; // *** We're using Mario's "walking" sprite-- You know, the one we created earlier!
	//mushroom.sprite_speed = 12/gm.frameRate;
	var qBlock = gm.CreateActor(100,200, "questionBlock2");
	qBlock.sprite_speed = 8/gm.frameRate;

	 // *** Every "frame", this is how many frames we move forward in the sprite's animation. This code says "12 frames per second".


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
