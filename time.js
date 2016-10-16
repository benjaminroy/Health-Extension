
var Time = function (milliseconds) {
  this.count = milliseconds;
  this.set();
};

Time.prototype.set = function(count = this.count) {
  var days = 0; //this.days = Math.floor(countdown_number/(3600*24));
  this.hours = round0((count-days*A_DAY)/AN_HOUR);
  this.minutes = round0((count-this.hours*AN_HOUR)/A_MINUTE);
  this.seconds = round0((count-this.minutes*A_MINUTE)/A_SECOND);
  //this.milliseconds = round0((milliseconds-this.seconds*A_SECOND)/A_MILLISECOND);
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

//Countdown.prototype.switch = function() {
//  this.isPlaying = !this.isPlaying;
//};
