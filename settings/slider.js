/*
Copyright (c) 2016 - Casey Hunt - http://codepen.io/caseymhunt/pen/kertA

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
         var hours1 = Math.floor(ui.values[0] / 60);
         var minutes1 = ui.values[0] - (hours1 * 60);

         if (hours1.length == 1) hours1 = '0' + hours1;
         if (minutes1.length == 1) minutes1 = '0' + minutes1;
         if (minutes1 == 0) minutes1 = '00';
         if (hours1 >= 12) {
             if (hours1 == 12) {
                 hours1 = hours1;
                 minutes1 = minutes1 + " PM";
             } else {
                 hours1 = hours1 - 12;
                 minutes1 = minutes1 + " PM";
             }
         } else {
             hours1 = hours1;
             minutes1 = minutes1 + " AM";
         }
         if (hours1 == 0) {
             hours1 = 12;
             minutes1 = minutes1;
         }



         $('.slider-time').html(hours1 + ':' + minutes1);

         var hours2 = Math.floor(ui.values[1] / 60);
         var minutes2 = ui.values[1] - (hours2 * 60);

         if (hours2.length == 1) hours2 = '0' + hours2;
         if (minutes2.length == 1) minutes2 = '0' + minutes2;
         if (minutes2 == 0) minutes2 = '00';
         if (hours2 >= 12) {
             if (hours2 == 12) {
                 hours2 = hours2;
                 minutes2 = minutes2 + " PM";
             } else if (hours2 == 24) {
                 hours2 = 11;
                 minutes2 = "59 PM";
             } else {
                 hours2 = hours2 - 12;
                 minutes2 = minutes2 + " PM";
             }
         } else {
             hours2 = hours2;
             minutes2 = minutes2 + " AM";
         }

         $('.slider-time2').html(hours2 + ':' + minutes2);
     }
 });
