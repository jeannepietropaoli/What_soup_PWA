import RamenRecipe from './RamenRecipe.js';

window.addEventListener('load', function() {
    const recipes = RamenRecipe.loadAll();
    const recipesContainer = document.getElementById('recipes-container');
    if (recipes.length > 0) {
      recipes.forEach(recipe => {
        recipe.display(recipesContainer);
      });
    } else {
      recipesContainer.textContent = 'No recipes yet!';
    }
});