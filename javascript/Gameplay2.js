class Gameplay2 extends Phaser.Scene {
  constructor(){
    super({key:"Gameplay2"})
  }


create() {
  this.message = this.add.text(600, 400, "GAME OVER", { fontSize: '32px', fill: '#FFFFFF' });
  this.choose = this.add.text(width/2, height/2, "Back to Home Page", { fontSize: '32px', fill: '#FFFFFF' });


  this.choose.setInteractive();

  this.choose.on('pointerdown', ()=> {
    // this.scene.switch("IntroPage")
    location.reload()

  })

}

}
