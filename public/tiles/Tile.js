function Tile(ancho, alto, caminable, color){
	this.ancho=ancho;
	this.alto=alto;
	this.caminable=caminable;
	this.color=color;
}
/*
Tile.prototype.dibujar=function(contexto,x,y){
	
	contexto.fillRect(this.ancho*x,this.alto*y,this.ancho,this.alto);
	contexto.drawImage(this.color,this.ancho*x,this.alto*y);
};
*/
Tile.prototype.dibujar=function(contexto,x,y){
	contexto.save();
    contexto.fillStyle = "white";
    contexto.fillRect(this.ancho*x,this.alto*y,this.ancho,this.alto);
    contexto.fillStyle = this.color;
    contexto.fillRect(this.ancho*x+1,this.alto*y+1,this.ancho-1,this.alto-1);
    contexto.restore();
};

	