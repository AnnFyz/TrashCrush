//var width = gameConfig.screenResolution.width;
//var height = gameConfig.screenResolution.height;
var centerX = 0.5;
var centerY = 0.5;
var stageScale = gameConfig.ratio;
var cons;
var game;
var model;
var gameLevels;
var objectsToResize = [];

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: "phaser-example",
      width: "100%",
      height: "100%",
      min: {
        width: 800,
        height: 600,
      },
      max: {
        width: 1600,
        height: 1200,
      },
    },
    physics: {
      default: "matter",
    },

    fps: {
      target: 30,
      forceSetTimeOut: true,
    },
    scene: [MainMenuScene, GameField, MainScene, EndScene, Gametimer, UILayer],
  };

  game = new Phaser.Game(config);
  model = new Model();
  cons = new Constants();
};

// screen size calc for responsive app

/* var rApp = {
  centerX: centerX,
  centerY: centerY,
  defaultWidth: width,
  defaultHeight: height,
  gridx: 100,
  gridy: 100,
  update: function () {
    this.zoom =
      window.innerHeight >= 400
        ? window.innerHeight / ((rApp.defaultHeight * 2) / 100) / 100
        : 400 / ((rApp.defaultHeight * 2) / 100) / 100;
    this.width = window.innerWidth / this.zoom;
    this.height = window.innerHeight / this.zoom;
    this.left = this.centerX - this.width / 2;
    this.top = this.centerY - this.height / 2;
    this.right = this.centerX + this.width / 2;
    this.bottom = this.centerY + this.height / 2;

    console.log(this.zoom, this.left, this.top, this.right, this.bottom);
  },
};
rApp.update(); */
