
var login = function(game){
	console.log("%cStarting login scene", "color:black; background:green");

    username_tag = "Username"; 
    username_text = ""; 
    password_tag = "Password"; 
    password_text = "";  
    var username_inputText;
    var password_inputText;

    isWritingUsername = false;
    isWritingPassword = false;

};
  
login.prototype = {
	create: function(){
  		this.stage.backgroundColor = '#6bf';
    	this.game.add.sprite(0, 0, 'menu_bg');
    	
    	var gameTitle = this.game.add.sprite(400,70,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);

		username_tag = this.game.add.text(200, 150, 'Username', { fontSize: '12px', fill: '#000' });
		username_inputText = this.game.add.button(350,150,"input", this.activateUsername, this);
		username_text = this.game.add.text(355, 155, "", { fontSize: '11px', fill: '#000' });

		password_tag = this.game.add.text(200, 200, 'Password', { fontSize: '12px', fill: '#000' });
		password_inputText = this.game.add.button(350,200,"input", this.activatePassword, this);
		password_text = this.game.add.text(355, 205, "", { fontSize: '11px', fill: '#000' });

    	var loginButton = this.game.add.button(400,300,"btn_login",this.loginToGame,this);
		loginButton.anchor.setTo(0.5,0.5);
    	var loginGuestButton = this.game.add.button(400,370,"btn_guest",this.loginGuestToGame,this);
		loginGuestButton.anchor.setTo(0.5,0.5);
   	

		this.game.input.keyboard.onPressCallback  = function(e) {
			var key = e.keyCode || e.which;
			console.log(key);
			console.log(String.fromCharCode(key));
			if (isWritingUsername)
	        {
	        	if (username_text.text.valueOf() == new String("|").valueOf())
	        	{
	        		username_text.text = String.fromCharCode(key);
	        	}
	        	else {
	        		username_text.text += String.fromCharCode(key);
	        	}	            
	        }
			if (isWritingPassword)
	        {
	            if (password_text.text.valueOf() == new String("|").valueOf())
	        	{
	        		password_text.text = String.fromCharCode(key);
	        	}
	        	else {
	        		password_text.text += String.fromCharCode(key);
	        	}
	        }
		};
	},
	activateUsername: function(){
		var txt_username = $.trim(username_text.text);
		if (txt_username.valueOf() == new String("").valueOf())
		{
			username_text.text = "|";
		}
		this.desactivatePassword();
		isWritingUsername = true;
	},
	desactivateUsername: function(){
    	isWritingUsername = false;
    	var f = username_text.font;
		f.fill = 'grey';
		username_text.setStyle(f);
	},
	activatePassword: function(){
		var txt_password = $.trim(password_text.text);
		if (txt_password.valueOf() == new String("").valueOf())
		{
			password_text.text = "|";
		}

    	isWritingPassword = true;
		this.desactivateUsername();
	},
	desactivatePassword: function(){
		//this.game.add.button(350,200,"input", this.activatePassword, this);
   		isWritingPassword = false;
		//this.game.add.text(355, 205, password_text.text, { fontSize: '11px', fill: '#000' });
	},
	keyDown: function(e){
		if (isWritingUsername)
        {
            username_text.text += e.keyCode;
        }
		if (isWritingPassword)
        {
            password_text.text += e.keyCode;
        }
	},
	update: function(){
		
	},
	loginToGame: function(){
		this.game.state.start("Questions");
	},
	loginGuestToGame: function(){
		this.game.state.start("Questions");
	}
}