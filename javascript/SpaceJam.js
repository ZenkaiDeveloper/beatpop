class SpaceJam extends Phaser.Scene {
  constructor(){
    super({key:"SpaceJam"})
  }

  // let spaceScore = 0;
  // let spaceScoreText="";
  // let spaceHS = 0;
  // let spaceHSText = "";

  /////////////////Custom Functions//////////////////////
  randomRange(num1,num2){
    return Phaser.Math.RND.integerInRange(num1, num2);
  }

  checkHScore(){
    if (spaceScore>spaceHS){
    newRecord = true;
    spaceHS = spaceScore;
    spaceHSText.setText = "High Score: " + spaceHS;
    localStorage.setItem('spacehscore', spaceHS);
  }else{
    newRecord = false;
  }
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
        spaceScore += 300;
        spaceScoreText.setText(`Score:  ${spaceScore}`);
        this.checkHScore();
        if (this.paddle.displayWidth < 2*width/3) {
          this.paddle.displayWidth += this.interval
        }

        circle.destroy();
        emitter.on = false;
        this.particles.destroy();
      }else if (letter === "s" && width/4 < circle.x && circle.x <= width/2 ) {
        spaceScore += 300;
        spaceScoreText.setText(`Score:  ${spaceScore}`);
        this.checkHScore();
        if (this.paddle.displayWidth < 2*width/3) {
          this.paddle.displayWidth += this.interval
        }

        circle.destroy();
        emitter.on = false;
        this.particles.destroy();
      }else if (letter === "d" && width/2 < circle.x && circle.x <= 3*width/4) {
        spaceScore += 300;
        spaceScoreText.setText(`Score:  ${spaceScore}`);
        this.checkHScore();
        if (this.paddle.displayWidth < 2*width/3) {
          this.paddle.displayWidth += this.interval
        }

        circle.destroy();
        emitter.on = false;
        this.particles.destroy();
      }else if(letter === "f" && 3*width/4 < circle.x && circle.x <= width){
        spaceScore += 300;
        spaceScoreText.setText(`Score:  ${spaceScore}`);
        this.checkHScore();
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
      speed: 100,
      scale: { start: .2, end: 0 },
      blendMode: 'ADD'
    });
    let circle = this.physics.add.image(width/2,height/4,"mainOrb");
    circle.setBounce(1);
    circle.setCollideWorldBounds(true);
    emitter.startFollow(circle);

    circle.setVelocity(xVel, yVel);
    circle.setDisplaySize(50,50);
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

  // massCreateOrbs(num,newArr){
  //
  // }




  manipulateCircleArr(){
    let reversed = circleArr.slice().reverse();
    let newArr = reversed.join(circleArr).split(",").filter(e=> Number(e)).map(e=>Number(e));
    this.playTime
    for (let num in newArr) {
        ((index,arr)=>{
          setTimeout(()=>{
            if (arr[Number(index+50)]%2===0) {
              let xEvenNum = arr[Number(index)]*(-3)-(100);
              let yEvenNum = arr[Number(index)+100]*(3)+(100);
              this.createOrb(xEvenNum,yEvenNum)
              }else{
              let xOddNum = arr[Number(index)]*(3)+(100);
              let yOddNum = arr[Number(index)+100]*(-3)-(100);
              this.createOrb(xOddNum,yOddNum)
            }
          }, num*(1600));

        })(num,newArr);
    }
  }


  /////////////////////LifeCycles//////////////////////////////////////////////////////////////

  preload(){
    this.load.image('mainOrb', "../assets/basketball.png")
    this.load.image('orb','../assets/red.png');
    this.load.image('horizontal', '../assets/redline.png')
    this.load.image("paddle", "../assets/bigIdea.png")
    this.load.image('fma2', "../assets/spacejamwall.jpg")
    this.load.audio('spacejamsong', '../assets/spacejamsong.mp3')
    this.spaceJam = new Music("../assets/spacejamsong.mp3")
    this.spaceJam.loadSong(this.spaceJam.filePath);
  }

  create(){

    this.keyup ="";
    this.isHit = false;
    this.background = this.add.image(width/2, height/2,"fma2");
    this.background.setDisplaySize(width, height)
    this.drawLine(width/4, height, width/4, 0);
    this.drawLine(width/2, height, width/2, 0);
    this.drawLine(3*width/4, height, 3*width/4, 0);
    this.loadPaddle();

    this.image = this.physics.add.image(width/2,height*.85,'horizontal')
    this.image.body.gravity.y = -100;
    this.image.body.immovable = true;
    this.image.setDisplaySize(width+20, 1);

    this.music = this.game.sound.add('spacejamsong')


    this.music.play()


    setTimeout(()=>{
      circleArr = this.spaceJam.show()
      this.manipulateCircleArr()
    },2000)



    // this.input.keyboard.on('keyup_Q',(event)=>{
    //   this.createOrb(this.randomRange(-400, 400), this.randomRange(-400,400))
    // });



    this.add.text(width/8, 6*height/7, 'A', { fontFamily: 'Arial', fontSize: 64, color: '#FF4500' });
    this.add.text(3*width/8, 6*height/7, 'S', { fontFamily: 'Arial', fontSize: 64, color: '#FF4500' });
    this.add.text(5*width/8, 6*height/7, 'D', { fontFamily: 'Arial', fontSize: 64, color: '#FF4500' });
    this.add.text(7*width/8, 6*height/7, 'F', { fontFamily: 'Arial', fontSize: 64, color: '#FF4500' });

    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    this.interval = width/40;



    this.keyboardCollide();


    spaceScoreText = this.add.text(16, 16,"Score:" + spaceScore, { fontSize: '32px', fill: '#FFFFFF' });



    if(localStorage.getItem('spacehscore')){
     spaceHS = localStorage.getItem('spacehscore');
    }
    spaceHSText = this.add.text(width*.75,15,"High Score: " + spaceHS, { fontSize: '32px', fill: '#FFFFFF' });





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
