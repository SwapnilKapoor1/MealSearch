const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const favouriteMeals = document.getElementById('favouriteMeals');
const mealDetailsContainer = document.getElementById('mealDetails');
const message=document.getElementById('message');

let currentSearchTerm = '';

// Load favourite meals from localStorage
const savedFavouriteMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || new Set();


searchInput.addEventListener("input",searchMeals);
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

function displaySearchResults(meals) {
    searchResults.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const li = document.createElement('a');
            li.className="result-li"
            li.textContent = meal.strMeal;
            li.href = `detail.html?id=${meal.idMeal}`; // Include id parameter in the URL

            const favouriteButton = document.createElement('button');
            favouriteButton.id="favouriteButton";
            favouriteButton.textContent = 'Add to Favourites';
            favouriteButton.addEventListener('click', () => addToFavourites(meal));

            const div=document.createElement("div");
            div.className="result-div";
            div.appendChild(li);
            div.appendChild(favouriteButton);
            searchResults.appendChild(div);
        });
    } else {
        searchResults.innerHTML = 'No results found.';
    }
}


function addToFavourites(meal) {
    savedFavouriteMeals.add(meal);
    localStorage.setItem('favouriteMeals', JSON.stringify(savedFavouriteMeals));
    message.setAttribute("style","visibility:visible");
    setTimeout(()=>{
        message.setAttribute("style","visibility:hidden");
    },1000);
}
