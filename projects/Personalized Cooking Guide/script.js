document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const ingredient = document.getElementById('ingredient').value;
    const diet = document.getElementById('diet').value;
    const recipeDiv = document.getElementById('recipe');

    // Sample recipes based on user input
    const recipes = {
        vegan: {
            ingredient: [
                `Vegan ${ingredient} Stir-Fry`,
                `Stuffed ${ingredient} Peppers`,
                `${ingredient} and Chickpea Salad`
            ]
        },
        vegetarian: {
            ingredient: [
                `Vegetarian ${ingredient} Pasta`,
                `${ingredient} and Cheese Quesadilla`,
                `${ingredient} Frittata`
            ]
        },
        'gluten-free': {
            ingredient: [
                `Gluten-Free ${ingredient} Muffins`,
                `Grilled ${ingredient} Skewers`,
                `${ingredient} and Quinoa Bowl`
            ]
        },
        none: {
            ingredient: [
                `Chicken with ${ingredient}`,
                `${ingredient} Pizza`,
                `Beef and ${ingredient} Tacos`
            ]
        }
    };

    recipeDiv.innerHTML = ''; // Clear previous recipe

    if (diet && recipes[diet]) {
        const selectedRecipes = recipes[diet].ingredient;
        const ul = document.createElement('ul');

        selectedRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = recipe;
            ul.appendChild(li);
        });

        recipeDiv.appendChild(ul);
    } else {
        recipeDiv.innerHTML = '<p>Please select a dietary preference!</p>';
    }
});
