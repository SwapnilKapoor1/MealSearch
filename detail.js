const mealDetailsContaine = document.getElementById('mealDetails');

async function showMealDetails(mealId) {
    const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    const meal = data.meals[0];    
    
        // Display detailed information in mealDetailsContainer
        mealDetailsContaine.innerHTML = `
            <h1 class="dishName">${meal.strMeal}</h1>
            <img class="dishImage" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>Category : <span style=color:red> ${meal.strCategory}<span></h3>
            <h3>Cuisine : <span style=color:red>${meal.strArea}</span></h3>
            <h3>Instructions to Cook :</h3>
            <p>${meal.strInstructions}</p>
            <h3> <a href="${meal.strYoutube}" target=_blank>Link to watch on Youtube</a></h3>
        `;
        
}

//Get the meal id from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

// Call the showMealDetails function with the retrieved mealId
if (mealId) {
    showMealDetails(mealId);
} else {
    console.error('Meal ID not found in URL parameters');
}