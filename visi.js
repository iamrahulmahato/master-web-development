// Function to get the count from localStorage or initialize it
function getVisitorCount() {
  const count = localStorage.getItem('visitorCount');
  return count ? Number(count) : 0; // Use Number() for better clarity
}

// Function to increment and save the count
function incrementVisitorCount() {
  let count = getVisitorCount() + 1; // Increment the count
  localStorage.setItem('visitorCount', count); // Save it back to localStorage
  return count; // Return the new count
}

// Function to display the count
function displayVisitorCount() {
  const counterElement = document.querySelector('.website-counter');
  const count = incrementVisitorCount(); // Increment the count
  counterElement.textContent = count; // Display the updated count
}

// Call the display function when the page loads
document.addEventListener('DOMContentLoaded', displayVisitorCount);
