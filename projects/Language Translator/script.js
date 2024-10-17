function translateText() {
  const text = document.getElementById("input-text").value;
  const targetLanguage = document.getElementById("language-select").value;

  if (text.trim() === "") {
    alert("Please enter text to translate");
    return;
  }

  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=en|${targetLanguage}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const translatedText = data.responseData.translatedText;
      document.getElementById("output-text").textContent = translatedText;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error translating text. Please try again later.");
    });
}
