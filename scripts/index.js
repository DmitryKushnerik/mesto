//Инициализация и создание карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.elements');

//Создание новой карточки
function createCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  //Задать название
  const newName = newCard.querySelector('.element__caption');
  newName.textContent = name;
  //Задать URL картинки
  const newImage = newCard.querySelector('.element__image');
  newImage.src = link;
  newImage.alt = name;
  //Кнопка лайка
  const newLike = newCard.querySelector('.element__like-button');
  newLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  //Кнопка удаления
  const newDelete = newCard.querySelector('.element__delete-button');
  newDelete.addEventListener('click', (evt) => {
    const myCard = evt.target.closest('.element');
    myCard.remove();
  });
  //Увеличение изображения
  newImage.addEventListener('click', (evt) => {
    let showName = evt.target.alt;
    let showLink = evt.target.src;
    popupShowOpen(showName, showLink);
  });
  cardList.append(newCard);
}

//Создание начальных карточек
for (let item of initialCards) {
  createCard(item.name, item.link);
}

//Переменные для работы с профилем
const userName = document.querySelector('.profile__name');
const editName = document.querySelector('.popup__text-input_value_name');
const userJob = document.querySelector('.profile__job');
const editJob = document.querySelector('.popup__text-input_value_job');
const popupUser = document.querySelector('.popup-user');

//Открыть попап (общий случай)
function popupOpen(popup) {
  popup.classList.add('popup_opened');
  popup.style.animation = 'anim-show 1s forwards';
};

//Открыть попап для редактирования данных
function popupUserOpen() {
  popupOpen(popupUser);
  editName.value = userName.textContent;
  editJob.value = userJob.textContent;
};
const btnEdit = document.querySelector('.profile__edit-button');
btnEdit.addEventListener('click', popupUserOpen);

//Закрыть попап (общий случай)
function popupClose(popup) {
  popup.style.animation='anim-hide 1s forwards';
  setTimeout(() => {popup.classList.remove('popup_opened')}, 1000);
};

//Закрыть попап (нажатие на крестик)
const btnClose = document.querySelectorAll('.popup__close');
btnClose.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const myPopup = evt.target.closest('.popup');
    popupClose(myPopup);
  });
});

//Сохранить изменения профиля
// Находим форму в DOM
const formElementCardUser = document.querySelector('.form_type_user');
// Находим поля формы в DOM
const nameInput = formElementCardUser.querySelector('.popup__text-input_value_name');
const jobInput = formElementCardUser.querySelector('.popup__text-input_value_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  popupClose(popupUser);
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementCardUser.addEventListener('submit', formSubmitHandler);

//Добавление карточки через форму
const btnCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-card')
const cardPlace = document.querySelector('.popup__text-input_value_place');
const cardLink = document.querySelector('.popup__text-input_value_link');
btnCard.addEventListener('click', (evt) => {
  popupOpen(popupCard);
  cardPlace.value = '';
  cardLink.value = '';
});

// Находим форму в DOM
const formElementCard = document.querySelector('.form_type_card');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandlerCard(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  createCard(cardPlace.value, cardLink.value);
  popupClose(popupCard);
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementCard.addEventListener('submit', formSubmitHandlerCard);

//Открыть попап просмотра изображения
const popupShow = document.querySelector('.popup-show');
const galleryImage = document.querySelector('.gallery__image');
const galleryTitle = document.querySelector('.gallery__title');

function popupShowOpen(name, link) {
  popupOpen(popupShow);
  galleryTitle.textContent = name;
  galleryImage.src = link;
};