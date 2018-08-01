


/*
gm.AddLogic("Camera", {
    Update: function() {
    }
});
*/




/*var startCol = Math.floor(this.camera.x / map.tsize);
var endCol = startCol + (this.camera.width / map.tsize);
var startRow = Math.floor(this.camera.y / map.tsize);
var endRow = startRow + (this.camera.height / map.tsize);

var offsetX = -this.camera.x + startCol * map.tsize;
var offsetY = -this.camera.y + startRow * map.tsize;

for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
        var tile = map.getTile(c, r);
        var x = (c - startCol) * map.tsize + offsetX;
        var y = (r - startRow) * map.tsize + offsetY;
        if (tile !== 0) { // 0 => empty tile
            this.ctx.drawImage(
                this.tileAtlas, // image
                (tile - 1) * map.tsize, // source x
                0, // source y
                map.tsize, // source width
                map.tsize, // source height
                Math.round(x),  // target x
                Math.round(y), // target y
                map.tsize, // target width
                map.tsize // target height
            );
        }
    }
}*/
