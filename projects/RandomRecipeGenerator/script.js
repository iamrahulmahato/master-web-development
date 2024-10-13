
const endPoint = "https://www.themealdb.com/api/json/v1/1/random.php";
const container = document.querySelector('.container');






function getRandom(endPoint){
    fetch(endPoint).then((response)=>{
        return response.json();
    }).then((result)=>{
        displayResult(result);
    }).catch((err)=>{
        console.log(err);
    })
}

function displayResult(randomMeal){
    const mealObj = randomMeal.meals[0]
    const name = mealObj.strMeal;
    const mealImg = mealObj.strMealThumb;
    const instructions = mealObj.strInstructions;
    const youtube = mealObj.strYoutube;
    const ingredients = [];
    const youtubeArr = youtube.split("v=");
    for(let i = 1; i < 20; i++){
        ingredients.push(`${mealObj["strMeasure"+i]} ${mealObj["strIngredient"+i]}`);
    }
    const filteredIngredients = ingredients.filter((item)=>{
            return item != "null null" && item != " " && item != "null" && item != " null";
    })
    //rendering the data in the container
    container.innerHTML = `
    <div class="segment">
        <div class="foodCard">
            <div onclick="getRandom(endPoint)" class="button">
                Get Random Recipe
            </div>
            <!-- Img and Ingredients -->
            <div class="imgCard">
                <div class="img segment">
                    <h3>${name}</h3>
                    <img src="${mealImg}" width="100%" height="auto"  alt="${name}">
                </div>
                <div class="ingredients segment">
                    <h3>Ingredients</h3>
                    <ul>
                       ${renderIngredients(filteredIngredients)}
                    </ul>
                </div>
            </div>
            <!-- Description -->
            <div class="description segment">
                <h3>Instructions</h3>
                <p style="text-align:justify" >
                    ${instructions}
                </p>
            </div>
            
        </div>
        <!-- Video -->
        <div class="segment">
            <div class="videoWrapper">
                <!-- Copy & Pasted from YouTube -->
                <iframe width="560" height="349" src="https://www.youtube.com/embed/${youtubeArr[1]}" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>
    `;
}

function renderIngredients(ingredients){
    return ingredients.map((item)=>{
        return `<li>${item}</li>`;
    }).join("");
}

getRandom(endPoint);

