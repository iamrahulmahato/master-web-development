const searchBtn = document.querySelector('.searchbtn');


const searchBox = document.querySelector('.searchbox');
const recipeContainer = document.querySelector('.recipe-container');
const main = document.querySelector('#main');
const heroSection = document.querySelector('.hero-section1');
const featuredRecip = document.querySelector("#featured-recipe");
const services = document.querySelector("#services");
const footer = document.querySelector("#footer");
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector(".recipe-close-btn");



// Function to get recipes
const fetchRecipes = async (query) => {
    const encodedQuery = encodeURIComponent(query);
    recipeContainer.innerHTML = "<h2>Fetching Recipies.......</h2>"

    
    try {

   recipeContainer.style.color = "#4ade80";
   heroSection.innerHTML = "";

  
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodedQuery}`);
    recipeContainer.innerHTML = "";
    const response = await data.json();
   

    recipeContainer.style.display = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
      
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span></p>

        `
        const button = document.createElement('button');
        button.classList.add('view-recipe')
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

// Adding Event listner to the recipe button
button.addEventListener("click",()=>{
    openRecipePopup(meal);
    heroSection.style.filter = " blur(5px)";

});

        heroSection.style.display = "flex";
        heroSection.appendChild(recipeDiv);
        main.style.display = "none";
        services.style.display = "none";
        featuredRecip.style.display = "none";
        footer.style.display = "none";
    });
} catch (error) {
    recipeContainer.innerHTML = "<h2>Recipe Not found try searching any other recipe.....</h2>"
    recipeContainer.style.color = "orange";
    heroSection.innerHTML = "";
}
}


// fucntion to fetch ingredients and me
const fetchIngredients = (meal)=>{
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
return ingredientsList;
}


const openRecipePopup = (meal)=>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="recipeSubName">Ingredients:</h3>
    <ul class="ingredientList">
    <li>
    ${fetchIngredients(meal)}
    </li>
    </ul>
    <div class="recipeInstruction">
    <h3 class="instruction">Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>`

    recipeDetailsContent.parentElement.style.display="flex";
    
}


recipeCloseBtn.addEventListener("click",()=>{
recipeDetailsContent.parentElement.style.display = "none";
heroSection.style.filter = " blur(0px)";

});



searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML =`<h2>Type the meal in the search box</h2>`
        return;
    }
    fetchRecipes(searchInput);
});


// Hamburger
const navMenu = document.querySelector(".nav-menu");
const closeMenu = document.querySelector(".close-menu");
const openMenu = document.querySelector(".open-menu");

openMenu.addEventListener('click',()=>{
    navMenu.style.display = "flex";
    navMenu.style.top = "0";
});
closeMenu.addEventListener('click',()=>{
    navMenu.style.top = "-100%";
});
searchBtn.addEventListener('click', () => {
  

    searchBtn.style.border = "2px solid lightblue"; // Corrected the variable name
});

