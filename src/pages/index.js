import './index.css';
//Импорт констант и классов
import { initialCards } from '../utils/data.js';
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
  Array.from(popupUser.form.elements).forEach((item) => {
    if (item.name in userInfoNow) {
      item.value = userInfoNow[item.name]
    }
  })
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

function handleCardRenderer(item) {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();
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


const validation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formValidatorUser = new FormValidator(validation, popupUser.form);
formValidatorUser.enableValidation();

const formValidatorCard = new FormValidator(validation, popupCard.form);
formValidatorCard.enableValidation();

const userData = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });