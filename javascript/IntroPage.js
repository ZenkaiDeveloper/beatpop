class IntroPage extends Phaser.Scene {
  constructor(){
    super({key:"IntroPage"})
  }

  preload(){
    this.load.audio('intro', '../assets/Taliyah.mp3')
    this.load.image('blue', "../assets/blue.png")
  }



  create (){
    this.background = this.add.image(width/2, height/2,"blue");
    this.music = this.game.sound.add('intro')
    this.music.play()
    this.message = this.add.text((width/2)-(150), height/7, "BeatPop", { fontSize: '70px', fill: '#a30843', backgroundColor:'#eee' });
    this.choose = this.add.text(width/3, height/3, "Uso-Full Metal Alchemist", { fontSize: '42px', fill: '#eee', backgroundColor: "#710c96" });


    this.choose.setInteractive();

    this.choose.on('pointerdown', ()=> {
      this.music.stop();
      this.scene.switch("Gameplay")
    })
  }
}
