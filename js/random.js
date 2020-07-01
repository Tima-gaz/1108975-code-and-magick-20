'use strict';

(function () {
  window.random = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (list) {
      var element = list[this.getRandomInt(1, list.length)];
      return element;
    }
  };
})();
