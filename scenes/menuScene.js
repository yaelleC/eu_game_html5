var menu = function(game){
	console.log("%cStarting menu scene", "color:black; background:green");

	settingsOpened = false;
	infoOpened = false;
	badgesOpened = false;
	leaderBoardOpen = false;

	var infoButton;
	var badgesButton;
	var leaderBoardButton;
	var infoPanel;
	var badgesPanel;
	var leaderBoardPanel;

	txt_about = "This game was created for X and Y by Z. It was blah blah blah...";

	data_leaderboard = [
		{"name": "yaelle", "score": "20"},
		{"name": "yaelle", "score": "10"},
		{"name": "yaelle", "score": "8"},
		{"name": "yaelle", "score": "4"},
	]
};
  
menu.prototype = {
	create: function(){
  		this.game.add.sprite(0, 0, 'menu_bg');
    	var gameTitle = this.game.add.sprite(400,70,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);

		// settings options
		var settingsButton = this.game.add.button(50,400,"btn_settings",this.toggleSettings,this);
		settingsButton.anchor.setTo(0.5,0.5);

		var gameButton = this.game.add.button(400,250,"btn_play",this.startGame,this);
		gameButton.anchor.setTo(0.5,0.5);

		infoPanel= this.game.add.group();
		badgesPanel= this.game.add.group();
		leaderBoardPanel= this.game.add.group();
	},
	toggleSettings: function(){
		if (!settingsOpened)
		{
			infoButton = this.game.add.button(50,250,"btn_info",this.toggleInfo,this);
			infoButton.anchor.setTo(0.5,0.5);
			badgesButton = this.game.add.button(50,300,"btn_badges",this.toggleBadges,this);
			badgesButton.anchor.setTo(0.5,0.5);
			leaderBoardButton = this.game.add.button(50,350,"btn_leaderboard",this.toggleLeaderBoard,this);
			leaderBoardButton.anchor.setTo(0.5,0.5);
			settingsOpened = true;
		}
		else
		{
			settingsOpened = false;
			infoButton.kill();
			badgesButton.kill();
			leaderBoardButton.kill();
		}
	},
	toggleInfo: function(){
		if (!infoOpened)
		{
			// close other panels
			this.destroyGroup(badgesPanel);
			this.destroyGroup(leaderBoardPanel);

			panel = infoPanel.create(400,225,"panel");
			panel.anchor.setTo(0.5,0.5);

			title_info = new Phaser.Text(this.game, 400, 90, "About", {fill: '#FFFFFF'});
			title_info.anchor.setTo(0.5,0.5);
			infoPanel.add(title_info);

			txt_info = new Phaser.Text(this.game, 400, 120, txt_about, {font: '15pt Arial', wordWrap: true, wordWrapWidth: '500'});
			txt_info.anchor.setTo(0.5,0);
			infoPanel.add(txt_info);

			infoOpened = true;
		}
		else
		{
			infoOpened = false;
			this.destroyGroup(infoPanel);
		}
	},
	toggleBadges: function(){
		if (!badgesOpened)
		{
			// close other panels
			this.destroyGroup(infoPanel);
			this.destroyGroup(leaderBoardPanel);

			panel = badgesPanel.create(400,225,"panel");
			panel.anchor.setTo(0.5,0.5);

			title_badges = new Phaser.Text(this.game, 400, 90, "Badges", {fill: '#FFFFFF'});
			title_badges.anchor.setTo(0.5,0.5);
			badgesPanel.add(title_badges);

			// TODO: add all badges locked (unless won)

			badgesOpened = true;
		}
		else
		{
			badgesOpened = false;
			this.destroyGroup(badgesPanel);
		}
	},
	toggleLeaderBoard: function(){
		if (!leaderBoardOpen)
		{
			// close other panels
			this.destroyGroup(infoPanel);
			this.destroyGroup(badgesPanel);

			panel = leaderBoardPanel.create(400,225,"panel");
			panel.anchor.setTo(0.5,0.5);

			title = new Phaser.Text(this.game, 400, 90, "Leaderboard", {fill: '#FFFFFF'});
			title.anchor.setTo(0.5,0.5);
			leaderBoardPanel.add(title);

			var txt_leaderboard = "";
			for (var i=0 ; i < data_leaderboard.length ; i++)
			{
				txt_leaderboard += data_leaderboard[i]["name"] + " - " + data_leaderboard[i]["score"] + "\n";
			}

			txt_info = new Phaser.Text(this.game, 400, 120, txt_leaderboard, {font: '15pt Arial', wordWrap: true, wordWrapWidth: '500'});
			txt_info.anchor.setTo(0.5,0);
			leaderBoardPanel.add(txt_info);

			leaderBoardOpen = true;
		}
		else
		{
			leaderBoardOpen = false;
			this.destroyGroup(leaderBoardPanel);
		}
	},
	destroyGroup: function(group){
		var len = group.children.length;
		for (var i = group.children.length-1; i >= 0; i--) {
		  	console.log(group.children[i]);
		 	group.children[i].destroy();
		}
	},
	startGame: function(){
		this.game.state.start("Game");
	}
}