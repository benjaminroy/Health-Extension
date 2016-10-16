
/* Chrome */
var setBadgeText = function(text) {
  chrome.browserAction.setBadgeText({ text: text });
};

/* General */
var round0 = function(value) {
  return value < 0 ? Math.ceil(value) : Math.floor(value);
}

function pad0(value) {
  var value = value.toString();
  return value.substr(0, 2 - value.length) + value;
}
