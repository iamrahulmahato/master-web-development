document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const recipeName = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value.split(',');
    const steps = document.getElementById('steps').value;

    // Create a new recipe object
    const recipe = {
        name: recipeName,
        ingredients: ingredients.map(ingredient => ingredient.trim()),
        steps: steps.split('\n').map(step => step.trim())
    };

    // Add the recipe to the list
    addRecipeToList(recipe);

    // Clear form fields
    document.getElementById('recipe-form').reset();
});

function addRecipeToList(recipe) {
    const recipeList = document.getElementById('recipe-list');
    
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    
    const recipeTitle = document.createElement('h2');
    recipeTitle.textContent = recipe.name;
    
    const recipeIngredients = document.createElement('p');
    recipeIngredients.innerHTML = `<strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}`;
    
    const recipeSteps = document.createElement('p');
    recipeSteps.innerHTML = `<strong>Steps:</strong><br>${recipe.steps.join('<br>')}`;

    recipeDiv.appendChild(recipeTitle);
    recipeDiv.appendChild(recipeIngredients);
    recipeDiv.appendChild(recipeSteps);
    
    recipeList.appendChild(recipeDiv);
}