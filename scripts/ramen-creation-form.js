import RamenRecipe from './RamenRecipe.js';

const form = document.getElementById('ramen-creation-form');

form.addEventListener('submit', function(event) {
    // event.preventDefault();
    const bouillon = document.querySelector('input[name="bouillon"]:checked').value || null;
    const nouilles = document.querySelector('input[name="nouilles"]:checked').value || null;
    const proteine = document.querySelector('input[name="proteine"]:checked').value || null;
    const legumes = Array.from(document.querySelectorAll('input[name="legumes"]:checked')).map(legume => legume.value);
    const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(topping => topping.value);
    const epices = Array.from(document.querySelectorAll('input[name="epices"]:checked')).map(epice => epice.value);

    const bouillonImg = document.querySelector('input[name="bouillon"]:checked').nextElementSibling.src;
    const nouillesImg = document.querySelector('input[name="nouilles"]:checked').nextElementSibling.src;
    const proteineImg = document.querySelector('input[name="proteine"]:checked').nextElementSibling.src;
    const legumesImgs = Array.from(document.querySelectorAll('input[name="legumes"]:checked')).map(legume => legume.nextElementSibling.src);
    const toppingsImgs = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(topping => topping.nextElementSibling.src);
    const epicesImgs = Array.from(document.querySelectorAll('input[name="epices"]:checked')).map(epice => epice.nextElementSibling.src);

    const ingredientsImgs = [bouillonImg, nouillesImg, proteineImg, ...legumesImgs, ...toppingsImgs, ...epicesImgs];
  
    const ramenRecipe = new RamenRecipe(bouillon, nouilles, proteine, legumes, toppings, epices, ingredientsImgs);
    RamenRecipe.save(ramenRecipe);
  });