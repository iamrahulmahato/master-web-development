
var rgb = '1234567890abcdef';
var body = document.body;

function generate() {
  var color1 = '#' + randomColor();
  var color2 = '#' + randomColor();

  let gradient = `linear-gradient(40deg, ${color1}, ${color2})`;
  
  // Update the color display and background
  document.getElementById('colorName').innerHTML = gradient;
  document.getElementById('gradientPreview').style.background = gradient;
  body.style.background = gradient;
}

function randomColor() {
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += rgb[Math.floor(Math.random() * rgb.length)];
  }
  return color;
}

function copyGradient() {
  const gradient = document.getElementById('colorName').innerHTML;
  navigator.clipboard.writeText(gradient).then(() => {
    alert('CSS copied to clipboard!');
  }).catch(err => {
    alert('Failed to copy CSS: ', err);
  });
}
