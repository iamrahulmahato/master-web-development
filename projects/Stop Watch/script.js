
let hr = (min = sec = ms = "0" + 0);
let stTime;
let lapNum = 0;

let start = () => {
  stTime = setInterval(() => {
    ms++;
    ms = ms < 10 ? "0" + ms : ms;
    if (ms == 100) {
      sec++;
      ms = "0" + 0;
      sec = sec < 10 ? "0" + sec : sec;
    }
    if (sec == 60) {
      min++;
      sec = "0" + 0;
      min = min < 10 ? "0" + min : min;
    }
    if (sec == 60) {
      hr++;
      min = "0" + 0;
      hr = hr < 10 ? "0" + hr : hr;
    }
    putValues();
  }, 10);
  document.querySelector(".reset").style.display = "none";
  document.querySelector(".start").style.display = "none";
  document.querySelector(".stop").style.display = "block";
  document.querySelector(".lap").style.display = "block";
};

function putValues() {
  document.querySelector(".hr").innerText = hr;
  document.querySelector(".sec").innerText = sec;
  document.querySelector(".min").innerText = min;
  document.querySelector(".ms").innerText = ms;
}

const lap = () => {
  if (lapNum == 12) {
    alert("Can't add more");
    return;
  }
  document.querySelector(".lap-container").style.display = "flex";
  lapNum++;
  let lapElement = document.createElement("li");
  let laptext = `<span class="lap-num"> Lap ${lapNum}</span>
                <span class="lap-timer">${hr}:${min}:${sec}:${ms}</span>                                                    `;
  lapElement.innerHTML = laptext;
  document.querySelector(".lap-container").appendChild(lapElement);
};

const stop = () => {
  clearInterval(stTime);
  document.querySelector(".reset").style.display = "block";
  document.querySelector(".start").style.display = "block";
  document.querySelector(".stop").style.display = "none";
  document.querySelector(".lap").style.display = "none";
};

const reset = () => {
  hr = min = sec = ms = "0" + 0;
  document.querySelector(".lap-container").style.display = "none";
  document.querySelector(".lap-container").innerHTML = "";
  lapNum = 0;
  putValues();
};
