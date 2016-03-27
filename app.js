var express = require('express');
var cors = require('cors');
var fs = require('fs');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/phaser', express.static(__dirname + '/phaser'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(cors());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

app.get('/alpha', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

testroom = io.of('/test');

var players = []; // x,y,id,health,type

testroom.on('connection', function(socket){
  console.log('new client! ' + socket.id);
  socket.on('img', function(msg){
    socket.broadcast.emit('connection', msg );
  });


  socket.on('get', function(msg){
    console.log('get: '+ msg );
    socket.emit('data', players );
    players.push(msg);
    socket.broadcast.emit('update', msg );
  });

  socket.on('disconnect', function(){
    console.log('user left: '+socket.id);
    socket.broadcast.emit('delete', socket.id );
  });
});

http.listen(5200, function(){
  console.log('listening on *:5200');
});
