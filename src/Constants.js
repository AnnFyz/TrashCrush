const typesOfWaste = {
  Plastic: "plastic",
  Paper: "paper",
  Biowaste: "biowaste",
  ResidualWaste: "residualWaste",
  Glass: "glass",
};

const levels = {
  PlasticLevel: "plasticLevel",
  PaperLevel: "paperLavel",
  BiowasteLevel: "biowasteLevel",
  ResidualWasteLevel: "residualWasteLevel",
  GlassLevel: "glassLevel",
};

class Constants {
  constructor() {
    this.SET_SCORE = "setScore";
    this.UP_POINTS = "upPoints";
    this.DOWN_POINTS = "downPoints";
    this.SCORE_UPDATED = "scoreUpdated";
    this.ITEM_UPDATED = "itemUpdated";
    this.LEVEL_UPDATED = "levelUpdated";
    this.SWIPE_RIGHT = "swipeRight";
    this.SWIPE_LEFT = "swipeLeft";
  }
}
