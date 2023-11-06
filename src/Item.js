class Item
{
 constructor(config)
{
super(config.scene, config.x, config.y, 'item');
config.scene.add.existing(this);

this.setInteractive();
this.on('pointerdown', this.clickMe, this)
}

clickMe()
{
 this
}
}