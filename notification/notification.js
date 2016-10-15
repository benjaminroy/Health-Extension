var spawnNotification = function(title, options) {
  var notification = new Notification(title, options);
  setTimeout(notification.close.bind(notification), 5000);
};

var notifyMe = function(type) {
  console.log(type);
  var title, options;
  if (type === "eyesBreak") {
    title = "Eyes Break!";
    options = {
      body: "Look at 20 meters for 20 seconds.",
      icon: "notification/eye.png"
    };
  } else {
    title = "Stand up Break!";
    options = {
      body: "Move for 5 minutes and come back.",
      icon: "notification/heart.png"
    };
  }
  
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    console.log("Permission granted");
    spawnNotification(title, options);
  } else if (Notification.permission !== 'denied') {
    console.log("Permission default");
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        spawnNotification(title, options);
      }
    });
  }
};


//chrome.notifications.getPermissionLevel