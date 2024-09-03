import RamenRecipe from './RamenRecipe.js';
import { attachAccordionListeners } from './accordion.js';

window.addEventListener('load', function() {
    const recipes = RamenRecipe.loadAll();
    const recipesContainer = document.getElementById('recipes-container');
    if (recipes.length > 0) {
      recipes.forEach(recipe => {
        recipe.display(recipesContainer);
        attachAccordionListeners();
      });
    } else {
      recipesContainer.textContent = 'No recipes yet!';
    }
});