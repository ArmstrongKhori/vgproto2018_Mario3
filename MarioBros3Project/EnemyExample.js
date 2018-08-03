

/* *** These are two important "global" objects:
gm ~ "Game Manager" object. Handles game logic and holds important information.
il ~ "Image Loader" object. Use for loading pictures.
ct ~ "Controller" object. Use it for reading keyboard inputs.
*/



// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.

il.AddTask("goomba", "goomba.png");
il.AddTask("koopatroopa", "koopa-right.png");
il.AddTask("koopatroopaWings", "KoopawithWings(good2)right.png");
il.AddTask("goombaWings", "good-goomba-wings.png");
il.AddTask("piranhaPlain", "piranha2.png");
il.AddTask("piranhaFire", "fireball piranha red-right.png");
il.AddTask("fireball", "fireball2.png");
il.AddTask("GoombaDark", "darkgoomba.png");
//
//goomba
gm.AddSprite("darkGoombawalking", "goomba", 16*0, 0, 16, 16, 2, 16/2, 16);
gm.AddSprite("darkGoombaDead", "goomba", 16*2, 0, 16, 16, 1, 16/2, 16);
//koopatroopa
gm.AddSprite("koopatroopaWalking", "koopatroopa", 20*0, 0, 20, 27, 2, 20/2, 27);
//gm.AddSprite("koopatroopaShell", "koopatroopa", 24*2, 0, 24, 24, 4, 19/2, 23);
//koopaWINGS
gm.AddSprite("koopatroopaWalkingWings", "koopatroopaWings", 20*0, 0, 20, 27, 3, 20/2, 27);
//goombaWings
gm.AddSprite("goombaWalkingWings", "goombaWings", 24*0, 0, 24, 24, 4, 24/2, 24);

//piranha
gm.AddSprite("plainPiranha", "piranhaPlain", 16*0, 0, 16, 32, 2, 16/2, 32);
//firepiranha
gm.AddSprite("piranhaFiring","piranhaFire", 16*0, 0, 16, 32, 4, 16/2, 32);
//fireball
gm.AddSprite("fireBall", "fireball", 14*0, 0, 14, 16, 4, 14/2, 16/2);

//darkgoomba
gm.AddSprite("goombaDark", "GoombaDark", 19*0, 0, 19, 19, 3, 19/2, 19);
// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames




gm.AddLogic("GreenKoopa", {
	
	sprite: "koopatroopaWalking",
	sprite_speed: 5/gm.frameRate,
	maxHeight: 200,
	maxWidth: 100,
	gravity: 20,
	force: -10,
	vx: 1,
	ax: 0,
	fliptime: 0,
	currentPos: 0,
	
	bbox: gm.MakeBoundingBox(0,0,16,16,16/2,16),
	
	Update: function(){
		this.UpdateMe();
		
		this.y += this.gravity;
	
		if(this.y >= this.maxHeight){
			this.x += this.vx;
			this.y = 240;
		}

		/*if(this.x == this.maxWidth){
			if(this.vx > 0 && this.xscale == 1){
				this.xscale *= -1;
			}
			this.vx *= -1;
			this.x += this.vx;
		}*/
		
		
		
		
		var mario = gm.FindByLogic("Mario");
		var side = mario.CollideWith(this);
		if (side != "none") {
			if (side == "bottom" && mario.vy > 0) {
				this.Destroy();
				mario.Jump();
			}
			else {
				mario.GetHit();
			}
		}
	},
	
});

gm.AddLogic("GreenKoopaWings", {
	
	sprite: "koopatroopaWalkingWings",
	sprite_speed: 5/gm.frameRate,
	bbox: gm.MakeBoundingBox(0, 0, 16, 32, 16/2, 32, false),
	maxHeight: 200,
	maxWidth: 150,
	gravity: 5,
	force: -10,
	vx: 1,
	vy: 0,
	ax: 0,
	ay: 0,
	onGround: true,
	Jump: function() {
		this.vy = -100/SECOND;
		this.ay = 0;
	},
	
	Update: function(){
		if(this.onGround){
			this.Jump();
			this.onGround = false;
		}else{
			this.ay = 150/SECOND/SECOND;
		}
		
		this.x += 1;
		
		this.DoPhysics(true);
		this.UpdateMe();
		
		var mario = gm.FindByLogic("Mario");
		var side = mario.CollideWith(this);
		if (side != "none") {
			if (side == "bottom" && mario.vy > 0) {
				this.Destroy();
				mario.Jump();
			}
			else {
				mario.GetHit();
			}
		}

	},
	
	BumpInto: function(bumpObj, side){
		if(side == "bottom"){
			this.Jump();
		}
	}
});



gm.AddLogic("GoombaWings", {
	
	sprite: "goombaWalkingWings",
	sprite_speed: 5/gm.frameRate,
	bbox: gm.MakeBoundingBox(0, 0, 16, 32, 16/2, 32, false),
	maxHeight: 200,
	maxWidth: 150,
	gravity: 5,
	force: -10,
	vx: 1,
	vy: 0,
	ax: 0,
	ay: 0,
	onGround: true,
	isTouched: true,
	Jumped: false,
	Time: 100,
	Jump: function() {
		this.vy = -100/SECOND;
		this.ay = 0;
		this.onGround = false;
		console.log("jump");
	},
	Walk: function(){
		this.x += 1;
	},
	
	Update: function(){
		if(!this.onGround){
			this.ay = 150/SECOND/SECOND;
		}
		
		
		this.Time -= 1;
		if(this.Time <= 0){
			this.Jump();
			this.Time = 100;
		}
		this.Walk();
		this.DoPhysics(true);
		this.UpdateMe();
		
		var mario = gm.FindByLogic("Mario");
		var side = mario.CollideWith(this);
		if (side != "none") {
			if (side == "bottom" && mario.vy > 0) {
				this.Destroy();
				mario.Jump();
			}
			else {
				mario.GetHit();
			}
		}

	},
	

	
	BumpInto: function(bumpObj, side){
		if(side == "bottom" && this.isTouched){			
			this.isTouched = false;	
			console.log("sample");
			
		}
	}

});

