document.addEventListener('DOMContentLoaded', () => {
    const factElement = document.getElementById('fact');
    const generateFactBtn = document.getElementById('generateFactBtn');

    const fetchRandomFact = async () => {
        try {
            const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error('Error fetching fact:', error);
            return 'Failed to fetch a new fact. Please try again.';
        }
    };

    generateFactBtn.addEventListener('click', async () => {
        factElement.classList.remove('show');
        const randomFact = await fetchRandomFact();
        setTimeout(() => {
            factElement.textContent = randomFact;
            factElement.classList.add('show');
        }, 500);
    });
});