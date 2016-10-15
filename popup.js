
/***** HTML Methods *****/
/*Time.prototype.createElement = function() {
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
*/

document.getElementById('settings').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
    } else {
        // Reasonable fallback.
        window.open(chrome.runtime.getURL('settings/settings.html'));
    }
});
