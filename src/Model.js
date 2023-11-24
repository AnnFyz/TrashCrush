const level = {
    PlasticLevel: 'plasticLevel',
    PaperLevel: 'paperLavel',
    BiowasteLevel: 'biowasteLevel',
    ResidualWasteLevel: 'residualWasteLevel',
    GlassLevel: 'glassLevel'
};
class Model {
  constructor() {
    this._score = 0;
    this._currentLevel = level.PlasticLevel;
    this.currentTypeOfWaste = typeOfWaste.Plastic;
  }

  set score(val) {
    this._score = val;
    EventDispatcher.getInstance().emit(cons.SCORE_UPDATED);
  }

  get score() {
    return this._score;
  }

  set currentLevel(level) {
    this._currentLevel = level;
    EventDispatcher.getInstance().emit(cons.LEVEL_UPDATED);
  }

  get currentLevel() {
    return this._currentLevel;
  }
}