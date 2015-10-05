var menu = function(game){
	console.log("%cStarting menu scene", "color:black; background:green");
};
  
menu.prototype = {
	create: function(){
  		this.game.add.sprite(0, 0, 'menu_bg');
    	var gameTitle = this.game.add.sprite(400,70,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);

		var gameButton = this.game.add.button(400,250,"btn_play",this.startGame,this);
		gameButton.anchor.setTo(0.5,0.5);
	},
	startGame: function(){
		this.game.state.start("Game");
	}
}