class Secretgame extends Phaser.Scene {
  constructor(){
    super({key:"Secretgame"})
  }

  /////////////////Custom Functions//////////////////////
  randomRange(num1,num2){
    return Phaser.Math.RND.integerInRange(num1, num2);
  }

  drawLine (startX,startY,endX,endY) {
    let line = new Phaser.Geom.Line(startX, startY, endX, endY);
    let graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });
    graphics.strokeLineShape(line);
    return line;
  }

  loadPaddle(){
    this.paddle = this.physics.add.image(width/2,rectY,"paddle");
    this.paddle.body.gravity.y = -100;
    this.paddle.setBounce(0.2);
    this.paddle.setCollideWorldBounds(true);
    this.paddle.setDisplaySize(width/5, 15);
    // this.paddle.setSize(width/15, 15);
    this.paddle.body.immovable = true;
  }

  createOrb(xVel,yVel){
    let paddleCollide = (letter)=>{
      if (letter === "a" && 0 < circle.x && circle.x <= width/4) {
        if (this.paddle.displayWidth < 2*width/3) {
          this.paddle.displayWidth += this.interval
        }

        circle.destroy();
        emitter.on = false;
        this.particles.destroy();
      }else if (letter === "s" && width/4 < circle.x && circle.x <= width/2 ) {
        if (this.paddle.displayWidth < 2*width/3) {
          this.paddle.displayWidth += this.interval
        }

        circle.destroy();
        emitter.on = false;
        this.particles.destroy();
      }else if (letter === "d" && width/2 < circle.x && circle.x <= 3*width/4) {
        if (this.paddle.displayWidth < 2*width/3) {
          this.paddle.displayWidth += this.interval
        }

        circle.destroy();
        emitter.on = false;
        this.particles.destroy();
      }else if(letter === "f" && 3*width/4 < circle.x && circle.x <= width){
        if (this.paddle.displayWidth < 2*width/3) {
          this.paddle.displayWidth += this.interval
        }

        circle.destroy();
        emitter.on = false;
        this.particles.destroy();
      };
    }

    this.particles = this.add.particles('orb');
    let emitter = this.particles.createEmitter({
      speed: 5,
      scale: { start: .1, end: 0 },
      blendMode: ''
    });
    let circle = this.physics.add.image(width/2,height/4,"mainOrb");
    circle.setBounce(1);
    circle.setCollideWorldBounds(true);
    emitter.startFollow(circle);

    circle.setVelocity(xVel, yVel);
    circle.setDisplaySize(75,75);
    circle.setSize(100,200);
    this.physics.add.overlap(circle,this.paddle,()=>{
      if (this.isHit) {
        paddleCollide(this.keyup);
      }
    });
    this.physics.add.collider(circle, this.image,()=>{

      if (this.paddle.displayWidth >= 10) {
        this.paddle.displayWidth -= this.interval
        if (this.paddle.displayWidth <= 0){
          this.music.stop()
          this.scene.switch("Gameplay2")


        }
      }
      this.particles.destroy();
      emitter.on = false;
      circle.destroy();
    });



  }

  moveBar(){
    if (this.key_right.isDown) {
      this.paddle.x += 25

    }else if (this.key_left.isDown) {
      this.paddle.x -= 25
    }
  }


  keyboardCollide(){
    this.input.keyboard.on('keyup_A',(event)=>{
      this.isHit = true;
      this.keyup = "a";
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = "";
      }, 400)
    })

    this.input.keyboard.on('keyup_S',(event)=>{
      this.isHit = true
      this.keyup = "s"
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = ""

      }, 400)
    })
    this.input.keyboard.on('keyup_D',(event)=>{
      this.isHit = true;
      this.keyup = "d";
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = "";
      }, 400)
    })
    this.input.keyboard.on('keyup_F',(event)=>{
      this.isHit = true
      this.keyup = "f"
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = "";
      }, 400)
    })
  }

  massCreateOrbs(){
    setInterval(()=>{
      this.createOrb(this.randomRange(-400, 400), this.randomRange(-400,400))
    },100)
  }







  /////////////////////LifeCycles//////////////////////////////////////////////////////////////

  preload(){
    this.load.image('mainOrb', "../assets/group.png")
    this.load.image('orb','../assets/orb.png');
    this.load.image('horizontal', '../assets/redline.png')
    this.load.image("paddle", "../assets/bigIdea.png")
    this.load.image('fma2', "../assets/background.png")
    this.load.audio('music', '../assets/music.mp3')
    this.music = new Music("../assets/music.mp3")
    this.music.loadSong(this.music.filePath);
  }

  create(){











    this.keyup ="";
    this.isHit = false;
    this.background = this.add.image(width/2, height/2,"fma2");
    this.drawLine(width/4, height, width/4, 0);
    this.drawLine(width/2, height, width/2, 0);
    this.drawLine(3*width/4, height, 3*width/4, 0);
    this.loadPaddle();

    this.image = this.physics.add.image(width/2,height*.85,'horizontal')
    this.image.body.gravity.y = -100;
    this.image.body.immovable = true;
    this.image.setDisplaySize(width+20, 1);

    this.music = this.game.sound.add('music')


    this.music.play()



    setInterval(()=>{
      this.massCreateOrbs();
    },4000)


    // this.input.keyboard.on('keyup_Q',(event)=>{
    //   this.createOrb(this.randomRange(-400, 400), this.randomRange(-400,400))
    // });



    this.add.text(width/8, 6*height/7, 'A', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(3*width/8, 6*height/7, 'S', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(5*width/8, 6*height/7, 'D', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(7*width/8, 6*height/7, 'F', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    this.interval = width/40;



    this.keyboardCollide();




  }




  update(){

    this.playTime = this.music.muteNode.context.currentTime;
    this.moveBar();


    if ( this.music.isPlaying === false) {
      this.music.stop()
      this.scene.switch("Gameplay2")
    }

    // if (this.paddle.displayWidth === 0) {
    //   alert('GAME OVER')
    //   // game.scene.stop()
    //   // this.sys.game.destroy(true);
    //
    // }





  }





}
