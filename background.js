//the redshift should be the first function to be executed in order to minimize the time the screen is white
redshiftBackground.init();
notifyMe("The app has started");


/***** Global Variables *****/
//TODO put in constants.js (?)
var aMillisecond = 1,
    aSecond = 1000*aMillisecond,
    aMinute = 60*aSecond,
    anHour = 60*aMinute,
    aDay = 24*anHour;


/*
var countdowns = {
  "heart": {true: 55*aMinute, false: 5*aMinute},
  "eye": {true: 20*aMinute, false: 20*aSecond}
};

for (var type in countdowns) {
  new Countdown(type, countdowns[type]);
}
*/


var updateBadge = function(text) {
	chrome.browserAction.setBadgeText({ text: text });
};


var interval = 10 * aSecond;
var time = new Time(55 * aMinute);
time.countdown(updateBadge);


/*
function store(e) {
    writeItem();
}

function writeItem() {
    localStorage[1] = countdown_number;
}

function returnItem() {
  var stored = localStorage[1];
  document.getElementById('item').innerHTML=countdown_number;
}
*/
