var Tile = (function(x, y) {
	this.x = x;
	this.y = y;
	//
	//
	this.sprite = undefined;
	//
	//
	this._type = "tile";



	gm._RegisterTile(this);
});
