var preload = function(game){	
	console.log("%c Preloading game", "color:black; background:yellow");
}
 
preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        this.game.load.image("menu_bg","sprites/bgMenu.png"); 
        this.game.load.image("gametitle","sprites/gameTitle.png"); 

        this.game.load.image("btn_play", "sprites/btn_play.png");
		this.game.load.image("btn_start", "sprites/btn_start.png");
		this.game.load.image("btn_login", "sprites/btn_login.png");
		this.game.load.image("btn_guest", "sprites/btn_guestLogin.png");

		this.game.load.image("btn_settings", "sprites/btn_settings.png");
		this.game.load.image("btn_info", "sprites/btn_info.png");
		this.game.load.image("btn_leaderboard", "sprites/btn_leaderboard.png");
		this.game.load.image("btn_badges", "sprites/btn_badges.png");

		this.game.load.image("input", "sprites/input.png");
		this.game.load.image("input_active", "sprites/inputActive.png");
		this.game.load.image("panel", "sprites/panel.png");

		this.game.load.image('bg1', 'sprites/bg1.png');
		this.game.load.image('bg2', 'sprites/bg2.png');
		this.game.load.image('bg3', 'sprites/bg3.png');
		this.game.load.image('bg4', 'sprites/bg4.png');
		this.game.load.image('bg5', 'sprites/bg5.png');
		this.game.load.image('bg6', 'sprites/bg6.png');
		this.game.load.image('bgAll', 'sprites/bgAll.png');
	    this.game.load.image('ground', 'sprites/ground.png');

	    //this.game.load.image('star', 'assets/star.png');
	    //this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},
  	create: function(){
		this.game.state.start("Menu");
	}
}