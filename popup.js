var aMillisecond = 1,
    aSecond = 1000*aMillisecond,
    aMinute = 60*aSecond,
    anHour = 60*aMinute,
    aDay = 24*anHour;

var Countdown = function (id, count) {
  this.id = "#" + id;
  this.count = count;
  this.isPlay = true;
  this.counting = this.count[this.isPlay];
	this.setTime(count[this.isPlay]);

	this.countdown(this.isPlay);
  $(this.id + ">.start").on('click', this.switch.bind(this));
};

Countdown.prototype.switch = function() {
  this.isPlay = !this.isPlay;
}

Countdown.prototype.setTime = function(counting = this.counting) {
  var days = 0; //this.days = Math.floor(countdown_number/(3600*24));
  this.hours = Math.floor((counting-days*aDay)/anHour);
  this.minutes = Math.floor((counting-this.hours*anHour)/aMinute);
  this.seconds = Math.floor((counting-this.minutes*aMinute)/aSecond);
  this.milliseconds = Math.floor((counting-this.seconds*aSecond)/aMillisecond);
};

Countdown.prototype.minus = function(seconds) {
  this.counting -= seconds;
  this.setTime();
};

Countdown.prototype.write = function() {
  var element = $(this.id + ">.timer");
  var text = this.hours + ":" + this.minutes +":" + this.seconds;
  element.html(text);
};

Countdown.prototype.countdown = function(play) {
  if(this.isPlay !== play) {
    play = this.isPlay;
    this.counting = this.count[this.isPlay];
  }
  this.write();
  this.minus(aSecond);
  setTimeout(this.countdown.bind(this), aSecond, play);
};

var countdowns = {
  "heart": {true: 55*aMinute, false: 5*aMinute},
  "eye": {true: 20*aMinute, false: 20*aSecond}
};

for (var type in countdowns) {
  new Countdown(type, countdowns[type]);
}





function store(e){
    writeItem();
}

function writeItem(){
    localStorage[1] = countdown_number;
}

function returnItem() {
  var stored = localStorage[1];
  document.getElementById('item').innerHTML=countdown_number;
}


/* Will be moved somewhere else */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings').addEventListener('click', function() {
        openSettingsTab();
    });
});

function openSettingsTab() {
    chrome.tabs.create({url: "settings/settings.html"});
};
/* ------------------------- */
