
/***** Constructor *****/
var Time = function (milliseconds) {
  this.milliseconds = milliseconds;
  this.set();
	
  //this.isPlaying = true;
  //this.counting = this.count[this.isPlaying]; //
	//this.countdown(this.isPlaying);
	
	//this.id = id;
	//this.createElement();
	//this.display();
  //$("#" + this.id + ">.start").on('click', this.switch.bind(this));
};

/***** Background Methods *****/
//Countdown.prototype.switch = function() {
//  this.isPlaying = !this.isPlaying;
//};

Time.prototype.set = function(milliseconds = this.milliseconds) {
  var days = 0; //this.days = Math.floor(countdown_number/(3600*24));
  this.hours = Math.floor((milliseconds-days*aDay)/anHour);
  this.minutes = Math.floor((milliseconds-this.hours*anHour)/aMinute);
  this.seconds = Math.floor((milliseconds-this.minutes*aMinute)/aSecond);
  this.milliseconds = Math.floor((milliseconds-this.seconds*aSecond)/aMillisecond);
};

Time.prototype.minus = function(milliseconds) {
  this.milliseconds -= milliseconds;
  this.set();
};

Time.prototype.countdown = function(callback) {
  //if(this.isPlaying !== playing) {
  //  playing = this.isPlaying;
  //  this.counting = this.count[this.isPlaying];
  //}
  //this.display();
  this.minus(aSecond);
  callback();
  setTimeout(this.countdown.bind(this), aSecond);
};



/***** HTML Methods *****/
Time.prototype.createElement = function() {
  var trackers = document.querySelector("#trackers");
  var tracker = document.querySelector("#tracker");
  tracker.content.querySelectorAll(".type")[0].setAttribute("id", this.id);
  tracker.content.getElementById("symbol").className = "fa fa-" + this.id;
  tracker.content.querySelectorAll(".timer")[0].innerHtml = (this.counting);
  var clone = document.importNode(tracker.content, true);
  trackers.appendChild(clone);
};

Time.prototype.display = function() {
  var element = $("#" + this.id + ">.timer");
  var text = this.hours + ":" + this.minutes +":" + this.seconds;
  element.html(text);
};