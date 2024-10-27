window.addEventListener('load', () => {
    fetch('https://ipapi.co/json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip').textContent = data.ip;
            document.getElementById('location').textContent = `${data.city}, ${data.region}, ${data.country_name}`;
            document.getElementById('city').textContent = data.city;
            document.getElementById('region').textContent = data.region;
            document.getElementById('country').textContent = data.country_name;
            document.getElementById('timezone').textContent = data.timezone;
            document.getElementById('isp').textContent = data.org;
        })
        .catch(error => console.error('Error fetching IP data:', error));
});
