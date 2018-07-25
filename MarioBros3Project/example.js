

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.
il.AddTask("mario", "Mario.png");
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);
// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames
// *** Important note: For now, it only works for spritesheets that go "horizontally" and have no gaps... It can't do "up and down" yet.



// *** Same as above-- Different image.
il.AddTask("backdrop", "level.png");
//
// *** Create a usable sprite out of it. Crop out an interesting bit (rather than the sky)-- Only 1 frame, of course.
gm.AddSprite("level1background", "backdrop", 0, 432-256, 256, 256, 1);




// *** We create an "actor"-- These are objects that can "interact" with the engine.
var actor = gm.CreateActor(100, 100);
actor.sprite = "smallMarioWalk";
actor.sprite_speed = 12/gm.frameRate; // *** Every "frame", this is how many frames we move forward in the sprite's animation. This code says "12 frames per second".
actor.Update = function() {
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


	this.UpdateMe();
}


// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
var background = gm.CreateTile(0, 0, false);
background.sprite = "level1background"; // *** Use that background sprite we made!

