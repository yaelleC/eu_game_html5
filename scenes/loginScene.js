
var login = function(game){
	console.log("%cStarting login scene", "color:black; background:green");

    username_tag = "Username"; 
    password_tag = "Password"; 
    username_inputText = "";
    password_inputText = "";

    // Set the unique ID for your serious game  
	idSG = 160;
	var session;
};
  
login.prototype = {
	create: function(){
  		this.stage.backgroundColor = '#6bf';
    	this.game.add.sprite(0, 0, 'menu_bg');
    	
    	var gameTitle = this.game.add.sprite(400,70,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);

		username_tag = this.game.add.text(200, 180, 'Username', { fontSize: '20px', fill: '#000' });
		password_tag = this.game.add.text(200, 230, 'Password', { fontSize: '20px', fill: '#000' });

		$("#form_inputs").append('<input type="text" class="form-control" id="username">');
		$("#username").css({"position": "absolute", "top": "200px", "left": "375px", "width": "300px"});

		$("#form_inputs").append('<input type="password" class="form-control" id="password">');
		$("#password").css({"position": "absolute", "top": "250px", "left": "375px", "width": "300px"});

    	var loginButton = this.game.add.button(400,330,"btn_login",this.loginToGame,this);
		loginButton.anchor.setTo(0.5,0.5);
    	var loginGuestButton = this.game.add.button(400,400,"btn_guest",this.loginGuestToGame,this);
		loginGuestButton.anchor.setTo(0.5,0.5);
	},
	loginToGame: function(){
		username_inputText = $("#username").val();
		password_inputText = $("#password").val();
		 	console.log("u: " + username_inputText);
		 	console.log("p: " + password_inputText);
		
		var login = this;

		engage.loginStudent(idSG, username_inputText, password_inputText)
	    .done(function(s){ 
	    	session=s;
	    	var params = session["params"];

			if (params.length == 0) {
				login.goToMenuScene();
			}
			else {
				login.goToQuestionsScene(params);	
			}
	    })
	    .fail(function(msg){
	    	login.errorMessage(msg);
	    });
	},
	loginGuestToGame: function(){
		username_inputText = "";
		password_inputText = "";
		this.game.state.start("Questions");
	},
	errorMessage: function(msg){
		var error_msg = this.game.add.text(400, 150, msg, { fontSize: '20px', fill: 'DarkRed' });
		error_msg.anchor.setTo(0.5,0.5);
	},
	goToQuestionsScene: function(paramsReceived){
		this.game.state.start("Questions", true, false, paramsReceived, username_inputText );
	},
	goToMenuScene: function(){
		this.game.state.start("Menu");
	}
}