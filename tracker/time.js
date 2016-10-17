
var Time = function (milliseconds) {
    this.count = milliseconds;
    this.set();
};

Time.prototype.set = function(count = this.count) {
    this.count = count;
    var days = 0; //this.days = round0(count/A_DAY);
    count -= days*A_DAY;
    this.hours = round0((count)/AN_HOUR);
    count -= this.hours*AN_HOUR;
    this.minutes = round0((count)/A_MINUTE);
    count -=this.minutes*A_MINUTE;
    this.seconds = round0((count)/A_SECOND);
    //this.milliseconds = round0((milliseconds-this.seconds*A_SECOND)/A_MILLISECOND);
};

Time.prototype.minus = function(A_SECOND) {
    this.count -= A_SECOND;
    this.set();
};

Time.prototype.format = function() {
    var sign = Math.sign(this.count) === -1 ? "-" : "";
    var time = pad0(Math.abs(this.minutes)) + ":" + pad0(Math.abs(this.seconds));
    if (this.hours !== 0) time = Math.abs(this.hours) + ":" + time;
    return sign + time;
};


//if(this.isPlaying !== playing) {
//  playing = this.isPlaying;
//  this.counting = this.count[this.isPlaying];
//}
//this.display();

//Countdown.prototype.switch = function() {
//  this.isPlaying = !this.isPlaying;
//};
