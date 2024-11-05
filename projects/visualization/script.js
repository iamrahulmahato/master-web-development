// Sample data - you would replace this with your actual data from the CSV
const data = {
    ages: [22, 34, 45, 26, 37, 29, 43, 30, 50, 32],
    genderCounts: { Male: 5, Female: 5 },
    citizenshipCounts: { 'Citizen': 6, 'Non-Citizen': 4 },
    fatalitiesOverTime: { '2020': 10, '2021': 20, '2022': 30 },
};

// Chart for Age Distribution
const ctx1 = document.getElementById('ageDistributionChart').getContext('2d');
const ageDistributionChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: data.ages.map((_, index) => `Person ${index + 1}`),
        datasets: [{
            label: 'Age',
            data: data.ages,
            backgroundColor: 'orange',
            borderColor: 'black',
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Distribution of Age'
        }
    }
});

// Chart for Gender Distribution
const ctx2 = document.getElementById('genderDistributionChart').getContext('2d');
const genderDistributionChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: Object.keys(data.genderCounts),
        datasets: [{
            label: 'Gender Distribution',
            data: Object.values(data.genderCounts),
            backgroundColor: 'lightblue',
            borderColor: 'black',
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Gender Distribution'
        }
    }
});

// Chart for Citizenship Distribution
const ctx3 = document.getElementById('citizenshipDistributionChart').getContext('2d');
const citizenshipDistributionChart = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: Object.keys(data.citizenshipCounts),
        datasets: [{
            label: 'Citizenship Distribution',
            data: Object.values(data.citizenshipCounts),
            backgroundColor: ['red', 'blue'],
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Citizenship Distribution'
        }
    }
});

// Chart for Fatalities Over Time
const ctx4 = document.getElementById('fatalitiesOverTimeChart').getContext('2d');
const fatalitiesOverTimeChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: Object.keys(data.fatalitiesOverTime),
        datasets: [{
            label: 'Fatalities Over Time',
            data: Object.values(data.fatalitiesOverTime),
            borderColor: 'green',
            fill: false
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Fatalities Over Time'
        }
    }
});

// Initialize a map using Folium (You would actually need to generate the HTML for Folium in Python and serve it)
const map = L.map('map').setView([31.5, 34.466667], 7);  // Initial coordinates for Gaza

// Load map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Add markers for districts
const districtCoords = {
    'Gaza': [31.5, 34.466667],
    'Hebron': [31.532569, 35.095388],
    'Jenin': [32.457336, 35.286865],
    'Nablus': [32.221481, 35.254417],
    'Ramallah': [31.902922, 35.206209],
    'Bethlehem': [31.705791, 35.200657],
    'Tulkarm': [32.308628, 35.028537],
    'Jericho': [31.857163, 35.444362],
    'Rafah': [31.296866, 34.245536],
    'Khan Yunis': [31.346201, 34.306286]
};

// Example: Adding markers for each district
for (const [district, coords] of Object.entries(districtCoords)) {
    L.marker(coords).addTo(map).bindPopup(district);
}
