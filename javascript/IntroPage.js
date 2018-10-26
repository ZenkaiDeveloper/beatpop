class IntroPage extends Phaser.Scene {
  constructor(){
    super({key:"IntroPage"})
  }

  preload(){
    this.load.audio('intro', '../assets/intro.mp3')
    this.load.image('blue', "../assets/blue.png")
  }



  create (){
    this.background = this.add.image(width/2, height/2,"blue");
    this.music = this.game.sound.add('intro')
    this.music.play()
    this.message = this.add.text(600, 400, "Hello to Beatpop choose a song", { fontSize: '32px', fill: '#FFFFFF' });
    this.choose = this.add.text(width/2, height/2, "Uso", { fontSize: '32px', fill: '#FFFFFF' });


    this.choose.setInteractive();

    this.choose.on('pointerdown', ()=> {
      let gameplay = this.scene.get('Gameplay')
      this.music.stop();
      this.scene.switch("Gameplay")
    })
  }
}
