
var il = new ImageLoader();
//
var gm = new GameManager();
gm.imageLoader = il;


$(document).ready(function(){ 
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");


	gm._canvas = canvas;
	gm._context = context;


	gm.SetUpGame();
});