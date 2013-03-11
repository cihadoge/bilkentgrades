$(document).ready(function(){
		var loc=window.location.href;
		var which=parseInt(loc.substring(loc.lastIndexOf('#') + 1));
		console.log(which);
		$('#message').html("You have total " + which + " grades");
		$('#info').html("<a href=\"https://stars.bilkent.edu.tr/srs/ajax/gradeAndAttend/grade.php\" target=\"_blank\">Hi, " + localStorage['username'] + '</a>');
		console.log("sound "+localStorage['sound']);
		if(localStorage['sound'] == "true")
		{
			ses=new Audio("sounds/bell.mp3");
			ses.play();
		}
});