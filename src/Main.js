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
    scene: [MainMenuScene, GameField, MainScene, Gametimer, UILayer, EndScene],
  };

  game = new Phaser.Game(config);
  model = new Model();
  cons = new Constants();
  controller = new GameController();

};

