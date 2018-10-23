const width =screen.width;
const height = screen.height;
const gravity = { y: 100 }

const rectX = 300
const rectY = 433
const rectWidth = 150
const rectHeight =  10

let config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: gravity
    }
  },
  scene:{
    preload: preload,
    create: create
  },

};


let game = new Phaser.Game(config);

function preload ()
{

  // this.load.image('background', './mountains-tile.png');
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  // this.load.image('red', 'assets/particles/red.png');
  this.load.image('orb','./white.png');

}



function create (){
    let createObj = this;
    setInterval(() => (createOrb(this,Math.floor(Math.random()*5000),Math.floor(Math.random()*100))), 2000);
    drawLine(createObj, width/4, height, width/4, 0);
    drawLine(createObj, width/2, height, width/2, 0);
    drawLine(createObj, 3*width/4, height, 3*width/4, 0);
    //
    //
    // this.add.image(width/2, height/2, 'background');
    let rect = new Phaser.Geom.Rectangle(rectX, rectY, rectWidth, rectHeight);

    let graphics = this.add.graphics()
    graphics.lineStyle(2, 0xFF0000, 1.0);
    graphics.fillStyle(0xFFFFFF, 1.0);

    this.input.on('pointermove', function(pointer) {
      Phaser.Geom.Rectangle.CenterOn(rect, pointer.x, pointer.y);
      graphics.clear();
       graphics.fillRectShape(rect);
    });
    this.add.text(width/8, 6*height/8, 'A', { fontFamily: 'Lobster', fontSize: 64, color: '#00ff00' });
    this.add.text(3*width/8, 6*height/8, 'S', { fontFamily: 'Lobster', fontSize: 64, color: '#00ff00' });
    this.add.text(5*width/8, 6*height/8, 'D', { fontFamily: 'Lobster', fontSize: 64, color: '#00ff00' });
    this.add.text(7*width/8, 6*height/8, 'F', { fontFamily: 'Lobster', fontSize: 64, color: '#00ff00' });
}







function drawLine(create, startX,startY,endX,endY){
  let line = new Phaser.Geom.Line(startX, startY, endX, endY);
  let graphics = create.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });
  graphics.strokeLineShape(line);
}

function createOrb(createObj, xVel,yVel){
  let particles = createObj.add.particles('orb');
    let emitter = particles.createEmitter({
        speed: 100,
        scale: { start: .2, end: 0 },
        blendMode: 'ADD'
    });
    let circle = createObj.physics.add.image(width/2,height/4,"orb");
    // circle.setVelocity(100, 200);
    circle.setBounce(1);
    circle.setCollideWorldBounds(true);
    emitter.startFollow(circle);
    circle.setVelocity(xVel, yVel);
}
// function create ()
// {
//     var ball1 = this.physics.add.image(100, 240, 'wizball');
//     var ball2 = this.physics.add.image(700, 240, 'wizball');
//
//     ball1.setCircle(46);
//     ball2.setCircle(46);
//
//     ball1.setCollideWorldBounds(true);
//     ball2.setCollideWorldBounds(true);
//
//     ball1.setBounce(1);
//     ball2.setBounce(1);
//
//     ball1.setVelocity(150);
//     ball2.setVelocity(-200, 60);
//
//     this.physics.add.collider(ball1, ball2);
// }

  function update(){
    // graphics.clear();
    // graphics.strokeLineShape(line);
  }
