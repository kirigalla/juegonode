/**********************************/
/* Juan Gabriel Rodríguez Carrión */
/*    jlabstudio.com       2012   */
/**********************************/
/**
 * Esta clase maneja los sprites del juego
*/
function Sprite(img){
	this.img=img;
	this.direcciones=[];
}
Sprite.prototype.setDireccion=function(direccion,coordenadas){
	this.direcciones[direccion]=coordenadas;
};
Sprite.prototype.createDireccion=function(filas, columnas, ajustear,ajusteab,ajusteiz,ajustede,direcciones){
	var ancho=this.img.width/columnas;
	var alto=this.img.height/filas;
	
	for (direccion in direcciones)
	{
		this.direcciones[direccion]=[];
		for (var i=0;i<columnas;i++)
		{
			this.direcciones[direccion].push([i*ancho+ajusteiz,direcciones[direccion]*alto+ajustear,(i+1)*ancho-ajustede,(direcciones[direccion]+1)*alto-ajusteab]);
		}
	}
};
Sprite.prototype.getNumSprites=function(direccion){
	return this.direcciones[direccion].length;
};
Sprite.prototype.dibujar=function(contexto,ancho,alto,direccion,indice){
	contexto.drawImage(this.img, this.direcciones[direccion][indice][0],
								this.direcciones[direccion][indice][1], 
								this.direcciones[direccion][indice][2]-this.direcciones[direccion][indice][0], 
								this.direcciones[direccion][indice][3]-this.direcciones[direccion][indice][1],
								-ancho/2, -alto/2, ancho, alto);
};
/**
 * Esta clase es el almacén de sprites de nuestro juego.
*/
function AlmacenSprites(){
	//La lista de sprites
	this.lista=[];
}
AlmacenSprites.prototype.add=function(id,sprite){
	this.lista[id]=sprite;
};
AlmacenSprites.prototype.get=function(id){
	return this.lista[id];
};