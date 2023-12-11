class Model {
  constructor() {
    gameLevels = {
      0: { name: levels.PlasticLevel, typeOfWaste: typesOfWaste.Plastic, fieldColor: 0xe1ba07 },
      1: { name: levels.BiowasteLevel, typeOfWaste: typesOfWaste.Biowaste, fieldColor: 0xe744200 },
    };

    this._score = 0;
    this._levelIndex = 0;
    this._currentGameLevel = gameLevels[this._levelIndex];
    console.log(this._currentGameLevel);
  }

  set score(val) {
    this._score = val;
    EventDispatcher.getInstance().emit(cons.SCORE_UPDATED);
  }

  get score() {
    return this._score;
  }

  set currentGameLevel(level) {
    if (this._levelIndex >= gameLevels.length) {
      console.log("no more levels");
      return;
    } else {
      this._currentGameLevel = level;
      EventDispatcher.getInstance().emit(cons.LEVEL_UPDATED);
      this.score = 0;
    }
  }

  get currentGameLevel() {
    return this._currentGameLevel;
  }

  set levelIndex(ind) {
    this._levelIndex = ind;
  }

  get levelIndex() {
    return this._levelIndex;
  }

  resetModel() {
    this._score = 0;
    this._levelIndex = 0;
    this._currentGameLevel = gameLevels[this._levelIndex];
    console.log("resetModel");
  }
}
