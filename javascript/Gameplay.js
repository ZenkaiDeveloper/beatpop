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
    circle = this.physics.add.image(width/2,height/4,"orb");
    circle.setBounce(1);
    circle.setCollideWorldBounds(true);
    emitter.startFollow(circle);
    circle.setVelocity(xVel, yVel);
    circleArr.push(circle)
  }



  loadPaddle(){
    this.paddle = this.physics.add.image(width/2,rectY,"paddle");

    this.paddle.body.gravity.y = -100;
    this.paddle.setBounce(0.2);
    this.paddle.setCollideWorldBounds(true);
    this.paddle.setDisplaySize(width/20, 15)
    this.paddle.body.immovable = true;
  }

  hitCircle ()
  {
    score += 10;
    scoreText.setText('Score: ' + score);
  }

  moveBar(){
    if (this.key_right.isDown) {
      this.paddle.body.velocity.x += 50

    }else if (this.key_left.isDown) {
      this.paddle.body.velocity.x -= 50
    }

  }



  /////////////////////LifeCycles//////////////////////////////////////////////////////////////

  preload(){
    this.load.image('orb','../assets/white.png');
    this.load.image('horizontal', '../assets/redline.png')
    this.load.image("paddle", "../assets/bigIdea.png")
  }

  create(){

    this.drawLine(width/4, height, width/4, 0);
    this.drawLine(width/2, height, width/2, 0);
    this.drawLine(3*width/4, height, 3*width/4, 0);

    setInterval(() => {
      this.createOrb(this.randomRange(-300, 300), this.randomRange(-300,300))
    }, this.randomRange(2000, 4000))

    this.image = this.physics.add.image(width/2,height*.85,'horizontal')
    this.image.body.gravity.y = -100;
    this.image.body.immovable = true;
    this.image.setDisplaySize(width+20, 1);
    scoreText = this.add.text(width*.85, 25, 'score: 0', { fontSize: '32px', fill: '#00ff00' });
    this.loadPaddle()


    this.add.text(width/8, 6*height/7, 'A', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(3*width/8, 6*height/7, 'S', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(5*width/8, 6*height/7, 'D', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(7*width/8, 6*height/7, 'F', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.key_a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_f = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.delta = this.paddle.displayWidth - this.interval;
    this.interval = width/50;
  }



  update(){


    this.moveBar();
    circleArr.forEach((circle)=> {
      this.physics.add.collider(circle,this.paddle,()=>{

        if (0 < circle.x && circle.x <= width/4 && this.key_a.isUp) {
          debugger
          this.paddle.displayWidth += this.interval
          this.hitCircle()
          circle.destroy();
          this.particles.destroy();

        }else if ( width/4 < circle.x && circle.x <= width/2  && this.key_s.isUp) {
          // debugger
          this.paddle.displayWidth += this.interval

          this.hitCircle()
          circle.destroy();
          this.particles.destroy();
        }else if (width/2 < circle.x && circle.x <= 3*width/4 && this.key_d.isUp) {
          this.paddle.displayWidth += this.interval
          this.hitCircle()
          circle.destroy();
          this.particles.destroy();
        }else if(3*width/4 < circle.x && circle.x <= width && this.key_f.isUp){
          this.paddle.displayWidth += this.interval
          this.hitCircle()
          circle.destroy();
          this.particles.destroy();
        }
        console.log(score);
      })
    })



    // this.physics.add.collider(circle, this.image,()=>{
    //   this.paddle.displayWidth -= this.interval
    //   circle.destroy();
    //   this.particles.destroy();
    // })
    //
    //
    // this.physics.add.collider(circle, this.image,console.log)

}




}
