

// *** I am adding a new "Image" file that we can use later. I have id'd it "mario"... Remember that.

il.AddTask("Items", "shroomsAndLeaves.png");

il.AddTask("questionBlock2", "questionBlock2.png");

il.AddTask("coin2", "coin2.png");

il.AddTask("pBlock", "pBlock.png");

il.AddTask("emptyBlock", "emptyBlock.png");

il.AddTask("reverseLeaf", "leaf.png");

il.AddTask("brick", "brick.png");

il.AddTask("brickCrumb", "brickCrumb.png")

gm.AddSprite("brickCrumb", "brickCrumb", 0, 0, 9, 9, 4);

gm.AddSprite("brick", "brick", 0, 0, 16, 16, 4);

gm.AddSprite("reverseLeaf", "reverseLeaf", 16, 0, 16, 14, 1);

gm.AddSprite("emptyBlock", "emptyBlock", 0, 0, 16, 16, 1);

gm.AddSprite("pBlock", "pBlock", 0, 0, 16, 16, 2);

gm.AddSprite("pBlockDown", "pBlock", 32, 0, 16, 16, 1);

gm.AddSprite("coin2", "coin2", 0, 0, 16, 16, 5);

gm.AddSprite("questionBlock2", "questionBlock2", 0, 0, 16, 16, 4);
//
// *** Now, I am creating "sprites" by "cutting out" parts of an image. Remember that image earlier? We're using that as reference!

gm.AddSprite("mushroom", "Items", 0, 0, 16, 16, 1);
gm.AddSprite("leaf", "reverseLeaf", 0, 0, 16, 16, 2);
gm.AddSprite("1up", "Items", 32, 0, 16, 16, 1);

gm.AddLogic("SolidBlock", {
	sprite: "questionBlock2",

	solid: true,
	// *** Our sprite is a bit big, so I'm shrinking the sprite down!
	bbox: undefined,
});

// Parameters: "id for later use", "id of image we're using", source x, source y, source width, source height, number of frames
// *** Important note: For now, it only works for spritesheets that go "horizontally" and have no gaps... It can't do "up and down" yet.



gm.AddLogic("leaf", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

	Launch: function() {
		this.ay = 900/SECOND/SECOND;
		this.vy = -11.5;

		this.sprite = "leaf";
		this.sprite_index = 0;
		this.sprite_speed = 3/SECOND;
	},
	Update: function(){
		
		var direction = (this.x <= this.myBlock.x + 16);

		/*var RIGHT = 1;
		var LEFT = 2;*/

		if (this.vy > 10/SECOND) {
			this.vy = 10/SECOND;
		}

		/*if (this.y > 16) {
			this.y ++;
			this.x ++;*/

		/*if (this.y > 16){

			switch (direction){

				case RIGHT:
					this.vx += +1;
					this.vy += +1;
					break;

				case LEFT:
					this.vx += -1;
					this.vy += +1;	
					break;*/
			//}
		//}

		if (this.isActive == true){

			if (direction) {
				this.x += 1;
				//this.out = true;

			}else{
			 	(this.x >= 16);
				this.x += -16;
			}
		}

		//need to add if statements here to make the animation of the leaf work




		this.DoPhysics();
		this.UpdateMe();

	}
});


gm.AddLogic("coin2", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),
	sprite: "coin2",
	sprite_index: 0,
	sprite_speed: 8/SECOND,

	Launch: function() {
		this.ay = 900/SECOND/SECOND;
		this.vy = -11.5;


		this.poofTimer = (Math.abs(this.vy) / this.ay) *1.8;
	},
	Update: function(){

		if (this.poofTimer > 0) {
			this.poofTimer -= 1;

			if (this.poofTimer <= 0) {
				this.Destroy();
			}
		}

		//add if statements for coin logic
		
		this.DoPhysics();
		this.UpdateMe();
	}
});


gm.AddLogic("Mushroom", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

//mushrooms update function. all logic for the mushroom goes in this update function
	Update: function(){
		this.sprite = "mushroom";
		this.sprite_index = 0;
		
		var isOutOfBox = (this.y <= this.myBlock.y - 16);
		if (this.isActive == true){

			if (isOutOfBox) {
				//these two values are affecting the way the mushroom moves and falls. need to adjust numbers
				this.ay = 4670/SECOND/SECOND;
				this.vx = 1.5;
				this.out = true;
				//this.vx = 1;
				//console.log("if");

			}else{
				this.vy = -1;
				//console.log("else");
			}


		}
		if (ct.KeyIsDown(ct.KEY_Z)){
			this.isActive = true;


		}

		//updateMe must be the last thing in the function

		this.DoPhysics(this.out);
		//
		this.UpdateMe();
		},

		BumpInto: function(bumpObj, side) {
		if (side === "bottom" && this.vy >= 0) {
			this.vy = 0;
			// this.ay = 0; 
			
			this.isOnGround = true;
			


			// this.vy = -this.gravity;
		} else if (side === "top" && this.vy <= 0) {
			this.vy = 0;

			
		} else if (side === "right" && this.vx >= 0) {
			this.vx *= -1;
			this.ax = 0;

		} else if (side === "left" && this.vx <= 0) {
			this.vx *= -1;
			this.ax = 0;

		}

		if (side !== "none") {
			
		}

		/*
		if (side !== "bottom" && this.vy > 0) {
			this.isOnGround = false;
		}
		*/
		}
	});

