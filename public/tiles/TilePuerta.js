
function TilePuerta(ancho, alto, color, mapa, dx, dy){
	Tile.call(this, ancho, alto, true, color);
	this.mapa=mapa;
	this.dx=dx;
	this.dy=dy;
}
TilePuerta.prototype=new Tile;
	