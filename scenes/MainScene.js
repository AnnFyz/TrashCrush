const amountOfItems_plastic = 3;

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
function itemCollection(amountOfItems, typeOfWaste) {
    let itemCollection = []
    for (let i = 0; i < amountOfItems; i++) {
        newItem = new Item({ scene: this }, '${typeOfWaste}${i}');
        itemCollection.push(newItem);
    }
    return itemCollection;
}

class MainScene extends Phaser.Scene {

    constructor() {
        super('MainScene');
    }
    preload() {
        this.load.image('waste', 'assets/images/Plastic/plastic2.png');
        for (let i = 0; i < amountOfItems_plastic; i++) {
            this.load.image(typeOfWaste.Plastic + i, 'assets/images/Plastic/'+ typeOfWaste.Plastic + i +'.png');
        }

    }

    create() {
      let item = new Item({scene: this, x: game.config.width / 2, y: game.config.height / 2, key:typeOfWaste.Plastic + 0});
        //this.waste1 = this.add.image(game.config.width / 2, game.config.height / 2, typeOfWaste.Plastic + 0);

        /* for (let i = 0; i < amountOfItems_plastic; i++) {
            this.add.image(game.config.width / 2 + i*10, game.config.height / 2 + i*10, typeOfWaste.Plastic + i);
        } */


    }


    update() {

    }




}

