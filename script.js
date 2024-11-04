document.getElementById('submitBtn').addEventListener('click', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get values from the input fields
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var feedback = document.getElementById('feedback').value.trim();

    // Validate fields
    if (!name || !email || !feedback) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    // Validate email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    // Display the submission alert
    alert('Thank you for your feedback, ' + name + '!');

    //clear the form fields after submission
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('feedback').value = '';
});
