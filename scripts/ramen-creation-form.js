import RamenRecipe from './RamenRecipe.js';

const form = document.getElementById('ramen-creation-form');

form.addEventListener('submit', function() {
  // récupération des valeurs des inputs
  const bouillon = document.querySelector('input[name="bouillon"]:checked').value || null;
  const nouilles = document.querySelector('input[name="nouilles"]:checked').value || null;
  const proteine = document.querySelector('input[name="proteine"]:checked').value || null;
  const legumes = Array.from(document.querySelectorAll('input[name="legumes"]:checked')).map(legume => legume.value);
  const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(topping => topping.value);
  const epices = Array.from(document.querySelectorAll('input[name="epices"]:checked')).map(epice => epice.value);

  // récupération des images des ingrédients pour les afficher dans la carte de la recette
  const bouillonImg = { src: document.querySelector('input[name="bouillon"]:checked').nextElementSibling.src, alt: document.querySelector('input[name="bouillon"]:checked').nextElementSibling.alt};
  const nouillesImg = { src: document.querySelector('input[name="nouilles"]:checked').nextElementSibling.src, alt: document.querySelector('input[name="nouilles"]:checked').nextElementSibling.alt};
  const proteineImg = { src: document.querySelector('input[name="proteine"]:checked').nextElementSibling.src, alt: document.querySelector('input[name="proteine"]:checked').nextElementSibling.alt};
  const legumesImgs = Array.from(document.querySelectorAll('input[name="legumes"]:checked')).map(legume => ({ src: legume.nextElementSibling.src, alt: legume.nextElementSibling.alt }));
  const toppingsImgs = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(topping => ({ src: topping.nextElementSibling.src, alt: topping.nextElementSibling.alt }));
  const epicesImgs = Array.from(document.querySelectorAll('input[name="epices"]:checked')).map(epice => ({ src: epice.nextElementSibling.src, alt: epice.nextElementSibling.alt }));

  const ingredientsImgs = [bouillonImg, nouillesImg, proteineImg, ...legumesImgs, ...toppingsImgs, ...epicesImgs];

  // création d'une nouvelle instance de RamenRecipe
  const ramenRecipe = new RamenRecipe(bouillon, nouilles, proteine, legumes, toppings, epices, ingredientsImgs);

  // sauvegarde de la recette dans le localStorage
  RamenRecipe.save(ramenRecipe);
  });