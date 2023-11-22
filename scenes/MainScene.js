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
  }

  create() {
    this.gameFieldScene = this.scene.get("GameField");
    this.emitter = EventDispatcher.getInstance();
    this.sb = new Scorebox({ scene: this });
    this.sb.x = game.config.width / 2;
    this.sb.y = 45;
    fillAllCollections(this);
    this.updateCurrentCollection();
    for (let i = 0; i < currentItemsCollection.length; i++) {
      console.log("currentItemsCollection[0][0].wasteType " + currentItemsCollection[0].wasteType);
    }
    this.activateItem();
    this.emitter.on(cons.ITEM_UPDATED, this.updateItem.bind(this));
    /*     this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    }); */
  }

  update() {
    this.checkOverlap();
    //console.log("this.checkOverlap(); " + this.checkOverlap());
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
        console.log("col was removed");
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

    console.log("ItemPos: " + result.col, ", " + result.row);
    itemCollections[result.row].splice(result.col, 1);
  }

  checkOverlap() {
    let boundsOfActiveItem = this.currentActiveItem.getBounds();
    let boundsOfRightField = this.gameFieldScene.rightField.getBounds();
    let boundsOfLeftField = this.gameFieldScene.leftField.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(boundsOfActiveItem, boundsOfRightField)) {
      this.emitter.emit(cons.ITEM_UPDATED);
      console.log("UPDATE ITEM");
    }
  }
}
