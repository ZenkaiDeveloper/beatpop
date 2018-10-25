class Gameplay extends Phaser.Scene {
  constructor(){
    super({key:"Gameplay"})
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

  createOrb(xVel,yVel){
    this.particles = this.add.particles('orb');
      let emitter = this.particles.createEmitter({
          speed: 100,
          scale: { start: .2, end: 0 },
          blendMode: 'ADD'
      });
      circle = this.physics.add.image(width/2,height/4,"mainOrb");
      circle.setBounce(1);
      circle.setCollideWorldBounds(true);
      emitter.startFollow(circle);
      circle.setVelocity(xVel, yVel);
      circle.setDisplaySize(150,150);
      circle.setSize(100,450);
  }

  loadPaddle(){
    this.paddle = this.physics.add.image(width/2,rectY,"paddle");
    this.paddle.body.gravity.y = -100;
    this.paddle.setBounce(0.2);
    this.paddle.setCollideWorldBounds(true);
    this.paddle.setDisplaySize(width/20, 15);
    this.paddle.setSize(width/5, 15);
    this.paddle.body.immovable = true;
  }

  moveBar(){
    if (this.key_right.isDown) {
      this.paddle.x += 30

    }else if (this.key_left.isDown) {
      this.paddle.x -= 30
    }
  }

  paddleCollide(letter){
      if (letter === "a" && 0 < circle.x && circle.x <= width/4) {
        this.paddle.displayWidth += this.interval
        score++;
        circle.destroy();
        this.particles.destroy();
      }else if (letter === "s" && width/4 < circle.x && circle.x <= width/2 ) {
        this.paddle.displayWidth += this.interval
        score++;
        circle.destroy();
        this.particles.destroy();
      }else if (letter === "d" && width/2 < circle.x && circle.x <= 3*width/4) {
        this.paddle.displayWidth += this.interval
        score++;
        circle.destroy();
        this.particles.destroy();
      }else if(letter === "f" && 3*width/4 < circle.x && circle.x <= width){
        this.paddle.displayWidth += this.interval
        score++;
        circle.destroy();
        this.particles.destroy();
      };
  }

  keyboardCollide(){
    this.input.keyboard.on('keyup_A',(event)=>{
      this.isHit = true;
      this.keyup = "a";
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = "";
      }, 100)
    })

    this.input.keyboard.on('keyup_S',(event)=>{
      this.isHit = true
      this.keyup = "s"
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = ""

      }, 100)
    })
    this.input.keyboard.on('keyup_D',(event)=>{
      this.isHit = true;
      this.keyup = "d";
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = "";
      }, 100)
    })
    this.input.keyboard.on('keyup_F',(event)=>{
      this.isHit = true
      this.keyup = "f"
      setTimeout(()=>{
        this.isHit = false;
        this.keyup = "";
      }, 100)
    })
  }



/////////////////////LifeCycles//////////////////////////////////////////////////////////////

  preload(){
    this.load.image('mainOrb', "../assets/UIHere.png")
    this.load.image('orb','../assets/white.png');
    this.load.image('horizontal', '../assets/redline.png')
    this.load.image("paddle", "../assets/bigIdea.png")
    this.load.image('fma2', "../assets/FMA2.jpg")
  }

  create(){
    this.keyup ="";
    this.isHit = false;
    this.background = this.add.image(width/2, height/2,"fma2");
    this.drawLine(width/4, height, width/4, 0);
    this.drawLine(width/2, height, width/2, 0);
    this.drawLine(3*width/4, height, 3*width/4, 0);
    this.createOrb(300,400);
    this.loadPaddle();

    this.physics.add.collider(circle,this.paddle,()=>{
      if (this.isHit) {
        this.paddleCollide(this.keyup);
      }
    });

    this.image = this.physics.add.image(width/2,height*.85,'horizontal')
    this.image.body.gravity.y = -100;
    this.image.body.immovable = true;
    this.image.setDisplaySize(width+20, 1);

    this.add.text(width/8, 6*height/7, 'A', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(3*width/8, 6*height/7, 'S', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(5*width/8, 6*height/7, 'D', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(7*width/8, 6*height/7, 'F', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    this.interval = width/50;


    this.keyboardCollide();

  }



  update(){

    this.moveBar();

    this.physics.add.collider(circle, this.image,()=>{
      this.paddle.displayWidth -= this.interval
      circle.destroy();
      this.particles.destroy();
    })



  }





}
