class Item extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key, config.index, config.wasteType);
        this.index = config.index;
        this.wasteType = config.wasteType;
        this.deactivateItem();
        this.setInteractive();
        this.on('pointerdown', this.clickMe, this)
        config.scene.add.existing(this);
    }

    clickMe() {
        EventDispatcher.getInstance().emit(cons.ITEM_UPDATED);
        this.deactivateItem();

    }

    deactivateItem() {
        this.setActive(false).setVisible(false);
    }

    activateItem() {
        this.setActive(true).setVisible(true);
    }
}