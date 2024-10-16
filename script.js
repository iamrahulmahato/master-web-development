document.querySelector('.arrow').addEventListener('click', function(e) {
    e.preventDefault();
    window.scroll({
        top: document.querySelector('.container').offsetTop,
        behavior: 'smooth'
    });
});

const readMoreBtn = document.querySelector('.profile a');
const profileText = document.querySelector('.profile p');

readMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    profileText.classList.toggle('expanded');
    if(profileText.classList.contains('expanded')) {
        readMoreBtn.textContent = "Read less";
        profileText.style.height = 'auto';
    } else {
        readMoreBtn.textContent = "Read more";
        profileText.style.height = '4rem';
    }
});

window.addEventListener('scroll', function() {
    const skillsSection = document.querySelector('.skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (skillsPosition < screenPosition) {
        document.querySelectorAll('.skills div progress').forEach(function(bar) {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.value = bar.getAttribute('value');
        });
    }
});

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('footer i').forEach(function(icon) {
    icon.addEventListener('mouseover', function() {
        icon.style.transform = 'scale(1.3)';
        icon.style.transition = 'transform 0.3s';
    });
    icon.addEventListener('mouseout', function() {
        icon.style.transform = 'scale(1)';
    });
});
