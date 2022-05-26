import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//Инициализация переменных
const cardList = document.querySelector('.elements');
const popupList = Array.from(document.querySelectorAll('.popup'));
const eventInput = new Event('input');
//Переменные для работы с профилем
const buttonEditUser = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const fieldName = document.querySelector('.popup__input_value_name');
const userJob = document.querySelector('.profile__job');
const fieldJob = document.querySelector('.popup__input_value_job');
const popupUser = document.querySelector('.popup-user');
const formElementUser = document.querySelector('.form-user');
const buttonSaveUser = document.querySelector('.popup__button_value_user');
//Попап просмотра изображения
const popupShow = document.querySelector('.popup-show');
const galleryImage = document.querySelector('.gallery__image');
const galleryTitle = document.querySelector('.gallery__title');
//Добавление карточки через форму
const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card')
const cardPlace = document.querySelector('.popup__input_value_place');
const cardLink = document.querySelector('.popup__input_value_link');
const formElementCard = document.querySelector('.form-card');
const buttonSaveCard = document.querySelector('.popup__button_value_card');

//Инициализация функций

//Установить значение input
function setInputValue(inputElement, newValue) {
  inputElement.value = newValue;
  inputElement.dispatchEvent(eventInput);
}

//Закрытие при клике попапа на пустое место или крестик
function closePopupClick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
};

//Закрытие при нажатии на esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
};

//Открыть попап (общий случай)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//Закрыть попап (общий случай)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

//Открыть попап для редактирования данных о пользователе
function openPopupUser() {
  openPopup(popupUser);
  setInputValue(fieldName, userName.textContent);
  setInputValue(fieldJob, userJob.textContent);
  formValidatorUser.resetValidation();
};

// Сохранить данные о пользователе
function handleFormSubmitUser(evt) {
  evt.preventDefault();
  userName.textContent = fieldName.value;
  userJob.textContent = fieldJob.value;
  closePopup(popupUser);
};

//Открыть попап для добавления новой карточки
function openPopupCard() {
  openPopup(popupCard);
  formValidatorCard.resetValidation();
};

//Создание новой карточки
function createCard(data, template, handleCardClick) {
  const card = new Card(data, template, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//Добавление новой карточки в DOM
function renderCard(newCard) {
  cardList.prepend(newCard);
}

// Добавление новой карточки через форму
function handleFormSubmitCard(evt) {
  const cardData = {
    name: cardPlace.value,
    link: cardLink.value
  }

  const newCard = createCard(cardData, '#card-template', handleCardClick);
  renderCard(newCard);

  evt.preventDefault();
  formElementCard.reset();
  closePopup(popupCard);
};

//Открыть увеличенное изображение для просмотра
function handleCardClick(name, link) {
  galleryTitle.textContent = name;
  galleryImage.src = link;
  galleryImage.alt = name;
  openPopup(popupShow);
};

//Добавление обработчиков событий

//Закрытие попапа при клике на крестик или оверлей
popupList.forEach((popup) => {
  popup.addEventListener('click', closePopupClick);
});

//Открыть попап редактирования профиля
buttonEditUser.addEventListener('click', openPopupUser);

//Сохранить изменения профиля через отправку формы
formElementUser.addEventListener('submit', handleFormSubmitUser);

//Открыть попап добавления карточки
buttonAddCard.addEventListener('click', openPopupCard);

//Добавить новую карточку через отправку формы
formElementCard.addEventListener('submit', handleFormSubmitCard);

//Код скрипта
//Создание начальных карточек
initialCards.forEach((item) => {
  const newCard = createCard(item, '#card-template', handleCardClick);
  renderCard(newCard);
});

const validation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formValidatorUser = new FormValidator(validation, popupUser);
formValidatorUser.enableValidation();

const formValidatorCard = new FormValidator(validation, popupCard);
formValidatorCard.enableValidation();