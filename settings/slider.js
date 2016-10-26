/*
Copyright (c) 2016 - Casey Hunt - http://codepen.io/caseymhunt/pen/kertA
Modified: 2016 - Health Extension

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/


 $("#slider-range").slider({
     range: true,
     min: 0,
     max: 1440,
     step: 15,
     values: [540, 1020],
     slide: function (e, ui) {
         var time1 = format(ui.values[0], "CA");
         $('.slider-time').html(time1);

        var time2 = format(ui.values[1], "CA");
         $('.slider-time2').html(time2);
     }
 });

var formatCA = function(value) {
  var hours = Math.floor(value / 60);
  var minutes = value - (hours * 60);

  if (hours.length == 1) hours = '0' + hours;
  if (minutes.length == 1) minutes = '0' + minutes;
  if (minutes == 0) minutes = '00';

  var time = hours + ':' + minutes;
  return time;
};

 var format = function(value, format) {
     var hours = Math.floor(value / 60);
     var minutes = value - (hours * 60);

     if (hours.length == 1) hours = '0' + hours;
     if (minutes.length == 1) minutes = '0' + minutes;
     if (minutes == 0) minutes = '00';

     if(format === "US") {
         if (hours >= 12) {
             if (hours == 12) {
                 hours = hours;
                 minutes = minutes + " PM";
             } else if (hours == 24) {
                 hours = 11;
                 minutes = "59 PM";
             } else {
                 hours = hours - 12;
                 minutes = minutes + " PM";
             }
         } else {
             hours = hours;
             minutes = minutes + " AM";
         }
         if (hours == 0) {
             hours = 12;
             minutes = minutes;
         }
     }

     var time = hours + ':' + minutes;
     return time;
 };
