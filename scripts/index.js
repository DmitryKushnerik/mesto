//Открыть попап для редактирования данных
let btnEdit = document.querySelector('.profile__edit-button');
btnEdit.addEventListener('click', function () {
  let userName = document.querySelector('.profile__name');
  let editName = document.querySelector('.popup__text-input_value_name');
  editName.value = userName.textContent;
  let userJob = document.querySelector('.profile__job');
  let editJob = document.querySelector('.popup__text-input_value_job');
  editJob.value = userJob.textContent;
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');
});

//Закрыть попап
function popupClose() {
  let popup = document.querySelector('.popup');
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
  let userName = document.querySelector('.profile__name');
  userName.textContent = nameInput.value;
  let userJob = document.querySelector('.profile__job');
  userJob.textContent = jobInput.value;
  popupClose();
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//Активный лайк
btnLike = document.querySelectorAll('.element__like-button');
for (let i = 0; i < btnLike.length; i += 1) {
  btnLike[i].addEventListener('click', function () {
    let isActive = btnLike[i].classList.contains('element__like-button_active');
    if (isActive) {
      btnLike[i].src = './images/btn-like.svg';
      btnLike[i].classList.remove('element__like-button_active');
    } else {
      btnLike[i].src = './images/btn-like_active.svg';
      btnLike[i].classList.add('element__like-button_active');
    }
  })
};

//Заглушка для кнопки "Добавить"
let btnAdd = document.querySelector('.profile__add-button');
btnAdd.addEventListener('click',function () {
  alert('На данный момент, эта функция не реализована');
});