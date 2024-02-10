const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const favouriteMeals = document.getElementById('favouriteMeals');
const mealDetailsContainer = document.getElementById('mealDetails');
const message=document.getElementById('message');

let currentSearchTerm = '';

// Load favourite meals from localStorage
let savedFavouriteMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || [];

// add listener to search for fetching the data
searchInput.addEventListener("input",searchMeals);
searchInput.addEventListener("click",searchMeals);
async function searchMeals() {
    currentSearchTerm = searchInput.value.trim();
    
    if (currentSearchTerm.length > 2) {
        const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${currentSearchTerm}`);
        const data = await response.json();
        displaySearchResults(data.meals);
        
     } else {
        searchResults.innerHTML = 'Please add more than 2 letters in the search box to see accurate suggestions';
    }
}

// displaying the data in results column
function displaySearchResults(meals) {
    searchResults.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const li = document.createElement('a');
            li.className="result-li"
            li.textContent = meal.strMeal;
            li.href = `detail.html?id=${meal.idMeal}`; // Include id parameter in the URL

            // creating add to favourite button
            const favouriteButton = document.createElement('button');
            favouriteButton.id="favouriteButton";
            favouriteButton.textContent = 'Add to Favourites';
            favouriteButton.addEventListener('click', () => addToFavourites(meal));

            // creating the div to contain the list item and button
            const div=document.createElement("div");
            div.className="result-div";
            div.appendChild(li);
            div.appendChild(favouriteButton);
            searchResults.appendChild(div);
        });
    } else {
         //if data not available through API
        searchResults.innerHTML = 'OOPS! No results found. We will update our meal list';
    }
}

// adding the meal to the list

function addToFavourites(meal) {
    savedFavouriteMeals = savedFavouriteMeals || [];
    savedFavouriteMeals.push(meal.strMeal);
    localStorage.setItem('favouriteMeals', JSON.stringify(savedFavouriteMeals));
    message.setAttribute("style","visibility:visible"); //displaying the message for succesful addition
    setTimeout(()=>{
        message.setAttribute("style","visibility:hidden"); //removing the message after 1sec
    },1000);
}
