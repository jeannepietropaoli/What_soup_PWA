class RamenRecipe {
    constructor(bouillon, nouilles, proteine, legumes, toppings, epices, ingredientsImgs) {
        this.bouillon = bouillon;
        this.nouilles = nouilles;
        this.proteine = proteine;
        this.legumes = legumes;
        this.toppings = toppings;
        this.epices = epices;
        this.ingredientsImgs = ingredientsImgs
      }
    
      // Sauvegarde la recette dans le localStorage
      static save(newRecipe) {
        console.log('saving');
        const ramenRecipes = JSON.parse(localStorage.getItem('ramenRecipes')) || [];
        newRecipe.id = ramenRecipes.length + 1;
        ramenRecipes.push(newRecipe);
        localStorage.setItem('ramenRecipes', JSON.stringify(ramenRecipes));
      }
    
      // recupère toutes les recettes du localStorage
      static loadAll() {
        const recipes = JSON.parse(localStorage.getItem('ramenRecipes')) || [];
        return recipes.map(recipe => Object.assign(new RamenRecipe(), recipe));
      }
    
      // Affiche une recette dans le DOM
      display(container) {
        const bouillon = document.createElement('p');
        bouillon.textContent = `Bouillon: ${this.bouillon}`;
        container.appendChild(bouillon);
    
        const nouilles = document.createElement('p');
        nouilles.textContent = `Nouilles: ${this.nouilles}`;
        container.appendChild(nouilles);
    
        const proteine = document.createElement('p');
        proteine.textContent = `Protéine: ${this.proteine}`;
        container.appendChild(proteine);
    
        const legumes = document.createElement('p');
        legumes.textContent = `Légumes: ${this.legumes}`;
        container.appendChild(legumes);
    
        const toppings = document.createElement('p');
        toppings.textContent = `Toppings: ${this.toppings}`;
        container.appendChild(toppings);
    
        const epices = document.createElement('p');
        epices.textContent = `Épices: ${this.epices}`;
        container.appendChild(epices);

        const ingredientsImgContainer = document.createElement('div');
        ingredientsImgContainer.classList.add('flex', 'flex-wrap');
        container.appendChild(ingredientsImgContainer);

        this.ingredientsImgs.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.classList.add('w-10', 'h-10', 'm-2');
            ingredientsImgContainer.appendChild(img);
          });
      }
}



export default RamenRecipe;