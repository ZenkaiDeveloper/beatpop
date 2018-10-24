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
  }
  loadAndMakeBar(rectangle){
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(2, 0xFF0000, 1.0);
    this.graphics.fillStyle(0xFFFFFF, 1.0);
    this.graphics.fillRectShape(rectangle);
  }
/////////////////////LifeCycles//////////////////////////////////////////////////////////////

  preload(){
    this.load.image('orb','../assets/white.png');
    this.load.image('horizontal', '../assets/lines-vector-red-1.gif')
  }

  create(){
    this.drawLine(width/4, height, width/4, 0);
    this.drawLine(width/2, height, width/2, 0);
    this.drawLine(3*width/4, height, 3*width/4, 0);


    this.image = this.physics.add.staticImage(width/2,height*.85,'horizontal')
    this.image.setDisplaySize(width, 250);
    this.createOrb(300,400)


    this.physics.add.collider(circle,this.image,(e)=>{
      console.log(e)
    })


    this.rect = new Phaser.Geom.Rectangle(rectX, rectY, rectWidth, rectHeight);
    this.loadAndMakeBar(this.rect);

    this.add.text(width/8, 6*height/7, 'A', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(3*width/8, 6*height/7, 'S', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(5*width/8, 6*height/7, 'D', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    this.add.text(7*width/8, 6*height/7, 'F', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });

    this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);


  }


  update(){
    if (this.key_right.isDown) {
      this.graphics.clear();
      if (this.rect.x <= width-rectWidth) {
        this.rect.centerX+=50
      }
      this.graphics.fillRectShape(this.rect);
    }else if (this.key_left.isDown) {
      this.graphics.clear();
      if (this.rect.x >= 0) {
        this.rect.centerX-=50
      }
      this.graphics.fillRectShape(this.rect);
    }
    // if (circle) {
    //   if (circle.y > height*.85) {
    //     circle.destroy();
    //     this.particles.destroy()
    //   }
    //
    // }
    // console.log(circle.body.y)


  }





}
