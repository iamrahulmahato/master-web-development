const searchFood = async (foodItem) => {
    const url = `https://nutritional-data.p.rapidapi.com/?name=${encodeURIComponent(foodItem)}&lang=en`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1820404946msh21b6f01612b6377p1ba0b7jsn20b411379445',
            'x-rapidapi-host': 'nutritional-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json(); 
        const results = data.result;

        if (results && results.length > 0) {
            displayResults(results.slice(0, 5)); // Display the first 5 items
        } else {
            console.log('No related items found.');
            clearTable(); // Clear table if no items found
        }
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
};

const displayResults = (items) => {
    const resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = ''; // Clear previous results

    items.forEach(item => {
        const row = document.createElement('tr');

        // Create table cells for each item
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.calories}</td>
            <td>${item.proteins}</td>
            <td>${item.fat}</td>
            <td>${item.carbohidrates}</td>
            <td>${item.sugar}</td>
            <td>${item.fibres}</td>
            <td>${item.salt}</td>
        `;

        resultBody.appendChild(row); // Append the row to the table body
    });
};

const clearTable = () => {
    const resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = ''; // Clear table body
};

// Attach event listener to the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const foodItem = document.getElementById('foodInput').value;
    if (foodItem) {
        searchFood(foodItem);
    } else {
        alert('Please enter a food item to search.');
    }
});
