//Инициализация переменных
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.elements');
const buttonsClose = document.querySelectorAll('.popup__close');
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

//Создание новой карточки
function createCard(myCardData) {
  const newCard = cardTemplate.cloneNode(true);
  const newName = newCard.querySelector('.element__caption');
  const newImage = newCard.querySelector('.element__image');
  const newLike = newCard.querySelector('.element__like-button');
  const newDelete = newCard.querySelector('.element__delete-button');

  //Кнопка лайка
  newLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });

  //Кнопка удаления
  newDelete.addEventListener('click', (evt) => {
    const myCard = evt.target.closest('.element');
    myCard.remove();
  });

  //Увеличение изображения
  newImage.addEventListener('click', (evt) => {
    openPopupShow(myCardData.name, myCardData.link);
  });

  newName.textContent = myCardData.name;
  newImage.src = myCardData.link;
  newImage.alt = myCardData.name;

  return newCard;
}

//Добавление новой карточки в DOM
function renderCard(myCardData) {
  const newCard = createCard(myCardData);
  cardList.prepend(newCard);
}

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
  toggleButtonState([fieldName, fieldJob], buttonSaveUser);
};

// Сохранить данные о пользователе
function formSubmitHandlerUser(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = fieldName.value;
  userJob.textContent = fieldJob.value;
  closePopup(popupUser);
};

//Открыть попап для добавления новой карточки
function openPopupCard() {
  openPopup(popupCard);
  toggleButtonState([cardPlace, cardLink], buttonSaveCard);
};

// Добавление новой карточки
function formSubmitHandlerCard(evt) {
  const cardData = {
    name: cardPlace.value,
    link: cardLink.value
  }
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  formElementCard.reset();
  renderCard(cardData);
  closePopup(popupCard);
};

//Открыть увеличенное изображение для просмотра
function openPopupShow(name, link) {
  openPopup(popupShow);
  galleryTitle.textContent = name;
  galleryImage.src = link;
};

//Добавление обработчиков событий

//Закрытие попапа при клике на крестик или оверлей
popupList.forEach((popup) => {
  popup.addEventListener('click', closePopupClick);
});

//Открыть попап редактирования профиля
buttonEditUser.addEventListener('click', openPopupUser);

//Сохранить изменения профиля через отправку формы
formElementUser.addEventListener('submit', formSubmitHandlerUser);

//Открыть попап добавления карточки
buttonAddCard.addEventListener('click', openPopupCard);

//Добавить новую карточку через отправку формы
formElementCard.addEventListener('submit', formSubmitHandlerCard);

//Код скрипта
//Создание начальных карточек
initialCards.forEach(card => renderCard({ name: card.name, link: card.link }));