gm.AddLogic("1up", {
	isActive: false,
	out: false,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),

//mushrooms update function. all logic for the mushroom goes in this update function
	Update: function(){
		this.sprite = "1up";
		this.sprite_index = 0;
		
		var isOutOfBox2 = (this.y <= this.myBlock.y - 16);
		if (this.isActive == true){

			if (isOutOfBox2) {
				//these two values are affecting the way the mushroom moves and falls. need to adjust numbers
				this.ay = 4670/SECOND/SECOND;
				this.vx = 1.5;
				this.out = true;
				//this.vx = 1;
				//console.log("if");

			}else{
				this.vy = -1;
				//console.log("else");
			}
			this.DoPhysics(this.out);
			this.UpdateMe();
				}

			},
			BumpInto: function(bumpObj, side) {
		if (side === "bottom" && this.vy >= 0) {
			this.vy = 0;
			// this.ay = 0; 
			
			this.isOnGround = true;
			


			// this.vy = -this.gravity;
		} else if (side === "top" && this.vy <= 0) {
			this.vy = 0;

			
		} else if (side === "right" && this.vx >= 0) {
			this.vx *= -1;
			this.ax = 0;

		} else if (side === "left" && this.vx <= 0) {
			this.vx *= -1;
			this.ax = 0;

		}

		if (side !== "none") {
			
		}

		/*
		if (side !== "bottom" && this.vy > 0) {
			this.isOnGround = false;
		}
		*/
	}

});


gm.AddLogic("pBlock",{
	isActive: false,
	out: false,
	pSwitch: true,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),
	sprite: "pBlock",
	sprite_index: 0,
	sprite_speed: 8/SECOND,



	Stomped: function() {
		this.TriggerSwitch();
	},
	TriggerSwitch: function() {
		
		this.sprite = "pBlockDown";
		this.solid = false;

		
	},

	ChangeBlock: function(){
		if (this.sprite == "pBlockDown"){
			this.brickOne.sprite = "coin2";
			this.solid = false;
		}
	},

	Update: function(){
		

		if (this.y <= this.myBlock.y - 16) {
			this.out = true;
		}

		var pBlockPress = (this.y <= this.myBlock.y - 16);
		if (this.isActive == true){

			if (this.out){

				// this.ay = 800/SECOND/SECOND;
				this.vx = 0;
				this.vy = 0;
				this.out = true;
			}else{
				this.vy = -1;
			}
		}

		this.DoPhysics();
		this.UpdateMe();
	}
});

gm.AddLogic("questionBlock2", {
	isActive: true,
	startingY: this.y,
	sprite_index: 0,
	sprite_speed: 8/gm.frameRate,
	sprite: "questionBlock2",
	type: undefined,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),


	Struck: function(mario) {
		if (mario.state == mario.STATE_SMALL) {
			this.y += -8;
			this.blockWasHit = SECOND*0.1;

			this.ChangeBlock();
		}
	},
	ChangeBlock: function(){
		if (this.isActive) {
			this.isActive = false;

			this.sprite = "emptyBlock";
			//
			// *** We create an "actor"-- These are objects that can "interact" with the engine.
			switch(this.type){
				case "mushroom":
					var mushroom = gm.CreateActor(this.x, this.y, "Mushroom");
					gm.BecomePhysical(mushroom);
			
					mushroom.myBlock = this;
					mushroom.isActive = true;
					break;

				case "coin2":
					var coin2 = gm.CreateActor(this.x, this.y, "coin2");
					gm.BecomePhysical(coin2);


					coin2.myBlock = this;
					coin2.isActive = true;

					coin2.Launch();
					break;

				case "1up":
					var oneUp = gm.CreateActor(this.x, this.y, "1up");
					gm.BecomePhysical(oneUp);

					oneUp.myBlock = this;
					oneUp.isActive = true;
					break;

				case "leaf":
					var leaf = gm.CreateActor(this.x, this.y, "leaf");
					gm.BecomePhysical(leaf);

					leaf.myBlock = this;
					leaf.isActive = true;

					leaf.Launch();
					break;

				case "pBlock":
					var pBlock = gm.CreateActor(this.x, this.y, "pBlock");
					gm.BecomePhysical(pBlock);
					gm.BecomeSolid(pBlock);

					pBlock.myBlock = this;
					pBlock.isActive = true;
					break;

				default: 
					console.log("no type");
					break;
			}
			
		}
	},

	Update: function(){
		//this.sprite = "questionBlock2";
		if (this.blockWasHit > 0) {
			this.blockWasHit -= 1;

			if (this.blockWasHit <= 0) {
				this.y += 8;
				this.blockWasHit = false;
				
			}
			
		
	}
	
		
		//if (ct.KeyIsDown(ct.KEY_Z)){
			//this.sprite = "emptyBlock"; 
		
		
		this.UpdateMe();
	}
});

