const quotes = [
    "The best way to predict the future is to invent it.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't watch the clock; do what it does. Keep going.",
    "Opportunities don't happen. You create them.",
    "It always seems impossible until it’s done."
  ];
  
  const quoteElement = document.getElementById("quote");
  const button = document.getElementById("quoteButton");
  
  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
  });
  
