// Main backend file
const DEBUG = true;


function onWindowLoad() {
    var url = null;
    var output = document.getElementById('output');


    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) { // Search what everything in this block stands for
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        url = activeTab.url;  // Stores the url for further usage.

        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            func: DOMtoString,
        });

    }).then(function (results) {
        var WebPageData = results[0].result;

        if (DEBUG) { // While developing other files, this prints what the files returns
            
            
            output.innerHTML =
                "DEBUG = ON<br><br>" +
                "<b> PageAnalyzer():</b><br>" +
                "<u>All found links:</u> [" + PageAnalyze(url, WebPageData)[0].join("],  [") + "]<br>" +
                "<u>Authors' email addresses:</u> [" + PageAnalyze(url, WebPageData)[1].join(',  ')+"]";

        } else {
            // ui view

            
            output.innerHTML = "UI view";
        }

    }).catch(function (error) {
        output.innerHTML = "<u>An error occured:</u> " + error;
    });
    function DOMtoString(selector) {
        if (selector) {
            selector = document.querySelector(selector);
            if (!selector) return "Open an email to use this tool."
        } else {
            selector = document.documentElement;
        }
        return selector.outerHTML;
    }
}



window.onload = onWindowLoad;  // When reloaded, run everything again
