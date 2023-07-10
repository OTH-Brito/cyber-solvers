// Reads the webpage and collects necessary data.


function PageAnalyze(
    URL,             // The URL of the current viewing page
    WebPageData      // A String that contains the current viewing webpage in HTML format.
) {
    // Returning variables
    allFoundLinks = [];
    authourEmailAdresses = [];

    // TODO: Detecting if viewing an email or not.
    // TODO: Filtering and stuff here
    

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