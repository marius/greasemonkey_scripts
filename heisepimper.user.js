// ==UserScript==
// @name           Heise Pimper
// @description    Removes annoyances from heise sites
// @author         Marius Nuennerich (marius at nuenneri.ch)
// @namespace      http://github.com/Marius/greasemonky_scripts
// @include        http://*.heise.de/newsticker/*
// @include        http://*.heise.de/tp/*
// ==/UserScript==

(function() {
	function pimp_news() {
		var date = document.evaluate("//td[@valign='bottom']", document.body, null,
		                            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;

		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			if(divs[i].className == 'meldung_wrapper') {
				var shortTitle = document.title.replace(/heise online - \d\d\.\d\d\.\d\d - /, '');
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
		var divs = document.getElementsByTagName('div');
		for(var i = 0; i < divs.length; i++) {
			if(divs[i].className == 'tage') {
				document.body.innerHTML = divs[i].innerHTML;
				return;
			}
		}
	}

	function pimp_telepolis() {
		var tables = document.getElementsByTagName('table');
		for(var i = 0; i < tables.length; i++) {
			if(tables[i].className == 'inhalt-table') {
				document.body.innerHTML = '<table>' + tables[i].innerHTML + '</table>';
				return;
			}
		}
	}

	var spans = document.getElementsByTagName('span');
	for(var i = 0; i < spans.length; i++) {
		if(spans[i].textContent == 'Anzeige') {
			spans[i].style.display = 'none';
			spans[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
			    spans[i].parentNode.parentNode.parentNode.parentNode);
		}
	}

	document.body.style.margin = '25px';
	document.body.style.width = '800px';

	if(document.title.match(/7-Tage-News/))
		pimp_headings();
	else if(document.title.match(/(TELEPOLIS|TP: )/))
		pimp_telepolis();
	else
		pimp_news();

}());
