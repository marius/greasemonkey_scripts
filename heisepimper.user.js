// ==UserScript==
// @name           Heise Pimper
// @description    Removes annoyances from heise sites
// @author         Marius Nuennerich (marius at nuenneri.ch)
// @namespace      http://github.com/Marius/greasemonky_scripts
// @include        http://*.heise.de/newsticker/*
// @include        http://*.heise.de/tp/*
// @include        http://*.heise.de/open/*
// ==/UserScript==
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <marius@nuenneri.ch> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return. Marius Nuennerich
 * ----------------------------------------------------------------------------
 */


(function() {
	function pimp_news() {
		GM_log("news");
		var date = document.title.substring(15, 23);
		var shortTitle = document.title.replace(/heise online - \d\d\.\d\d\.\d\d - /, '');
		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			if(divs[i].className == 'meldung_wrapper') {
				document.body.innerHTML = date
				                          + '<h2>'
				                          + shortTitle
				                          + '</h2>' + divs[i].innerHTML;
				document.title = shortTitle;
				return;
			}
		}
	}

	function pimp_headings() {
		GM_log("headings");
		document.body.innerHTML = document.getElementById('mitte_news').innerHTML;
	}

	function pimp_telepolis() {
		GM_log("tp");
		var tables = document.getElementsByTagName('table');
		for(var i = 0; i < tables.length; i++) {
			if(tables[i].className == 'inhalt-table') {
				document.body.innerHTML = '<table>' + tables[i].innerHTML + '</table>';
				return;
			}
		}
	}

	function pimp_open_headings() {
		GM_log("open headings");
	}

	function pimp_open() {
		GM_log("open");
		var date = document.title.substring(13, 21);
		var shortTitle = document.title.replace(/heise open - \d\d\.\d\d\.\d\d - /, '');
		var ps = document.getElementsByTagName('p');
		var navi = '';
		for(var i = 0; i < ps.length; i++) {
			if(ps[i].className == 'artikel_navi') {
				navi = ps[i].innerHTML;
				break;
			}
		}
		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			if(divs[i].className == 'meldung_wrapper') {
				document.body.innerHTML = date + divs[i].innerHTML + navi;
				document.title = shortTitle;
				return;
			}
		}
	}

	var spans = document.getElementsByTagName('span');
	for(var i = 0; i < spans.length; i++) {
		if(spans[i].textContent == 'Anzeige') {
			spans[i].style.display = 'none';
		}
	}

	document.body.style.margin = '25px';
	document.body.style.width = '800px';
	document.body.style.background = '#ffffff';

	if(document.title.match(/7-Tage-News/))
		pimp_headings();
	else if(document.title.match(/^TELEPOLIS/))
		pimp_telepolis();
	else if(document.title.match(/Open Source/))
		pimp_open_headings();
	else if(document.title.match(/heise open/))
		pimp_open();
	else
		pimp_news();
}());
