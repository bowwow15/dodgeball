var loadedPercentage = 0;

var backgroundPattern;

class Sprite {
  constructor (src) {
    this.image = new Image();
    this.image.src = src;

    this.image.onload = function () {
      loadedPercentage += 1 / imageSpriteLength.length;
      if (loadedPercentage >= 1) {
        showLogin();
      }
    }
  }
}

class SoundSprite {
  constructor (src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  play () {
    this.sound.cloneNode().play();
  }
}

socket.on('sound_effect', function (data) {
  if (data.room == Game.room) {
    spriteList[data.sound_effect].play();
  }
});

var spriteList = {};

function addSprite (name, src, type) {
  switch (type) {
    case "image":
    spriteList[name] = new Sprite(src);
    break;
    case "sound":
    spriteList[name] = new SoundSprite(src);
    break;
  }
}

var spritesToLoad = [
  {
    name: "hexPatternImg",
    src: "/static/img/background_grid.png",
    type: "image"
  }, {
    name: "playerCrown",
    src: "/static/img/crown.png",
    type: "image"
  }, {
    name: "deathSound",
    src: "/static/sound/death.mp3",
    type: "sound"
  }, {
    name: "shootSound",
    src: "/static/sound/throw.mp3",
    type: "sound"
  },
];

function filter_sprites(sprite) {
    return sprite.type == "image";
}

var imageSpriteLength = spritesToLoad.filter(filter_sprites);

spritesToLoad.forEach(function (element, index) {
  addSprite(element.name, element.src, element.type);
});
