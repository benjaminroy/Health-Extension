
var Time = function (milliseconds) {
  this.count = milliseconds;
  this.set();
};

Time.prototype.set = function(count = this.count) {
  var days = 0; //this.days = Math.floor(countdown_number/(3600*24));
  this.hours = Math.floor((count-days*A_DAY)/AN_HOUR);
  this.minutes = Math.floor((count-this.hours*AN_HOUR)/A_MINUTE);
  this.seconds = Math.floor((count-this.minutes*A_MINUTE)/A_SECOND);
  //this.milliseconds = Math.floor((milliseconds-this.seconds*A_SECOND)/A_MILLISECOND);
};

Time.prototype.minus = function(A_SECOND) {
  this.count -= A_SECOND;
  this.set();
};

Time.prototype.countdown = function(display) {
  this.minus(A_SECOND);
  var timeDisplayed = Math.ceil(this.minutes).toString();// + "m"
  display(timeDisplayed);
  setTimeout(this.countdown.bind(this), A_SECOND, display);
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
