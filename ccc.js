function login()
{
	var requestTimeout = 10000;
	$.ajax({
		type: "POST",
		data: "ID=" + localStorage['username'] + "&PWD=" + localStorage['password'] + "&RND=1356288673408",
		dataType: "html",
		url: "https://stars.bilkent.edu.tr/srs/ajax/login.php",
		timeout: requestTimeout,
		success: function (data) { if(data=='HOME') checkGrades(); },
		error: function (xhr, status, err) { console.log(err); }
	});
}


function onSuccess(data)
{
 	var al = data.split("You are logged out from SRS");
	if(al[1] || !localStorage['username'] || !localStorage['password']) {
		if(localStorage['username'] && localStorage['password'])
			login();
		return;
	}

	str = "<b>";
	al = data.split(str);
	notlar = Array();
	var yeni = 0;
	var change = 0;
	for(i=1;al[i];i++)
	{
		tut = al[i].split("</b>");
		not = tut[0];
		notlar[i] = not;
	}

	if(!localStorage['notes'] || localStorage['notes']=='undefined')
	{
		console.log(notlar);
		localStorage['notes'] = JSON.stringify(notlar);
		newInstall(notlar.length);
	} else {
		tmp = JSON.parse(localStorage['notes']);
		if(notlar.length != tmp.length)
			yeni+=notlar.length-tmp.length;
		else {
			for(i=1;i<=notlar.length;i++) {
				if(notlar[i] != tmp[i])
					change++;
			}
		}
		localStorage['notes'] = JSON.stringify(notlar);
	}
	console.log(yeni);
	if(yeni)
	{
		chrome.browserAction.setBadgeText({ text: ''+yeni });
		chrome.browserAction.setTitle({ title: yeni + " New Grade" });
		newPM(yeni);
	}
	else {
		chrome.browserAction.setBadgeText({ text: '' });
		chrome.browserAction.setTitle({ title: "Bilkent STARS Grade Notifications" });
		console.log("No new grades");
	}
}

function checkGrades()
{
	var requestTimeout = 10000;
	$.ajax({
		type: "GET",
		dataType: "html",
		url: "https://stars.bilkent.edu.tr/srs/ajax/gradeAndAttend/grade.php",
		timeout: requestTimeout,
		success: function (data) { onSuccess(data); },
		error: function (xhr, status, err) { console.log(err); }
	});
}

function newPM(count){
	var popup = window.webkitNotifications.createHTMLNotification("pm.html#"+count);
	popup.show();
	// setTimeout(function(){
	// 	popup.cancel();
	// }, '15000');
}
function newInstall(count){
	var popup = window.webkitNotifications.createHTMLNotification("install.html#"+count);
	popup.show();
	setTimeout(function(){
		popup.cancel();
	}, '15000');
}
