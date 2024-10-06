document.addEventListener('DOMContentLoaded', () => {
	const eye = document.querySelector('.kosmic-eye');
	const pupil = document.querySelector('.pupil');
	const stars = document.querySelector('.stars');

	// Generate stars
	for (let i = 0; i < 100; i++) {
			const star = document.createElement('div');
			star.classList.add('star');
			star.style.width = `${Math.random() * 3}px`;
			star.style.height = star.style.width;
			star.style.left = `${Math.random() * 100}%`;
			star.style.top = `${Math.random() * 100}%`;
			star.style.animationDelay = `${Math.random() * 2}s`;
			stars.appendChild(star);
	}

	// Eye following mouse
	document.addEventListener('mousemove', (e) => {
			const eyeRect = eye.getBoundingClientRect();
			const eyeCenterX = eyeRect.left + eyeRect.width / 2;
			const eyeCenterY = eyeRect.top + eyeRect.height / 2;

			const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
			const distance = Math.min(
					(eyeRect.width / 4) * Math.cos(angle),
					(eyeRect.height / 4) * Math.sin(angle)
			);

			pupil.style.transform = `translate(${distance}px, ${distance}px)`;
	});

	// Pupil dilation on click
	eye.addEventListener('click', () => {
			pupil.style.width = '60%';
			pupil.style.height = '60%';
			setTimeout(() => {
					pupil.style.width = '40%';
					pupil.style.height = '40%';
			}, 300);
	});
});