gm.AddLogic("brick", {
	isActive: true,
	startingY: this.y,
	sprite_index: 0,
	sprite_speed: 8/SECOND,
	sprite: "brick",
	type: undefined,
	bbox:gm.MakeBoundingBox(0, 0, 16, 16, 0, 0),


	Update: function() {
		if (this.blockWasHit > 0) {
			this.blockWasHit -= 1;

			if (this.blockWasHit <= 0) {
				this.y += 8;
				this.blockWasHit = false;
			}
		}
	},
	Struck: function(mario){
		if (mario.state == mario.STATE_SMALL) {
			this.y += -8;
			this.blockWasHit = SECOND*0.1;
		}else{
			this.Destroy();
		}
	},


});
gm.AddLogic("brickCrumb", {


});


// gm.AddLogic()


gm.CreateScene("matthew_example", function() {
	// *** We create an "actor"-- These are objects that can "interact" with the engine.
	//var actor = gm.CreateActor(100, 100, "Mario");

	gm.SetRoomData({
		width: 512,
		height: 256,
	});


	var mario = gm.CreateActor(40, 0, "Mario");
	gm.BecomePhysical(mario);


	// *** We create a "tile"-- These are objects that exists purely for "visual" purposes and (usually) do not interact with Actors (IE: Backgrounds, etc...)
	var background = gm.CreateTile(0, 0, false, {
		sprite: "level1background" // *** Use that background sprite we made!
	});

	

	var coin = gm.CreateActor(150, 70);
	coin.sprite = "coin2";
	coin.sprite_speed = 8/gm.frameRate;

	var pBlock = gm.CreateActor(100,134);
	pBlock.sprite = "pBlock";
	pBlock.sprite_speed = 8/gm.frameRate;

	pBlock.Update = function(){
		this.UpdateMe();

		if (ct.KeyIsDown(ct.KEY_X)){ this.sprite = "pBlockDown";}
	}

	/*var reverseLeaf = gm.CreateActor(50,150);
	reverseLeaf.sprite = "reverseLeaf";
	reverseLeaf.sprite_speed = 8/gm.frameRate;*/

	/*var leaf = gm.CreateActor(50,150);
	leaf.sprite = "leaf";
	leaf.sprite_speed = 6/gm.frameRate;*/

	var oneUp = gm.CreateActor(200,200);
	oneUp.sprite = "1up";
	oneUp.sprite_speed = 8/gm.frameRate;

	var brickCrumb = gm.CreateActor(170, 160);
	brickCrumb.sprite = "brickCrumb";
	brickCrumb.sprite_speed = 8/SECOND;

	var brickOne = gm.CreateActor(175, 170, "brick");
	brickOne.sprite_speed = 5/SECOND;
	gm.BecomeSolid(brickOne);
	brickOne.name = "brick";
	brickOne.type = "brick";

	//mushroom.sprite = "mushroom"; // *** We're using Mario's "walking" sprite-- You know, the one we created earlier!
	//mushroom.sprite_speed = 12/gm.frameRate;
	var qBlock = gm.CreateActor(100,180, "questionBlock2");
	qBlock.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlock);
	qBlock.name = "question block";
	qBlock.type = "mushroom";

	var qBlockTwo = gm.CreateActor(148,180, "questionBlock2");
	qBlockTwo.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockTwo);
	qBlockTwo.name = "question block";
	qBlockTwo.type = "coin2";

	var qBlockThree = gm.CreateActor(50,180, "questionBlock2");
	qBlockThree.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockThree);
	qBlockThree.name = "question block";
	qBlockThree.type = "leaf";

	var qBlockFour = gm.CreateActor(116,180, "questionBlock2");
	qBlockFour.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockFour);
	qBlockFour.name = "question block";
	qBlockFour.type = "1up";

	var qBlockFive = gm.CreateActor(66,180, "questionBlock2");
	qBlockFive.sprite_speed = 8/gm.frameRate;
	gm.BecomeSolid(qBlockFive);
	qBlockFive.name = "question block";
	qBlockFive.type = "pBlock";

	
	

	 // *** Every "frame", this is how many frames we move forward in the sprite's animation. This code says "12 frames per second".

	var actor = gm.CreateActor(200, 256-32, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 16, 0, 0);
	actor.xscale = 1;
	actor.visible = true;
	actor.name = "turn around block right";

	var actor = gm.CreateActor(0, 256-32, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 16, 16, 0, 0);
	actor.xscale = 1;
	actor.visible = true;
	actor.name = "turn around block left";

	
	var actor = gm.CreateActor(0, 256-16, "SolidBlock");
	gm.BecomeSolid(actor);

	actor.bbox = gm.MakeBoundingBox(0, 0, 1000, 16, 0, 0);
	actor.xscale = 500/64;
	actor.visible = false;
	actor.name = "ground block";
});

//
//
gm.StartScene("matthew_example");
