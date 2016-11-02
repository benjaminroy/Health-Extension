var strings = [
    "settings"
    ,"extensionName"
    ,"options"
    ,"data"
    ,"documentation"
    ,"contact"
    ,"settingsSaved"
    ,"standUpBreak"
    ,"enableFeature"
    ,"allowPushNotification"
    ,"allowTextMessageNotification"
    ,"allowTextMessage"
    ,"automaticallyTriggerBreak"
    ,"eyesBreak"
    ,"redShift"
    ,"timeRange"
    ,"contactMessage"
    ,"restoreDefault"
    ,"subject"
    ,"sourceCode"
    ,"here"
    ,"comingSoon"
    ,"automaticallySetRedShift"
    ,"manuallySetRedShift"
]

strings.map((s) => {
    var text = chrome.i18n.getMessage(s);
    var element = $(".name_" + s);
    if(element) element.html(text);
})

////http://stackoverflow.com/questions/26273405/can-i-get-a-list-of-available-locale-translations-from-my-chrome-extension
// function getLocales(callback) {
//   chrome.runtime.getPackageDirectoryEntry(function(root) {
//     root.getDirectory("_locales", {create: false}, function(localesdir) {
//       var reader = localesdir.createReader();
//       // Assumes that there are fewer than 100 locales; otherwise see DirectoryReader docs
//       reader.readEntries(function(results) {
//         callback(results.map(function(de){return de.name;}).sort());
//       });
//     });
//   });
// }
//
// getLocales(function(data){console.log(data);});
