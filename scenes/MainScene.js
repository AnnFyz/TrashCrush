const amountOfItems_plastic = 3;
const amountOfItems_biowaste = 3;
let plasticItemCollection = [];
let biowasteItemCollection = [];
let index = 0;
let amountOfCollections;
const typeOfWaste = {
  Plastic: "plastic",
  Paper: "paper",
  Biowaste: "biowaste",
  ResidualWaste: "residualWaste",
  Glass: "glass",
};

let currentItemsCollection = []; //current collection for current level
const itemCollections = [[]]; //all item collections

// in collection will be stored items
function fillItemCollection(gameThis, amountOfItems, wasteType) {
  let itemCollection = [];
  for (let i = 0; i < amountOfItems; i++) {
    let item = new Item({
      scene: gameThis,
      x: game.config.width / 2,
      y: game.config.height / 2,
      key: wasteType + i,
      index: i,
      wasteType,
    });
    itemCollection.push(item);
  }
  return itemCollection;
}

function fillAllCollections(gameThis) {
  plasticItemCollection = fillItemCollection(gameThis, amountOfItems_plastic, typeOfWaste.Plastic).slice();
  biowasteItemCollection = fillItemCollection(gameThis, amountOfItems_biowaste, typeOfWaste.Biowaste).slice();
  itemCollections.push(plasticItemCollection);
  itemCollections.push(biowasteItemCollection);
  itemCollections.shift();
  amountOfCollections = itemCollections.length;
}

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.currentActiveItem;
    this.gameFieldScene;
  }
  preload() {
    for (let i = 0; i < amountOfItems_plastic; i++) {
      this.load.image(typeOfWaste.Plastic + i, "assets/images/Plastic/" + typeOfWaste.Plastic + i + ".png");
    }

    for (let i = 0; i < amountOfItems_biowaste; i++) {
      this.load.image(typeOfWaste.Biowaste + i, "assets/images/Biowaste/" + typeOfWaste.Biowaste + i + ".png");
    }

    this.gameTimer = this.scene.get("Gametimer");
    this.gameFieldScene = this.scene.get("GameField");

  }

  create() {
    this.scene.bringToTop("Gametimer");
    this.emitter = EventDispatcher.getInstance();

    this.sb = new Scorebox({ scene: this });
    this.sb.x = game.config.width / 2;
    this.sb.y = 45;
    fillAllCollections(this);
    this.updateCurrentCollection();
    this.activateItem();
    this.timedEvent = this.time.addEvent({ delay: 250, callback: this.checkOverlap, callbackScope: this, loop: true });
  }


  activateItem() {
    let tempItemCol = shuffle(currentItemsCollection);
    this.currentActiveItem = tempItemCol[0];
    Align.scaleToGameW(this.currentActiveItem, 0.25);
    this.currentActiveItem.activateItem();
  }

  updateItem() {
    this.removeShowedItem();
    this.updateCurrentCollection();
    this.activateItem();
  }

  updateCurrentCollection() {
    itemCollections.forEach((collection, index) => {
      if (collection.length == 0) {
        itemCollections.splice(index, 1);
      } else if (itemCollections.length == 1 && collection.length != 0) {
        currentItemsCollection = collection.slice();
        return;
      }
    });
    currentItemsCollection = shuffle(itemCollections);
    if (currentItemsCollection.length != 0) {
      currentItemsCollection = currentItemsCollection[0].slice();
    }
  }

  removeShowedItem() {
    if (itemCollections.length == 0) {
      return;
    }
    const result = {
      col: -1,
      row: -1,
    };

    itemCollections.forEach((row, index) => {
      const itemPosition = row.indexOf(this.currentActiveItem);
      if (itemPosition > -1) {
        result.row = index;
        result.col = itemPosition;
      }
    });
    itemCollections[result.row].splice(result.col, 1);
  }

  checkOverlap() {
    if(this.currentActiveItem === undefined){
      return;
    }
    let boundsOfActiveItem = this.currentActiveItem.getBounds();
    let boundsOfRightField = this.gameFieldScene.rightField.getBounds();
    let boundsOfLeftField = this.gameFieldScene.leftField.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(boundsOfActiveItem, boundsOfRightField)) {
      this.emitter.emit(cons.ITEM_UPDATED);
      this.timedEvent = this.time.delayedCall(50, this.updateItem, [], this);
    }
  }
}
