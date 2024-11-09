//change nav bar color on scroll
//import emailjs from 'emailjs-com';



window.addEventListener("scroll", () =>{
    document.querySelector("nav").classList.toggle
    ("window-scroll", window.scrollY > 0);
});


//show and hide nav menu

const navMenu = document.querySelector(".nav__menu");
const navToggle = document.querySelector("#open-menu-btn");
const navClose = document.querySelector("#close-menu-btn");

//show nav menu
navToggle.addEventListener("click", () =>{
    navMenu.style.display = "flex";
    navClose.style.display = "inline-block";
    navToggle.style.display="none"
    


});

navClose.addEventListener("click", () =>{
    navMenu.style.display = "none";
    navClose.style.display = "none";
    navToggle.style.display="inline-block";
});



//emailjs


const btn = document.getElementById('button');

document.getElementById("form")
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'service_foqchvy';
   const templateID = 'template_bhakuza';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
      //clear form 
        document.getElementById("form").reset();
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
