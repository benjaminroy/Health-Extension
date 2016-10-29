
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
