var questions = function(game){
	console.log("%cStarting question scene", "color:black; background:green");

	questions = [
		{"question": "oui?", "name": "oui"}, 
		{"question": "how old are you?", "name": "age"}
	];

	answers = [];
};
  
questions.prototype = {
  	create: function(){
		$("#form_inputs").empty();

    	this.game.add.sprite(0, 0, 'menu_bg');
    	var gameTitle = this.game.add.sprite(400,65,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);

		username_tag = this.game.add.text(100, 130, 'Before you start, please answer a few questions:', { fontSize: '8px', fill: '#000' });

		// questions
		for (var i=0; i<questions.length; i++)
		{
			$("#form_inputs").append('<input type="text" class="form-control" id="question'+i+'" placeholder="'+questions[i].question+'">');
			var marginTop = 200 + i*50;
			$("#question"+i).css({"position": "absolute", "top": marginTop+"px", "left": "200px", "width": "400px"});
		}

    	var menuButton = this.game.add.button(400,400,"btn_start",this.goToMenu,this);
		menuButton.anchor.setTo(0.5,0.5);


	},
	goToMenu: function(){

		answers = questions;
		for (i=0; i<questions.length; i++)
		{
			answers[i]["value"] = $("#question"+i).val();
		}

		console.log(answers);

		$("#form_inputs").empty();
		this.game.state.start("Menu");
	}
}