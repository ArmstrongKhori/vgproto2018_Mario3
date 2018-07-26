

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.
il.AddTask("mario", "Mario.png");
il.AddTask("Items", "Items.png");

il.AddTask("questionBlock", "questionBlock.png");

gm.AddSprite("questionBlock", "questionBlock", 0, 0, 30, 28, 4);
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
gm.AddSprite("mushroom", "Items", 21, 209, 32, 32, 1);
gm.AddSprite("leaf", "Items", 65, 209, 32, 32, 1);

gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);
// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames
// *** Important note: For now, it only works for spritesheets that go "horizontally" and have no gaps... It can't do "up and down" yet.



// *** Same as above-- Different image.
il.AddTask("backdrop", "level.png");
//
// *** Create a usable sprite out of it. Crop out an interesting bit (rather than the sky)-- Only 1 frame, of course.
gm.AddSprite("level1background", "backdrop", 0, 432-256, 256, 256, 1);
gm.AddSprite("level2background", "backdrop", 300, 432-256, 256, 256, 1);








gm.AddLogic("Mario", {
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
		if (ct.KeyIsDown(ct.KEY_X)) {
			this.x += 6*motionHori;
			this.y += 6*motionVert;
		}
		else {
			this.x += 4*motionHori;
			this.y += 4*motionVert;
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

/*
	var actor = gm.CreateActor(100,0);
	actor.sprite = "questionBlock";
	actor.sprite_speed = 5/gm/frameRate;


	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100);
	actor.sprite = "mushroom"; // *** We're using Mario's "walking" sprite-- You know, the one we created earlier!
	actor.sprite_speed = 12/gm.frameRate; // *** Every "frame", this is how many frames we move forward in the sprite's animation. This code says "12 frames per second".
	*/
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
