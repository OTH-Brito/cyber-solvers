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
		txt_start = content.slice(link_start,link_end-5).lastIndexOf(">");
		
		//alert()
		link_end = content.search("</a>");
		//alert(content.slice(link_start+txt_start,link_end+4));
		links.push([content.slice(link_start,link_end+4),content.slice(link_start,link_end+4)]);
		content = content.slice(link_end+3,content.length);
	}
	
	for (let i=0; i < links.length; i++) { // Slice all links
		first_quote = links[i][0].search("href=\"")+6;
		//alert(links[i][0]+"\n"+first_quote);
		second_quote = (links[i][0].slice(first_quote,links[i][0].length).search("\""))+first_quote;
		//alert(links[i][0].slice(first_quote,links[i][0].length)+"\n"+second_quote);
		
		links[i][0] = links[i][0].slice(first_quote,second_quote);
		links[i][0] = links[i][0].replace("https://","").replace("http://","").replace("www.","").replace("www2","");
	}
	
	return links;
}

function EmailToSite(email) {
	return email.slice(email.search("@")+1,email.length);
}

function safe(links,org) {
	//alert(links[0]);
	
	for (let i=1; i < org.length; i++) { // go throught all emails/domains
		//alert(links[i]);
		if (links[0].search(EmailToSite(org[i])) !== -1) {
			return true;
		}
	}
	return false;
}

