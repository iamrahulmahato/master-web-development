const toggleModeBtn = document.getElementById("toggle-mode-btn");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
}

toggleModeBtn.onclick = () => {
    if (document.documentElement.getAttribute("data-theme") === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        // toggleModeBtn.innerText = "Light";
        toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
      </svg>`;

    } else {
        document.documentElement.setAttribute("data-theme", "light");
        // toggleModeBtn.innerText = "Dark";
        toggleModeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 20 20" fill="#1e293b">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>`;
    }
}

// ====================== Scroll to top ======================== 
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
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

scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
function filterCards() {
    // Get the input value
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    // Get all the cards in the container
    let cards = document.querySelectorAll('.card');
    
    // Loop through the cards and filter based on the input
    cards.forEach(function (card) {
        let cardHeading = card.querySelector('.card-heading').innerText.toLowerCase();
        
        let cardDescription = card.querySelector('.card-description').innerText.toLowerCase();
        
        // Check if the search term is in the card heading or description
        if (cardHeading.includes(searchTerm) || cardDescription.includes(searchTerm)) {
            card.style.display = "block"; // Show the card
        } else {
            card.style.display = "none"; // Hide the card
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
  const cardContainer = document.getElementsByClassName('projects-container')[0];
  const cards = Array.from(cardContainer.getElementsByClassName('card'));
  console.log(cards);

  // Sort cards alphabetically based on the card title
  cards.sort((a, b) => {
    const headingA = a.querySelector('.card-heading');
    const headingB = b.querySelector('.card-heading');
    
    // Check if both headings exist before sorting
    if (headingA && headingB) {
        const titleA = headingA.innerText.toUpperCase();
        const titleB = headingB.innerText.toUpperCase();
        return titleA.localeCompare(titleB);
    } else {
        // Handle cases where card headings are missing
        console.warn('One or both cards are missing headings.');
        return 0;
    }
});
  // Remove current cards and append them in the new order
  cardContainer.innerHTML = '';
  cards.forEach(card => {
      cardContainer.appendChild(card);
  });
});


