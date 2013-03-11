$(document).ready(function(){
	if(localStorage['timeout'] == undefined){
		localStorage['timeout'] = 30000;
	}

	if(!localStorage['username'] || localStorage['username']=='undefined')
		chrome.tabs.create({url: "options.html"});

	checkGrades();

	localStorage['intervalID'] = setInterval(function() { checkGrades(); }, localStorage['timeout']);
});


chrome.browserAction.onClicked.addListener(function(tab){
	if(!localStorage['username'] || localStorage['username']=='undefined' || !localStorage['password'] || localStorage['password']=='undefined' )
		var chromeExtURL="options.html"
	else 
		var chromeExtURL="https://stars.bilkent.edu.tr/srs/ajax/gradeAndAttend/grade.php";
	chrome.tabs.getAllInWindow(null,function(tabs){
		for (var i=0;i<tabs.length;i++){
			if (tabs[i].url == chromeExtURL){
				chrome.tabs.update(tabs[i].id, {selected:true})
				return;
			}
		}
		chrome.tabs.create({url:chromeExtURL,selected:true})
	})
})
