// script.js
const prompts = [
    "Write a story about a character who can’t stop telling lies.",
    "Imagine a world where people can live forever. How does society function?",
    "Write a letter to your future self 10 years from now.",
    "Describe the last day of a forgotten civilization.",
    "Write about a character who discovers they can control the weather.",
    "You wake up one morning to find that gravity has reversed. What happens next?",
    "Write a short story that takes place in a dream.",
    "A character finds a mysterious object washed up on the shore. What is it?",
    "In a world where animals can speak, write about a day in the life of a dog.",
    "Write a story about someone who receives a message from their future self."
];

document.getElementById("generateBtn").addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    document.getElementById("promptDisplay").textContent = prompts[randomIndex];
});
