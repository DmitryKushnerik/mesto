export default class Card {
  constructor({ name, link, likes, _id, ownerId, userId }, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this.likes = likes;
    this._id = _id;
    this._ownerId = ownerId;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardTemplate;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  checkOwnLike() {
    return this.likes.some((like) => {
      return like._id === this._userId;
    })
  }

  setLikeImage() {
    this._cardLikeButton.classList.toggle('element__like-button_active', this.checkOwnLike());
  }

  renderLikes(likes) {
    this.likes = likes;
    this.setLikeNumber(this.likes.length);
    this.setLikeImage();
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener('click', (evt) => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  setLikeNumber(number) {
    this._likeCounter.textContent = number;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardCaption = this._element.querySelector('.element__caption');
    this._cardLikeButton = this._element.querySelector('.element__like-button');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    if (this._ownerId != this._userId) {
      this._cardDeleteButton.remove();
    }
    this._setEventListeners();

    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.setLikeNumber(this.likes.length);
    this.setLikeImage();

    return this._element;
  }
}