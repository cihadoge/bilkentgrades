$(document).ready(function(){
		var loc=window.location.href;
		var which=parseInt(loc.substring(loc.lastIndexOf('#') + 1));
		console.log(which);
		$('#info').html("<a href=\"https://stars.bilkent.edu.tr/srs/ajax/gradeAndAttend/grade.php\" target=\"_blank\">" + which + " New Grade</a>");
		console.log("sound "+localStorage['sound']);
		if(localStorage['sound'] == "true")
		{
			ses=new Audio("sounds/bell.mp3");
			ses.play();
		}
});
	