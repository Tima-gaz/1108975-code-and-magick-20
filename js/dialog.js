'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb101, 137, 164()', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var userNameInput = document.querySelector('.setup-user-name');
  var wizardForm = document.querySelector('.setup-wizard-form');
  var fireballColor = document.querySelector('.setup-fireball-wrap');
  var eyesInputColor = document.querySelector('.eyes-color');
  var coatInputColor = document.querySelector('.coat-color');
  var fireballInputColor = fireballColor.querySelector('input');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var minNameLength = userNameInput.minLength;
  var maxNameLength = userNameInput.maxLength;

  var isValid = true;

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
      isValid = false;
    } else {
      userNameInput.setCustomValidity('');
      isValid = true;
    }
  });

  userNameInput.addEventListener('input', function () {
    var valueLength = userNameInput.value.length;

    if (valueLength < minNameLength) {
      userNameInput.setCustomValidity('Ещё ' + (minNameLength - valueLength) + ' симв.');
      isValid = false;
    } else if (valueLength > maxNameLength) {
      userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - maxNameLength) + ' симв.');
      isValid = false;
    } else {
      userNameInput.setCustomValidity('');
      isValid = true;
    }
  });

  var calorize = function (colors, elementColor, inputColor) {
    var k = window.random.getRandomInt(0, colors.length - 1);
    if (elementColor.tagName.toLowerCase() === 'div') {
      elementColor.style.backgroundColor = colors[k];
    } else {
      elementColor.style.fill = colors[k];
    }
    inputColor.value = colors[k];
  };

  wizardCoat.addEventListener('click', function () {
    calorize(WIZARD_COAT_COLORS, wizardCoat, coatInputColor);
  });

  wizardEyes.addEventListener('click', function () {
    calorize(WIZARD_EYES_COLORS, wizardEyes, eyesInputColor);
  });

  fireballColor.addEventListener('click', function () {
    calorize(FIREBALL_COLORS, fireballColor, fireballInputColor);
  });

  wizardForm.addEventListener('submit', function (evt) {
    if (isValid) {
      window.backend.save(new FormData(wizardForm), function () {
        userDialog.classList.add('hidden');
      }, window.backend.errorHandler);
    }
    evt.preventDefault();
  });

})();
