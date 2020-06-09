'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

function randomHSL() {
  var S = Math.floor(Math.random() * 101);
  return 'hsl(240, ' + S + '%, 50%)';
}

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  var maxTime = getMaxElement(times);
  var renderText = function () {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, GAP + FONT_GAP * 2);
    ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, GAP * 3 + FONT_GAP * 2);
  };
  renderText();
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (GAP + FONT_GAP) * 4 + MAX_BAR_HEIGHT + FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (GAP + FONT_GAP) * 4 + (MAX_BAR_HEIGHT - MAX_BAR_HEIGHT * Math.round(times[i]) / maxTime) - GAP);
    ctx.fillStyle = randomHSL();
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (GAP + FONT_GAP) * 4 + (MAX_BAR_HEIGHT - MAX_BAR_HEIGHT * Math.round(times[i]) / maxTime), BAR_WIDTH, MAX_BAR_HEIGHT * Math.round(times[i]) / maxTime);
  }
};
