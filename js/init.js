var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var bmd;
var map;
var layer;
var marker;
var currentTile = 0;
var cursors;
var player;
var facing = 'left';
var jumpTimer = 0;
var jumpButton;


////////// timer gen

var timer;
var total = 0;

function updateCounter() {

    total++;
    var y = Math.floor(total/40);


    if(y%3==0){
      map.putTile( game.rnd.integerInRange(1, 70) ,  total%40 , 3000 - y, layer);
    }else{
      if(total%40 %4 === 0 ) map.putTile( game.rnd.integerInRange(1, 70) , total%40 , 3000 - y, layer);
    }

}
//////////////////
