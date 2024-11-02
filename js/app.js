// Theme toggle button and prefers-color-scheme detection
var toggleModeBtn = document.getElementById("toggle-mode-btn");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("theme");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

if (savedTheme == "dark") {
  setTheme("dark");
} else if (prefersDarkScheme.matches) {
  setTheme("dark");
} else {
  setTheme("light");
}

toggleModeBtn.onclick = () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);

  toggleModeBtn.innerHTML = newTheme === "dark"
    ? `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="#1e293b">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>`;
};

// Smooth scroll for footer link
document.getElementById("scroll-link").addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Slider navigation and thumbnail updates
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
let slider = document.querySelector(".slider");
let sliderList = slider.querySelector(".slider .list");
let thumbnail = slider.querySelector(".thumbnail");
let thumbnailItems = thumbnail.querySelectorAll(".item");
let slideButton = document.querySelectorAll(".button button");

thumbnail.appendChild(thumbnailItems[0]);

slideButton.forEach((button) => {
  button.onclick = () => moveSlider("next");
});

nextBtn.onclick = () => moveSlider("next");
prevBtn.onclick = () => moveSlider("prev");

function moveSlider(direction) {
  let sliderItems = sliderList.querySelectorAll(".item");
  let thumbnailItems = document.querySelectorAll(".thumbnail .item");

  if (direction === "next") {
    sliderList.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    sliderList.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
    slider.classList.add("prev");
  }

  updateButtonText(sliderItems[0]);
  slideButton.forEach((button) => (button.style.display = "none"));
  slider.classList.add(direction);
  slider.addEventListener("animationend", function () {
    slider.classList.remove(direction);
    slideButton.forEach((button) => (button.style.display = "block"));
  }, { once: true });
}

function updateButtonText(currentSlide) {
  let title = currentSlide.querySelector(".title").innerText;
  slideButton[0].innerText = `See More about ${title}`;
}

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
    scrollToTopBtn.style.opacity = "1";
  } else {
    scrollToTopBtn.style.opacity = "0";
    setTimeout(() => {
      scrollToTopBtn.style.display = "none";
    }, 500);
  }
}

scrollToTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Search suggestions and filtering
let filterCardsTimeout;
let suggestionsContainer = document.createElement("div");
suggestionsContainer.setAttribute("id", "suggestions");
document.getElementById("search-input").parentElement.appendChild(suggestionsContainer);

document.getElementById("search-input").addEventListener("input", function () {
  clearTimeout(filterCardsTimeout);
  filterCardsTimeout = setTimeout(showSuggestions, 300);
});

function showSuggestions() {
  let searchTerm = document.getElementById("search-input").value.toLowerCase();
  let cards = document.querySelectorAll(".card");
  suggestionsContainer.innerHTML = "";

  if (searchTerm === "") {
    suggestionsContainer.style.display = "none";
    return;
  }

  let matchedCards = Array.from(cards).filter(card => {
    let cardHeading = card.querySelector(".card-heading").innerText.toLowerCase();
    let cardDescription = card.querySelector(".card-description").innerText.toLowerCase();
    return cardHeading.includes(searchTerm) || cardDescription.includes(searchTerm);
  });

  if (matchedCards.length > 0) {
    suggestionsContainer.style.display = "block";
    matchedCards.forEach(card => {
      let suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.innerText = card.querySelector(".card-heading").innerText;
      suggestionItem.addEventListener("click", function () {
        document.getElementById("search-input").value = card.querySelector(".card-heading").innerText;
        suggestionsContainer.style.display = "none";
        filterCards();
      });
      suggestionsContainer.appendChild(suggestionItem);
    });
  } else {
    suggestionsContainer.style.display = "none";
  }
}

function filterCards() {
  let searchTerm = document.getElementById("search-input").value.toLowerCase();
  let cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    let cardHeading = card.querySelector(".card-heading").innerText.toLowerCase();
    let cardDescription = card.querySelector(".card-description").innerText.toLowerCase();
    card.style.display = cardHeading.includes(searchTerm) || cardDescription.includes(searchTerm) ? "block" : "none";
  });
}

function filterCategory(category) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.display = card.classList.contains(category) || category === "All" ? "block" : "none";
  });
}

// Sorting and DOM loaded actions
document.addEventListener("DOMContentLoaded", function () {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  toggleModeBtn.innerHTML = currentTheme === "dark"
    ? `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
      </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="#1e293b">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>`;
});
