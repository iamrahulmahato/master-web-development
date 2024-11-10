document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const swapBtn = document.getElementById('swapBtn');
    const resultDisplay = document.getElementById('resultDisplay');

    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`; // You can change the base currency

    // Fetch currency data
    async function fetchCurrencyData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            populateCurrencyDropdowns(data.rates);
        } catch (error) {
            console.error('Error fetching currency data:', error);
        }
    }

    // Populate dropdowns with currency options
    function populateCurrencyDropdowns(rates) {
        const currencyCodes = Object.keys(rates);
        currencyCodes.forEach(code => {
            const option1 = document.createElement('option');
            option1.value = code;
            option1.textContent = code;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = code;
            option2.textContent = code;
            toCurrencySelect.appendChild(option2);
        });
    }

    // Convert currency
    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount)) {
            resultDisplay.textContent = 'Please enter a valid amount.';
            resultDisplay.classList.remove('show'); // Hide result if input is invalid
            return;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rate = data.rates[toCurrency] / data.rates[fromCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            resultDisplay.classList.add('show'); // Show result with effect
        } catch (error) {
            console.error('Error during conversion:', error);
            resultDisplay.textContent = 'Error fetching conversion rate.';
            resultDisplay.classList.remove('show'); // Hide result on error
        }
    }

    // Swap currencies
    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
    }

    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);

    // Initial fetch of currency data
    fetchCurrencyData();
});