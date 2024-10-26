// const toggleModeBtn = document.getElementById("toggle-mode-btn");
// const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// let nextBtn = document.querySelector('.next');
// let prevBtn = document.querySelector('.prev');


// let slider = document.querySelector('.slider');
// let sliderList = slider.querySelector('.slider .list');
// let thumbnail = slider.querySelector('.thumbnail');
// let thumbnailItems = thumbnail.querySelectorAll('.item');
// let slideButton = document.querySelectorAll('.button button');
// thumbnail.appendChild(thumbnailItems[0]);

// slideButton.forEach(button => {
//     button.onclick = function() {
//         moveSlider('next'); // Call the moveSlider function for each button
//     };
// });

// // Adding smooth scroll effect from footer to above the website
// document.getElementsById('scroll-link').addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the default link behavior
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth' // Smooth scroll
//     });
// });


// nextBtn.onclick = function() {
//     moveSlider('next');
// };

// prevBtn.onclick = function() {
//     moveSlider('prev');
// };

// function moveSlider(direction) {
//     let sliderItems = sliderList.querySelectorAll('.item');
//     let thumbnailItems = document.querySelectorAll('.thumbnail .item');

//     if (direction === 'next') {
//         sliderList.appendChild(sliderItems[0]);
//         thumbnail.appendChild(thumbnailItems[0]);
//         slider.classList.add('next');
//     } else {
//         sliderList.prepend(sliderItems[sliderItems.length - 1]);
//         thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
//         slider.classList.add('prev');
//     }

//     // Update the button text based on the new first item
//     updateButtonText(sliderItems[0]); 

//     // Hide buttons during transition
//     slideButton.forEach(button => button.style.display = 'none');

//     slider.classList.add(direction);
//     slider.addEventListener('animationend', function() {
//         if (direction === 'next') {
//             slider.classList.remove('next');
//         } else {
//             slider.classList.remove('prev');
//         }
//         // Show buttons again after the transition ends
//         slideButton.forEach(button => button.style.display = 'block');

//     }, { once: true });
// }
// function updateButtonText(currentSlide) {
//     let title = currentSlide.querySelector('.title').innerText; // Get title from current slide
//     slideButton.innerText = `See More about ${title}`; // Update button text
// } 

// function setTheme(theme) {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
// }

// const savedTheme = localStorage.getItem("theme");
// if (savedTheme) {
//     setTheme(savedTheme);
// } else if (prefersDarkScheme.matches) {
//     setTheme("dark");
// } else {
//     setTheme("light");
// }

// toggleModeBtn.onclick = () => {
//     const currentTheme = document.documentElement.getAttribute("data-theme");
//     const newTheme = currentTheme === "light" ? "dark" : "light";

//     setTheme(newTheme); // Set the new theme

//     // Update the icon based on the selected theme
//     if (newTheme === "dark") {
//         toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="currentColor">
//             <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
//         </svg>`;
//     } else {
//         toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="#1e293b">
//             <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//         </svg>`;
//     }
// };

// const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// window.onscroll = function() {
//     scrollFunction();
// };

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         scrollToTopBtn.style.display = "block"; 
//         scrollToTopBtn.style.opacity = "1"; 
//     } else {
//         scrollToTopBtn.style.opacity = "0"; 
//         setTimeout(() => {
//             scrollToTopBtn.style.display = "none";
//         }, 500); 
//     }
// }

// scrollToTopBtn.onclick = function() {
//     window.scrollTo({ top: 0, behavior: "smooth" });
// };



// let filterCardsTimeout;
// let suggestionsContainer = document.createElement('div');
// suggestionsContainer.setAttribute('id', 'suggestions');
// document.getElementById('search-input').parentElement.appendChild(suggestionsContainer);

// document.getElementById('search-input').addEventListener('input', function () {
//     clearTimeout(filterCardsTimeout);
//     filterCardsTimeout = setTimeout(showSuggestions, 300);
// });

// function showSuggestions() {
//     let searchTerm = document.getElementById('search-input').value.toLowerCase();
//     let cards = document.querySelectorAll('.card');
//     suggestionsContainer.innerHTML = ''; // Clear previous suggestions

//     if (searchTerm === '') {
//         suggestionsContainer.style.display = 'none'; // Hide suggestions if input is empty
//         return;
//     }

//     let matchedCards = Array.from(cards).filter(function (card) {
//         let cardHeading = card.querySelector('.card-heading').innerText.toLowerCase();
//         let cardDescription = card.querySelector('.card-description').innerText.toLowerCase();
//         return cardHeading.includes(searchTerm) || cardDescription.includes(searchTerm);
//     });

