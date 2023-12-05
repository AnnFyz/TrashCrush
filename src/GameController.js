class GameController {
  constructor() {
    EventDispatcher.getInstance().on(cons.SET_SCORE, this.setScore);
    EventDispatcher.getInstance().on(cons.UP_POINTS, this.upPoints);
    EventDispatcher.getInstance().on(cons.DOWN_POINTS, this.downPoints);
    EventDispatcher.getInstance().on(cons.UP_LEVELINDEX, this.updateIndex);
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

  updateIndex(index) {
    console.log("index " + index);
    index++;
    if (index < Object.keys(gameLevels).length) {
      model.levelIndex = index;
      model.currentGameLevel = gameLevels[index];
    } else {
      EventDispatcher.getInstance().emit(cons.END_GAME);
      console.log("EndScene");
      return;
    }
  }
}
