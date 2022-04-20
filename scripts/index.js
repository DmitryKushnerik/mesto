//Инициализация переменных
let userName = document.querySelector('.profile__name');
let editName = document.querySelector('.popup__text-input_value_name');
let userJob = document.querySelector('.profile__job');
let editJob = document.querySelector('.popup__text-input_value_job');
let popup = document.querySelector('.popup');
let btnEdit = document.querySelector('.profile__edit-button');
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
console.log(cardTemplate);
const cardList = document.querySelector('.elements');
console.log(cardList);

//Создание новой карточки
function createCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  console.log(newCard);
  newCard.querySelector('.element__caption').textContent = name;
  newCard.querySelector('.element__image').src = link;
  cardList.append(newCard);
}

//Создание начальных карточек
for (let item of initialCards) {
  createCard(item.name, item.link);
}

//Удаление карточки
const deleteButtons = document.querySelectorAll('.element__delete-button');
deleteButtons.forEach((item) => {
    console.log(item);
    item.addEventListener('click', function (evt) {
        const myCard = evt.target.closest('.element');
        console.log(myCard);
        myCard.remove();
    });
});

//Открыть попап для редактирования данных
function popupOpen() {
  editName.value = userName.textContent;
  editJob.value = userJob.textContent;
  popup.classList.add('popup_opened');
};
btnEdit.addEventListener('click', popupOpen);

//Закрыть попап
function popupClose() {
  popup.classList.remove('popup_opened');
};


//Закрыть попап (нажатие на крестик)
let btnClose = document.querySelector('.popup__close')
btnClose.addEventListener('click', popupClose);

//Сохранить изменения
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__text-input_value_name');
let jobInput = formElement.querySelector('.popup__text-input_value_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  popupClose();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);