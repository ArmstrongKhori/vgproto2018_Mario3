
//sup itz ace thiz iz the zprite for the zlotz=============================================================================================
il.AddTask("SLOTZ","starflowermushy.png");
gm.AddSprite("flowerySLOTZ", "SLOTZ",36*0, 0, 36, 36, 1, 36/2, 36);
gm.AddSprite("musshySLOTZ", "SLOTZ",36*1, 0, 36, 36, 1, 36/2, 36);
gm.AddSprite("starSLOTZ", "SLOTZ",36*2, 0, 36, 36, 1, 36/2, 36);
//==========================================================================================================================================


//zup itz ace thiz iz the zprite for the azzelerationOFF=======================================================================================
il.AddTask("azzelerationOFF", "asseleration.png");
gm.AddSprite("azzOFF", "azzelerationOFF", 8*0, 0, 8, 7, 6, 8/2, 7);
gm.AddSprite("azzpOFF", "azzelerationOFF", 16*7, 0, 16, 7, 1, 16/2, 7);
//thiz iz the power"azzpOFF"


//zup itz ace thiz iz the zprite for the azzelerationON=========================================================================================
il.AddTask("azzelerationON", "using ass-eleration.png");
gm.AddSprite("azzON", "azzelerationON", 8*0, 0, 8, 7, 6, 8/2, 7);
gm.AddSprite("azzpON", "azzelerationON", 16*7, 0, 16, 7, 1, 16/2, 7);
//thiz iz the power "azzpON"
il.AddTask("azzpip", "azzpip.png");
gm.AddSprite("itazz", "azzpip", 8*0, 0, 8, 2, 8/2, 8);
il.AddTask("azzpipi" "");
gm.AddSprite("itazzpipi","azzpipi", 8*0, 0, 8, 2, 8/2, 8);

//===============================================================================================================================================



il.AddTask("MARIO", "mario image hub1.png");
gm.AddSprite("spritehud", "MARIO",0,0,256,28,1);


var SECOND = gm.frameRate;

il.AddTask("PINK","mario image hub2 - Copy.png")
gm.AddSprite("pinkhud", "PINK",0,0,256,28,1);





//================================================================================================
gm.AddLogic("HUD2",{
	sprite:"pinkhud",
	frameCount: 0,
	visible: false,

	PadText: function(num, size){
		var m = num+"";
		while (s.length < size) m = "0" + m;
		return m;
	},
	update: function(){
		var marioWorld = 1;
		var marioLives = 0;

	},

	AddAllTheLives: function(HIGHonMARIOlives){
		this.lives += HIGHonMARIOlives;
	},
	AddAllTheWorlds: function(whatevmariodid){
		this.world += whatevmariodid;
	},

	Draw: function() {
		var camera = gm.FindByLogic("Camera");
		this.x = camera.x;
		this.y = camera.y +256-28;



		this.DrawMe();


		var hud = gm.FindByLogic("HUD");

		var text = "WORLD:"+hud.world;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 5, this.y+14);

		var text = "[M] X: "+hud.lives;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 0, this.y+24);



	},

});
//================================================================================================


gm.AddLogic("HUD", {
	sprite: "spritehud",
	frameCount: 0,


	PadText: function(num, size) {
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	},
	Update: function() {
		var marioScore = 1000;
		var marioLives = 0;
		var marioCoins = 0;
		var marioWorld = 8;

		var addLives = ct.KeyWasPressed(ct.KEY_U);

		// ========================================================================================
 	if (ct.KeyWasPressed(ct.KEY_U)) {
 		this.AddAllTheLives = this.AddAllTheLives + 100;
 	}


		
		if(this.timer>0){
			this.frameCount += 1;
			if (this.frameCount >= 30) {
				this.timer -= 1;
				this.frameCount = 0;
			}
		}
/*
		this.AddALLTHESCORES(1000);
		
		this.AddAllTheLives(0)
		*/
		this.AddAllTheCoins(0);
	},
		
	


	score: 0,
	lives: 4,
	coins: 0,
	world: 1,
	timer: 300,

	/*PowerInMarioPants: function(powerMARIO){
		this.pictures = powerMARIO;
	}*/

	AddAllTheWorlds: function(whatevmariodid){
		this.world += whatevmariodid;
	},

	AddALLTHESCORES: function(theSCoreValueWereLookingFor){
		this.score += theSCoreValueWereLookingFor;
	},
	AddAllTheCoins: function(shinyThingInMarioPants){
		this.coins += shinyThingInMarioPants;
		//
		if(this.coins >= 100){
			this.coins -= 100;
			this.lives += 1;                     
		}
	},
	AddAllTheLives: function(HIGHonMARIOlives){
		this.lives += HIGHonMARIOlives;
		
	},


	Draw: function() {
		var camera = gm.FindByLogic("Camera");
		this.x = camera.x;
		this.y = camera.y +256-28;



		this.DrawMe();
		//
		//
		var text = "O: "+this.timer;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 120, this.y+24);

		var text = this.PadText(this.score,7)+"  ";
		gm._context.font = "8px lol";
		gm._context.fillText(text, 60, this.y+24);

		var text = "WORLD:"+this.world;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 5, this.y+14);

		var text = "$ "+this.coins;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 120, this.y+14);

		var text = "[M] X: "+ this.lives;
		gm._context.font = "8px lol";
		gm._context.fillText(text, 0, this.y+24);

		var sprite = "azzpOFF";
		var sprite = "azzOFF";
		var sprite = "azzpON";
		var sprite = "azzON";

	},
});

//================================================================================================================


//================================================================================================================


gm.CreateScene("acedragon", function() {
	
	gm.SetRoomData({
		width: 512,
		height: 256,
	});


	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	gm.BecomePhysical(actor);
	
	var actor = gm.CreateActor(0, 0, "Camera");

	var hud = gm.CreateActor(0, 256-28, "HUD");
	var hud2 = gm.CreateActor(0,256-28, "HUD2");
	


	var actor = gm.CreateActor(200, 200, "SolidBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 16, 0, 0);


	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, room.height-16, "SolidBlock");
	gm.BecomeSolid(actor);


	actor.bbox = gm.MakeBoundingBox(0, 0, room.width, 16, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false, {
		sprite: "level1background" // *** Use that background sprite we made!
	});
});

//
gm.StartScene("acedragon");