gm.AddLogic("Goomba", {
	
	sprite: "darkGoombawalking",
	sprite_speed: 5/gm.frameRate,
	maxWidth: 200,
	vx: 1,
	ax: 0,
	
	bbox: gm.MakeBoundingBox(0,0,16,16,16/2,16),
	
	Update: function(){
		
		this.x += this.vx;
		
		if(this.x == this.maxWidth){
			this.vx *= -1;
			this.x += this.vx;
		}
		
		var mario = gm.FindByLogic("Mario");
		var side = mario.CollideWith(this);
		if (side != "none") {
			if (side == "bottom" && mario.vy > 0) {
				this.Destroy();
				mario.Jump();
			}
			else {
				mario.GetHit();
			}
		}
		
		this.UpdateMe();
	},
	
});

gm.AddLogic("Piranha",{
	sprite: "plainPiranha",
	sprite_speed: 5/gm.frameRate,
	firstpos: 0,
	UP: false,
	vy: 0,
	ay: 0,
	
	bbox: gm.MakeBoundingBox(0,0,16,16,16/2,16),
	
	Update: function(){
		
		if(this.UP){
			this.vy = -1;
			if(this.y <= this.firstpos - this.sprite.sh + 5){
				this.UP = false;
			}
		}else{
			this.vy = 1;
			if(this.y >= this.firstpos){
				this.UP = true;
			}
		}
		
		
		
		this.y += this.vy;
		
		var mario = gm.FindByLogic("Mario");
		var side = mario.CollideWith(this);
		if (side != "none") {
				mario.GetHit();
			}
			
		this.UpdateMe();
	}
	
});

gm.AddLogic("PiranhaFire",{
	sprite: "piranhaFiring",
	sprite_speed: 5/gm.frameRate,
	firstpos: 0,
	UP: false,
	vy: 0,
	ay: 0,
	
	bbox: gm.MakeBoundingBox(0,0,16,16,16/2,16),
	
	Update: function(){
		
		if(this.UP){
			this.vy = -1;
			if(this.y <= this.firstpos - this.sprite.sh + 5){
				this.UP = false;
				this.xscale *= -1;
				
				this.FiringBall();
			}
		}else{
			this.vy = 1;
			if(this.y >= this.firstpos){
				this.UP = true;
			}
		}
	
		this.y += this.vy;
		
		var mario = gm.FindByLogic("Mario");
		var side = mario.CollideWith(this);
		if (side != "none") {
				mario.GetHit();
			}
		
		this.UpdateMe();
	},
	
	FiringBall: function(){
		var mario = gm.FindByLogic("Mario");
		
		
		var actorFB = gm.CreateActor(140, this.y, "FireBallAnim");
		actorFB.vx = 1 *Math.sign(mario.x-this.x);
		actorFB.vy = 1 *Math.sign(mario.y-this.y);
		
	}
	
});

gm.AddLogic("FireBallAnim", {
	sprite: "fireBall",
	sprite_speed: 5/gm.frameRate,
	bbox: gm.MakeBoundingBox(0, 0, 4, 4, 2, 2),
	
	Update: function(){
		
		this.UpdateMe();
		
		this.x += this.vx;
		this.y += this.vy;
		
		
		var mario = gm.FindByLogic("Mario");
		if (mario.CollideWith(this) != "none") {
			mario.GetHit();
		}
	}
	
});

gm.CreateScene("myEnemyScene", function() {
	
	gm.SetRoomData({
		width: 512,
		height: 256,
	});


	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	var actor = gm.CreateActor(100, 100, "Mario");
	gm.BecomePhysical(actor);
	

	var actor = gm.CreateActor(0, 0, "Camera");


	var actor = gm.CreateActor(200, 200, "PhaseBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 16, 0, 0);


	var room = gm.GetRoomData();
	var actor = gm.CreateActor(0, room.height-16, "SolidBlock");
	gm.BecomeSolid(actor);
	actor.bbox = gm.MakeBoundingBox(0, 0, room.width, 16, 0, 0);
	actor.xscale = room.width/64;
	actor.visible = false;
	
	var actor = gm.CreateActor(75, 240, "Goomba");
	var actor = gm.CreateActor(50, 50, "GreenKoopa");
	var actorG = gm.CreateActor(90,240, "GreenKoopaWings");
	gm.BecomePhysical(actorG);
	actorG.isOnGround = false;
	var actorP = gm.CreateActor(200,200, "Piranha");
	actorP.firstpos = 200;
	var actorGo = gm.CreateActor(60, 240, "GoombaWings");
	gm.BecomePhysical(actorGo);
	
	var actorPF = gm.CreateActor(150, 200, "PiranhaFire");
	actorPF.firstpos = 200;


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false, {
		sprite: "level1background" // *** Use that background sprite we made!
	});
});
//
//
gm.StartScene("myEnemyScene");