function Check(email,content) {
	//alert(email);
	var data = readTextFile("dataList.csv");
	var dataList = readTextFile("dataList.csv").split("\n"); //Split lines
	
	
	// ***** Check orgenazation *****
	var org = ["Unknown"]; // if leaved, there's no
	for (let i=0; i < dataList.length; i++) {
		
		//alert(dataList[i].slice(0,dataList[i].length-1).split(",")[1]);
		txt = dataList[i].slice(0,dataList[i].length-1).split(",");
		//alert(txt);
		
		for (let k=0; k < txt.length; k++) {
			//alert("'"+txt[k]+"'");
			//alert(String(email));
			
			if ((String(txt[k]) === String(email))) { // txt[k].length == email.length) { // Does the email equal?
				org = txt; // Put the orgenazation to "org" + emails
				
				//alert(org);
				
				break;
			}
		}
		if (org[0] !== "Unknown") { break;}
		
	}
	
	
	document.getElementById("org").innerHTML = "<b>Email adress:</b> "+email+"<br><b>Orgenazation:</b> "+org[0];
	
	// ***** Check for links in content *****
	var links = searchLinks(content);
	
	for (let i=0; i < links.length; i++) {
		//alert("'"+EmailToSite(email)+"'\n'"+links[i][0]+"'")
		//alert(EmailToSite(email));
		//alert((org));
		
		if (links[i][0].search("mailto:") !== -1) {
			links[i][0] = "";
		} else if ((data.search(links[i][0].slice(0,links[i][0].indexOf('/'))) !== -1) && links[i][0].search('google') == -1) {   // (links[i][0].search(EmailToSite(email))
			
			links[i][0] = "<tr class='safe'><td><b>Safe:</b></td> <td>"+links[i][1]+"</td><td><div class='link'>"+links[i][0]+"</div></td></tr>";
		} else if (links[i][0].search('google') == -1) {
			//alert(links[i][0]);
			//alert(data);
			links[i][0] = "<tr class='warning'><td><b>Warning:</b></td> <td>"+links[i][1]+"</td><td><div class='link'>"+links[i][0]+"</div></td></tr>";
		} else {
			links[i][0] = "";
		}
	}
	
	/*for (let i=0; i < links.length; i++) {
		//alert("'"+EmailToSite(email)+"'\n'"+links[i][0]+"'")
		//alert(EmailToSite(email));
		//alert((org));
		if (links[i][0].search("mailto:") !== -1) {
			links[i][0] = "";
		} else if (org !== "Unknown" && safe(links[i],org) && links[i][0].search('google') == -1) {   // (links[i][0].search(EmailToSite(email))
			links[i][0] = "<tr class='safe'><td><b>Safe:</b></td> <td>"+links[i][1]+"</td><td><div class='link'>"+links[i][0]+"</div></td></tr>";
		} else if (links[i][0].search('google') == -1) {
			links[i][0] = "<tr class='warning'><td><b>Warning:</b></td> <td>"+links[i][1]+"</td><td><div class='link'>"+links[i][0]+"</div></td></tr>";
		} else {
			links[i][0] = "";
		}
	}
	*/
	
	let result = "";
	for (let i=0; i < links.length; i++) {
		result += links[i][0];
	}
		
	return "<table>"+result+"</table>";
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//               Code

function SearchForEmailAddress(data) { // From current page
	//alert(data.replace(/<[^>]+>/g, '').slice(0,10));
	//return "<xmp>"+data.slice(0,100)+"</xmp>";
	var result = "";
	pos = data.search("<span class=\"go\"><span aria-hidden=\"true\">");
	if (pos < 0) {
		return "-1";
	}
	
	
	result = data.slice(pos+53,pos+100)
	
	result = result.slice(0,result.search('<span'));
	
	
	//alert(result);
	
	return result; // <xmp>
}

function SearchForEmailContent(data) { // From current page
	//alert(data.replace(/<[^>]+>/g, '').slice(0,10));
	//return "<xmp>"+data.slice(0,100)+"</xmp>";
	var result = "";
	pos = data.search('// Google Inc');
	if (pos < 0) {
		return "-1";
	}
	
	
	result = data.slice(pos,data.length);
	//result = result.slice(result.search('<h2 class="aWk" id=":4r">'),result.length)
	//result = result.slice(result.search('<h2 class="aWk" id=":4r">'),result.length)
	result = result.slice(result.search('data-hovercard-id="'),result.length);
	//result = result.slice(result.search('id=":hv"'),result.length);
	//result = result.slice(result.search('<div id=":ca"'),result.length)
	
	//alert(result.search('</div><div class="adl"><br></div>'));
	result = result.slice("0,result.search('if(_.W){var kj;if(')");
	//alert(result);
	
	return result; // <xmp>
}

function IsMail(url) {
	//alert(url.slice(0,"https://mail.google.com/mail/u/0/#inbox/".length)+"\n"+"https://mail.google.com/mail/u/0/#inbox/")
	if (String(url).search("https://mail.google.com/mail/u/0/#inbox/") !== -1) {
		return true;
	} else {
		return false;
		
	}
}

function api() {
	return 1;
}

function onWindowLoad() {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		var url = tabs[0].url;
		// use `url` here inside the callback because it's asynchronous!
		if (!IsMail(url)) {
			var output = document.getElementById('output');
			output.innerHTML = "-1";
		}
	});
	
	var output = document.getElementById('output');

    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
            func: DOMtoString,
            // args: ['body']  // you can use this to target what element to get the html for
        });

    }).then(function (results) {
        if (output.innerHTML !== "-1") {
			//output.innerHTML = api();
			//output.innerHTML = results[0].result;
			
			output.innerHTML = Check(SearchForEmailAddress(results[0].result),SearchForEmailContent(results[0].result));
			
			//document.getElementById("email").innerHTML = "<b>Email:</b> '"+SearchForEmailAddress(results[0].result)+"'";
			//output.innerHTML = "<b>Mail:</b> "+SearchForEmailAddress(results[0].result)+"";
			//output.innerHTML = "<b>Content:</b> "+SearchForEmailContent(results[0].result)+"";
			//output.innerHTML = searchLinks(results[0].result)[1];
		} else {
			output.innerHTML = "Open an email to use this tool.";
		}
    }).catch(function (error) {
        output.innerHTML = "Open an email to use this tool.";
    });
}

function DOMtoString(selector) {
    if (selector) {
        selector = document.querySelector(selector);
        if (!selector) return "Open an email to use this tool."
    } else {
        selector = document.documentElement;
    }
    return selector.outerHTML;
}





window.onload = onWindowLoad;
