
/***** HTML Methods *****/
Time.prototype.createElement = function() {
  var trackers = document.querySelector("#trackers");
  var tracker = document.querySelector("#tracker");
  tracker.content.querySelectorAll(".type")[0].setAttribute("id", this.id);
  tracker.content.getElementById("symbol").className = "fa fa-" + this.id;
  tracker.content.querySelectorAll(".timer")[0].innerHtml = this.counting;
  var clone = document.importNode(tracker.content, true);
  trackers.appendChild(clone);
};

Time.prototype.display = function() {
  var element = $("#" + this.id + ">.timer");
  var text = this.hours + ":" + this.minutes +":" + this.seconds;
  element.html(text);
};



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings').addEventListener('click', function() {
        openSettingsTab();
    });
});

var openSettingsTab = function() {
    chrome.tabs.create({url: "settings/settings.html"});
};



