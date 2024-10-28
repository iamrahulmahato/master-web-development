const demoElement = document.getElementById("demoElement");

// Access controls
const durationSlider = document.getElementById("duration");
const delaySlider = document.getElementById("delay");
const easingSelect = document.getElementById("easing");
const iterationsSlider = document.getElementById("iterations");

// Span elements to show current values
const durationValue = document.getElementById("durationValue");
const delayValue = document.getElementById("delayValue");
const iterationsValue = document.getElementById("iterationsValue");

// Update animation properties
function updateAnimation() {
  const duration = `${durationSlider.value}s`;
  const delay = `${delaySlider.value}s`;
  const easing = easingSelect.value;
  const iterations = iterationsSlider.value;

  demoElement.style.transition = `all ${duration} ${easing} ${delay}`;
  demoElement.style.animationIterationCount = iterations;

  // Update UI display values
  durationValue.textContent = `${durationSlider.value}s`;
  delayValue.textContent = `${delaySlider.value}s`;
  iterationsValue.textContent = iterations;
}

// Add event listeners to update animations
durationSlider.addEventListener("input", updateAnimation);
delaySlider.addEventListener("input", updateAnimation);
easingSelect.addEventListener("change", updateAnimation);
iterationsSlider.addEventListener("input", updateAnimation);

// Add a click event to toggle the animation
demoElement.addEventListener("click", () => {
  demoElement.classList.toggle("animate");
});
