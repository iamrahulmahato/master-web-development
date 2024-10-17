let header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    let triggerHeight = window.innerHeight * 0.1;
    header.classList.toggle('shadow', window.scrollY > triggerHeight);
});


// Hamburger menu
const menuBtn = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-bar");
const menuBtnIcon = document.querySelector("#menu-icon i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("active");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Scroll Reveal Animation

const sr = ScrollReveal({
    origin: 'top',
    distance: '20px',
    duration: 3000,
    delay: 400,
    reset: true,
})

sr.reveal('.rent h5',{origin:'bottom',delay:200})
sr.reveal('.customer h5',{origin:'bottom',delay:200})
sr.reveal('.service h5',{origin:'bottom',delay:200})
sr.reveal('.contact h5',{origin:'bottom',delay:200})
sr.reveal('.download h5',{origin:'bottom',delay:200})

sr.reveal('.rent h2',{origin:'bottom',delay:200})
sr.reveal('.customer h2',{origin:'bottom',delay:200})
sr.reveal('.service h2',{origin:'bottom',delay:200})
sr.reveal('.contact h2',{origin:'bottom',delay:200})
sr.reveal('.download h2',{origin:'bottom',delay:200})

sr.reveal('.rent h4',{origin:'bottom',delay:200})
sr.reveal('.customer h4',{origin:'bottom',delay:200})
sr.reveal('.service h4',{origin:'bottom',delay:200})
sr.reveal('.contact h4',{origin:'bottom',delay:200})

sr.reveal('.home p',{origin:'bottom',delay:200})
sr.reveal('.rent p',{origin:'bottom',delay:200})
sr.reveal('.customer p',{origin:'bottom',delay:200})
sr.reveal('.service p',{origin:'bottom',delay:200})
sr.reveal('.download p',{origin:'bottom',delay:200})
sr.reveal('.contact p',{origin:'bottom',delay:200})


sr.reveal('.rent i',{origin:'top',delay : 100})
sr.reveal('.service-elem i',{origin:'top',delay : 100})
sr.reveal('.customer-elem i',{origin:'top',delay : 100})
sr.reveal('.rent i',{origin:'top',delay : 100})
sr.reveal('h3',{origin:'left',delay : 200})
sr.reveal('img',{origin:'right',delay : 200})
sr.reveal('h1',{origin:'left'})

sr.reveal('.home .left p',{origin:'left'})
sr.reveal('.home .left .download-btn .play',{origin:'left',delay: 200})
sr.reveal('.home .left .download-btn .App',{origin:'left',delay: 300})
sr.reveal('.copy-right',{origin:'bottom'});
sr.reveal('.name',{origin:'right',delay:'100'});
sr.reveal('.btn-bx',{origin:'right',delay:'400'});
sr.reveal('.msg-box',{origin:'right',delay:'200'});