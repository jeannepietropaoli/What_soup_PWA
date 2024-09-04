class RamenRecipe {
  constructor(
    bouillon,
    nouilles,
    proteine,
    legumes,
    toppings,
    epices,
    ingredientsImgs
  ) {
    this.bouillon = bouillon;
    this.nouilles = nouilles;
    this.proteine = proteine;
    this.legumes = legumes;
    this.toppings = toppings;
    this.epices = epices;
    this.ingredientsImgs = ingredientsImgs;
    this.id = null;
    this.labels = ["a tester"];
  }

  // Sauvegarde la recette dans le localStorage
  static save(newRecipe) {
    console.log("saving");
    const ramenRecipes = JSON.parse(localStorage.getItem("ramenRecipes")) || [];
    newRecipe.id = ramenRecipes.length + 1;
    ramenRecipes.push(newRecipe);
    localStorage.setItem("ramenRecipes", JSON.stringify(ramenRecipes));
  }

  // recupère toutes les recettes du localStorage
  static loadAll() {
    const recipes = JSON.parse(localStorage.getItem("ramenRecipes")) || [];
    return recipes.map((recipe) => Object.assign(new RamenRecipe(), recipe));
  }

  createCard() {
    const card = document.createElement("div");
    card.classList.add(
      "bg-white",
      "border",
      "border-slate-200",
      "p-10",
      "shadow-sm",
      "relative",
      "text-sm",
      "rounded-md",
      "col-span-12",
      "md:col-span-6",
      "xl:col-span-4",
      "w-11/12",
      "my-6",
      "hover:bg-slate-50"
    );
    return card;
  }

  createLabels() {
    const labels = document.createElement("div");
    labels.classList.add("absolute", "right-[40px]", "flex", "flex-wrap");
    this.labels.forEach((label) => {
      const labelSpan = document.createElement("span");
      labelSpan.classList.add(
        "text-[0.7rem]",
        "font-semibold",
        "px-2",
        "py-1",
        "text-white",
        "bg-indigo-700",
        "rounded-full",
        "mr-2"
      );
      labelSpan.textContent = label;
      labels.appendChild(labelSpan);
    });
    return labels;
  }

  createTitle() {
    const title = document.createElement("h3");
    title.classList.add("text-lg", "font-medium", "text-gray-800");
    title.textContent = `Recette #${this.id}`;
    return title;
  }

  createDescription() {
    const description = document.createElement("p");
    description.classList.add("text-sm", "font-light", "text-gray-600", "my-3");
    description.textContent = "Aucune description pour le moment.";
    return description;
  }

  createIngredientsList(ingredients) {
    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("list-disc", "pl-10", "space-y-2");
    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="font-bold">${ingredient.label}</span>: ${ingredient.value} `;
      ingredientsList.appendChild(li);
    });
    return ingredientsList;
  }

  createIngredientsImgList() {
    const ingredientsList = document.createElement("div");
    ingredientsList.classList.add(
      "hover:bg-slate-200",
      "border-t-2",
      "border-indigo-700",
      "my-5",
      "px-5",
      "pt-0",
      "flex",
      "flex-wrap"
    );

    this.ingredientsImgs.forEach((imgSrc) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.classList.add("h-14", "p-2");
      ingredientsList.appendChild(img);
    });

    return ingredientsList;
  }

  // Affiche une recette dans le DOM
  display(container) {
    const card = this.createCard();
    card.appendChild(this.createLabels());
    card.appendChild(this.createTitle(this.id));
    card.appendChild(this.createDescription());

    const ingredients = [
      { label: "Bouillon", value: this.bouillon },
      { label: "Nouilles", value: this.nouilles },
      { label: "Protéine", value: this.proteine },
      { label: "Légumes", value: String(this.legumes).split(',').join(', ') },
      { label: "Toppings", value: String(this.toppings).split(',').join(', ') },
      { label: "Épices", value: String(this.epices).split(',').join(', ') },
    ];

    card.appendChild(this.createIngredientsList(ingredients));
    card.appendChild(this.createIngredientsImgList());

    container.appendChild(card);
  }
}

export default RamenRecipe;