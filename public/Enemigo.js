function Enemigo(mundo, ancho, alto){
	Personaje.call(this, mundo, ancho, alto, Sprites.get("enemigo"));
	this.velocidad=0.0015;
	this.tilesProhibidos=[TilePuerta];
	this.tiempoAcumulado=0;
	this.tiempoCambio=2000;
}

Enemigo.prototype=new Personaje;
Enemigo.prototype.calcularDireccion=function(alAzar){
	if (alAzar)
	{
		var azar=Math.round(Math.random()*3);
		switch (azar)
		{
			case 0:
				this.dx=-1;
				this.dy=0;
				break;
			case 1:
				this.dx=1;
				this.dy=0;
				break;
			case 2:
				this.dx=0;
				this.dy=-1;
				break;
			case 3:
				this.dx=0;
				this.dy=1;
				break;
		}
	}
	else
	{
		this.dx*=-1;
		this.dy*=-1;
	}
};
Enemigo.prototype.mover=function(delta){
	if (!Personaje.prototype.mover.call(this,delta) || this.tiempoAcumulado>this.tiempoCambio)
	{
		this.tiempoAcumulado=0;
		this.calcularDireccion(true);
	}
	else
	{
		this.tiempoAcumulado+=delta;
	}
};
Enemigo.prototype.colisionado=function(otro){
	this.calcularDireccion(false);
};