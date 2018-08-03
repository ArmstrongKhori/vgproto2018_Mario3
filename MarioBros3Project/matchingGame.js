var r = 0;
var c = 0;


// Pulling sprite files for shop
il.AddTask("smallMinigameMario", "smallMinigameMario.png");
il.AddTask("largeMinigameMario", "largeMinigameMario.png");
il.AddTask("tanukiMinigameMario", "tanukiMinigameMario.png")
il.AddTask("shopbackground", "MiniGameBackground.png");
il.AddTask("table", "Table.png");
il.AddTask("toad", "Toad.png");



// Pulling sprites for the actual matching game 
il.AddTask("matchingGameBackground", "MatchingGameBackground.png");
il.AddTask("playerCursor", "playercursor.png");

// Creating Shop Sprites
gm.AddSprite("shopscene", "shopbackground", 0, 0, 256, 256, 1);
gm.AddSprite("table", "table", 0, 0, 96, 32, 1);
gm.AddSprite("smallMinigameM", "smallMinigameMario", 0, 0, 48, 64, 1);
gm.AddSprite("largeMinigameM", "largeMinigameMario", 0, 0, 48, 64, 1);
gm.AddSprite("tanukiMinigameM", "tanukiMinigameMario", 0, 0, 48, 64, 1);
gm.AddSprite("toad", "toad", 0, 0, 32, 48, 1);


// Creating Minigame Sprites
gm.AddSprite("MiniGameBackground", "matchingGameBackground", 0, 0, 256, 256, 1);
gm.AddSprite("cursor", "playerCursor", 0, 0, 32, 48, 1);




il.AddTask("cardsprites", "CardGameSprites.png");
il.AddTask("cardicons", "CardGameIcons.png");

gm.AddSprite("cardIdleDown", "cardsprites", 32*0, 0, 32, 48, 1);
gm.AddSprite("cardFlipping", "cardsprites", 32*0, 0, 32, 48, 5);
gm.AddSprite("cardIdleUp", "cardsprites", 32*4, 0, 32, 48, 1);

gm.AddSprite("cardIconTenCoin", "cardicons", 22*0, 0, 22, 32, 1);
gm.AddSprite("cardIconTwentyCoin", "cardicons", 22*1, 0, 22, 32, 1);
gm.AddSprite("cardIconMushroom", "cardicons", 22*2, 0, 22, 32, 1);
gm.AddSprite("cardIconFlower", "cardicons", 22*3, 0, 22, 32, 1);
gm.AddSprite("cardIconStar", "cardicons", 22*4, 0, 22, 32, 1);
gm.AddSprite("cardIconOneUp", "cardicons", 22*5, 0, 22, 32, 1);

//Pushing card sprites
var iconNumberSprites = new Array();
iconNumberSprites.push("cardIconTenCoin");
iconNumberSprites.push("cardIconTwentyCoin");
iconNumberSprites.push("cardIconMushroom");
iconNumberSprites.push("cardIconFlower");
iconNumberSprites.push("cardIconStar");
iconNumberSprites.push("cardIconOneUp");


gm.AddLogic("Card", {
	
	TENCOIN: 0,
	TWENTYCOIN: 1,
	MUSHROOM: 2,
	FLOWER: 3,
	STAR: 4,
	ONEUP: 5,


	faceUp: false,
	symbol: 0,

	sprite: "cardIdleDown",

	Flip: function() {
		if (!this.faceUp) {
			this.faceUp = true;
			//
			this.sprite = "cardIdleUp";
			this.tile.visible = true;
		}
		else  {
			this.faceUp = false; 
			//
			this.sprite = "cardIdleDown";
			this.tile.visible = false;
		}
	},
});


