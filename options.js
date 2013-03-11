function fill()
{
	$('#'+(localStorage['timeout']/1000)).attr("selected","selected");
	$('#sound'+(localStorage['sound'])).attr("selected","selected");

	$('#username').val(localStorage['username']);
	$('#password').val(localStorage['password']);
}
function save()
{
	al = new Array();
	// var al = $('#control').val();
	// localStorage['timeout'] = al*1000;

	// clearInterval(localStorage['intervalID']);
	// localStorage['intervalID'] = setInterval(function() { checkGrades(); }, localStorage['timeout']);

	
	var al = $('#sound').val();
	localStorage['sound'] = al;
	
	var al = $('#username').val();
	localStorage['username'] = al;
	
	var al = $('#password').val();
	localStorage['password'] = al;

	alert("Your settings are saved");

	localStorage['notes'] = undefined;

	if(localStorage['username'] && localStorage['password'])
		checkGrades();
}

$('#save').live({
	click: function(e){
		save();
	}
});

$(document).ready(function(){
	// console.log(localStorage);
	fill();
});
