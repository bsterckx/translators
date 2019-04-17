{
	"translatorID": "c0e84400-1ed4-4cfa-9f88-a8e60e37a0cf",
	"label": "Ejustice (be)",
	"creator": "Mathijs van Westendorp",
	"target": "www.ejustice.just.fgov.be\\/(cgi_loi|eli\\/(wet|loi))",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2019-04-17 10:06:45"
}

function attr(docOrElem,selector,attr,index){var elem=index?docOrElem.querySelectorAll(selector).item(index):docOrElem.querySelector(selector);return elem?elem.getAttribute(attr):null}function text(docOrElem,selector,index){var elem=index?docOrElem.querySelectorAll(selector).item(index):docOrElem.querySelector(selector);return elem?elem.textContent:null}

function detectWeb(doc, url) {
	// Adjust the inspection of url as required
	if ( url.indexOf('wet') != -1 ) {
		return 'statute';
	}
	// Adjust the inspection of url as required
	else if (url.indexOf('book') != -1){
		return 'book';
	}
	else if (url.indexOf('journal') != -1){
		return 'journalArticle';
	}
	// Add other cases if needed
}

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		Z.debug("Shouldn't happen");
	} else {
		scrape(doc, url);
	}
}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// Adjust the CSS Selectors 
	var rows = doc.querySelectorAll('.detailsLink');
	for (var i=0; i<rows.length; i++) {
		// Adjust if required, use Zotero.debug(rows) to check
		var href = rows[i].href;
		// Adjust if required, use Zotero.debug(rows) to check
		var title = ZU.trimInternal(rows[i].textContent);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
}

function scrape(doc, url) {
	item = new Zotero.Item(detectWeb(doc, url));
	Z.debug("Document" + doc);
	var rows;
	const frame = doc.querySelector('frame');
	Z.debug("Document frame" + frame);
	if (frame){
		doc = frame;
	}
	rows = doc.querySelectorAll('tr th');
	Z.debug("Rows" + rows);
	item = getLawEnacted(rows);
	item.jurisdiction = 'be';
	item.complete();
}

function getLawEnacted(lineList){
	item = new Zotero.Item('statute');
	//Z.debug("Linelist length" + lineList.length);
	for (i=0; i < lineList.length; i++){
		Z.debug("Line text" + lineList[i].textContent);
			var m = lineList[i].textContent.match(/(\d{1,2}\s[A-Z]*?\s\d{4})\.\s-\s([^<^;^\.^\(]*)/);
			if (m){
				item.dateEnacted = m[1].toLowerCase();
				Z.debug("Date Enacted: " + item.dateEnacted);
				item.nameOfAct = ZU.trimInternal(m[2]);
				item.nameOfAct = item.nameOfAct.replace(/[\[\]]/g, "");
				item.nameOfAct = item.nameOfAct.replace(/\.$/, "");
		
				if(item.nameOfAct.match(/Wet|Koninklijk besluit/)){
					item.nameOfAct = item.nameOfAct.replace(/(^(Wet|Koninklijk besluit)*\b)/, "$1 van " + item.dateEnacted.toLowerCase())
				}
				Z.debug("Title: " + item.nameOfAct);
				break;
			}
		}
	return item
}
/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&la=N&cn=2002082245&table_name=wet&&caller=list&N&fromtab=wet&tri=dd+AS+RANK&rech=1&numero=1&sql=(text+contains+(%27%27))",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Wet van 22 augustus 2002 betreffende de rechten van de patiënt",
				"creators": [],
				"dateEnacted": "22 augustus 2002",
				"jurisdiction": "be",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&la=N&table_name=wet&cn=1967111008&&caller=list&N&fromtab=wet&tri=dd+AS+RANK&rech=1&numero=1&sql=(text+contains+(%27%27))",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Koninklijk besluit van 10 november 1967 nr 78 betreffende de uitoefening van de gezondheidszorgberoepen",
				"creators": [],
				"dateEnacted": "10 november 1967",
				"jurisdiction": "be",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&la=N&cn=1967101004&table_name=wet&&caller=list&N&fromtab=wet&tri=dd+AS+RANK&rech=1&numero=1&sql=(text+contains+(%27%27))",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "GERECHTELIJK WETBOEK - Deel IV : BURGERLIJKE RECHTSPLEGING",
				"creators": [],
				"dateEnacted": "10 oktober 1967",
				"jurisdiction": "be",
				"shortTitle": "GERECHTELIJK WETBOEK - Deel IV",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&la=N&cn=2008122334&table_name=wet&&caller=list&N&fromtab=wet&tri=dd+AS+RANK&rech=1&numero=1&sql=(text+contains+(%27%27))",
		"items": [
			{
				"itemType": "statute",
				"nameOfAct": "Koninklijk besluit van 23 december 2008 tot uitvoering van de arbeidsongevallenwet van 10 april 1971 in verband met de onevenredig verzwaarde risico's",
				"creators": [],
				"dateEnacted": "23 december 2008",
				"jurisdiction": "be",
				"attachments": [],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
