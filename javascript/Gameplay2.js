class Gameplay2 extends Phaser.Scene {
  constructor(){
    super({key:"Gameplay2"})
  }



create() {
  this.message = this.add.text(600, 400, "GAME OVER", { fontSize: '32px', fill: '#FFFFFF' });
}

}
