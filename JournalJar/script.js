document.addEventListener('DOMContentLoaded', () => {
    const dailyPrompts = [
        "What are you grateful for today?",
        "Describe a moment that made you smile.",
        "What challenges are you currently facing?",
        "Write about a goal you want to achieve.",
        "Reflect on a recent learning experience."
    ];

    const quotes = [
        {
            "quote": "The journey of a thousand miles begins with one step.",
            "author": "Lao Tzu"
        },
        {
            "quote": "Believe you can and you're halfway there.",
            "author": "Theodore Roosevelt"
        }
    ];

    // Daily Prompt
    function setDailyPrompt() {
        const promptElement = document.getElementById('daily-prompt-text');
        const randomPrompt = dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)];
        promptElement.textContent = randomPrompt;
    }

    // Daily Quote
    function setDailyQuote() {
        const quoteElement = document.getElementById('daily-quote');
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.innerHTML = `"${randomQuote.quote}" - ${randomQuote.author}`;
    }

    // Mood Tracking
    function setupMoodTracking() {
        const moodButtons = document.querySelectorAll('.mood-btn');
        moodButtons.forEach(button => {
            button.addEventListener('click', () => {
                moodButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                localStorage.setItem('currentMood', button.dataset.mood);
            });
        });
    }

    // Tag System
    function setupTagSystem() {
        const tagInput = document.getElementById('tag-input');
        const tagContainer = document.getElementById('tag-container');

        tagInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && tagInput .value.trim() !== '') {
                const tag = document.createElement('div');
                tag.className = 'tag';
                tag.textContent = tagInput.value;
                const closeBtn = document.createElement('span');
                closeBtn.className = 'tag-close';
                closeBtn.textContent = 'x';
                closeBtn.onclick = () => tagContainer.removeChild(tag);
                tag.appendChild(closeBtn);
                tagContainer.appendChild(tag);
                tagInput.value = '';
            }
        });
    }

    // Save Journal Entry
    function saveEntry() {
        const title = document.getElementById('entry-title').value;
        const text = document.getElementById('journal-text').value;
        const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent.replace('x', '').trim());
        const mood = localStorage.getItem('currentMood') || 'neutral';

        if (title && text) {
            const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            entries.push({ title, text, tags, mood, date: new Date().toLocaleString() });
            localStorage.setItem('journalEntries', JSON.stringify(entries));
            alert('Entry saved!');
            clearEntryFields();
        } else {
            alert('Please fill in both title and text.');
        }
    }

    // Clear Entry Fields
    function clearEntryFields() {
        document.getElementById('entry-title').value = '';
        document.getElementById('journal-text').value = '';
        document.getElementById('tag-container').innerHTML = '';
    }

    // View Entries
    function viewEntries() {
        const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        const entriesList = document.getElementById('entries-list');
        entriesList.innerHTML = '';

        entries.forEach(entry => {
            const entryItem = document.createElement('div');
            entryItem.className = 'entries-item';
            entryItem.innerHTML = `<strong>${entry.title}</strong> <br> ${entry.text} <br> <small>${entry.date} - Mood: ${entry.mood}</small>`;
            entriesList.appendChild(entryItem);
        });

        const entriesModal = new bootstrap.Modal(document.getElementById('entriesModal'));
        entriesModal.show();
    }

    // Search Functionality
    function setupSearchFunctionality() {
        const searchInput = document.getElementById('search-entries');
        searchInput.addEventListener('input', () => {
            const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            const searchTerm = searchInput.value.toLowerCase();
            const entriesList = document.getElementById('entries-list');
            entriesList.innerHTML = '';

            entries.forEach(entry => {
                if (entry.title.toLowerCase().includes(searchTerm) || entry.text.toLowerCase().includes(searchTerm)) {
                    const entryItem = document.createElement('div');
                    entryItem.className = 'entries-item';
                    entryItem.innerHTML = `<strong>${entry.title}</strong> <br> ${entry.text} <br> <small>${entry.date} - Mood: ${entry.mood}</small>`;
                    entriesList.appendChild(entryItem);
                }
            });
        });
    }

    // Event Listeners
    document.getElementById('save-entry').addEventListener('click', saveEntry);
    document.getElementById('view-entries').addEventListener('click', viewEntries);

    // Initialize App
    setDailyPrompt();
    setDailyQuote();
    setupMoodTracking();
    setupTagSystem();
    setupSearchFunctionality();
});