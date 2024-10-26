const jokeEl = document.querySelector("#joke");
const jokeBtn = document.querySelector(".joke-btn");
const themeBtn = document.querySelector(".theme");
const bodyEl = document.querySelector("body");
const icon = document.querySelector(".theme i");
jokeBtn.addEventListener("click", fecthAnotherJoke);

async function fecthAnotherJoke() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const response = await fetch("https://icanhazdadjoke.com", config);
  //   console.log(response);
  const data = await response.json();
  //   console.log(data);
  //   console.log(data.joke);
  jokeEl.innerHTML = data.joke;
}
themeBtn.addEventListener("click", () => {
  bodyEl.classList.toggle("dark");
  if (bodyEl.classList.contains("dark")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
});
