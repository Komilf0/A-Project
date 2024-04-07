class MealsAPI{
    //Get recipe by name
    async getMealsByName(name) {
        //Search by name
        const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        // Returns a json response
        const meals = await apiResponse.json();

        return {
            meals
        }
    }

        // Get recipes by ingredient
        async getMealsByIngredient(ingredient) {
            // Search by ingredient
            const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
            // Wait for response then return JSON
            const meals = await apiResponse.json();

            return {
                meals
            }
        }

        // Get single recipe
        async getSingleRecipe(id)
        {
            // Search by id
            const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            // Wait for response then return JSON
            const recipe = await apiResponse.json();

            return {
                recipe
            }
        }
}