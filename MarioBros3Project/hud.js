

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
/*il.AddTask("MARIO", "mariohud.png");
gm.AddSprite("spritehud", "MARIO",0,0,152,28,1);


var marioF = gm.CreateTile(0, 256-28, true);
marioF.sprite = "spritehud";


// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
var background = gm.CreateTile(0, -28, false);
background.sprite = "level1background"; // *** Use that background sprite we made!*/

il.AddTask("MARIO", "mario image hub1.png");
gm.AddSprite("spritehud", "MARIO",0,0,256,28,1);


var marioF = gm.CreateTile(0, 256-28, true);
marioF.sprite = "spritehud";


// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
var background = gm.CreateTile(0, -28, false);
background.sprite = "level1background";

$("p").text("WORLD 1");

 

var text = " WORLD 1"
context.font = "6px arial";
context.fillText(text,0,0);
context.position = absolute;
context.z-index = -1;
