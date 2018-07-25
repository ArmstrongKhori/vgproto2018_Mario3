var ImageLoader = (function() {
	
	this.assetsToLoad = new Array();
	this.assetsLoaded = 0;
	this.assetsTotal = 0;

	this.images = new Array();



	this.AddTask = function(thisKey, thisFile) {
		var image = new Image();
		image.src = thisFile;
		//
		image.addEventListener("load", this.LoadHandler, false);
		//
		this.assetsToLoad.push(image);
		this.images[thisKey] = image;
		//
		//
		this.assetsTotal++;
	};

	this.LoadHandler = function(event) {
		// ??? <-- I wish I could reference "this" instead...
		il.assetsLoaded++;
		if (il.assetsLoaded === il.assetsTotal) {
			gm.SetGameState(gm.PLAYING);
		}
	};


	this.get = function(thisKey) {
		return this.images[thisKey];
	}
});
