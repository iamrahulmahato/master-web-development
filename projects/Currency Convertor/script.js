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
    }
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = myStr;

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

    populate(value, currency);
})
