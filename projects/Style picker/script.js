function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  function applyRandomStyle() {
    const bgColor1 = getRandomColor();
    const bgColor2 = getRandomColor();
    const textColor = getRandomColor();
    const buttonColor1 = getRandomColor();
    const buttonColor2 = getRandomColor();
  
    document.body.style.background = `linear-gradient(135deg, ${bgColor1}, ${bgColor2})`;
    document.querySelector(".container").style.backgroundColor = `rgba(255, 255, 255, 0.9)`;
    document.querySelector(".container").style.color = textColor;
    document.querySelector("button").style.background = `linear-gradient(135deg, ${buttonColor1}, ${buttonColor2})`;
  }
  