// Get form elements
const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');
const submitBtn = document.getElementById('submitBtn');

// Error message elements
const titleError = document.getElementById('titleError');
const descriptionError = document.getElementById('descriptionError');
const technologiesError = document.getElementById('technologiesError');
const urlError = document.getElementById('urlError');

// Load existing projects from localStorage
document.addEventListener('DOMContentLoaded', displayProjects);

// Event listener for form submission
projectForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
        return;
    }

    // Get form values
    const projectId = document.getElementById('projectId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const technologies = document.getElementById('technologies').value;
    const url = document.getElementById('url').value;

    // Create project object
    const project = {
        title,
        description,
        technologies: technologies.split(',').map(tech => tech.trim()),
        url
    };

    if (projectId) {
        updateProject(projectId, project);
    } else {
        addProject(project);
    }

    // Clear form fields
    projectForm.reset();
    document.getElementById('projectId').value = '';
    submitBtn.textContent = 'Add Project';

    // Display the updated project list
    displayProjects();
});

// Function to display all projects
function displayProjects() {
    // Clear the current list
    projectList.innerHTML = '';

    // Get projects from localStorage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    // Display each project
    projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
            <a href="${project.url}" target="_blank">View Project</a>
            <div class="action-buttons">
                <button class="edit-btn" onclick="editProject(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteProject(${index})">Delete</button>
            </div>
        `;
        projectList.appendChild(projectDiv);
    });
}

// Function to add a new project
function addProject(project) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to edit a project
function editProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects[index];

    document.getElementById('title').value = project.title;
    document.getElementById('description').value = project.description;
    document.getElementById('technologies').value = project.technologies.join(', ');
    document.getElementById('url').value = project.url;
    document.getElementById('projectId').value = index;
    submitBtn.textContent = 'Update Project';
}

// Function to update an existing project
function updateProject(index, updatedProject) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects[index] = updatedProject;
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to delete a project
function deleteProject(index) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
}

// Form validation function
function validateForm() {
    let isValid = true;

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const technologies = document.getElementById('technologies').value;
    const url = document.getElementById('url').value;

    // Title validation
    if (title.trim() === '') {
        titleError.style.display = 'block';
        isValid = false;
    } else {
        titleError.style.display = 'none';
    }

    // Description validation
    if (description.trim() === '') {
        descriptionError.style.display = 'block';
        isValid = false;
    } else {
        descriptionError.style.display = 'none';
    }

    // Technologies validation
    if (technologies.trim() === '') {
        technologiesError.style.display = 'block';
        isValid = false;
    } else {
        technologiesError.style.display = 'none';
    }

    // URL validation
    const urlPattern = /^(https?:\/\/)?([\w\d\-]+\.){1,3}[\w]{2,}/;
    if (!urlPattern.test(url)) {
        urlError.style.display = 'block';
        isValid = false;
    } else {
        urlError.style.display = 'none';
    }

    return isValid;
}
