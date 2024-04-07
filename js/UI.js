class UI {

    // Displays meals without ingredients
    displayMeal(meals) {
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

         // Insert results
         const resultsDiv = document.querySelector('#results');
         resultsDiv.innerHTML = ''; // Clear out any existing meals

         //loop through meals
         meals.forEach(meal => {
            resultsDiv.innerHTML += `
            <div class="card-container">
                    <h2 class="card-title">${meal.strMeal}</h2>
                    <img class="card-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-body">
                    <button type="button" data-id="${meal.idMeal}" class="favorite-button button">+</button>
                    <a class="get-recipe button" href="recipe.html" data-id="${meal.idMeal}">Get Recipe</a>
                </div>
            </div>
            `;
         })
    }
    // Displays meals with ingredients
    displayMealsWithIngredients(meals) {
        
        // Show results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // Insert results
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = ''; // Clear out any existing meals
        

        meals.forEach(meal => {
            resultsDiv.innerHTML += `
                <div class="card-container">
                    <h2 class="card-title">${meal.strMeal}</h2>
                    <img class="card-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="card-body">
                    <button type="button" data-id="${meal.idMeal}" class="favorite-button button">+</button>
                        <p class="card-extra-info">
                        <span class="Area">
                            ${meal.strArea}
                        </span>
                        <span class="Category">
                            ${meal.strCategory}
                         </span>
                         </p>
                         <p class="card-text">
                             <ul class="list-group">
                                <p>Ingredients</p>
                                <li class="list-group-item"></li>
                                ${this.displayIngredients(meal)}
                            </ul>
                         </p>
                        <p class="card-text">Instructions:</p>
                        <p class="card-text">
                                ${meal.strInstructions}
                        </p>
                        <p class="card-text"></p>
                    </div>
                </div>
                `;
        })
    }
    
    // Printing ingredients and measurements
    displayIngredients(meal) {

        let ingredients = [];
        for(let i = 1; i < 20; i++) {
            const ingredientMeasure = {};
            if(meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== '' ) {
                ingredientMeasure.ingredient = meal[`strIngredient${i}`];
                ingredientMeasure.measure = meal[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }
        
        let ingredientTemplate = '';
        ingredients.forEach(ingredient => {
            ingredientTemplate += `
                <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
            `;
        });
        return ingredientTemplate;
    }

    // Display single recipe
    displaySingleRecipe(recipe){
        // Get variables
        const recipeTitle = document.querySelector('.recipe-title'),
              recipeDescription = document.querySelector('.preparation-text');
              console.log(recipe)
        
        // Set the values
        recipeTitle.innerHTML = recipe.strMeal;
        recipeDescription.innerHTML = recipe.strInstructions;
    }

    // Displaying a message
    printMessage(message, className) {
        const div = document.createElement('div');

        // HTML
        div.innerHTML = `
            <div class="alert alert-${className}"> 
                <button type="button" class="close" data-dismiss="alert">X</button>
                ${message}
            </div>
            `;

            const reference = document.querySelector('.header h4');
            const parentNode = reference.parentElement;
            parentNode.insertBefore(div, reference);

            div.querySelector('.close').addEventListener('click', function() {
                this.parentElement.remove(); // `this` refers to the button, `.parentElement` is the alert div
            });

            // Remove after 3 sec
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 3000);
    }
}