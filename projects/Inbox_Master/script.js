emailjs.init("k4rG2S6EpHlovYiHt");

const sendBtn = document.querySelector('.send-btn');
const result = document.querySelector('.result');

sendBtn.addEventListener('click', sendEmail);

function sendEmail() {
    const to = document.getElementById("to").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    emailjs.send("service_9txlvao", "template_cj83noq", {
        to_email: to,
        to_name: to,
        subject: subject,
        message: message,
        from_name: "Hades",
    })
        .then(function (response) {
            console.log('Email sent:', response);
            result.innerHTML = "Email sent successfully!";
            result.classList.remove('error');
            result.style.opacity = 1;
        }, 
        
        function (error) {
            console.error('Email sending error:', error);
            result.innerHTML = "Email failed to send";
            result.classList.add('error');
            result.style.opacity = 1;
        });
}