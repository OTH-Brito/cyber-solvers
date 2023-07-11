# Structure of the code (for developers)

| | Describtion of files| Parts not coded yet |
|---|---| ---|
|**manifest.json** | Specifies some general settings for the extension (name, version, icon/logo, html file for the popup box, etc)|  |
|**index.html** | Makes the popup layout and interconnects style.css and script.js to itself.|  |
|**style.js** | Design (font size, background color, etc) and responsive coding (later on, but if anyone wants to know more [(look here for a tutorial)](https://www.w3schools.com/css/css_rwd_intro.asp))| The design and web responsivation|
|**script.js** | In this file, all data from the other backend files is handled and the the result is presented in the output paragraph. (While debugging, you can turn the DEBUG variable true. Then the file is printing only the data from the other files without any other handling).| UI view (generation of a table) |
|**PageAnalyze.js** | This file analyzes and filters the data from the current page (in HTML format).| The filtering and collection of data and the if statement that tells weather or not an email is viewed |
|**DBManager.c**| Not created yet and may be in a different language. This file will handle requests to the database and save new data in there. | * 
