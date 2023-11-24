//
//  Gametimer
//  Ring Animation from https://github.com/maryamBaratii/Phaser3-Countdown-Clock
//

class Gametimer extends Phaser.Scene {
  constructor() {
    super("Gametimer");
  }

  init() {
    log("=> launching Gametimer manager");
    this.gTimer;
    this.runTime;
    this.timeRunning = false;
  }

  newTimer(scene, { posX = 100, posY = 100, callback = "", secondsCB = "", gameTime = 15, delay = 500, countdown = false }) {
    if (this.timeRunning) {
      log("WARNING : a game timer is already running!");
      return;
    }

    this.timerGroup = scene.add.group();

    // this.blackLayer = this.add.sprite(posX, posY, "black-layer");
    // this.redLayer = this.add.sprite(posX, posY, "red-layer");
    //this.blackLayer.setShadow(4, 4, '#000000', 4, false, true);

    this.shape = this.make.graphics();
    this.shape.fillStyle(0xffffff);
    /* this.shape.slice(
      this.redLayer.x,
      this.redLayer.y,
      this.redLayer.displayWidth / 2,
      Phaser.Math.DegToRad(270),
      Phaser.Math.DegToRad(0),
      true
    ); */
    this.shape.fillPath();

    this.mask = this.shape.createGeometryMask();
    //this.redLayer.setMask(this.mask);

    /* this.redLayer.setScale(1.8);
    this.redLayer.setDepth(10);

    this.blackLayer.setScale(1.8);
    this.blackLayer.setDepth(10); */

    log("new timer: ", gameTime);
    var parent = this;
    this.callback = callback;
    this.callbackPerSecond = secondsCB;
    this.scene = scene;
    this.countdown = countdown;
    this.gameTime = this.countdown ? gameTime : 0;
    this.centerX = posX;
    this.runTime = gameTime;

    //this.timerBg = this.add.sprite(posX, posY, "timerBg");
    //this.timerBg.setScale(1.2);
    //this.timerBg.setDepth(9);

    this.timerDisplay = this.add.text(posX, posY, this.countdown ? this.gameTime : 0, {
      fontFamily: "Font",
      color: "#FFF",
      fontSize: "140px",
      align: "center",
    });

    //this.timerDisplay.setStroke('#000',7);
    //this.timerDisplay.setShadow(4, 4, '#000000', 4, false, true);
    this.timerDisplay.setOrigin(0.5);
    this.timerDisplay.setDepth(10);

    //this.timerGroup.addMultiple([this.timerBg, this.blackLayer, this.redLayer, this.timerDisplay]);

    this.timerDisplay.alpha = 0;
    var tTween = scene.tweens.add({
      targets: [this.timerDisplay],
      alpha: 1,
      ease: "Back.Out", // 'Cubic', Cubic.InOut , 'Elastic', 'Bounce', 'Back'
      duration: delay / 2,
      delay: delay / 2,
      onComplete: () => {
        this.setIntervalX(
          () => {
            this.hideAndDestroy(this);
          },
          1000,
          gameTime
        );
      },
    });
  }

  update() {}

  resetTimer() {
    log("reset game timer to -> ", this.gameTime);
    if (this.gTimer != undefined) window.clearInterval(this.gTimer);
    this.setIntervalX(
      () => {
        this.hideAndDestroy(this);
      },
      1000,
      this.gameTime
    );
  }

  stopTimer(doCallback = true) {
    if (this.gTimer != undefined) {
      log("STOP TIMER!");
      window.clearInterval(this.gTimer);
      this.gTimer = null;
      this.hideAndDestroy(this, doCallback);
    }
  }

  setIntervalX(sCallback, delay, repetitions) {
    var x = 0;
    this.timeRunning = true;
    log("NEW TIMER: ", sCallback, delay, repetitions);
    this.gTimer = window.setInterval(
      function () {
        if (++x > repetitions && this.countdown) {
          this.stopTimer(false);
          sCallback();
        } else {
        }
        if (this.callbackPerSecond != "") this.callbackPerSecond();
        if (this.timerDisplay != null && this.timerDisplay.visible) {
          if (this.countdown && repetitions - x >= 0) {
            this.timerDisplay.text = repetitions - x;
            this.runTime = repetitions - x;
          } else {
            //Lock timer at 0 if time runs out
            this.timerDisplay.text = 0;
            this.runTime = 0;
          }
        }
      }.bind(this),
      delay
    );
  }

  startAnim(seconds) {
    this.seconds = seconds;
    this.counter = this.scene.tweens.addCounter({
      from: 0,
      to: 359,
      duration: this.seconds * 1000,
      onUpdate: (tween) => {
        let t = tween.getValue();
        this.shape.clear();
        this.shape.slice(
          this.redLayer.x,
          this.redLayer.y,
          this.redLayer.displayWidth / 2,
          Phaser.Math.DegToRad(270),
          Phaser.Math.DegToRad(270 + t),
          true
        );
        this.shape.fillPath();
      },
    });
  }

  hideAndDestroy(scene, doCallback = true) {
    var parent = scene;
    this.timeRunning = false;
    if (this.scene.tweens) {
      var boxTween = this.scene.tweens.add({
        targets: [this.timerDisplay, this.timerBg, this.blackLayer, this.redLayer],
        alpha: 0,
        ease: "Back.In",
        duration: 250,
        delay: 10,
        onComplete: () => {
          if (parent.callback != "" && doCallback) {
            log("Timer callback: ", parent.callback);
            this.shape.clear();
            this.blackLayer.setVisible(false);
            parent.callback();
          }
          parent.destroyMe();
        },
      });
    }
  }

  reportRuntime() {
    let rt = null;
    if (this.runTime) {
      rt = this.runTime;
    }
    return rt;
  }

  destroyMe() {
    this.timerDisplay.destroy();
  }
}
