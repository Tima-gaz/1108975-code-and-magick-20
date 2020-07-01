'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var openButton = document.querySelector('.setup-open');
  var closeButton = document.querySelector('.setup-close');
  var openIcon = document.querySelector('.setup-open-icon');
  var userNameInput = document.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      if (!userNameInput.hasFocus) {
        evt.preventDefault();
        closePopup();
      }
    }
  };

  var coords = {};

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    coords.x = userDialog.offsetLeft;
    coords.y = userDialog.offsetTop;
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    userDialog.style.top = coords.y + 'px';
    userDialog.style.left = coords.x + 'px';
  };

  openButton.addEventListener('click', function () {
    openPopup();
  });

  openButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  closeButton.addEventListener('click', function () {
    closePopup();
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  });

  openIcon.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });
})();
