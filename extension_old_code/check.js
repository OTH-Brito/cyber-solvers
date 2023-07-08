function readTextFile(file)
{
    var allText = "-1";
	
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

function searchLinks(content) {
	var links = [];
	var link_start;
	var link_end
	while (true) {
		link_start = content.search("<a");
		if (link_start < 0) { // No more link
			break;
		}
		link_end = content.search("</a>");
		
		links.push(content.slice(link_start,link_end+4));
		content = content.slice(link_end+3,content.length);
	}
	
	for (let i=0; i < links.length; i++) { // Slice all links
		first_quote = links[i].search("\"")+1;
		second_quote = first_quote+links[i].slice(first_quote,links[i].length).search("\"");
		
		links[i] = links[i].slice(first_quote,second_quote);
		links[i] = links[i].replace("https://","").replace("http://","").replace("www.","").replace("www2","");
	}
	
	return links;
}

function EmailToSite(email) {
	return email.slice(email.search("@")+1,email.length);
}

function Check(email,content) {
	var dataList = readTextFile("dataList.csv").split("\n"); //Split lines
	
	// ***** Check orgenazation *****
	var org = "No orgenazation"; // if leaved, there's no
	for (let i=0; i < dataList.length; i++) {
		//alert(dataList[i].slice(0,dataList[i].length-1).split(",")[1]);
		if (String(dataList[i].slice(0,dataList[i].length-1).split(",")[1]) == String(email)) { // Does the email equal?
			org = dataList[i].split(",")[0]; // Put the orgenazation to "org"
			
			//alert(org);
			break;
		}
	}
	
	// ***** Check for links in content *****
	var links = searchLinks(content);
	
	for (let i=0; i < links.length; i++) {
		//alert(EmailToSite(email)+"\n"+links[i])
		if (EmailToSite(email) == links[i]) {
			links[i] = "<b class='safe'>Safe:</b> "+links[i];
		} else {
			links[i] = "<b class='warning'>Warning:</b> "+links[i];
		}
	}
	
	return links;
}