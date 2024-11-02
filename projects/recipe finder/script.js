// Sample recipes for demonstration
const recipes = [
    {
      name: "Chicken Salad",
      ingredients: ["chicken", "lettuce", "tomatoes", "basil"],
      instructions: "Mix all ingredients and serve fresh.",
      image: "https://via.placeholder.com/300x200?text=Chicken+Salad",
      rating: "⭐️⭐️⭐️⭐️"
    },
    {
      name: "Tomato Basil Soup",
      ingredients: ["tomatoes", "basil", "onion", "garlic"],
      instructions: "Cook all ingredients, blend, and serve hot.",
      image: "https://via.placeholder.com/300x200?text=Tomato+Basil+Soup",
      rating: "⭐️⭐️⭐️⭐️⭐️"
    },
    {
      name: "Pasta with Pesto",
      ingredients: ["pasta", "basil", "garlic", "olive oil"],
      instructions: "Mix pasta with pesto and serve warm.",
      image: "https://via.placeholder.com/300x200?text=Pasta+with+Pesto",
      rating: "⭐️⭐️⭐️⭐️"
    }
  ];
  
  // Function to find recipes based on input ingredients
  function findRecipes() {
    const input = document.getElementById("ingredients-input").value.toLowerCase();
    const ingredients = input.split(",").map(item => item.trim());
  
    const matchingRecipes = recipes.filter(recipe => 
      ingredients.some(ingredient => recipe.ingredients.includes(ingredient))
    );
  
    displayRecipes(matchingRecipes);
  }
  
  // Function to display recipes
  function displayRecipes(recipeList) {
    const container = document.getElementById("recipe-suggestions");
    container.innerHTML = "";  // Clear previous suggestions
  
    if (recipeList.length === 0) {
      container.innerHTML = "<p>No matching recipes found.</p>";
      return;
    }
  
    recipeList.forEach(recipe => {
      const recipeElement = document.createElement("div");
      recipeElement.classList.add("recipe");
  
      recipeElement.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name} Image">
        <p class="rating">${recipe.rating}</p>
        <p class="ingredients"><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p class="instructions"><strong>Instructions:</strong> ${recipe.instructions}</p>
      `;
  
      container.appendChild(recipeElement);
    });
  }
  