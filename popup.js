

var countdowns = {
  "heart": {true: 55*aMinute, false: 5*aMinute},
  "eye": {true: 20*aMinute, false: 20*aSecond}
};

for (var type in countdowns) {
  new Countdown(type, countdowns[type]);
}





/* Will be moved somewhere else */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings').addEventListener('click', function() {
        openSettingsTab();
    });
});

var openSettingsTab = function() {
    chrome.tabs.create({url: "settings/settings.html"});
}
/* ------------------------- */
