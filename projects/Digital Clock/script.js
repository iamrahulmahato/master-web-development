// Function to update the time every second
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  // Function to toggle between light and dark themes
  const themeButton = document.getElementById('theme-button');
  themeButton.addEventListener('click', () => {
    // Toggle the theme
    document.body.classList.toggle('light-theme');
  
    // Change button colors based on the theme
    if (document.body.classList.contains('light-theme')) {
      themeButton.style.backgroundColor = 'black';
      themeButton.style.color = 'white';
    } else {
      themeButton.style.backgroundColor = 'white';
      themeButton.style.color = 'black';
    }
  });
  
  // Start the clock and update every second
  updateClock(); // Show time immediately
  setInterval(updateClock, 1000); // Keep updating every second
  