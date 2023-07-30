// Reads the webpage and collects necessary data.


function PageAnalyze(
    URL,             // The URL of the current viewing page
    WebPageData      // A String that contains the current viewing webpage in HTML format.
) {
    // Returning variables
    allFoundLinks = [];
    authourEmailAdresses = [];

    // TODO: Detecting if viewing an email or not.
    // TODO: Filtering and stuff here (ONLY FOR LINKS)


    var emailMessages = WebPageData.match(/class="adn ads".*/g);                    // Finds the tags representing email messages in the conversation

    for (let message = 0; message < emailMessages.length; message++) {
        var element_H3_IW = /<h3.*class="iw".*/i.exec(emailMessages[message]);      // Finds the h3.iw tag
        var element_SPAN = /email="[^"]*"/i.exec(element_H3_IW).toString();         // Finds the email attribute in the span tag

        var formattingEmailAddress = element_SPAN.substring(                        // Formatting the email
            element_SPAN.indexOf("\"")+1,
            element_SPAN.lastIndexOf("\"")
        );

        authourEmailAdresses.push(formattingEmailAddress);
    }
    

    return [
        allFoundLinks,
        authourEmailAdresses
    ];
}


//
// FORMAT OF RETURNING VARIABLES:
// -----------------------------
// allFoundLinks = [["url","whole tag"], ...];
//
// authourEmailAdresses = ["email", ...];
//
//
// If any of them are NULL: The webpage is not an email.
//
