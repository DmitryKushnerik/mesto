import Popup from "./Popup.js";

export default class PopupWithform extends Popup {
  constructor(popupSelector, handleFormSubmit, handleFormOpen) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormOpen = handleFormOpen;
    this.form = this._popup.querySelector('.popup__form');
    this.button = this.form.querySelector('.popup__button');
    this._inputList = this.form.querySelectorAll('.popup__input');
  }

  setButtonText(text) {
    this.button.textContent = text;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  open() {
    super.open();
    this._handleFormOpen();
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}