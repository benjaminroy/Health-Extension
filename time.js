
//chrome.extension.getBackgroundPage().variable = 42;

var Time = function (milliseconds) {
  this.milliseconds = milliseconds;
  this.set();
};

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
  this.minus(aSecond);
  callback(this.minutes);
  setTimeout(this.countdown.bind(this), aSecond);
};




  //if(this.isPlaying !== playing) {
  //  playing = this.isPlaying;
  //  this.counting = this.count[this.isPlaying];
  //}
  //this.display();

	
  //this.isPlaying = true;
  //this.counting = this.count[this.isPlaying]; //
	//this.countdown(this.isPlaying);
	
	//this.id = id;
	//this.createElement();
	//this.display();
  //$("#" + this.id + ">.start").on('click', this.switch.bind(this));
  

//Countdown.prototype.switch = function() {
//  this.isPlaying = !this.isPlaying;
//};
