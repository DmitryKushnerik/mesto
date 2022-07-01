export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
      avatar: this._userAvatar.src,
      id: this._id
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._userAvatar.src = avatar;
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}

