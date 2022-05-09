//Инициализация переменных
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.elements');
let cardData = {
  name: '',
  link: ''
};
const photoGrid = document.querySelector('.photo-grid');
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

//Добавление обработчиков клика к таблице изображений, делегирование событий
photoGrid.addEventListener('click', (evt) => {
  //Кнопка лайка
  if (evt.target.classList.contains('element__like-button')) {
    evt.stopPropagation();
    evt.target.classList.toggle('element__like-button_active');
  }

  //Кнопка удаления
  if (evt.target.classList.contains('element__delete-button')) {
    evt.stopPropagation();
    const myCard = evt.target.closest('.element');
    myCard.remove();
  }

  //Увеличение изображения
  if (evt.target.classList.contains('element__image')) {
    evt.stopPropagation();
    const showName = evt.target.alt;
    const showLink = evt.target.src;
    openPopupShow(showName, showLink);
  }
});

//Создание новой карточки
function createCard(myCardData) {
  const newCard = cardTemplate.cloneNode(true);
  const newName = newCard.querySelector('.element__caption');
  const newImage = newCard.querySelector('.element__image');

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
    console.log(evt);
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(evt.currentTarget);
    }
  };

  //Закрытие при нажатии на esc
  function closePopupEsc(evt) {
    if (evt.key === 'Escape') { closePopup(evt.currentTarget) }
  };

//Открыть попап (общий случай)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.style.animation = 'anim-show 1s forwards';
  popup.focus();
  popup.addEventListener('click',closePopupClick);
  popup.addEventListener('keydown',closePopupClick);
};

//Закрыть попап (общий случай)
function closePopup(popup) {
  popup.style.animation = 'anim-hide 1s forwards';
  popup.removeEventListener('click',closePopupClick);
  popup.removeEventListener('keydown',closePopupClick);
  setTimeout(() => {
    popup.classList.remove('popup_opened');
    const inputList = popup.querySelectorAll('.popup__input');
    Array.from(inputList).forEach((item) => {
      item.value = '';
    })
  }, 1000);
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
  const inputList = Array.from(popupCard.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    hideInputError(popupCard, inputElement)
  });
  cardPlace.value = '';
  cardLink.value = '';
  toggleButtonState([cardPlace, cardLink], buttonSaveCard);
};

//Нажатие на кнопку сохранения (проверка до отправки формы)
buttonSaveCard.addEventListener('click', (evt) => {
  const inputList = Array.from(popupCard.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    checkInputValidity(popupCard, inputElement);
  });
});

// Добавление новой карточки
function formSubmitHandlerCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardData.name = cardPlace.value;
  cardData.link = cardLink.value;
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
for (let item of initialCards) {
  cardData.name = item.name;
  cardData.link = item.link;
  renderCard(cardData);
};