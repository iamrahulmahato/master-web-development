// Set up the canvas
const canvas = document.getElementById('emojiCanvas');
const ctx = canvas.getContext('2d');

// Store selected features
let selectedFeatures = {
  eyes: null,
  mouth: null,
  nose: null, // New feature for nose
  accessory: null
};

// Add event listeners to all clickable features
const clickableItems = document.querySelectorAll('.clickable');
clickableItems.forEach(item => {
  item.addEventListener('click', selectFeature);
});

// Function to handle feature selection
function selectFeature(e) {
  const featureId = e.target.id;
  const featureImg = document.getElementById(featureId);

  // Assign the selected feature to the correct category
  if (featureId.includes('eye')) {
    selectedFeatures.eyes = featureImg;
  } else if (featureId.includes('mouth')) {
    selectedFeatures.mouth = featureImg;
  } else if (featureId.includes('nose')) {
    selectedFeatures.nose = featureImg; // Handle nose feature
  } else if (featureId.includes('hat') || featureId.includes('glasses') || featureId.includes('earrings')) {
    selectedFeatures.accessory = featureImg;
  }

  // Render the emoji on the canvas
  renderEmoji();
}

// Render the selected features on the canvas
function renderEmoji() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Draw selected features on canvas
  if (selectedFeatures.eyes) {
    ctx.drawImage(selectedFeatures.eyes, 70, 70, 100, 50); // Adjust the position
  }

  if (selectedFeatures.nose) {
    ctx.drawImage(selectedFeatures.nose, 105, 120, 40, 40); // Adjust the position for nose
  }

  if (selectedFeatures.mouth) {
    ctx.drawImage(selectedFeatures.mouth, 90, 150, 70, 40); // Adjust the position
  }

  if (selectedFeatures.accessory) {
    ctx.drawImage(selectedFeatures.accessory, 40, 10, 160, 100); // Adjust the position
  }
}

// Export the emoji as PNG
document.getElementById('downloadEmoji').addEventListener('click', function () {
  const link = document.createElement('a');
  link.download = 'custom-emoji.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
