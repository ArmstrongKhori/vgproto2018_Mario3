var Sprite = (function(imageID, sourceX, sourceY, sourceWidth, sourceHeight, numberOfFrames) {
	this.id = imageID;
	this.sx = sourceX;
	this.sy = sourceY;
	this.sw = sourceWidth;
	this.sh = sourceHeight;
	this.frameCount = numberOfFrames;
	//
	//
	this.frame = 0;
	//
	//
	//
	this._image = il.get(this.id);



	this.Draw = function(context, x, y) {
		context.drawImage(this._image, this.sx, this.sy, this.sw, this.sh, 0, 0, SIZE, SIZE);
	};
	//
	//
	//
	gm._RegisterSprite(this);
});