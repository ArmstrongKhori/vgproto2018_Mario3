

/*
gm ~ "Game Manager" object. Handles logic.
il ~ "Image Loader" object. Use for loading pictures.
*/



il.AddTask("mario", "Mario.png");
//
gm.AddSprite("smallMarioIdle", "mario", 64*0, 0, 64, 64, 1);
gm.AddSprite("smallMarioWalk", "mario", 64*1, 0, 64, 64, 2);
gm.AddSprite("smallMarioRun", "mario", 64*3, 0, 64, 64, 2);



il.AddTask("backdrop", "level.png");
//
gm.AddSprite("level1background", "backdrop", 0, 432-256, 256, 256, 1);




var actor = gm.CreateActor(100, 100);
actor.sprite = "smallMarioWalk";
actor.sprite_speed = 12/gm.frameRate;




var background = gm.CreateTile(0, 0, false);
background.sprite = "level1background";

