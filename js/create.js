function create() {

    game.stage.backgroundColor = '#fff';//'#2d2d2d';

		//game.add.text(600, 800, "- phaser -", { font: "32px Arial", fill: "#330088", align: "center" });

    game.world.setBounds(0, 0, 1280, 96000); //////////////////////
    //  Creates a blank tilemap
    map = game.add.tilemap();

    //  This is our tileset - it's just a BitmapData filled with a selection of randomly colored tiles
    //  but you could generate anything here
    bmd = game.make.bitmapData(32 * 25, 32 * 2);

    var colors = Phaser.Color.HSVColorWheel();

    var i = 0;

    for (var y = 0; y < 2; y++)
    {
        for (var x = 0; x < 25; x++)
        {
            bmd.rect(x * 32, y * 32, 32, 32, colors[i].rgba);
            i += 6;
        }
    }

    //  Add a Tileset image to the map
    map.addTilesetImage('tiles', bmd);

    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
    layer = map.create('level1', 40, 3000, 32, 32);

    //  Populate some tiles for our player to start on
    map.putTile(30, 2, 10, layer);
    map.putTile(30, 3, 10, layer);
    map.putTile(30, 4, 10, layer);


    //////////////// test emitter
    emitter = game.add.emitter(game.world.centerX, 95800, 200);

    //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
    emitter.makeParticles(['diamond', 'carrot', 'star']);

    emitter.start(false, 5000, 20);
    ////////////////

    /////////////////// timer /////////
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.loop(20, updateCounter, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
    ///////////////////////////




    // for (var y = 0; y < 12; y++)
    // {
    //   if(y%3==0){
    //     for (var x = 0; x < 40; x++)
    //     {
    //         map.putTile( game.rnd.integerInRange(1, 70) , x, y+2988, layer);
    //     }
    //   }else{
    //     for (var x = 0; x < 40; x+=4)
    //     {
    //         map.putTile( game.rnd.integerInRange(1, 70) , x, y+2988, layer);
    //     }
    //   }
    // }

    map.setCollisionByExclusion([0]);

    //  Create our tile selector at the top of the screen

    createTileSelector();

    player = game.add.sprite(16, 96000, 'dude');


		game.camera.follow(player); ////////////////////////////////////////////////

		game.camera.deadzone = new Phaser.Rectangle(100, 100, 600, 400); /////////////////////////////



    game.physics.arcade.enable(player);
    game.physics.arcade.gravity.y = 350;

    player.body.bounce.y = 0.1;
    player.body.collideWorldBounds = true;
    player.body.setSize(10, 30, 20, 10);

    player.animations.add('left', [0, 1, 2, 3, 4], 10, true);
    player.animations.add('turn', [0], 10, true);
    player.animations.add('right', [5, 6, 7, 8,9], 10, true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.input.addMoveCallback(updateMarker, this);

}
