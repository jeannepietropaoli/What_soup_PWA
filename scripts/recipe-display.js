import RamenRecipe from './RamenRecipe.js';

window.addEventListener('load', function() {
  // récupération de toutes les recettes du localStorage
  const recipes = RamenRecipe.loadAll();

  // affichage de chaque recette
  const recipesContainer = document.getElementById('recipes-container');
  const recipesText = document.getElementById('recipes-text');
  if (recipes.length > 0) {
    recipes.forEach(recipe => {
      recipe.display(recipesContainer);
    });
  } else {
    // affichage d'un message si aucune recette n'est enregistrée pour le moment
    recipesText.textContent = "Aucune recette pour le moment";
  }
});