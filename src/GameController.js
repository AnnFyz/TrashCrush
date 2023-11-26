class GameController {
  constructor() {
    EventDispatcher.getInstance().on(cons.SET_SCORE, this.setScore);
    EventDispatcher.getInstance().on(cons.UP_POINTS, this.upPoints);
    EventDispatcher.getInstance().on(cons.DOWN_POINTS, this.downPoints);
    EventDispatcher.getInstance().on(cons.LEVEL_UPDATED, this.updateLevel);
  }

  setScore(score) {
    model.score = score;
  }

  upPoints(points) {
    let score = model.score;
    score += points;
    model.score = score;
  }

  downPoints(points) {
    let score = model.score;
    score -= points;
    model.score = score;
  }

  updateLevel(index) {

      console.log("levelIndex " + index);
      model.currentGameLevel = gameLevels[index];
      EventDispatcher.getInstance().off(cons.LEVEL_UPDATED, this.updateLevel);
   /*  }
    else{
      console.log("THE END");
    } */
  }
}
