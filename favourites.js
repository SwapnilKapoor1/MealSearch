const favouriteMeals = document.getElementById('favouriteMeals');
const savedFavouriteMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || [];

function renderFavouriteMeals() {
        if (favouriteMeals) {
            favouriteMeals.innerHTML = '';
    
            savedFavouriteMeals.forEach(meal => {
                const li = document.createElement('li');
                li.textContent = meal.strMeal;
    
                const removeButton = document.createElement('button');
                removeButton.className="removeButton";
                removeButton.textContent = 'Remove from Favourites';
                removeButton.addEventListener('click', () => removeFromFavourites(meal));
                
                const container=document.createElement("div");
                container.className="favouriteList";
                li.appendChild(removeButton);
                container.appendChild(li);
                favouriteMeals.appendChild(container);
            });
        }
    }
    function removeFromFavourites(meal) {
        const index = savedFavouriteMeals.findIndex(favMeal => favMeal.idMeal === meal.idMeal);
        if (index !== -1) {
            savedFavouriteMeals.splice(index, 1);
            localStorage.setItem('favouriteMeals', JSON.stringify(savedFavouriteMeals));
            renderFavouriteMeals();
        }
    }

    renderFavouriteMeals();