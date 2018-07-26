

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.
il.AddTask("mario", "Mario.png");
il.AddTask("img_level1a", "level1a.png");
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!
gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);
gm.AddSprite("spr_level1a", "img_level1a", 0,0,512,192,1);




var level1a = gm.CreateTile(0, 0, false);
level1a.sprite = "spr_level1a";

