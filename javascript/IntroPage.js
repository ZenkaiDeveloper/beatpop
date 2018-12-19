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


    this.usoMessage = this.add.text((4*width/8)-(150),height/7 , "BeatPop", { fontSize: '70px', fill: '#a30843', backgroundColor:'#000' });
    this.usoSong = this.add.text(width/3, (height/3)-(80), "Uso - Full Metal Alchemist", { fontSize: '42px', fill: '#eee', backgroundColor: "#000" });



    this.burnSong = this.add.text(width/3,height/3 , "Burn It Down - Linkin Park", { fontSize: '42px', fill: '#eee', backgroundColor: "#000" });

    this.spaceJam = this.add.text(width/3,(height/2)-(80) , "Are you ready for this - Space Jam ", { fontSize: '42px', fill: '#eee', backgroundColor: "#000" });


    this.instructions = this.add.text((width/8)-(150),height/2 , "Instructions", { fontSize: '23px', fill: '#50f70e', backgroundColor:'#000' });
    this.instructions = this.add.text((width/8)-(150),height/2 , "Two conditions must be met to score", { fontSize: '30px', fill: '#50f70e', backgroundColor:'#000' });
    this.instructionsOne = this.add.text((width/8)-(150), height/1.7 , "One: In order to score the paddle and a particle must collide", { fontSize: '23px', fill: '#50f70e', backgroundColor:'#000' });
    this.instructionsOne = this.add.text((width/8)-(150), height/1.6 , "Two: You must press the corresponding letter indicated at the bottom of the screen on collision.", { fontSize: '23px', fill: '#50f70e', backgroundColor:'#000' });
    this.instructionsOne = this.add.text((width/8)-(150), height/1.5 , "If you score the paddle grows in size, otherwise the particle falls through the screen and the paddle shrinks", { fontSize: '23px', fill: '#50f70e', backgroundColor:'#000' });
    this.instructionsOne = this.add.text((width/8)-(150), height/1.4 , "If the paddle gets too small and dissappears, the game is over.", { fontSize: '23px', fill: '#50f70e', backgroundColor:'#000' });
    this.instructionsOne = this.add.text((width/8)-(150), height/1.4 , "Good Luck and feel free to clone down to add your own songs :) ", { fontSize: '23px', fill: '#50f70e', backgroundColor:'#000' });

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
