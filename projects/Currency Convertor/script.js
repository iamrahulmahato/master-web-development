
console.log("Main.js working")

const populate = async (value, currency) => {
    let myStr = ""
    const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_iH7XZ9dFm2ratf1U38yhphVUILGVI27Zvg0oBHyV&base_currency=" + currency
    let response = await fetch(url)
    let rJson = await response.json()
    document.querySelector(".output").style.display = "block"

    for (let key of Object.keys(rJson["data"])) {
        myStr += ` <tr>
                        <td>${key}</td>
                        <td>${rJson["data"][key]["code"]}</td>
                        <td>${Math.round(rJson["data"][key]["value"] * value)}</td>
                    </tr> 
                `

let dropList = document.querySelectorAll("form select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let icon = document.querySelector(".icon");
let exchangeTxt = document.querySelector(".exchange_rate");
let getBtn = document.querySelector("button");

//adding options tag
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "INR"
          ? "selected"
          : ""
        : currency_code == "USD"
        ? "selected"
        : "";

    let optionTag = `<option value="${currency_code}" ${selected}>
    ${currency_code}</option>`;

    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;

    }
  }
}

getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeValue();
});

function getExchangeValue() {
  const amount = document.querySelector("form input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }


    showToast("Currency converted successfully!");
}

const showToast = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

const btn = document.querySelector(".btn")
btn.addEventListener("click", (e) => {
    e.preventDefault();

    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    // Validate the input value
    if (isNaN(value) || value <= 0) {
        showToast("Please enter a valid quantity greater than 0.");
        return;
    }

  exchangeTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/06f2131e65e1404330b6adc3/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let total = (amountVal * exchangeRate).toFixed(2);
      exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeTxt.innerText = "something went wrong";
    });
}

window.addEventListener("load", () => {
  getExchangeValue();
});

icon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeValue();
});

  document.getElementById('rotateButton').addEventListener('click', function() {
    var image = document.getElementById('currencyImage');
    image.classList.toggle('rotate'); // Toggles the 'rotate' class
     image.classList.add('rotate');
     setTimeout(function() {                                     // Simulate the currency conversion process with a timeout
       image.classList.remove('rotate');
     }, 2000);
  });


    populate(value, currency);
})
