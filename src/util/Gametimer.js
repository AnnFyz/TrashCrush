//
//  Gametimer
//  Ring Animation from https://github.com/maryamBaratii/Phaser3-Countdown-Clock
//

class Gametimer extends Phaser.Scene {
  constructor() {
    super("Gametimer");
    EventDispatcher.getInstance().on(cons.END_GAME, this.handleGameEnd, this);
  }

  init() {
    log("=> launching Gametimer manager");
    this.text1;
    this.currentScore;
    this.newScore;
    this.timer;
  }

  newTimer(scene, { posX = 100, posY = 100, callback = "", secondsCB = "", gameTime = 15, delay = 500, countdown = false }) {
    if (this.timeRunning) {
      log("WARNING : a game timer is already running!");
      return;
    }

    log("new timer: ", gameTime);
    let parent = this;
    this.callback = callback;
    this.callbackPerSecond = secondsCB;
    this.scene = scene;
    this.countdown = countdown;
    this.gameTime = this.countdown ? gameTime : 0;
    this.centerX = posX;
    this.runTime = gameTime;

    this.scene.scale.on("resize", this.resize, this);

    /*  const tween = this.tweens.add({
      from: 0,
      to: 60,
      ease: "Linear",
      duration: 3000,
      yoyo: true,
      repeat: -1,
      flipX: true,
      onStart: () => {
        log.push("onStart");
      },
      onUpdate: (tween) => {
        const value = Math.round(tween.getValue());
        log.push("value: " + value);
        //score.setText(`Score: ${value}`);
      },
      onComplete: () => {
        log.push("onComplete");
      },
      onYoyo: () => {
        log.push("onYoyo");
      },
      onRepeat: () => {
        log.push("onRepeat");
      },
      onPause: () => {
        log.push("onPause");
      },
      onResume: () => {
        log.push("onResume");
      },
    }); */

    this.text1 = this.scene.add.text(this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 9, "Time:0");
    this.text1.setOrigin(0.5, 0.5);
    this.text1.setFontSize(350);

    this.currentScore = 0;
    this.newScore = 60;

    let updateTween = this.tweens.addCounter({
      from: this.currentScore,
      to: this.newScore,
      duration: 6000,
      ease: "linear",
      onUpdate: (tween) => {
        // const value = Math.round(tween.getValue());
        //this.text1.setText("Time:" + Math.round(tween.getValue()));
        //console.log("value: " + value);
      },
      onComplete: () => {
        //EventDispatcher.getInstance().emit(cons.END_GAME);
        //console.log("EndScene");
      },
    });

    this.timer = this.scene.time.addEvent({
      delay: 1000, // ms
      callback: this.updateTime,
      args: [],
      callbackScope: this.scene,
      loop: true,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false,
    });

    let gameTimer = this.scene.time.addEvent({
      delay: 60000, // ms
      callback: this.startGameEnd,
      args: [],
      callbackScope: this.scene,
      loop: false,
      repeat: 0,
      startAt: 0,
      timeScale: 1,
      paused: false,
    });

    Align.scaleToGameW(this.text1, 0.25, this.scene.sys.game.canvas);
  }

  resize() {
    if (this.scene != undefined) {
      this.x = this.scene.sys.game.canvas.width / 2;
      this.y = this.scene.sys.game.canvas.height / 1.1;
      Align.scaleToGameW(this.text1, 0.25, this.scene.sys.game.canvas);
    }
  }

  handleGameEnd() {
    this.scene.scale.off("resize", this.resize, this);
  }

  updateTime() {
    console.log("updateTime");
    console.log("updateTime" + this.scene.timer);
    //this.text1.setText("Time:" + this.timer.getProgress().toString());
  }

  startGameEnd() {
    console.log("startGameEnd");
  }
}
