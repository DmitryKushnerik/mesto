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
//Переменные для работы с профилем
const buttonEdit = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__name');
const fieldName = document.querySelector('.popup__text-input_value_name');
const userJob = document.querySelector('.profile__job');
const fieldJob = document.querySelector('.popup__text-input_value_job');
const popupUser = document.querySelector('.popup-user');
const formElementUser = document.querySelector('.form-user');
//Попап просмотра изображения
const popupShow = document.querySelector('.popup-show');
const galleryImage = document.querySelector('.gallery__image');
const galleryTitle = document.querySelector('.gallery__title');
//Добавление карточки через форму
const buttonCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card')
const cardPlace = document.querySelector('.popup__text-input_value_place');
const cardLink = document.querySelector('.popup__text-input_value_link');
const formElementCard = document.querySelector('.form-card');

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

//Открыть попап (общий случай)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.style.animation = 'anim-show 1s forwards';
  popup.focus();
};

//Закрыть попап (общий случай)
function closePopup(popup) {
  popup.style.animation = 'anim-hide 1s forwards';
  setTimeout(() => { popup.classList.remove('popup_opened') }, 1000);
};

//Общие свойства попапов
popupList.forEach((popup) => {

  //Закрытие при клике на пустое место или крестик
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });

  //Закрытие при нажатии на esc
  popup.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') { closePopup(popup) }
  });
});

//Открыть попап для редактирования данных
function openPopupUser() {
  openPopup(popupUser);
  fieldName.value = userName.textContent;
  fieldJob.value = userJob.textContent;
};

// Обработчик «отправки» формы редактирования профиля, хотя пока она никуда отправляться не будет
function formSubmitHandlerUser(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = fieldName.value;
  userJob.textContent = fieldJob.value;
  closePopup(popupUser);
};

// Обработчик «отправки» формы добавления карточки, хотя пока она никуда отправляться не будет
function formSubmitHandlerCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  cardData.name = cardPlace.value;
  cardData.link = cardLink.value;
  renderCard(cardData);
  closePopup(popupCard);
};

function openPopupShow(name, link) {
  openPopup(popupShow);
  galleryTitle.textContent = name;
  galleryImage.src = link;
};

//Добавление обработчиков событий

//Открыть попап редактирования профиля
buttonEdit.addEventListener('click', openPopupUser);

//Сохранить изменения профиля через отправку формы
formElementUser.addEventListener('submit', formSubmitHandlerUser);

//Открыть попап добавления карточки
buttonCard.addEventListener('click', (evt) => {
  openPopup(popupCard);
  cardPlace.value = '';
  cardLink.value = '';
});

//Добавить новую карточку через отправку формы
formElementCard.addEventListener('submit', formSubmitHandlerCard);

//Код скрипта
//Создание начальных карточек
for (let item of initialCards) {
  cardData.name = item.name;
  cardData.link = item.link;
  renderCard(cardData);
};