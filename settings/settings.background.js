var settings = {};

chrome.extension.onConnect.addListener(function(port) {
     port.onMessage.addListener(function(settingsImport) {
         if(port.name === "settingsUpdate") {
             settings = settingsImport;
         }
     });
})
