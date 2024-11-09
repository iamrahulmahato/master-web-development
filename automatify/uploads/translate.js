// translate.js
import countries from './countries.js';

console.log(countries["en-GB"]); // Outputs: "English (UK)"



const selectTags = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const translateBtn = document.querySelector(".translate");
const icons = document.querySelectorAll(".icons i");

// Populate select options for languages
selectTags.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected = (id === 0 && country_code === "en-GB") || (id === 1 && country_code === "hi-IN") ? "selected" : "";
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Translation functionality
translateBtn.addEventListener("click", async () => {
    let text = fromText.value.trim();
    if (!text) return; // Exit if input text is empty

    let translateFrom = selectTags[0].value;
    let translateTo = selectTags[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    try {
        let res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Network response was not ok.');

        let data = await res.json();
        if (data.responseData && data.responseData.translatedText) {
            toText.value = data.responseData.translatedText;
        } else {
            throw new Error('Translation not found.');
        }
    } catch (error) {
        console.error('Error:', error);
        toText.value = 'Translation failed.';
    }
});

// Copy and speech functionality
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            let textToCopy = target.id === "from" ? fromText.value : toText.value;
            navigator.clipboard.writeText(textToCopy);
        } else if (target.classList.contains("fa-volume-up")) {
            let utterance = new SpeechSynthesisUtterance(target.id === "from" ? fromText.value : toText.value);
            utterance.lang = target.id === "from" ? selectTags[0].value : selectTags[1].value;
            speechSynthesis.speak(utterance);
        }
    });
});
