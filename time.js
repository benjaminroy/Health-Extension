
var Time = function (milliseconds) {
  this.count = milliseconds;
  this.set();
};

Time.prototype.set = function(count = this.count) {
  var days = 0; //this.days = Math.floor(countdown_number/(3600*24));
  this.hours = Math.floor((count-days*aDay)/anHour);
  this.minutes = Math.floor((count-this.hours*anHour)/aMinute);
  this.seconds = Math.floor((count-this.minutes*aMinute)/aSecond);
  //this.milliseconds = Math.floor((milliseconds-this.seconds*aSecond)/aMillisecond);
};

Time.prototype.minus = function(aSecond) {
  this.count -= aSecond;
  this.set();
};

Time.prototype.countdown = function(display) {
  this.minus(aSecond);
  var timeDisplayed = Math.ceil(this.minutes).toString();// + "m"
  display(timeDisplayed);
  setTimeout(this.countdown.bind(this), aSecond, display);
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
