/*
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
*/
var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
server.listen(port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
app.use(express.static(__dirname + '/public'));
// INICIO

//var guerrero = {direccion: 's', x:0, y:0, width:5, height:5};

var jugador = [];
var tsnk = 5;
var agente = [];
var color = [];
var limiteCanvas;
//h y w de canvas;
var h=700, w=1400;
var cw = 25;

for(i=0;i<50;i++) {
  color[i] = "#"+((1<<24)*Math.random()|0).toString(16);
}

io.on('connection', function (socket) {  
 
  function guerrero(){
    //this.x= 5;//(Math.random()*80)|0; //cambiar por this
    //this.y= 2;//(Math.random()*80)|0;
    this.color = color[jugador.length];
    this.snake = [];
    for (var i = tsnk; i > 0; i--) {
      this.snake.push({x:i, y:1, color:this.color});
    }
  }

  function enemigo(){
    this.x = 12;
    this.y = 1;
    this.color = "green";
  }

  function create_food()
  {
        this.color = "blue";
        this.food = {
          x: Math.round(Math.random()*(w-cw)/cw), 
          y: Math.round(Math.random()*(h-cw)/cw),
          color: this.color, 
        };
        //socket.emit('pintarJugador',this.food.x,this.food.y,this.food.color);
  }

  function colision(x1,y1,x2,y2)
  {
    if(x1 == x2 && y1 == y2){
      return true;
    }
    return false;
  }

  create_food();

  function crearGuerrero(){
    jugador.push(new guerrero());
    agente.push(new enemigo());
  }

  function movimientoAgente(agente,jugador,i){
    if (agente[i]) {
      if(agente[i].x < jugador[i].snake[0].x && agente[i].y < jugador[i].snake[0].y){
          agente[i].x += 1;
          agente[i].y += 1;
          //== 
        }
    if(agente[i].x < jugador[i].snake[0].x && agente[i].y > jugador[i].snake[0].y){
        
        agente[i].x += 1;
        agente[i].y -= 1;
        }
    if(agente[i].x > jugador[i].snake[0].x && agente[i].y > jugador[i].snake[0].y){
        
        agente[i].x -= 1;
        agente[i].y -= 1;
        }

      if(agente[i].x > jugador[i].snake[0].x && agente[i].y < jugador[i].snake[0].y){
        agente[i].x -= 1;
        agente[i].y += 1;
        }
      //============================================================
      if(agente[i].x < jugador[i].snake[0].x && agente[i].y == jugador[i].snake[0].y){
       
        agente[i].x += 1;
        }
      if(agente[i].x == jugador[i].snake[0].x && agente[i].y > jugador[i].snake[0].y){
        
        agente[i].y -= 1;
        }
      if(agente[i].x > jugador[i].snake[0].x && agente[i].y == jugador[i].snake[0].y){
        
        agente[i].x -= 1;
        }
      if(agente[i].x == jugador[i].snake[0].x && agente[i].y < jugador[i].snake[0].y){
       
        agente[i].y += 1;
        
      }
    };
  }
  //var caminar;
  function moverJugador(d,mundo){

  socket.get('tiemporeal', function (err, ID) {
    if (jugador[ID]){  
      if(d == "right"){
            caminar = mundo.conjuntoTiles[mundo.mapa[0][jugador[ID].snake[0].y][jugador[ID].snake[0].x+1]].caminable;
            if (caminar == true) {
              jugador[ID].snake[0].x += 1;
            };
      } 
      else if(d == "left"){
          caminar = mundo.conjuntoTiles[mundo.mapa[0][jugador[ID].snake[0].y][jugador[ID].snake[0].x-1]].caminable;
          if (caminar == true) {
            jugador[ID].snake[0].x -= 1;
          }
      }
      else if(d == "up"){
          caminar = mundo.conjuntoTiles[mundo.mapa[0][jugador[ID].snake[0].y-1][jugador[ID].snake[0].x]].caminable;
          if (caminar == true) {
            jugador[ID].snake[0].y -= 1;
          }
      }
      else if(d == "down"){
          caminar = mundo.conjuntoTiles[mundo.mapa[0][jugador[ID].snake[0].y+1][jugador[ID].snake[0].x]].caminable;
          if (caminar == true) {
            jugador[ID].snake[0].y += 1;
          }
      }
      //colision.
      

      for (var i = 0; i < jugador.length; i++) {
        if (jugador[i]) {
          var estado = colision(jugador[ID].snake[0].x, jugador[ID].snake[0].y, jugador[i].snake[0].x, jugador[i].snake[0].y);
          if ((estado == true) && (ID != i)) {
            //console.log(estado);
            jugador[i].snake.pop();
            var incrementar = {x: jugador[ID].snake[0].x, y: jugador[ID].snake[0].y};
            jugador[ID].snake.unshift(incrementar);
          };
        };
      };
      //comida
      if(jugador[ID].snake[0].x == food.x && jugador[ID].snake[0].y == food.y)
        {
          var tail = {x: jugador[ID].snake[0].x, y: jugador[ID].snake[0].y};
          //Create new food
          create_food();
        }
        else
        {
          if (jugador[ID].snake.length != 1) {
            var tail = jugador[ID].snake.pop(); // Se expulsa la última celda
            tail.x = jugador[ID].snake[0].x; 
            tail.y = jugador[ID].snake[0].y;      
          }else{
            delete jugador[ID];
          }
        }
        if (jugador[ID]) {
          jugador[ID].snake.unshift(tail); // Pone de nuevo la cola como la primera celda
        }else{
          console.log("perdiste");
        }
    }else{
      console.log("Jugador eliminado");
    }
  });
    actualizar();
}

  function ejecutarAgente(){
    socket.get('tiemporeal', function (err, ID) {
      socket.emit('limpiar');
      actualizar();
      console.log("estamos aqui antes de mundo");
      movimientoAgente(agente,jugador,ID);
    });
    
  }

  function actualizar(){
    //socket.emit('limpiar');
    socket.emit('pintarJugador',food.x,food.y,food.color);

      for (var i = 0; i < jugador.length; i++) {
        if(jugador[i])
        {
          for (var j = 1; j <= jugador[i].snake.length-1; j++) {
            socket.emit('pintarJugador',jugador[i].snake[j].x, jugador[i].snake[j].y,jugador[i].snake[j].color);
            socket.emit('pintarJugador',agente[i].x, agente[i].y,agente[i].color);
          } 
        }
      }
  }

  socket.emit('handshake');
  
  socket.on('nuevoJugador',function (data){
    socket.set('tiemporeal', jugador.length, function () {
        //socket.emit('msj', 'Welcome, ' + tron.length);
    }); 
    crearGuerrero();
    setInterval(ejecutarAgente,1000);
  });

  socket.on('mundo',function (mundo){
    socket.on('mover',function(direccion){
      moverJugador(direccion,mundo);
    });
  });

  

  socket.on('disconnect', function () {
    socket.get('tiemporeal', function (err, ID) {
      delete jugador[ID];
      delete agente[ID];
    });
  });

  //setInterval(actualizar,500);  

});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

