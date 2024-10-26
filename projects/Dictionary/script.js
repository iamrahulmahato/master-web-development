const wrapper = document.querySelector(".wrapper"),
    searchInput = document.querySelector(".search input"),
    volume = document.querySelector(".word i"),
    infoText = document.querySelector(".info-text"),
    synonyms = document.querySelector(".synonyms .list"),
    removeIcon = document.querySelector(".search .close-icon"),
    clearBtn = document.querySelector(".clear-btn");

let audio;

function data(result, word) {
    if (result.title) {
        infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
    } else {
        let definitions = result[0].meanings[0].definitions[0],
            phonetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;

        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example || "No example available.";
        audio = new Audio(result[0].phonetics[0].audio);

        if (!definitions.synonyms.length) {
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            definitions.synonyms.slice(0, 5).forEach((synonym, index) => {
                let tag = `<span onclick="search('${synonym}')">${synonym}${index < 4 ? ',' : ''}</span>`;
                synonyms.insertAdjacentHTML("beforeend", tag);
            });
        }

        document.querySelector(".content").style.display = "block"; // Show content
    }
}

function search(word) {
    fetchApi(word);
    searchInput.value = word;
}

function fetchApi(word) {
    infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
        .then(response => response.json())
        .then(result => data(result, word))
        .catch(() => {
            infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try another word.`;
        });
}


//search button logic
const searchButton = document.querySelector(".dictionary-section button");

searchButton.addEventListener("click", () => {
    let word = searchInput.value.trim(); // Get the input value
    if (word) {
        fetchApi(word); // Call the search function
    }
});


searchInput.addEventListener("keyup", e => {
    let word = e.target.value.trim();
    if (e.key === "Enter" && word) {
        fetchApi(word);
    }
});

volume.addEventListener("click", () => {
    if (audio) {
        volume.style.color = "#4D59FB";
        audio.play();
        setTimeout(() => {
            volume.style.color = "#999";
        }, 800);
    }
});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    document.querySelector(".content").style.display = "none"; // Hide content
});

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    document.querySelector(".content").style.display = "none"; // Hide content
});
