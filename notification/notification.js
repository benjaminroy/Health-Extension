var spawnNotification = function(title, options) {
  var notification = new Notification(title, options);
  setTimeout(notification.close.bind(notification), 5000);
};

var notifyMe = function(type) {
  console.log(type);
  var title, options;
  if (type === "eye") {
    title = "Eyes Break!";
    options = {
      body: "Look at 20 meters for 20 seconds.",
      icon: "notification/eye.png"
    };
  } else if (type === "heart"){
    title = "Stand up Break!";
    options = {
      body: "Move for 5 minutes and come back.",
      icon: "notification/heart.png"
    };
  } else {
    title = type;
    options = {
      icon: "heartbeat128.png"
    };
  }

  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    spawnNotification(title, options);
  } else {
    console.log("The extension requires the 'notifications' permission, so this should never print.");
  }
};


//chrome.notifications.getPermissionLevel
