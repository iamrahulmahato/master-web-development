const validateCard = () => {
  const card = document.getElementById('card-number').value.trim();
  const output = document.getElementById('output');
  let cardNumber = card.split('').map(Number);
  let sum = 0;

  // Messages
  const messages = ['Input field is empty!', 'Card number should have 16 digits!', 'Card is valid', 'Card is invalid'];

  if (cardNumber.length === 0 || cardNumber.some(isNaN)) {
      console.log("Invalid card number input.");
      output.style.color = "rgb(133, 129, 12)";
      output.innerHTML = messages[0];
      return;
    }
    
    if(cardNumber.length !== 16) {
      console.log("Card number should have 16 digits.");
      output.style.color = "rgb(133, 129, 12)";
      output.innerHTML = messages[1];
      return;
  }

  for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = cardNumber[i];
      if ((cardNumber.length - i) % 2 === 0) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }
      sum += digit;
  }

  console.log(sum);

  if (sum % 10 === 0) {
      console.log("Card is valid.");
      output.innerHTML = messages[2];
      output.style.color = "rgb(8, 70, 8)"
    } else {
      console.log("Card is invalid.");
      output.innerHTML = messages[3];
      output.style.color = "rgb(90, 13, 13)"
  }
}

const handleHome = () => {
  window.location.href = '../../index.html';
}