var preload = function(game){	
	console.log("%c Preloading game", "color:black; background:yellow");
}
 
preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

		// GUI
        this.game.load.image("menu_bg","sprites/bgMenuFull.png"); 
        this.game.load.image("gametitle","sprites/gameTitle.png"); 

        this.game.load.image("btn_play", "sprites/btn_play.png");
		this.game.load.image("btn_start", "sprites/btn_start.png");
		this.game.load.image("btn_login", "sprites/btn_login.png");
		this.game.load.image("btn_guest", "sprites/btn_guestLogin.png");
		this.game.load.image("btn_menu", "sprites/btn_goToMenu.png");

		this.game.load.image("btn_settings", "sprites/btn_settings.png");
		this.game.load.image("btn_info", "sprites/btn_info.png");
		this.game.load.image("btn_leaderboard", "sprites/btn_leaderboard.png");
		this.game.load.image("btn_badges", "sprites/btn_badges.png");

		this.game.load.image("panel", "sprites/panel.png");

		// badges
		this.game.load.image("badgeLocked", "sprites/badges/lock_BW.png");

		// scores		
		this.game.load.image("eu", "sprites/flag_EU.png");
		this.game.load.image("score", "sprites/coin.png");
		this.game.load.image("life", "sprites/life.png");

		// Game assets
		this.game.load.image('bgAll', 'sprites/bgAll.png');
	    this.game.load.image('ground', 'sprites/ground.png');

	    this.game.load.spritesheet('mouse', 'sprites/mouseSpritesheet.png', 162, 156);

	    this.loadCountries();
	    this.loadBadges();

	},
  	create: function(){
		this.game.state.start("Login");
	},
	loadCountries: function(){
		for (var i = 0 ; i < listCountries.length ; i++)
		{
			this.game.load.image(listCountries[i]["name"], 'sprites/eu_flags_named/' + listCountries[i]["name"] + '.png');
		}
	},
	loadBadges: function(){
		for (var i = 0 ; i < listBadges.length ; i++)
		{
			this.game.load.image(listBadges[i], 'sprites/badges/' + listBadges[i] + '.png');
		}
	}
}