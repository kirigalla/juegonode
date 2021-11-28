function Personaje(mundo, ancho, alto, sprite){
	this.mundo=mundo;
	this.ancho=ancho;
	this.alto=alto;
	this.x=0;
	this.y=0;
	
	this.mapa=0;
	this.dx=0;
	this.dy=0;
	
	this.velocidad=0.004;
	this.sprite=sprite;
	this.direccion="abajo";
	this.spriteindice=0;
	this.transicionSprite=50;
	this.transicion=0;
	
	this.tilesProhibidos=[];
}
//posisionar a los jugadores en el mapa
Personaje.prototype.situar=function(mapa,x,y){
	this.mapa=mapa;
	this.x=x;
	this.y=y;
};

Personaje.prototype.esTileProhibido=function (px,py){
	var n=this.tilesProhibidos.length;
	for (var i=0;i<n;i++)
	{
		if (this.mundo.isTipoTile(this.tilesProhibidos[i],this.mapa,px,py))
		{
			return true;
		}
	}
	return false;
};
Personaje.prototype.posicionValida=function(px,py){
	var ancho=this.ancho/(2*mundo.anchoCelda);
	var alto=this.alto/(2*mundo.altoCelda);
	
	if (!mundo.casillaCaminable(this.mapa,px-ancho,py-alto) || this.esTileProhibido(px-ancho,py-alto))
	{
		return false;
	}
	if (!mundo.casillaCaminable(this.mapa,px+ancho,py-alto) || this.esTileProhibido(px+ancho,py-alto))
	{
		return false;
	}
	if (!mundo.casillaCaminable(this.mapa,px-ancho,py+alto) || this.esTileProhibido(px-ancho,py+alto))
	{
		return false;
	}
	if (!mundo.casillaCaminable(this.mapa,px+ancho,py+alto) || this.esTileProhibido(px+ancho,py+alto))
	{
		return false;
	}
	return true;
	
};
Personaje.prototype.dentroTile=function(){
	var tx=parseInt(this.x);
	var ty=parseInt(this.y);
	var ancho=this.ancho/(2*mundo.anchoCelda);
	var alto=this.alto/(2*mundo.altoCelda);
	
	if (tx!=parseInt(this.x-ancho) || ty!=parseInt(this.y-alto))
	{
		return false;
	}
	if (tx!=parseInt(this.x+ancho) || ty!=parseInt(this.y-alto))
	{
		return false;
	}
	if (tx!=parseInt(this.x-ancho) || ty!=parseInt(this.y+alto))
	{
		return false;
	}
	if (tx!=parseInt(this.x+ancho) || ty!=parseInt(this.y+alto))
	{
		return false;
	}
	return true;
};
Personaje.prototype.colisiona=function(otro){
	var tasaPenetracion=0.4;
	var anchoThis=this.ancho/(2*mundo.anchoCelda)*(1-tasaPenetracion);
	var altoThis=this.alto/(2*mundo.altoCelda)*(1-tasaPenetracion);
	var anchoOtro=otro.ancho/(2*mundo.anchoCelda)*(1-tasaPenetracion);
	var altoOtro=otro.alto/(2*mundo.altoCelda)*(1-tasaPenetracion);
	
	if (this.x + anchoThis < otro.x - anchoOtro) {
		return;
	}
	if (this.y + altoThis < otro.y - altoOtro) {
		return;
	}
	if (this.x - anchoThis > otro.x + anchoOtro) {
		return;
	}
	if (this.y - altoThis > otro.y + altoOtro) {
		return;
	}
	
	this.colisionado(otro);
	otro.colisionado(this);
};
Personaje.prototype.mover=function(delta){
	var nuevaDireccion="";
	if (this.dx==0 && this.dy==0) return false;
	var px=this.x+this.dx*this.velocidad*delta;
	var py=this.y+this.dy*this.velocidad*delta;
	
	if (!this.posicionValida(px,this.y)) px=this.x;
	if (!this.posicionValida(this.x,py)) py=this.y;
	
	if (this.x==px && this.y==py) return false;
	
	this.x=px;
	this.y=py;
	if (this.dx>0)
	{
		nuevaDireccion="derecha";
	}
	if (this.dx<0)
	{
		nuevaDireccion="izquierda";
	}
	if (this.dy>0)
	{
		nuevaDireccion="abajo";
	}
	if (this.dy<0)
	{
		nuevaDireccion="arriba";
	}
	if (this.direccion!=nuevaDireccion)
	{
		this.transicion=0;
		this.spriteindice=0;
		this.direccion=nuevaDireccion;
	}
	this.transicion+=delta;
	if (this.transicion>this.transicionSprite)
	{
		this.transicion=0;
		this.spriteindice=(this.spriteindice+1)%this.sprite.getNumSprites(nuevaDireccion);
	}
	if (this.dentroTile())
	{
		this.sobreTile(this.mundo.getTile(this.mapa,this.x,this.y));
	}
	return true;
};
Personaje.prototype.dentroRango=function(xIni,yIni,xFin,yFin){
	return (this.x >= xIni && this.x <= xFin && this.y >= yIni && this.y <= yFin);
};
Personaje.prototype.dibujar=function(contexto,desfaseX,desfaseY){
	contexto.save();
	contexto.translate((this.x-desfaseX)*mundo.anchoCelda,(this.y-desfaseY)*mundo.altoCelda);
	
	this.sprite.dibujar(contexto,this.ancho,this.alto,this.direccion,this.spriteindice);
	
	contexto.restore();
};
//Métodos abstractos
//A implementar es las clases hijas
Personaje.prototype.sobreTile=function(tile){};
Personaje.prototype.colisionado=function(otro){};
	