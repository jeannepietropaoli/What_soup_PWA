function setSuccess(input) {
    const inputControl = input.parentElement.classList.contains("input-control") ? input.parentElement : input.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector(".input-control__error-msg");
    errorDisplay.textContent = '';
    inputControl.classList.remove("input-control--error");
    inputControl.classList.add("input-control--success");
    return inputControl
}

function setError(input, errorMsg) {
  const inputControl = input.parentElement.classList.contains("input-control") ? input.parentElement : input.parentElement.parentElement;
  const errorDisplay = inputControl.querySelector(".input-control__error-msg");
  errorDisplay.textContent = errorMsg;
  inputControl.classList.remove("input-control--success");
  inputControl.classList.add("input-control--error");
  return inputControl
}

// shared checking functions

function checkIfStringLongEnough(string, min) {
  return string !== "" && string.length >= min;
}

function checkIfShortEnough(string, max) {
  return string.length <= max;
}

function getInputValue(input) {
  return input.value.trim();
}

// recipe id checking
function isIdValid(id) {
  return id !== "" && Number(id) > 0;
}

// recipe name checking
function isRecipeNameValid(name) {
  return checkIfStringLongEnough(name, 3) && checkIfShortEnough(name, 50);
}

// recipe chef name checking
function isChefNameValid(name) {
  return checkIfStringLongEnough(name, 2) && checkIfShortEnough(name, 50);
}

// recipe description checking
function isRecipeDescriptionValid(description) {
  return checkIfStringLongEnough(description, 10) && checkIfShortEnough(description, 300);
}

// chef email checking
function isEmailValid(email) {
    return email !== "" && email.length > 3 && email.includes('@');
}

// checkboxes checking

function isAtLeastOneCheckboxChecked(checkboxesArray) {
  return checkboxesArray.some((checkbox) => checkbox.checked);
}

function isAtMostThreeCheckboxesChecked(checkboxesArray) {
  return checkboxesArray.filter((checkbox) => checkbox.checked).length <= 3;
}

// labels checking
function areLabelsValid(labels) {
  return isAtLeastOneCheckboxChecked(labels) && isAtMostThreeCheckboxesChecked(labels);
}

// emojis checking
function areEmojisValid(emojis) {
  return isAtLeastOneCheckboxChecked(emojis) && isAtMostThreeCheckboxesChecked(emojis);
}

// ustenstils checking
function areUstenstilsValid(ustensils) {
  return isAtLeastOneCheckboxChecked(ustensils) && isAtMostThreeCheckboxesChecked(ustensils);
}

// word from chef checking
function isWordFromChefValid(word) {
  return checkIfStringLongEnough(word, 4) && checkIfShortEnough(word, 300);
}

// recipe superpower checking
function isRecipeSuperpowerValid(superpower) {
  return checkIfStringLongEnough(superpower, 2) && checkIfShortEnough(superpower, 60);
}

function isMiamometerValid(value) {
  const min = 0;
  const max = 100;
  return value >= min && value <= max;
}

const inputs = [
  {
    id: "ramen-id",
    element: document.getElementById("ramen-id"),
    validationFunc: isIdValid,
    error_msg: "Vous devez creer un identifiant de recette valide (>0)."
  },
  {
    id: "recipe-name",
    element: document.getElementById("recipe-name"),
    validationFunc: isRecipeNameValid,
    error_msg: "Vous devez creer un nom de recette contenant au moins 3 caracteres."
  },
  {
    id: "description",
    element: document.getElementById("description"),
    validationFunc: isRecipeDescriptionValid,
    error_msg: "Vous devez creer une description de recette contenant au moins 10 caracteres."
  },
  {
    id: "chef-name",
    element: document.getElementById("chef-name"),
    validationFunc: isChefNameValid,
    error_msg: "Vous devez creer un nom de chef contenant au moins 2 caracteres."
  },
  {
    id: "chef-email",
    element: document.getElementById("chef-email"),
    validationFunc: isEmailValid,
    error_msg: "Vous devez entrer un courriel valide (au moins 3 caractères et contenant un '@')."
  },
  {
    id: "comments",
    element: document.getElementById("comments"),
    validationFunc: isWordFromChefValid,
    error_msg: "Ne soyez pas timide, laissez un commentaire d'au moins 4 caracteres. Pas trop bavard non plus, pas plus de 300 caracteres!"
  },
  {
    id: "superpower",
    element: document.getElementById("superpower"),
    validationFunc: isRecipeSuperpowerValid,
    error_msg: "Vous devez creer un superpouvoir de recette contenant au moins 2 caracteres et maxiumum 60 caracteres."
  },
  {
    id: "miamometer",
    element: document.getElementById("miamometer"),
    validationFunc: isMiamometerValid,
    error_msg: "Vous devez donner une note de recette entre 0 et 100."
  }
]

const checkboxesGroups = [
  {
    name: "labels",
    elements: Array.from(document.querySelectorAll("input[name='labels']")),
    validationFunc: areLabelsValid,
    error_msg: "Vous devez selectionner au moins un label et au plus trois labels."
  },
  {
    name: "emojis",
    elements: Array.from(document.querySelectorAll("input[name='emojis']")),
    validationFunc: areEmojisValid,
    error_msg: "Vous devez selectionner au moins un emoji et au plus trois emojis."
  },
  {
    name: "ustensils",
    elements: Array.from(document.querySelectorAll("input[name='ustensils']")),
    validationFunc: areUstenstilsValid,
    error_msg: "Vous devez selectionner au moins un ustensile et au plus trois ustensiles."
  }
]

function validateForm() {
  let noError = true;

  inputs.forEach((input) => {
    const inputValue = getInputValue(input.element);
    if(input.validationFunc(inputValue)) {
      setSuccess(input.element);
    } else {
      setError(input.element, input.error_msg);
      noError = false;
    }
  })

  checkboxesGroups.forEach((group) => {
    if(group.validationFunc(group.elements)) {
      setSuccess(group.elements[0]);  
    } else {
      setError(group.elements[0], group.error_msg);
      noError = false;
    }
  })

  return noError;
}

const isFormReadyToSend = () => validateForm();