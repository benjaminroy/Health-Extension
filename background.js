<<<<<<< HEAD

/*
var countdowns = {
  "heart": {true: 55*aMinute, false: 5*aMinute},
  "eye": {true: 20*aMinute, false: 20*aSecond}
};

for (var type in countdowns) {
  new Countdown(type, countdowns[type]);
}
*/




function store(e) {
    writeItem();
}

function writeItem() {
    localStorage[1] = countdown_number;
}

function returnItem() {
  var stored = localStorage[1];
  document.getElementById('item').innerHTML=countdown_number;
}
=======
redshiftBackground.init();
>>>>>>> 9c1a51fc36005f4745c4f678927fe84bbe5466a1
