var Actor = (function(x, y) {
	this.x = x;
	this.y = y;
	//
	//
	this.sprite = undefined;
	//
	//
	this._type = "actor";



	gm._RegisterActor(this);
});
