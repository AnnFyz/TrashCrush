const amountOfItems_plastic = 3;
const amountOfItems_biowaste = 3;
let plasticItemCollection = [];
let biowasteItemCollection = [];
let index = 0;
const typeOfWaste = {
    Plastic: 'plastic',
    Paper: 'paper',
    Biowaste: 'biowaste',
    ResidualWaste: 'residualWaste',
    Glass: 'glass'
};


let currentItemsCollection = []; //current collection for current level
const itemCollections = [[]]; //all item collections

// in collection will be stored items 
function fillItemCollection(gameThis, amountOfItems, wasteType) {
    let itemCollection = [];
    for (let i = 0; i < amountOfItems; i++) {
        let item = new Item({ scene: gameThis, x: game.config.width / 2, y: game.config.height / 2, key: wasteType + i, index: i, wasteType });
        itemCollection.push(item);
    }
    return itemCollection;

}

function fillAllCollections(gameThis) {
    plasticItemCollection = fillItemCollection(gameThis, amountOfItems_plastic, typeOfWaste.Plastic).slice();
    biowasteItemCollection = fillItemCollection(gameThis, amountOfItems_biowaste, typeOfWaste.Biowaste).slice();
    itemCollections.push(plasticItemCollection);
    itemCollections.push(biowasteItemCollection);
}

class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
    }
    preload() {
        for (let i = 0; i < amountOfItems_plastic; i++) {
            this.load.image(typeOfWaste.Plastic + i, 'assets/images/Plastic/' + typeOfWaste.Plastic + i + '.png');
        }

        for (let i = 0; i < amountOfItems_biowaste; i++) {
            this.load.image(typeOfWaste.Biowaste + i, 'assets/images/Biowaste/' + typeOfWaste.Biowaste + i + '.png');
        }
    }

    create() {
        this.emitter = EventDispatcher.getInstance();
        fillAllCollections(this);
        currentItemsCollection = biowasteItemCollection.slice();
        this.activateFirstItem();
        this.emitter.on(cons.ITEM_UPDATED, this.updateItem);

    }

    update() {

    }

    activateFirstItem() {
        this.currentActiveItem = currentItemsCollection[0];
        Align.scaleToGameW(this.currentActiveItem, .25);
        this.currentActiveItem.activateItem();
    }
    updateItem() {
        if (index < currentItemsCollection.length - 1) {
            index++;
            this.currentActiveItem = currentItemsCollection[index];
            Align.scaleToGameW(this.currentActiveItem, .25);
            this.currentActiveItem.activateItem();
        }

        else {
            console.log('the end');
        }

    }


}