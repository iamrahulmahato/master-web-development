// Get the search input and button elements
const searchInput = document.getElementById('search-input');

const searchResults = document.getElementById('search-results');

// Add event listener to the search input

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    // Implement search logic here
    // For example, you can filter the projects based on the search term
    const projects = document.querySelectorAll('.card');
    projects.forEach((project) => {
        const projectName = project.querySelector('.card-heading').textContent;
        if (projectName.toLowerCase().includes(searchTerm.toLowerCase())) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
         
        }
    });
});