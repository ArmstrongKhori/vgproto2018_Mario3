

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.
il.AddTask("mario", "Mario.png");
il.AddTask("Items", "Items.png");
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
gm.AddSprite("mushroom", "Items", 17, 209, 32, 32, 1);
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
actor.sprite = "mushroom"; // *** We're using Mario's "walking" sprite-- You know, the one we created earlier!
actor.sprite_speed = 12/gm.frameRate; // *** Every "frame", this is how many frames we move forward in the sprite's animation. This code says "12 frames per second".


// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
var background = gm.CreateTile(0, 0, false);
background.sprite = "level1background"; // *** Use that background sprite we made!

