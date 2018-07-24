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
	this._type = "sprite";
	//
	//
	//
	this._image = il.get(this.id);



	this.Draw = function(context, x, y) {
		context.drawImage(this._image, this.sx, this.sy, this.sw, this.sh, x, y, this.sw, this.sh);
	};
});