// Cursor moving logic
gm.AddLogic("Cursor", {
	cx: 0,
	cy: 0,
	fails: 0,
	matches: 0,
	delay: 0,
	sprite: "cursor",
	Update: function() {

		



		if (this.delay > 0) {
			this.delay -= 1;

			if (this.delay <= 0) {
				if(this.storeFirst.symbol == this.storeSecond.symbol){
					//giveItem();
					this.matches += 1;
				}else{

					this.storeFirst.Flip();
					this.storeSecond.Flip();

					this.fails += 1;
				}

				this.storeFirst = undefined;
				this.storeSecond = undefined;
			}
		}
		else
		{
		// Moving the cursor
		if(ct.KeyWasPressed(ct.KEY_LEFT)) {
			this.cx -= 1;
			c--;
		}
		if(ct.KeyWasPressed(ct.KEY_RIGHT)) {
			this.cx += 1;
			c++;
		}
		if(ct.KeyWasPressed(ct.KEY_DOWN)) {
			this.cy += 1;
			r++;
		}
		if(ct.KeyWasPressed(ct.KEY_UP)) {
			this.cy -= 1;
			r--;
		}

		// Boundaries
		if(this.cx > 5){
			this.cx = 0;
			c = 0;
		}
		if(this.cx < 0){
			this.cx = 5;
			c = 4;
		}
		if(this.cy > 2){
			this.cy = 0;
			r = 0;

		}
		if(this.cy < 0){
			this.cy = 2;
			r = 1;
		}
		

		//this.cx = (this.cx % 6 +6) % 6;
		//this.cy = (this.cy % 3 +3) % 3;

		// Setting the distance of cursor movement
		this.x = 25+this.cx*32;
		this.y = 32+this.cy*48;	

			if(ct.KeyWasPressed(ct.KEY_X)) {
				for (var i = 0; i<this.everyCard.length; i++) {
					var card = this.everyCard[i];


					if(card.faceUp == false){
						if (card.cx == this.cx && card.cy == this.cy) {
							card.Flip();


							if (this.storeFirst != undefined){
								this.storeSecond = card;
							}else{
								this.storeFirst = card;
							}
							if (this.storeSecond != undefined){
								this.delay = 30;
							}
						}

						// Losing the game		
						
					}
				} // for
			} // X key
		}

		if(this.fails == 2){
			gm.StartScene("shop");
		}
		if(this.matches == 9){
			gm.StartScene("shop");
		}

	}
});








// Create matching game scene
gm.CreateScene("matchingGame", function() {

	var matchingGameBackground = gm.CreateTile(0, 0, false);
	matchingGameBackground.sprite = "MiniGameBackground";


	var map =  [[4,1,5,4,5,0],
				[3,0,2,3,0,1],
				[3,4,2,0,4,3]];

	// Makes unflipped cards for every row and column
	var allCards = new Array();
	for(var xx = 0; xx < 6; xx++){
		for(var yy = 0; yy < 3; yy++){
			var cardFlip = gm.CreateActor(25 +32*xx, 32 +48*yy, "Card");
			cardFlip.cx = xx;
			cardFlip.cy = yy;
			cardFlip.symbol = map[yy][xx];

			allCards.push(cardFlip);

			cardFlip.tile = gm.CreateTile(cardFlip.x +5,cardFlip.y+9,true, {
				sprite: iconNumberSprites[cardFlip.symbol],
				visible: false,
			});
		}
	}


	var cursor = gm.CreateActor(25, 32, "Cursor");
	cursor.everyCard = allCards;
});






// Creating shop scene
gm.CreateScene("shop", function() {	

	var shopBackground = gm.CreateTile(0, 0, false);
	shopBackground.sprite = "shopscene";

	var table = gm.CreateTile(80, 104, true);
	table.sprite = "table"
	
	var toad = gm.CreateTile(192, 88, true);
	toad.sprite = "toad";

	//var small = gm.CreateTile(16, 72, true);
	//small.sprite = "smallMinigameM";

	//var large = gm.CreateTile(16, 72, true);
	//large.sprite = "largeMinigameM";

	var tanuki = gm.CreateTile(16, 72, true);
	tanuki.sprite = "tanukiMinigameM";

	var actor = gm.CreateActor(0, 0);
	// Starts minigame if the X key is pressed
	actor.Update = function() {
		if(ct.KeyWasPressed(ct.KEY_X)) {gm.StartScene("matchingGame"); }
	}

});



// Starts the minigame section
gm.StartScene("shop");
// Will add item and amount of points to HUD depending on the 
// item selected
/* function giveItem() {
	if(this.storeFirst.symbol && this.storeFirst.symbol == 0){
	// 
	}else if(this.storeFirst.symbol && this.storeFirst.symbol == 1){

	}else if(this.storeFirst.symbol && this.storeFirst.symbol == 2){

	}else if(this.storeFirst.symbol && this.storeFirst.symbol == 3){

	}else if(this.storeFirst.symbol && this.storeFirst.symbol == 4){

	}else if(this.storeFirst.symbol && this.storeFirst.symbol == 5)

} */

