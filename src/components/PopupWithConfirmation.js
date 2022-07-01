import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.form = this._popup.querySelector('.popup__form');
    this.button = this.form.querySelector('.popup__button');
  }

  setButtonText(text) {
    this.button.textContent = text;
  }

  setDeleteCard(card, id) {
    this.cardForDelete = card;
    this.idForDelete = id;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.cardForDelete, this.idForDelete);
      this.setDeleteCard(null, '');
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}