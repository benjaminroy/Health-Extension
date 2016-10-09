var aSecond = 1,
    aMinute = 60*aSecond,
    anHour = 60*aMinute;

function warning(message) {
  var element = $('#warning');
  element.innerHTML = message;
}

var Countdown = function (id, seconds = 0) {
	this.setTime(seconds);
  this.count = seconds;
  this.id = id;
};

Countdown.prototype.setTime = function(count = this.count) {
  var days = 0; //this.days = Math.floor(countdown_number/(3600*24));
  this.hours = (Math.floor(count/(anHour))-24*days) % 24;
  this.minutes = (Math.floor(count/(60))-this.hours*60) % 60;
  this.seconds = (Math.floor(count)-this.minutes*60) % 60;
};

Countdown.prototype.minus = function(seconds) {
  this.count -= seconds;
  this.setTime();
};

Countdown.prototype.write = function() {
  var element = $("#" + this.id + " .timer");
  var text = this.hours + ":" + this.minutes +":" + this.seconds;
  element.html(text);
};

Countdown.prototype.countdown = function() {
    console.log(this);
    this.write();
    this.minus(aSecond);
    setTimeout(this.countdown.bind(this), 1000);
};

Countdown.prototype.countdown_init = function(event) {
  this.countdown();
};

var count = anHour - 5*aMinute;
var heartCountdown = new Countdown("heart", count);

document.addEventListener('DOMContentLoaded', function () {
  $("#" + heartCountdown.id + ">.start").on('click', heartCountdown.countdown_init.bind(heartCountdown));
});




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

