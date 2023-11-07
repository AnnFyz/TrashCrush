class Item extends Phaser.GameObjects.Sprite
{
 constructor(config)
{
super(config.scene, config.x, config.y, config.key);
config.scene.add.existing(this);

this.setInteractive();
this.on('pointerdown', this.clickMe, this)
}

clickMe()
{

 console.log('was clicked');
}
}