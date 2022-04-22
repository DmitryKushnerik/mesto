//Инициализация переменных
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.elements');
let cardData = {
  name: '',
  link: ''
};
const buttonsClose = document.querySelectorAll('.popup__close');
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
    const showName = evt.target.alt;
    const showLink = evt.target.src;
    openPopupShow(showName, showLink);
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

//Открыть попап (общий случай)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.style.animation = 'anim-show 1s forwards';
};

//Закрыть попап (общий случай)
function closePopup(popup) {
  popup.style.animation = 'anim-hide 1s forwards';
  setTimeout(() => { popup.classList.remove('popup_opened') }, 1000);
};

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

//Закрыть попап (нажатие на крестик)
buttonsClose.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const myPopup = evt.target.closest('.popup');
    closePopup(myPopup);
  });
});

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