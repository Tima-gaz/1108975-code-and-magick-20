'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb101, 137, 164()', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var openButton = document.querySelector('.setup-open');
var closeButton = document.querySelector('.setup-close');
var openIcon = document.querySelector('.setup-open-icon');
var userNameInput = document.querySelector('.setup-user-name');
var submitButton = document.querySelector('.setup-submit');
var wizardForm = document.querySelector('.setup-wizard-form');
var fireballColor = document.querySelector('.setup-fireball-wrap');
var eyesInputColor = document.querySelector('.eyes-color');
var coatInputColor = document.querySelector('.coat-color');
var fireballInputColor = fireballColor.querySelector('input');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var minNameLength = userNameInput.minLength;
var maxNameLength = userNameInput.maxLength;

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomElement = function (list) {
  var element = list[getRandomInt(1, list.length)];
  return element;
};

var wizards = [];
var createWizard = function (wizard) {
  for (var i = 0; i < 4; i++) {
    wizard[i] = {
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomElement(WIZARD_EYES_COLORS)};
  }
};
createWizard(wizards);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    if (!userNameInput.hasFocus) {
      evt.preventDefault();
      closePopup();
    }
  }
};

var sendForm = function () {
  wizardForm.submit();
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
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

submitButton.addEventListener('click', function () {
  sendForm();
});

submitButton.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    sendForm();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < minNameLength) {
    userNameInput.setCustomValidity('Ещё ' + (minNameLength - valueLength) + ' симв.');
  } else if (valueLength > maxNameLength) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - maxNameLength) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});

wizardCoat.addEventListener('click', function () {
  var k = getRandomInt(0, WIZARD_COAT_COLORS.length - 1);
  wizardCoat.style.fill = WIZARD_COAT_COLORS[k];
  coatInputColor.value = WIZARD_COAT_COLORS[k];
});

wizardEyes.addEventListener('click', function () {
  var k = getRandomInt(0, WIZARD_EYES_COLORS.length - 1);
  wizardEyes.style.fill = WIZARD_EYES_COLORS[k];
  eyesInputColor.value = WIZARD_EYES_COLORS[k];
});

fireballColor.addEventListener('click', function () {
  var k = getRandomInt(0, FIREBALL_COLORS.length - 1);
  fireballColor.style.backgroundColor = FIREBALL_COLORS[k];
  fireballInputColor.value = FIREBALL_COLORS[k];
});
