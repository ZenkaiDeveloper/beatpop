class IntroPage extends Phaser.Scene {
  constructor(){
    super({key:"IntroPage"})
  }

  preload(){
    this.load.audio('intro', '../assets/Taliyah.mp3')
    this.load.image('loading', "../assets/load.jpg")
  }



  create (){
    this.codes = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a"
    ];
    this.index =0;



    document.body.addEventListener("keydown",(event)=>{

      this.keyName = event.key;

      if( this.codes[this.index]=== this.keyName){
        this.index++;

        if (this.index === this.codes.length) {
          this.music.stop();
          this.scene.switch("Secretgame")
          this.index = 0;
        }

      }else{
        this.index = 0;
      }
    });





    this.background = this.add.image(width/2, height/2,"loading");
    this.background.setDisplaySize(width,height)
    this.music = this.game.sound.add('intro')
    this.music.play()
    this.usoMessage = this.add.text((4*width/8)-(150), height/7, "BeatPop", { fontSize: '70px', fill: '#a30843', backgroundColor:'#000' });
    this.usoSong = this.add.text(width/3, height/3, "Uso - Full Metal Alchemist", { fontSize: '42px', fill: '#eee', backgroundColor: "#000" });



    this.burnSong = this.add.text(width/3, (height/2)-(80), "Burn It Down - Linkin Park", { fontSize: '42px', fill: '#eee', backgroundColor: "#000" });

    this.spaceJam = this.add.text(width/3, (height/3)-(80), "Are you ready for this - Space Jam ", { fontSize: '42px', fill: '#eee', backgroundColor: "#000" });

    this.usoSong.setInteractive();
    this.burnSong.setInteractive();
    this.spaceJam.setInteractive();

    this.usoSong.on('pointerdown', ()=> {
      this.music.stop();
      this.scene.switch("Gameplay")
    })

    this.burnSong.on('pointerdown', ()=> {
      this.music.stop();
      this.scene.switch("BurnItDown")
    })

    this.spaceJam.on('pointerdown', ()=> {
      this.music.stop();
      this.scene.switch("SpaceJam")
    })



  }

  update(){



  }



}
