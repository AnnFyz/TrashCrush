class Model {
  constructor() {
    this._score = 0;
    this._currentGameLevel = { name: levels.PlasticLevel, typeOfWaste: typesOfWaste.Plastic };
  }

  set score(val) {
    this._score = val;
    EventDispatcher.getInstance().emit(cons.SCORE_UPDATED);
  }

  get score() {
    return this._score;
  }

  set currentLevel(level) {
    this._currentGameLevel = level;
    EventDispatcher.getInstance().emit(cons.LEVEL_UPDATED);
  }

  get currentLevel() {
    return this._currentGameLevel;
  }
}
