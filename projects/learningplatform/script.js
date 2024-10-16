// Function to toggle between sections
function showSection(section) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}-section`).classList.add('active');
}
