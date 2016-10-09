document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("notify").addEventListener("click", notifyMe);
});

var spawnNotification = function(title, options) {
  var notification = new Notification(title, options);
  setTimeout(notification.close.bind(notification), 5000);
};

var notifyMe = function(type) {
  console.log(type);
  if (type === "eyesBreak") {
    var title = "Eyes Break !";
    var options = {
      body: "Look at 20 meters for 20 seconds",
      icon: "notification/eye.png"
    };
  } else {
    var title = "Stand up Break !";
    var options = {
      body: "Move for 5 minutes and come back",
      icon: "notification/heart.png"
    };
  }

  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
    console.log("Permission granted");
    spawnNotification(title, options);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        spawnNotification(title, options);
      }
    });
  }
}