//     if (matchedCards.length > 0) {
//         suggestionsContainer.style.display = 'block'; // Show suggestions
//         matchedCards.forEach(function (card) {
//             let suggestionItem = document.createElement('div');
//             suggestionItem.classList.add('suggestion-item');
//             suggestionItem.innerText = card.querySelector('.card-heading').innerText;

//             // Clicking a suggestion will populate the search bar and hide suggestions
//             suggestionItem.addEventListener('click', function () {
//                 document.getElementById('search-input').value = card.querySelector('.card-heading').innerText;
//                 suggestionsContainer.style.display = 'none'; // Hide suggestions
//                 filterCards(); // Trigger filter after selection
//             });

//             suggestionsContainer.appendChild(suggestionItem);
//         });
//     } else {
//         suggestionsContainer.style.display = 'none'; // Hide if no match
//     }
// }

// function filterCards() {
//     let searchTerm = document.getElementById('search-input').value.toLowerCase();
//     let cards = document.querySelectorAll('.card');
//     cards.forEach(function (card) {
//         let cardHeading = card.querySelector('.card-heading').innerText.toLowerCase();
//         let cardDescription = card.querySelector('.card-description').innerText.toLowerCase();
//         if (cardHeading.includes(searchTerm) || cardDescription.includes(searchTerm)) {
//             card.style.display = "block";
//         } else {
//             card.style.display = "none";
//         }
//     });
// }


// document.addEventListener('DOMContentLoaded', function () {
//     const currentTheme = document.documentElement.getAttribute("data-theme");
//     if (currentTheme === "dark") {
//         toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="currentColor">
//             <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
//         </svg>`;
//     } else {
//         toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="#1e293b">
//             <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//         </svg>`;
//     }
    
//     const cardContainer = document.getElementsByClassName('projects-container')[0];
//     const cards = Array.from(cardContainer.getElementsByClassName('card'));
    
//     // Sort cards alphabetically based on the card title
//     cards.sort((a, b) => {
//         const headingA = a.querySelector('.card-heading');
//         const headingB = b.querySelector('.card-heading');

//         // Check if both headings exist before sorting
//         if (headingA && headingB) {
//             const titleA = headingA.innerText.toUpperCase();
//             const titleB = headingB.innerText.toUpperCase();
//             return titleA.localeCompare(titleB);
//         } else {
//             console.warn('One or both cards are missing headings.');
//             return 0;
//         }
//     });

//     // Remove current cards and append them in the new order
//     cardContainer.innerHTML = '';
//     cards.forEach(card => {
//         cardContainer.appendChild(card);
//     });
// }, { once: true });

// document.addEventListener("DOMContentLoaded", function () {
//     const coords = { x: 0, y: 0 };
//     const circles = document.querySelectorAll(".circle");

//     circles.forEach(function (circle) {
//         circle.x = 0;
//         circle.y = 0;
//     });

//     window.addEventListener("mousemove", function (e) {
//         coords.x = e.pageX;
//         coords.y = e.pageY - window.scrollY; // Adjust for vertical scroll position
//     });

//     function animateCircles() {
//         let x = coords.x;
//         let y = coords.y;

//         circles.forEach(function (circle, index) {
//             circle.style.left = `${x - 12}px`;
//             circle.style.top = `${y - 12}px`;
//             circle.style.transform = `scale(${(circles.length - index) / circles.length}`;

//             const nextCircle = circles[index + 1] || circles[0];
//             circle.x = x;
//             circle.y = y;

//             x += (nextCircle.x - x) * 0.3;
//             y += (nextCircle.y - y) * 0.3;
//         });

//         requestAnimationFrame(animateCircles);
//     }

//     animateCircles();
// }); 
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Function to set the theme and store it in local storage
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

// Retrieve the saved theme or use the system preference if available
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    setTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
    setTheme("dark");
} else {
    setTheme("light");
}

// Event listener to toggle the theme on button click
toggleModeBtn.onclick = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    setTheme(newTheme); // Set the new theme

    // Update the icon based on the selected theme
    if (newTheme === "dark") {
        toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>`;
    } else {
        toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="#1e293b">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>`;
    }
};

// When the page loads, ensure the correct icon is displayed based on the current theme
document.addEventListener('DOMContentLoaded', function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>`;
    } else {
        toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="#1e293b">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>`;
    }
});
