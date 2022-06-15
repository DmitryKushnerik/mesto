export default class Card {
  constructor({ cardName, cardLink }, cardSelector, handleCardClick) {
    this._name = cardName;
    this._link = cardLink;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardTemplate;
  }

  _handleLikeClick() {
    this._cardLikeButton.classList.toggle('element__like-button_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._handleDeleteClick();
    });

    this._element.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardCaption = this._element.querySelector('.element__caption');
    this._cardLikeButton = this._element.querySelector('.element__like-button');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners();

    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
}