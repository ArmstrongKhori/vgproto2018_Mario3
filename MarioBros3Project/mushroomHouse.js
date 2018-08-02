var SECOND = gm.frameRate;




il.AddTask("houseScene", "HouseScene.png");

gm.AddSprite("mushroomhouse", "houseScene", 0, 0, 256, 256, 1);



gm.CreateScene("mushroomHouse", function() {

	gm.SetRoomData({
		width: 256,
		height: 256,
	});



	var mushroomHouse = gm.CreateTile(0, 0, false, {
		sprite: "mushroomhouse"
	});
	

	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	gm.BecomePhysical(actor);
	



	// Lower Floor
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 169, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, room.width, 16, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Upper Floor
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 105, "SolidBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 80, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Upper Floor
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(208, 105, "SolidBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 80, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Wall
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 56, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 54, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Wall
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(240, 56, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 54, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left First Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 25, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right First Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(224, 25, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Second Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 8, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Second Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(208, 8, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 48, 32, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// Left Third Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, 0, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 80, 24, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;

	// Right Third Ceiling
	var room = gm.GetRoomData();
	var actor = gm.CreateActor(176, 0, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 80, 24, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;



	// Chest bounding boxes
	var room = gm.GetRoomData();
	var chest = gm.CreateActor(64+48*0, 136, "Chest");
	chest.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);

	var chest = gm.CreateActor(64+48*1, 136, "Chest");
	chest.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);

	var chest = gm.CreateActor(64+48*2, 136, "Chest");
	chest.bbox = gm.MakeBoundingBox(0, 0, 32, 32, 0, 0);
});



gm.AddLogic("Chest", {
	bbox: undefined,
	Update: function() {

		var mario = gm.FindByLogic("Mario");


		if (ct.KeyWasPressed(ct.KEY_X)) {
			if (mario.isOnGround) {
				if (mario.CollideWith(this) != "none") {
					alert("WHOAAAAAAAAAAAAAAA!");
				}
			}
		}

	}
});


gm.StartScene("mushroomHouse");

