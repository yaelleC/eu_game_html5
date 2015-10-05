
var login = function(game){
	console.log("%cStarting login scene", "color:black; background:green");

    username_tag = "Username"; 
    password_tag = "Password"; 
    var username_inputText = "";
    var password_inputText = "";
};
  
login.prototype = {
	create: function(){
  		this.stage.backgroundColor = '#6bf';
    	this.game.add.sprite(0, 0, 'menu_bg');
    	
    	var gameTitle = this.game.add.sprite(400,70,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);

		username_tag = this.game.add.text(200, 150, 'Username', { fontSize: '12px', fill: '#000' });
		password_tag = this.game.add.text(200, 200, 'Password', { fontSize: '12px', fill: '#000' });

		$("#form_inputs").append('<input type="text" class="form-control" id="username">');
		$("#username").css({"position": "absolute", "top": "175px", "left": "375px", "width": "300px"});

		$("#form_inputs").append('<input type="password" class="form-control" id="password">');
		$("#password").css({"position": "absolute", "top": "225px", "left": "375px", "width": "300px"});

    	var loginButton = this.game.add.button(400,300,"btn_login",this.loginToGame,this);
		loginButton.anchor.setTo(0.5,0.5);
    	var loginGuestButton = this.game.add.button(400,370,"btn_guest",this.loginGuestToGame,this);
		loginGuestButton.anchor.setTo(0.5,0.5);
	},
	loginToGame: function(){
		username_inputText = $("#username").val();
		password_inputText = $("#password").val();
		 	console.log("u: " + username_inputText);
		 	console.log("p: " + password_inputText);
		this.game.state.start("Questions");
	},
	loginGuestToGame: function(){
		username_inputText = "";
		password_inputText = "";
		this.game.state.start("Questions");
	}
}