var eumouse = function(game){	
	console.log("%c Starting game scene", "color:white; background:green");
   
    score = 0;
    scoreText = "";        
    numBg = 0;

    countryIndex = 0;

    var stars;
    var ground;
};
 
eumouse.prototype = {
  	create: function(){
	//  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //this.game.physics.startSystem(Phaser.Physics.NINJA);

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
    ground = platforms.create(0, 425, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // The player and its settings
    player = this.game.add.sprite(120, 300, 'mouse');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.6);

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    //player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;

    //  Our two animations, walking left and right.
    player.animations.add('stand', [4], 10, true);
    player.animations.add('run', [4, 5, 6, 7], 10, true);
    player.animations.add('die', [0, 1], 10, true);
    player.animations.add('jump', [3], 10, true);
    player.animations.add('fall', [2], 10, true);

    
    // stars.enableBody = true;
    stars = this.game.add.group();

    this.createCountryItem(400, listCountries[countryIndex++]["name"]);
    this.createCountryItem(650, listCountries[countryIndex++]["name"]);
/*
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

*/
    scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //game.world.setBounds(0, 0, 2000, 2000);
	},
    update: function() {
        // move camera automatically
        this.game.camera.x += 2;
        this.game.world.setBounds(0, 0, this.game.world.width + 2, this.game.world.height);
        player.body.velocity.x = 120;
        scoreText.position.x += 2;


        if (this.game.camera.x > (800*(numBg-1)))
        {
            console.log(numBg);

            // Here we create the ground.
            //var ground = platforms.create(800*numBg, this.game.world.height - 27, 'ground');
             ground.scale.setTo(2+numBg, 2);

            // add countries            
            this.createCountryItem(150 +800*numBg, listCountries[countryIndex++]["name"]);  
            this.createCountryItem(400 +800*numBg, listCountries[countryIndex++]["name"]);  
            this.createCountryItem(700 +800*numBg, listCountries[countryIndex++]["name"]);  

            numBg ++; 
        }
        
        tilesprite.tilePosition.set(-this.game.camera.x,-this.game.camera.y) 

        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(player, platforms);
        this.game.physics.arcade.collide(stars, platforms);

        this.game.physics.arcade.overlap(player, stars, this.collectStar, this.checkOverlap, this);

        //  Allow the player to jump if they are touching the ground.

        if (this.game.input.activePointer.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -700;
            player.animations.play('jump');
        }
        else if (this.game.input.activePointer.isDown && !player.body.touching.down)
        {
            player.body.velocity.y = -300;
            player.animations.play('jump');
        }
        else if (!this.game.input.activePointer.isDown && player.body.velocity.y >0)
        {
            player.animations.play('fall');
        }
        else if (player.body.position.y > 320) {
            player.animations.play('run');
        }
        /*else {
            player.animations.play('run');            
        }*/
    },
    collectStar: function (player, star) {

        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;

    },
    checkOverlap: function (player, star) {
        return (this.game.physics.arcade.distanceBetween(player, star) < 110);
    },
    render: function() {

       // this.game.debug.cameraInfo(this.game.camera, 32, 32);

    }, 
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    createCountryItem: function(x, nameSprite){
        //var country = this.game.add.sprite(x, Math.random() * (this.game.world.height + 200), nameSprite);
        var country = stars.create(x, Math.random() * (300) + 100, nameSprite);
        country.anchor.setTo(0.5,0.5);
        country.scale.setTo(0.25); 

        this.game.physics.arcade.enable(country);
    }
}
