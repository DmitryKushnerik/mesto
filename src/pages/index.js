import './index.css';
//Импорт констант и классов
import { initialCards, validation } from '../utils/data.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

//Определение функций
function handleUserSubmit(formDataUser) {
  userData.setUserInfo(formDataUser);
}

function handleUserOpen() {
  const userInfoNow = userData.getUserInfo();
  userNameInput.value = userInfoNow.userName;
  userJobInput.value = userInfoNow.userJob;
  formValidatorUser.resetValidation();
}

function handleCardSubmit(item) {
  handleCardRenderer(item);
}

function handleCardOpen() {
  formValidatorCard.resetValidation();
}

function handleCardClick() {
  popupImage.open(this._name, this._link);
}

function createCard(item) {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardRenderer(item) {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}

//Создание попапов
const popupUser = new PopupWithForm('.popup-user', handleUserSubmit, handleUserOpen);
popupUser.setEventListeners();

const popupCard = new PopupWithForm('.popup-card', handleCardSubmit, handleCardOpen);
popupCard.setEventListeners();

const popupImage = new PopupWithImage('.popup-show');
popupImage.setEventListeners();

const buttonEditUser = document.querySelector('.profile__edit-button');
buttonEditUser.addEventListener('click', popupUser.open.bind(popupUser));

const buttonAddCard = document.querySelector('.profile__add-button');
buttonAddCard.addEventListener('click', popupCard.open.bind(popupCard));

const cardList = new Section({
  items: initialCards,
  renderer: handleCardRenderer
}, '.elements');

cardList.renderItems();

const formValidatorUser = new FormValidator(validation, popupUser.form);
formValidatorUser.enableValidation();

const formValidatorCard = new FormValidator(validation, popupCard.form);
formValidatorCard.enableValidation();

const userData = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });

const userNameInput = document.querySelector('.popup__input_value_name');
const userJobInput = document.querySelector('.popup__input_value_job');