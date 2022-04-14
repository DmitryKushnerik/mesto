//Инициализация переменных
let userName = document.querySelector('.profile__name');
let editName = document.querySelector('.popup__text-input_value_name');
let userJob = document.querySelector('.profile__job');
let editJob = document.querySelector('.popup__text-input_value_job');
let popup = document.querySelector('.popup');
let btnEdit = document.querySelector('.profile__edit-button');

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