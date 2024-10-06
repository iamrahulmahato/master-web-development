const accessKey = "eJCYDaO5lcyBr6Vyscq1RmWvikF8jBibrzAomh1JX6M";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    // Use backticks to correctly interpolate the variables
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=9`;

    try {
        const response = await fetch(url);
        
        // Check if the response status is OK (200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        // Clear previous search results if starting a new search
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;
        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
        
        // Show "Show More" button if there are results
        if (results.length > 0) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;  // Reset page on new search
    searchImages();
});
showMoreBtn.addEventListener("click", () => {
    page++;  // Increment page for next set of results
    searchImages();
});