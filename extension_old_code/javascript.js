


function readTextFile(file)
{
    var allText = "...";
	
	var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
	return allText;
}






chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
	
	let url = tabs[0].url; // only use variable in here
	var output = "";
	
	
	
	var email = "info@ex.com";
	var link = "ex.com/changepsswd";
	
	//window.location.href.getElementsByTagName('body').length.
	
	
	/*const dataList = readTextFile("dataList.csv").split("\n");
	
	var org = "No orgenazation"; // if leaved, there's no
	for (let i=0; i < dataList; i++) {
		if (String(dataList[i].slice(0,dataList[i].length-1).split(",")[1]) == String(email)) // Does the email equal?
			org = dataList[i].split(",")[0]; // Put the orgenazation to "org"
			alert(org);
			break;
	}*/
	//output += "<b>org: </b><i>"+org+"</i><br>";
	//output += dataList[0].slice(0,dataList[0].length-1).split(",")[1]+"="+email+"=<br>";
	//output += dataList[0].slice(0,dataList[0].length-1).split(",")[1].localeCompare(email);
	
	document.getElementById("output").innerHTML = output;
});


