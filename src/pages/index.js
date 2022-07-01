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

const cardList = new Section(handleCardRenderer, '.elements');


//Определение функций

function handleUserOpen() {
  const userInfoNow = userData.getUserInfo();
  userNameInput.value = userInfoNow.name;
  userJobInput.value = userInfoNow.about;
  formValidatorUser.resetValidation();
}

function handleUserSubmit(formDataUser) {
  this.setButtonText('Сохранение...');
  api.setUserInfo(formDataUser)
    .then((res) => {
      userData.setUserInfo(res)
      popupUser.close();
    })
    .catch((err) => console.log(err))
    .finally(() => this.setButtonText('Сохранить'))
}

function handleCardOpen() {
  formValidatorCard.resetValidation();
}

function handleCardSubmit(item) {
  this.setButtonText('Сохранение...');
  api.addNewCard(item)
    .then((res) => {
      handleCardRenderer(res)
      popupCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => this.setButtonText('Создать'))
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleLikeClick(card, id) {
  const method = card.checkOwnLike() ? "DELETE" : "PUT";
  api.likeCard(id, method)
    .then((res) => {
      card.renderLikes(res.likes);
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
    userId: userData.getUserId()
  },
    '#card-template',
    () => handleCardClick(item.name, item.link),
    () => handleDeleteClick(card, item._id),
    () => handleLikeClick(card, item._id));
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardRenderer(item) {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}

function handleDeleteClick(card, id) {
  popupDelete.setDeleteCard(card, id)
  popupDelete.open()
}

function handleDeleteSumbmit(cardForDelete, idForDelete) {
  popupDelete.setButtonText('Удаление...');
  api.deleteCard(idForDelete)
    .then((res) => {
      cardForDelete.deleteCard();
      popupDelete.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupDelete.setButtonText('Да'))
}

function handleAvatarOpen() {
  formValidatorAvatar.resetValidation();
}

function handleAvatarSubmit(avatar) {
  this.setButtonText('Сохранение...');
  api.editAvatar(avatar)
    .then((res) => {
      userData.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => this.setButtonText('Сохранить'))
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
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()])
  .then(([info, initialCards]) => {
    userData.setUserInfo(info);
    cardList.renderItems(initialCards);
    console.log('Data loaded');
  })
  .catch((err) => console.log(err));