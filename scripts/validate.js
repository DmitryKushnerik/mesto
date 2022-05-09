const valuesForValidate = {};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(valuesForValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(valuesForValidate.errorClass);
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(valuesForValidate.inputErrorClass);
  errorElement.classList.remove(valuesForValidate.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(valuesForValidate.inputSelector));
  const buttonElement = formElement.querySelector(valuesForValidate.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation(objArgument) {
  Object.assign(valuesForValidate, objArgument);
  const formList = Array.from(document.querySelectorAll(valuesForValidate.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(valuesForValidate.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(valuesForValidate.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});