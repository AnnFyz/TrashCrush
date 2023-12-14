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

    const tween = this.tweens.add({
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
    });
  }
}
