

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
// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames
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




		if (this.Bottom() > 256) {
			this.y -= (this.Bottom() - 256);
			this.vy = 0;
			this.isOnGround = true;

			this.ay = 0;
		}




		// *** Remove it!
		if (ct.KeyIsDown(ct.KEY_SPACE)) { this.Destroy(); }

		if (ct.KeyIsDown(ct.KEY_SHIFT)) { gm.StartScene("example2"); }


		this.UpdateMe();
	}
});




gm.CreateScene("example1", function() {
	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false, {
		sprite: "level1background" // *** Use that background sprite we made!
	});
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
