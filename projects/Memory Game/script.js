const cardsEl = document.querySelector(".cards");

const cards = [];
const imgs = ["alien", "amaze", "amazed", "angel"];

for (let i = 0; i < 8; i++) {
  let el = document.createElement("div");
  el.classList.add("card");
  el.innerHTML = `<img class="hide" src="./imgs/${imgs[i % 4]}.png" alt=${
    imgs[i % 4]
  }/>`;
  cards.push(el);
}

cards.sort(() => {
  return Math.random() - 0.5;
});

for (let c of cards) {
  cardsEl.append(c);
}

let isFirstCardFlipped = null;
let isSecondCardFlipped = null;

for (let c of cards) {
  c.addEventListener("click", async () => {
    if (isFirstCardFlipped == null && isSecondCardFlipped == null) {
      c.children[0].classList.remove("hide");
      isFirstCardFlipped = c;
    } else if (isFirstCardFlipped && isSecondCardFlipped == null) {
      c.children[0].classList.remove("hide");
      isSecondCardFlipped = c;
      if (
        isFirstCardFlipped.children[0].src !==
        isSecondCardFlipped.children[0].src
      ) {
        await new Promise((r) => setTimeout(r, 1000));
        isFirstCardFlipped.children[0].classList.add("hide");
        isSecondCardFlipped.children[0].classList.add("hide");
      } else {
        let isWin = checkWin();
        if (isWin) {
          window.location.href = "win.html";
        }
      }
      isFirstCardFlipped = null;
      isSecondCardFlipped = null;
    }
  });
}

const checkWin = () => {
  for (let c of cards) {
    if (c.children[0].classList.contains("hide")) {
      return false;
    }
  }
  return true;
};
