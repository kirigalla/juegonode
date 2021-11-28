function Mundo(idCanvas, idBoton){
	this.canvas=document.getElementById(idCanvas);
	this.contexto=this.canvas.getContext('2d');
	
this.anchoCelda=60; 
this.altoCelda=60;
this.panoramaScroolAncho=15; //PARA EL SCROOL
this.panoramaScroolAlto=10;  //PARA EL SCROoL
this.canvas.width=this.anchoCelda*this.panoramaScroolAncho;
this.canvas.height=this.altoCelda*this.panoramaScroolAlto;

    var imgGrassMid = new Image();
    imgGrassMid.src = 'img/grassMid.png';
    var imgLadderMid = new Image();
    imgLadderMid.src = 'img/ladder_mid.png';
	var facebook = new Image();
    facebook.src = 'img/facebook.png';
	var puerta = new Image();
    puerta.src = 'img/puerta.png';
	var mundial = new Image();
    mundial.src = 'img/facebook.png';
	var nodeicon = new Image();
    nodeicon.src = 'img/nodeicon.png';
	

	this.dimencionesPuertas=[
new Tile(this.anchoCelda,this.altoCelda,true,imgLadderMid),//0
new Tile(this.anchoCelda,this.altoCelda,false,imgGrassMid),	//1
new TilePuerta(this.anchoCelda,this.altoCelda,facebook,0,25.5,0.5), //2
new TilePuerta(this.anchoCelda,this.altoCelda,facebook,0,0.5,0.5), //3
new TilePuerta(this.anchoCelda,this.altoCelda,facebook,0,0.5,6.5), //4
new TilePuerta(this.anchoCelda,this.altoCelda,facebook,0,7.5,0.5), //5
new TileMeta(this.anchoCelda,this.altoCelda,mundial) //6
	];
	
this.mapa=[];
this.iniciarEnemigos=[];
	
	this.mapa.push( //mapa principal 0
	[
		[2, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
		[5, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
		[1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
		[1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]);
	this.iniciarEnemigos.push( // mapa y ubicacion de enemigos 0
	[
		[2.5,10.5],
		[2.5,15.5],
		[6.5,9.5],
		[12.5,15.5],
		[11.5,5.5],
		[19.5,6.5],
		[23.5,9.5],
		[23.5,14.5]
	]);
	
	//pequeño iniciacion de variables en nuestro constructor
	this.personajes=[]; // cargamos los dos personajes
	this.fijarMapa=0;   // fijamos el mapa donde trabajar en pos 0
	this.jugador;		// alistamos al jugador
	this.intervalo= null;// el intervalo para el mov
	this.mapaCambiado=true;
	this.finalPartida=false;//notifica el fin de la partida
	this.jMuerto=false;		//damos valor de false a nuestro personaje
	//damos inicio al jugador
	this.iniciarJugador();
	this.posicionarMapa(0,6.5,4.5); // alistamos el mapa a cargar (nºmapa,canvasposins,canvaspossup)	
}//pocicion del juagador ¿mapa,px,py?

//se detiene cuando se pierde o gana la partida
Mundo.prototype.detener=function(mapa,px,py){
	clearInterval(this.intervalo);
	this.intervalo=null;
};
// y se reanuda cuando se presiona enter -->
Mundo.prototype.reanudar=function(){
	var self=this;
	this.tiempoTranscurrido=new Date().getTime();
	this.intervalo=setInterval(function(){self.loop()},0.25);
};

/* este metodo pociciona el mapa los enemigos y el mapa
para no hacer bucle inecesario en el loop */

Mundo.prototype.posicionarMapa=function(mapa,px,py){
	this.detener();
	
	//this.mapaCambiado=!this.mapaCambiado;
	this.fijarMapa=mapa;
	this.jugador.situar(this.fijarMapa,px,py);
	
	this.personajes=[];
	this.personajes.push(this.jugador);
	var n=this.iniciarEnemigos[this.fijarMapa].length;
	var enemigo;
	for (var i=0;i<n;i++)
	{
		enemigo=new Enemigo(this, 50, 50);
		enemigo.situar(this.fijarMapa,this.iniciarEnemigos[this.fijarMapa][i][0],this.iniciarEnemigos[this.fijarMapa][i][1]);
		this.personajes.push(enemigo);
	}
	this.finalPartida=false;
	this.jMuerto=false;
	this.reanudar();
};
//metodo pa iniciar al jugador y movimiento de las teclas 
Mundo.prototype.iniciarJugador=function(){
	this.jugador=new Jugador(this,50, 50);
	var self=this;
	
	document.body.onkeydown=function(e){
		switch(e.keyCode)
		{
			case 38: //Arriba
				e.preventDefault(); //para definir el scrool
				self.jugador.arriba=true;
				break;
			case 40: //Abajo
				e.preventDefault();
				self.jugador.abajo=true;
				break;
			case 39: //Derecha
				e.preventDefault();
				self.jugador.derecha=true;
				break;
			case 37: //Izquierda
				e.preventDefault();
				self.jugador.izquierda=true;
				break;	
		}
	};
	document.body.onkeyup=function(e){
		switch(e.keyCode)
		{
			case 38: //Arriba
				e.preventDefault();
				self.jugador.arriba=false;
				break;
			case 40: //Abajo
				e.preventDefault();
				self.jugador.abajo=false;
				break;
			case 39: //Derecha
				e.preventDefault();
				self.jugador.derecha=false;
				break;
			case 37: //Izquierda
				e.preventDefault();
				self.jugador.izquierda=false;
				break;
			case 13: //Reanudar enter
				e.preventDefault();
				if (self.intervalo==null)
				{
					self.posicionarMapa(0,2.5,1.5);
				}
				break;	
		}
	};
};
//metodo para acer las restricciones de los muros y pasillos
Mundo.prototype.casillaCaminable=function(mapa,px,py){
	var x=parseInt(px);
	var y=parseInt(py);
return this.dimencionesPuertas[this.mapa[mapa][y][x]].caminable;
};
//metodo para mover personajes
Mundo.prototype.moverPersonajes=function(delta){
	var n=this.personajes.length;
	for (var i=0;i<n;i++)
	{
		this.personajes[i].mover(delta);

	}
};

Mundo.prototype.isTipoTile=function(tipo,mapa,px,py){
	return (this.dimencionesPuertas[this.mapa[mapa][parseInt(py)][parseInt(px)]] instanceof tipo);
};
Mundo.prototype.getTile=function(mapa,px,py){
	return this.dimencionesPuertas[this.mapa[mapa][parseInt(py)][parseInt(px)]];
};
//metodo para dibujar el mapa
Mundo.prototype.dibujarMapa=function(){
	var desfaseX=this.jugador.x-this.panoramaScroolAncho/2;
	var desfaseY=this.jugador.y-this.panoramaScroolAlto/2;
	var yIni=Math.max(0,parseInt(desfaseY));
	var yFin=Math.min(this.mapa[this.fijarMapa].length,parseInt(this.jugador.y+this.panoramaScroolAlto/2)+1);
	var xIni=Math.max(0,parseInt(desfaseX));
	var xFin=Math.min(this.mapa[this.fijarMapa][0].length,parseInt(this.jugador.x+this.panoramaScroolAncho/2)+1);
	this.contexto.fillStyle='lightblue'; 
	this.contexto.fillRect(0,0,this.canvas.width,this.canvas.height);
	for (var yi=yIni;yi<yFin;yi++)
	{
		for (var xi=xIni;xi<xFin;xi++)
		{
			this.dimencionesPuertas[this.mapa[this.fijarMapa][yi][xi]].dibujar(this.contexto,xi,yi,desfaseX,desfaseY);
		}
	}
};
//metodo para dibujar al jugador
Mundo.prototype.dibujarPersonajes=function(){
	var desfaseX=this.jugador.x-this.panoramaScroolAncho/2;
	var desfaseY=this.jugador.y-this.panoramaScroolAlto/2;
	var yIni=Math.max(0,parseInt(desfaseY));
	var yFin=Math.min(this.mapa[this.fijarMapa].length,parseInt(this.jugador.y+this.panoramaScroolAlto/2));
	var xIni=Math.max(0,parseInt(desfaseX));
	var xFin=Math.min(this.mapa[this.fijarMapa][0].length,parseInt(this.jugador.x+this.panoramaScroolAncho/2));
	
	var n=this.personajes.length;
	for (var i=0;i<n;i++)
	{
		if(this.personajes[i].dentroRango(xIni,yIni,xFin,yFin))
		{
			this.personajes[i].dibujar(this.contexto,desfaseX,desfaseY);
		}
	}
};
//colicion entre personajes
Mundo.prototype.comprobarColisiones=function(){	
	var n=this.personajes.length;
	for (var i=0;i<n-1;i++)
	{
		for (var j=i+1;j<n;j++)
		{
			this.personajes[i].colisiona(this.personajes[j]);
		}
	}
};

Mundo.prototype.jugadorMuerto=function(){
	this.jMuerto=true;
};

Mundo.prototype.finPartidaDerrota=function(){
	this.detener();
	var mensaje="POBRECITO!! ";
	this.contexto.font = "bold 60px monospace";
	this.contexto.fillStyle="RED";
	this.contexto.fillText(mensaje,this.canvas.width/2-115,this.canvas.height/2+15);
	this.contexto.fillStyle="BLUE";
	this.contexto.fillText(mensaje,this.canvas.width/2-112,this.canvas.height/2+18);
};

Mundo.prototype.jugadorMeta=function(){
	this.finalPartida=true;
};

Mundo.prototype.finPartidaVictoria=function(){
	this.detener();
	var mensaje="VICTORIA!";
	this.contexto.font = "bold 60px monospace";
	this.contexto.fillStyle="green";
	this.contexto.fillText(mensaje,this.canvas.width/2-135,this.canvas.height/2+15);
	this.contexto.fillStyle="red";
	this.contexto.fillText(mensaje,this.canvas.width/2-132,this.canvas.height/2+18);
};

Mundo.prototype.loop=function(){
	var delta=(new Date().getTime()) - this.tiempoTranscurrido;
	this.tiempoTranscurrido=new Date().getTime();

	this.moverPersonajes(delta);
	this.dibujarMapa();
	this.dibujarPersonajes();
	
	this.comprobarColisiones();

	if(this.finalPartida)
	{
		this.finPartidaVictoria();
	}
	else if(this.jMuerto)
	{
		this.finPartidaDerrota();
	}
};