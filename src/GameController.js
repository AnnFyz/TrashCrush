class GameController {
  constructor() {
    EventDispatcher.getInstance().on(cons.SET_SCORE, this.setScore);
    EventDispatcher.getInstance().on(cons.UP_POINTS, this.upPoints);
    EventDispatcher.getInstance().on(cons.DOWN_POINTS, this.downPoints);
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
}
