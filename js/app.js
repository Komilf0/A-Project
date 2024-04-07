// The clases
const ui = new UI (),
    meals = new MealsAPI();


// Event Listeners
function eventListener(){
    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getMeals);
    }

    // Results div listeners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv) {
        resultsDiv.addEventListener('click', resultsDelegation);
    }
}

eventListener();




// Get meals function
function getMeals(e) {
    e.preventDefault();

    const searchTerm = document.querySelector('#search').value;

    // Check smt is in the search input
    if(searchTerm === '') {
        // Call users interface print message
        ui.printMessage('Please add something in the form:3', 'danger')
    } else {
         // Server response by promise
         let serverResponse

         // Type of search (ingredient or name)
         const type = document.querySelector('#type').value;
 
         // Evaluate the type of method and execute the query
 
         switch(type) {
             case 'name':
                 serverResponse = meals.getMealsByName( searchTerm );
                 break;
             case 'ingredient':
                 serverResponse = meals.getMealsByIngredient( searchTerm );
                 break;
         }
 
         // Query by the name of the meals
         
         serverResponse.then(meals => {
             if(meals.meals.meals === null) {
                 //Nothing exist
                 ui.printMessage('There\'re no results, try different term', 'danger');
             } else {
                if(type === 'name') {
                    // Display with ingredients
                    ui.displayMealsWithIngredients(meals.meals.meals);
                } else {
                    // Display without ingredients (category, area, ingredient)
                    ui.displayMeal(meals.meals.meals);
                }
             }
         })
         .catch(err => {
             console.error(err);
             ui.printMessage('There was an error processing your request.', 'danger');
         });
     }
 }

 // Delegation for #results area
 function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')) {
        meals.getSingleRecipe(e.target.dataset.id)
            .then(recipe => {
                // Displays single recipe into a model
                ui.displaySingleRecipe(recipe.recipe.meals[0])
            })
    }
    
 }