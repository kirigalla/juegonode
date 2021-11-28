
function TileMeta(ancho, alto, color, mapa, dx, dy){
	Tile.call(this, ancho, alto, true, color);
}
TileMeta.prototype=new Tile;
	