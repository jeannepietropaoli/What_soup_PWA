import RamenRecipe from './RamenRecipe.js';

window.addEventListener('load', function() {
    const recipes = RamenRecipe.loadAll();
  
    if (recipes.length > 0) {
      const recipeContainer = document.createElement('div');
      
      recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipe.display(recipeDiv);
        recipeContainer.appendChild(recipeDiv);
      });
  
      document.body.appendChild(recipeContainer);
    } else {
      document.body.textContent = 'No recipes yet!';
    }
  });