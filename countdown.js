/***** Global Variables *****/
var aMillisecond = 1,
    aSecond = 1000*aMillisecond,
    aMinute = 60*aSecond,
    anHour = 60*aMinute,
    aDay = 24*anHour;

/***** Constructor *****/
var Countdown = function (id, count) {
  this.id = id;
  this.count = count;
  this.isPlaying = true;
  this.counting = this.count[this.isPlaying]; //
	this.setTime();
	this.countdown(this.isPlaying);
	
	this.createElement();
	this.display();
  $("#" + this.id + ">.start").on('click', this.switch.bind(this));
};

/***** Background Methods *****/
Countdown.prototype.switch = function() {
  this.isPlaying = !this.isPlaying;
};

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
  
};

Countdown.prototype.countdown = function(playing) {
  if(this.isPlaying !== playing) {
    playing = this.isPlaying;
    this.counting = this.count[this.isPlaying];
  }
  this.display();
  this.minus(aSecond);
  setTimeout(this.countdown.bind(this), aSecond, playing);
};

/***** HTML Methods *****/
Countdown.prototype.createElement = function() {
  var trackers = document.querySelector("#trackers");
  var tracker = document.querySelector("#tracker");
  tracker.content.querySelectorAll(".type")[0].setAttribute("id", this.id);
  tracker.content.getElementById("symbol").className = "fa fa-" + this.id;
  tracker.content.querySelectorAll(".timer")[0].innerHtml = (this.counting);
  var clone = document.importNode(tracker.content, true);
  trackers.appendChild(clone);
};

Countdown.prototype.display = function() {
  var element = $("#" + this.id + ">.timer");
  var text = this.hours + ":" + this.minutes +":" + this.seconds;
  element.html(text);
};