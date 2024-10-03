const apiKey = 'aee5b52a93f846ef91b71452240310'; // Your API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('error-message');

searchBtn.addEventListener('click', fetchWeather);

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    displayError('Please enter a city name.');
    return;
  }

  try {
    // Fetch weather data using WeatherAPI
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
    errorMessage.style.display = 'none'; // Hide error message on success
  } catch (error) {
    displayError('City not found or API error.');
  }
}

function displayWeather(data) {
  const cityName = data.location.name;
  const temperature = data.current.temp_c;
  const weatherDescription = data.current.condition.text;
  const weatherIcon = `https:${data.current.condition.icon}`; // Corrected weather icon URL
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;

  document.getElementById('cityName').textContent = `Weather in ${cityName}`;
  document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
  document.getElementById('weatherDescription').textContent = `Condition: ${weatherDescription}`;
  document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
  document.getElementById('windSpeed').textContent = `Wind Speed: ${windSpeed} kph`;
  document.getElementById('weatherIcon').src = weatherIcon;

  weatherInfo.style.display = 'block'; // Show weather info
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block'; // Show error message
  weatherInfo.style.display = 'none'; // Hide weather info
}
