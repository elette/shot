window.onload = loadIndex;

function loadIndex() { // load indexfile
// most current browsers support document.implementation
	if (document.implementation && document.implementation.createDocument) {
		xmlDoc = document.implementation.createDocument("", "", null);
		xmlDoc.load("index.xml");
	}
// MSIE uses ActiveX
	else if (window.ActiveXObject) {
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.load("index.xml");
	}
}


function searchIndex() { // search the index (duh!)
	if (!xmlDoc) {
		loadIndex();
	}
	// get the search term from a form field with id 'searchme'

	var searchterm = document.getElementById("searchme").value;
	var allitems = xmlDoc.getElementsByTagName("item");
	results = new Array;
	if (searchterm.length < 3) {
		alert("Enter at least three characters");
	} else {
		for (var i=0;i<allitems.length;i++) {
// see if the XML entry matches the search term,
// and (if so) store it in an array
			var name = allitems[i].lastChild.nodeValue;
			var exp = new RegExp(searchterm,"i");
			if ( name.match(exp) != null) {
				results.push(allitems[i]);
			}
		}
// send the results to another function that displays them to the user
	showResults(results, searchterm);
	}
}


// The following is just an example of how you
// could handle the search results
function showResults(results, searchterm) {

	if (results.length > 0) {
// if there are any results, put them in a list inside the "resultshere" div
		var resultshere = document.getElementById("resultshere");
		var header = document.createElement("h5");
		var list = document.createElement("ul");
		var searchedfor = document.createTextNode("You've searched for "+searchterm);
		resultshere.appendChild(header);
		header.appendChild(searchedfor);
		resultshere.appendChild(list);
		for (var i=0;i<results.length;i++) {
			var listitem = document.createElement("li");
			var item = document.createTextNode(results[i].lastChild.nodeValue);
			list.appendChild(listitem);
			listitem.appendChild(item);
		}
	} else {
// else tell the user no matches were found
		var resultshere = document.getElementById("resultshere");
		var para = document.createElement("p");
		var notfound = document.createTextNode("Sorry, I couldn't find anything like "+searchterm +"!");
		resultshere.appendChild(para);
		para.appendChild(notfound);
	}
}