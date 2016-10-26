
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
    ,"subject"
    ,"sourceCode"
    ,"here"
    ,"comingSoon"
]

strings.map((s) => {
    var text = chrome.i18n.getMessage(s);
    var element = $(".name_" + s);
    if(element) element.html(text);
})
