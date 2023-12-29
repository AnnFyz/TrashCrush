const amountOfItems_plastic = 3;
const amountOfItems_biowaste = 3;
let plasticItemCollection = [];
let biowasteItemCollection = [];
let index = 0;
let amountOfCollections;


let currentItemsCollection = []; //current collection for current level
const itemCollections = []; //all item collections

// in collection will be stored items
function fillItemCollection(gameThis, amountOfItems, wasteType) {
  let itemCollection = [];
  for (let i = 0; i < amountOfItems; i++) {
    let item = new Item({
      scene: gameThis,
      x: gameThis.game.canvas.width / 2,
      y: gameThis.game.canvas.height / 2,
      key: wasteType + i,
      index: i,
      wasteType,
    });
    itemCollection.push(item);
  }
  return itemCollection;
}

function fillAllCollections(gameThis) {
  plasticItemCollection = fillItemCollection(gameThis, amountOfItems_plastic, typesOfWaste.Plastic).slice();
  biowasteItemCollection = fillItemCollection(gameThis, amountOfItems_biowaste, typesOfWaste.Biowaste).slice();
  itemCollections.push(plasticItemCollection);
  itemCollections.push(biowasteItemCollection);
  amountOfCollections = itemCollections.length;
}

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    this.currentActiveItem;
    this.gameFieldScene;
    this.sb;
  }
  preload() {
    for (let i = 0; i < amountOfItems_plastic; i++) {
      this.load.image(typesOfWaste.Plastic + i, "assets/images/Plastic/" + typesOfWaste.Plastic + i + ".png");
    }

    for (let i = 0; i < amountOfItems_biowaste; i++) {
      this.load.image(typesOfWaste.Biowaste + i, "assets/images/Biowaste/" + typesOfWaste.Biowaste + i + ".png");
    }

    this.gameFieldScene = this.scene.get("GameField");
  }

  create() {

    itemCollections.splice(0, itemCollections.length);
    currentItemsCollection = [];
    this.currentActiveItem = undefined;

    this.scale.on("resize", this.resize, this);
    this.emitter = EventDispatcher.getInstance();
    this.emitter.on(cons.END_GAME, this.handleGameEnd, this);
    fillAllCollections(this);
    this.updateCurrentCollection();
    this.activateItem();

    this.sb = new Scorebox({ scene: this });
    this.sb.x = this.sys.game.canvas.width / 2;
    this.sb.y = this.sys.game.canvas.height / 1.1;
    this.timedEvent = this.time.addEvent({ delay: 250, callback: this.checkOverlap, callbackScope: this, loop: true });
  }

  updateLevel() {
    if (itemCollections.length == 0) {
      this.emitter.emit(cons.UP_LEVELINDEX, model.levelIndex);
      fillAllCollections(this);
      this.updateCurrentCollection();
      this.activateItem();
    }
  }

  activateItem() {
    let tempItemCol = shuffle(currentItemsCollection);
    this.currentActiveItem = tempItemCol[0];
    Align.scaleToGameW(this.currentActiveItem, 0.25, this.sys.game.canvas);
    this.currentActiveItem.activateItem();
  }

  swipeRight() {
    this.removeShowedItem();
    this.updateCurrentCollection();

    if (this.checkItem()) {
      this.emitter.emit(cons.UP_POINTS, 1);
    } else {
      this.emitter.emit(cons.DOWN_POINTS, 1);
    }

    if (itemCollections.length == 0) {
      this.updateLevel();
      return;
    }

    this.activateItem();
  }

  swipeLeft() {
    this.removeShowedItem();
    this.updateCurrentCollection();

    if (!this.checkItem()) {
      this.emitter.emit(cons.UP_POINTS, 1);
    } else {
      this.emitter.emit(cons.DOWN_POINTS, 1);
    }

    if (itemCollections.length == 0) {
      this.updateLevel();
      return;
    }

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
    if (this.currentActiveItem === undefined) {
      return;
    }
    let boundsOfActiveItem = this.currentActiveItem.getBounds();
    let boundsOfBottomField = this.gameFieldScene.bottomField.getBounds();
    let boundsOfTopField = this.gameFieldScene.topField.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(boundsOfActiveItem, boundsOfBottomField)) {
      console.log("Overlap");
      this.emitter.emit(cons.ITEM_UPDATED);
      this.currentActiveItem.setPosition(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);
      this.timedEvent = this.time.delayedCall(50, this.swipeRight, [], this);
    } else if (Phaser.Geom.Intersects.RectangleToRectangle(boundsOfActiveItem, boundsOfTopField)) {
      console.log("Overlap");
      this.emitter.emit(cons.ITEM_UPDATED);
      this.timedEvent = this.time.delayedCall(50, this.swipeLeft, [], this);
    }
  }

  checkItem() {
    return this.currentActiveItem.wasteType === model.currentGameLevel.typeOfWaste;
  }

  resize(gameSize, baseSize, displaySize, resolution) {
    const cwidth = gameSize.width;
    const cheight = gameSize.height;

    this.cameras.resize(cwidth, cheight);
  }

  handleGameEnd(){
    this.emitter.off(cons.END_GAME, this.handleGameEnd, this);
    this.scale.off("resize", this.resize, this);
  }

}
 