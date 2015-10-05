var eumouse = function(game){	
	console.log("%c Starting game scene", "color:white; background:green");
   
    score = 0;
    scoreText = "";        
    numBg = 0;
};
 
eumouse.prototype = {
  	create: function(){
		//  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A background for our game
    this.stage.backgroundColor = '#6bf';
    //game.add.sprite(0, 0, 'bg1');
    //game.add.sprite(800, 0, 'bg2');
    numBg = 1;

    tilesprite = this.game.add.tileSprite(0, 0, 800, 450, 'bgAll');
    tilesprite.fixedToCamera = true;

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, this.game.world.height - 27, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // The player and its settings
    player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    player.body.gravity.y = 300;

    cursors = this.game.input.keyboard.createCursorKeys();

    stars = this.game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 200, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 6;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.8 + Math.random() * 0.2;
    }
    scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //game.world.setBounds(0, 0, 2000, 2000);
	},
    update: function() {
        // move camera automatically
        this.game.camera.x += 1;
        this.game.world.setBounds(0, 0, this.game.world.width + 1, 0);
        player.body.velocity.x = 60;
        player.animations.play('right');
        scoreText.position.x += 1;


        if (this.game.camera.x > (800*(numBg-1)))
        {
            // Here we create the ground.
            var ground = platforms.create(800*numBg, this.game.world.height - 27, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            //ground.scale.setTo(2, 2);
            numBg ++;
        }
        
        tilesprite.tilePosition.set(-this.game.camera.x,-this.game.camera.y) 

        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(player, platforms);
        this.game.physics.arcade.collide(stars, platforms);

        this.game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
    },
    collectStar: function (player, star) {

        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

    },
    render: function() {

       // this.game.debug.cameraInfo(this.game.camera, 32, 32);

    }, 
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

/*
var game = new Phaser.Game(800, 450, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var score = 0;
var scoreText;
    
var numBg = 0;


function preload() {
	game.load.image('bg1', 'sprites/bg1.png');
	game.load.image('bg2', 'sprites/bg2.png');
	game.load.image('bg3', 'sprites/bg3.png');
	game.load.image('bg4', 'sprites/bg4.png');
	game.load.image('bg5', 'sprites/bg5.png');
	game.load.image('bg6', 'sprites/bg6.png');
	game.load.image('bgAll', 'sprites/bgAll.png');
    game.load.image('ground', 'sprites/ground.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
	 //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A background for our game
    this.stage.backgroundColor = '#6bf';
    //game.add.sprite(0, 0, 'bg1');
    //game.add.sprite(800, 0, 'bg2');
    numBg = 1;

    tilesprite = game.add.tileSprite(0, 0, 800, 450, 'bgAll');
    tilesprite.fixedToCamera = true;

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 27, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    player.body.gravity.y = 300;

    cursors = game.input.keyboard.createCursorKeys();

    stars = game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 6;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //game.world.setBounds(0, 0, 2000, 2000);
}

function update() {
	// move camera automatically
	game.camera.x += 1;
	game.world.setBounds(0, 0, game.world.width + 1, 0);
	player.body.velocity.x = 60;
	player.animations.play('right');
	scoreText.position.x += 1;


	if (game.camera.x > (800*(numBg-1)))
	{
		// Here we create the ground.
	    var ground = platforms.create(800*numBg, game.world.height - 27, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    //ground.scale.setTo(2, 2);
    	numBg ++;
	}
	
	tilesprite.tilePosition.set(-game.camera.x,-game.camera.y) 

	//  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/