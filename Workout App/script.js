const menuButton = document.querySelector(".toggle-menu");
const crossIcon = document.querySelector(".fa-xmark");
const menuDropdown = document.querySelector(".menu-dropdown");
const barDiv = document.querySelector(".bar"); // Select the container of icons

// Initially set the class to show the toggle (hamburger) icon
barDiv.classList.add("show-toggle-icon");

// Event listener for toggle (hamburger) icon
menuButton.addEventListener("click", function () {
  menuDropdown.classList.toggle("active");
  barDiv.classList.remove("show-toggle-icon");
  barDiv.classList.add("show-cross-icon");
});

// Event listener for cross icon
crossIcon.addEventListener("click", function () {
  menuDropdown.classList.toggle("active");
  barDiv.classList.remove("show-cross-icon");
  barDiv.classList.add("show-toggle-icon");
});
