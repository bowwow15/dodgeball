var loadedPercentage = 0;

var backgroundPattern;

class Sprite {
  constructor (src) {
    this.image = new Image();
    this.image.src = src;

    this.image.onload = function () {
      loadedPercentage += 1 / spritesToLoad.length;
      if (loadedPercentage >= 1) {
        startGame();
      }
    }
  }
}

var spriteList = {};

function addSprite (name, src) {
  spriteList[name] = new Sprite(src);
}

var spritesToLoad = [
  {
    name: "hexPatternImg",
    src: "/static/img/background_grid.jpg"
  }
];

spritesToLoad.forEach(function (element, index) {
  addSprite(element.name, element.src);
});
