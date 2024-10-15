document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('capsuleForm');
    const messageInput = document.getElementById('message');
    const dateInput = document.getElementById('date');
    const capsuleItems = document.getElementById('capsuleItems');

    // Load existing capsules from local storage
    loadCapsules();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const message = messageInput.value;
        const openDate = dateInput.value;

        const capsule = {
            message: message,
            date: openDate,
            id: Date.now() // Unique ID based on timestamp
        };

        // Save capsule to local storage
        saveCapsule(capsule);
        displayCapsule(capsule);

        // Clear input fields
        messageInput.value = '';
        dateInput.value = '';
    });

    function saveCapsule(capsule) {
        let capsules = JSON.parse(localStorage.getItem('timeCapsules')) || [];
        capsules.push(capsule);
        localStorage.setItem('timeCapsules', JSON.stringify(capsules));
    }

    function loadCapsules() {
        const capsules = JSON.parse(localStorage.getItem('timeCapsules')) || [];
        capsules.forEach(capsule => displayCapsule(capsule));
    }

    function displayCapsule(capsule) {
        const li = document.createElement('li');
        li.textContent = `Message: "${capsule.message}" - Open on: ${new Date(capsule.date).toLocaleDateString()}`;
        capsuleItems.appendChild(li);
    }
});
