var r = 0
var c = 0

var SECOND = gm.frameRate;



il.AddTask("TitleScreen", "TitleScreen.png");
il.AddTask("LogoAnimation", "threeLogo.png");
il.AddTask("SelectCursor", "playerSelect.png");


gm.AddSprite("background", "TitleScreen", 0, 0, 256, 256, 1);
gm.AddSprite("threeLogo", "LogoAnimation", 0, 0, 46, 44, 4);
gm.AddSprite("playerselect", "SelectCursor", 0, 0, 7, 8, 1);


gm.CreateScene("titleScreen", function(){
	var titleBackground = gm.CreateTile(0, 0, false);
		titleBackground.sprite = "background";

	var threeLogo = gm.CreateActor(112, 93, {
		sprite: "threeLogo",
		sprite_index: 0,
		sprite_speed: 8/SECOND,
		Update: function() {
			var sprite;
			if (typeof this.sprite == "string") { sprite = gm.GetSprite(this.sprite); }
			else { sprite = this.sprite; }
			 


			this.sprite_index += this.sprite_speed;
			//
			if (this.sprite_index >= sprite.frameCount-1) {
				this.sprite_index = sprite.frameCount-1;
				this.sprite_speed *= -1;
			}

			if (this.sprite_index < 0) {
				this.sprite_index = 0;
				this.sprite_speed *= -1;
			}



			// this.UpdateMe();
		}
	});

	



	var allOptions = new Array();
		for(var yy = 0; yy < 2; yy++){
			var selectCursor = gm.CreateActor(32 +48*yy);
			selectCursor.cy = yy;

			allOptions.push(selectCursor);

			selectCursor.tile = gm.CreateTile(selectCursor.x +5,selectCursor.y+9,true, {
				visible: false,
			});
		}



	var playercursor = gm.CreateActor(84, 144, "selectCursor");



	



});

gm.AddLogic("selectCursor", {

	cy: 0,
	sprite: "playerselect",
	Update: function() {

		
		// Moving the cursor
		if(ct.KeyWasPressed(ct.KEY_UP)) {
			this.cy -= 1;
			r--;
		}	
		if(ct.KeyWasPressed(ct.KEY_DOWN)) {
			this.cy += 1;
			r++;
		}
		

		// Boundaries
		if(this.cy > 1){
			this.cy = 0;
			r = 0;

		}
		if(this.cy < 0){
			this.cy = 1;
			r = 1;
		}

		// Setting the distance of cursor movement
		this.y = 144+this.cy*16;	

	}
});

gm.StartScene("titleScreen")

