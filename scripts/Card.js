import { openPopupShow } from './index.js';

export class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__caption').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._handleLikeClick();
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._handleDeleteClick();
    });

    this._element.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleCardClick() {
    openPopupShow(this._name, this._link);
  }
}