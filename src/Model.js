const level = {
    PlasticLevel: 'plasticLevel',
    PaperLevel: 'paperLavel',
    BiowasteLevel: 'biowasteLevel',
    ResidualWasteLevel: 'residualWasteLevel',
    GlassLevel: 'glassLevel'
};
class Model {
    constructor() {
        this.score = 0;
        this.currentLevel = level.PlasticLevel;
        this.currentTypeOfWaste = typeOfWaste.Plastic;
    }

    set score(val) {
        this.score = val;
        EventDispatcher.getInstance().emit(cons.SCORE_UPDATED);
    }

    get score() {
        return this.score;
    }

    set currentLevel(level) {
        this.currentLevel = level;
        EventDispatcher.getInstance().emit(cons.LEVEL_UPDATED);
    }

    get currentLevel() {
        return this.currentLevel;

    }
}