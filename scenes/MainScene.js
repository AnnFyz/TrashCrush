const amountOfItems_plastic = 3;
let index = 0;
let plasticItemCollection = [];
const typeOfWaste = {
    Plastic: 'plastic',
    Paper: 'paper',
    Biowaste: 'biowaste',
    ResidualWaste: 'residualWaste',
    Glass: 'glass'
};


let currentItemsCollection = []; //current collection for current level
const itemCollections = [[]]; //all item collections

// in collection will be stored keys of images
function fillItemCollection(gameThis) {
    //let itemCollection = [];
    for (let i = 0; i < amountOfItems_plastic; i++) {
        let item = new Item({ scene: gameThis, x: game.config.width / 2, y: game.config.height / 2, key: typeOfWaste.Plastic + i, index: i });
        plasticItemCollection.push(item);
        //return itemCollection;
    }
}


function customFunc() {
    console.log("FUNC");
}



class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
    }
    preload() {
        this.load.image('waste', 'assets/images/Plastic/plastic2.png');
        for (let i = 0; i < amountOfItems_plastic; i++) {
            this.load.image(typeOfWaste.Plastic + i, 'assets/images/Plastic/' + typeOfWaste.Plastic + i + '.png');
        }

    }

    create() {
        this.emitter = EventDispatcher.getInstance();
        fillItemCollection(this);
        this.currentActiveItem = plasticItemCollection[0];
        Align.scaleToGameW(this.currentActiveItem, .25);
        this.currentActiveItem.activateItem();
        this.emitter.on('itemUpdated', this.updateItem);

    }


    updateItem() {
        if (index < plasticItemCollection.length - 1) {
            index++;
            this.currentActiveItem = plasticItemCollection[index];
            Align.scaleToGameW(this.currentActiveItem, .25);
            this.currentActiveItem.activateItem();
        }

        else {
            console.log('the end');
        }

    }

    update() {

    }

}