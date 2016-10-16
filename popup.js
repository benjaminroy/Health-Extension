
/*createElement = function(id) {
  var trackers = document.querySelector("#trackers");
  var tracker = document.querySelector("#tracker");
  tracker.content.querySelectorAll(".type")[0].setAttribute("id", id);
  tracker.content.getElementById("symbol").className = "fa fa-" + id;
//  tracker.content.querySelectorAll(".timer")[0].innerHtml = time.count;
  var clone = document.importNode(tracker.content, true);
  trackers.appendChild(clone);
};

Time.prototype.display = function() {
  var element = $("#" + this.id + ">.timer");
  var text = this.hours + ":" + this.minutes +":" + this.seconds;
  element.html(text);
};*/


document.getElementById('settings').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage(); //Chrome 42+
    } else {
        window.open(chrome.runtime.getURL('settings/settings.html')); // Reasonable fallback.
    }
});
