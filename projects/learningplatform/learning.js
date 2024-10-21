// Script to handle form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Your message has been sent successfully!');
    document.getElementById('contact-form').reset();
});
