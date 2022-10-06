// created by danish Date: 06-OCT-2022
var rgb = '1234567890abcdef';
var body = document.body;
function generate() {
  var btn = document.getElementById('btn');
  var color1 =
    '#' +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)];

    var color2 =
    '#' +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)] +
    rgb[Math.floor(Math.random() * rgb.length)];

  let bgColor = (document.getElementById('colorName').innerHTML = `linear-gradient(40deg, ${color1}, ${color2})`);
  body.style.background = bgColor;
}




