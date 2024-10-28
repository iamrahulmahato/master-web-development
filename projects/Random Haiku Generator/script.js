document.getElementById('generate-btn').addEventListener('click', generateHaiku);

async function generateHaiku() {
    const haikuContainer = document.getElementById('haiku');
    haikuContainer.textContent = 'Loading...';

    try {
        const response = await fetch('https://poetrydb.org/random');
        const data = await response.json();
        const poem = data[0];
        const haiku = poem.lines.slice(0, 3).join('\n');
        haikuContainer.textContent = `"${haiku}"\n\n- ${poem.author}`;
    } catch (error) {
        haikuContainer.textContent = 'Failed to load haiku. Please try again.';
    }
}

// Generate a haiku on initial load
generateHaiku();