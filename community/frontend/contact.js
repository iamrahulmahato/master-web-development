// Optional form validation
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (name === "" || email === "" || phone === "" || message === "") {
        alert("All fields are required!");
        event.preventDefault();
    }
});



