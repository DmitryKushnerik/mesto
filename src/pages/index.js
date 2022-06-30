import './index.css';

//Импорт констант и классов
import { validation } from '../utils/data.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Определение переменных
let idForDelete = '';
let cardForDelete = null;
let userId = '';

const popupUser = new PopupWithForm('.popup-user', handleUserSubmit, handleUserOpen);
const popupCard = new PopupWithForm('.popup-card', handleCardSubmit, handleCardOpen);
const popupImage = new PopupWithImage('.popup-show');
const popupDelete = new PopupWithConfirmation('.popup-delete', handleDeleteSumbmit);
const popupAvatar = new PopupWithForm('.popup-avatar', handleAvatarSubmit, handleAvatarOpen);

const buttonEditUser = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__avatar-button');

const userNameInput = document.querySelector('.popup__input_value_name');
const userJobInput = document.querySelector('.popup__input_value_job');
const userAvatarInput = document.querySelector('.popup__input_value_avatar');

const formValidatorUser = new FormValidator(validation, popupUser.form);
const formValidatorCard = new FormValidator(validation, popupCard.form);
const formValidatorAvatar = new FormValidator(validation, popupAvatar.form);

const userData = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar' });

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'd15e8ca8-8427-4b66-9575-89e965d840a2',
    'Content-Type': 'application/json'
  }
});

const cardList = new Section({
  items: [],
  renderer: handleCardRenderer
}, '.elements');


//Определение функций

function setDeleteCard(id, card) {
  idForDelete = id;
  cardForDelete = card;
}

function handleUserOpen() {
  this.button.textContent = 'Сохранить';
  const userInfoNow = userData.getUserInfo();
  userNameInput.value = userInfoNow.name;
  userJobInput.value = userInfoNow.about;
  formValidatorUser.resetValidation();
}

function handleUserSubmit(formDataUser) {
  this.button.textContent = 'Сохранение...';
  api.setUserInfo(formDataUser)
    .then((res) => userData.setUserInfo(res))
    .catch((err) => console.log(err))
}

function handleCardOpen() {
  this.button.textContent = 'Создать';
  formValidatorCard.resetValidation();
}

function handleCardSubmit(item) {
  this.button.textContent = 'Сохранение...';
  api.addNewCard(item)
    .then((res) => handleCardRenderer(res))
    .catch((err) => console.log(err))
}

function handleCardClick() {
  popupImage.open(this._name, this._link);
}

function handleLikeClick(id) {
  const method = this.checkOwnLike() ? "DELETE" : "PUT";
  api.likeCard(id, method)
    .then((res) => {
      this.likes = res.likes;
      this.setLikeNumber(this.likes.length);
      this.setLikeImage();
    })
    .catch((err) => console.log(err))
}

function createCard(item) {
  const card = new Card({
    name: item.name,
    link: item.link,
    likes: item.likes,
    _id: item._id,
    ownerId: item.owner._id,
    userId: userId
  }, '#card-template', handleCardClick, handleDeleteClick, handleLikeClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardRenderer(item) {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}

function handleDeleteClick(id) {
  setDeleteCard(id, this)
  popupDelete.open()
}

function handleDeleteSumbmit() {
  api.deleteCard(idForDelete)
    .then((res) => {
      cardForDelete.deleteCard();
      setDeleteCard('', null);
    })
    .catch((err) => console.log(err))
}

function handleAvatarOpen() {
  this.button.textContent = 'Сохранить';
  userAvatarInput.value = userData.getUserInfo().avatar;
  formValidatorAvatar.resetValidation();
}

function handleAvatarSubmit(avatar) {
  this.button.textContent = 'Сохранение...';
  api.editAvatar(avatar)
    .then((res) => userData.setUserAvatar(res.avatar))
    .catch((err) => console.log(err))
}

//Добавление слушателей событий
popupUser.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();
buttonEditUser.addEventListener('click', popupUser.open.bind(popupUser));
buttonAddCard.addEventListener('click', popupCard.open.bind(popupCard));
buttonEditAvatar.addEventListener('click', popupAvatar.open.bind(popupAvatar));
formValidatorUser.enableValidation();
formValidatorCard.enableValidation();
formValidatorAvatar.enableValidation();

//Код скрипта
api.getUserInfo()
  .then((res) => {
    userData.setUserInfo(res);
    userData.setUserAvatar(res.avatar);
    userId = res._id;
  })
  .then(() => {
    api.getInitialCards()
      .then((initialCards) => initialCards.forEach((card) => {
        handleCardRenderer(card);
      }))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));