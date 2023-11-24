var width = gameConfig.screenResolution.width;
var height = gameConfig.screenResolution.height;
var centerX = 0.5;
var centerY = 0.5;
var stageScale = gameConfig.ratio;
var cons;
var game;

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    width: width * stageScale,
    height: height * stageScale,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: width * stageScale,
      height: height * stageScale,
    },

    physics: {
      default: "matter",
    },

    fps: {
      target: 30,
      forceSetTimeOut: true,
    },
    scene: [GameField, MainScene, Gametimer, MainMenuScene],
  };

  game = new Phaser.Game(config);
  cons = new Constants();
};

// screen size calc for responsive app

var rApp = {
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
rApp.update();
