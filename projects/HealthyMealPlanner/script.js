document.getElementById('mealForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const diet = document.getElementById('diet').value;
    const goal = document.getElementById('goal').value;

    // Validate input
    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert('Please enter valid numbers for age, weight, and height.');
        return;
    }

    // Calculate TDEE
    const tdee = calculateTDEE(age, gender, weight, height, goal);

    // Fetch meal plan from API
    try {
        const mealPlan = await generateMealPlan(diet, tdee);
        displayMealPlan(mealPlan);
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        alert('Failed to fetch meal plan.');
    }
});

function calculateTDEE(age, gender, weight, height, goal) {
    let bmr;

    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    let tdee = bmr * 1.55; // Activity factor

    if (goal === 'weight-loss') {
        tdee -= 500; // Deficit for weight loss
    } else if (goal === 'muscle-gain') {
        tdee += 300; // Surplus for muscle gain
    }

    return tdee;
}

async function generateMealPlan(diet, tdee) {
    const apiUrl = `https://api.spoonacular.com/mealplanner/generate?diet=${diet}&targetCalories=${tdee}&apiKey=1a9eca28c0b246b7ade5deac3369682d`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch meal plan.');
    }

    const mealData = await response.json();
    return mealData.week; // Return week data
}

function displayMealPlan(weekPlan) {
    const mealSuggestionsDiv = document.getElementById('meal-suggestions');
    mealSuggestionsDiv.innerHTML = ''; // Clear previous suggestions

    // Loop through each day and display its meals
    Object.keys(weekPlan).forEach(day => {
        const dayData = weekPlan[day];

        dayData.meals.forEach(meal => {
            const mealCard = `
                <div class="meal-card">
                    <img src="https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}" alt="${meal.title}" >
                    <h3>${meal.title}</h3>
                    <p><a href="${meal.sourceUrl}" target="_blank">Recipe Link</a></p>
                    <p>Calories: ${dayData.nutrients.calories}</p>
                    <p>Protein: ${dayData.nutrients.protein}g</p>
                    <p>Fat: ${dayData.nutrients.fat}g</p>
                    <p>Carbohydrates: ${dayData.nutrients.carbohydrates}g </p>
                </div>
            `;
            mealSuggestionsDiv.innerHTML += mealCard;
        });
    });
}
