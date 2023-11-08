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
let currentActiveItem;
let itemCollections = [[]]; //all item collections
let levelItemCollections = [[]]; //all item collections which will be used in the level

// in collection will be stored items 
function fillItemCollection(gameThis, amountOfItems, wasteType) {
    let itemCollection = [];
    for (let i = 0; i < amountOfItems; i++) {
        let item = new Item({ scene: gameThis, x: game.config.width / 2, y: game.config.height / 2, key: wasteType + i, index: i, wasteType });
        itemCollection.push(item);
    }
    return itemCollection;

}

function fillAllItemCollections(gameThis) {
    plasticItemCollection = fillItemCollection(gameThis, amountOfItems_plastic, typeOfWaste.Plastic).slice();
    biowasteItemCollection = fillItemCollection(gameThis, amountOfItems_biowaste, typeOfWaste.Biowaste).slice();
    itemCollections.push(plasticItemCollection);
    itemCollections.push(biowasteItemCollection);
    itemCollections.shift();
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
        fillAllItemCollections(this);

        for (var i = 0; i < itemCollections.length; i++) {
            levelItemCollections.push(itemCollections[i]);
        }

        this.selectRandomItem();
        this.activateFirstItem();
        this.emitter.on(cons.ITEM_UPDATED, this.updateItem);

    }

    update() {

    }
    selectRandomItem() {
        let firstRandIndex = Math.floor(Math.random() * levelItemCollections.length);
        let secondRandIndex = Math.floor(Math.random() * levelItemCollections[firstRandIndex].length);
        currentActiveItem = levelItemCollections[firstRandIndex][secondRandIndex];
        levelItemCollections.splice([firstRandIndex][secondRandIndex], 1);
        Align.scaleToGameW(currentActiveItem, .25);
        currentActiveItem.activateItem();


    }

    activateFirstItem() {
        //currentActiveItem = currentItemsCollection[0];
        Align.scaleToGameW(currentActiveItem, .25);
        currentActiveItem.activateItem();
    }
    updateItem() {
        /*  if (index < currentItemsCollection.length - 1) {
             index++;
             currentActiveItem = currentItemsCollection[index];
             Align.scaleToGameW(currentActiveItem, .25);
             currentActiveItem.activateItem();
         }
 
         else {
             console.log('the end');
         } */
        let firstRandIndex = Math.floor(Math.random() * levelItemCollections.length);
        if (levelItemCollections[firstRandIndex].length >= 0) {
            let secondRandIndex = Math.floor(Math.random() * levelItemCollections[firstRandIndex].length);
            currentActiveItem = levelItemCollections[firstRandIndex][secondRandIndex];
            levelItemCollections.splice([firstRandIndex][secondRandIndex], 1);
        }
        else {
            levelItemCollections.splice(firstRandIndex, 1);
            console.log("array is empty")
            let firstRandIndex = Math.floor(Math.random() * levelItemCollections.length);

        }

        Align.scaleToGameW(currentActiveItem, .25);
        currentActiveItem.activateItem();

    }


}