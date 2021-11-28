function Jugador(mundo, ancho, alto){
	Personaje.call(this, mundo, ancho, alto, Sprites.get("jugador"));
	this.arriba=false;
	this.abajo=false;
	this.derecha=false;
	this.izquierda=false;
}
Jugador.prototype=new Personaje;
Jugador.prototype.mover=function(delta){
	this.dx=0;
	this.dy=0;
	if (this.arriba)
	{
		this.dy-=1;
	}
	if (this.abajo)
	{
		this.dy+=1;
	}
	if (this.izquierda)
	{
		this.dx-=1;
	}
	if (this.derecha)
	{
		this.dx+=1;
	}
	Personaje.prototype.mover.call(this,delta);
};

Jugador.prototype.sobreTile=function(tile){
	if (this.mundo.isTipoTile(TilePuerta,this.mapa,this.x,this.y))
	{
		this.mundo.posicionarMapa(tile.mapa,tile.dx,tile.dy);
	}
	else if (this.mundo.isTipoTile(TileMeta,this.mapa,this.x,this.y))
	{
		this.mundo.jugadorMeta();
	}
};

Jugador.prototype.colisionado=function(otro){
	this.mundo.jugadorMuerto();
};