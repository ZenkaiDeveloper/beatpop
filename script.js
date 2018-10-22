const width =800;
const height = 600;
const gravity = { y: 200 }
const imageWidth = 400
const imageHeight = 300
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
  scene: {
    preload: preload,
    create: create
  }
};


let game = new Phaser.Game(config);

function preload ()
{
  // this.load.setBaseURL('http://labs.phaser.io');
  this.load.image('background', './mountains-tile.png');
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  // this.load.image('red', 'assets/particles/red.png');
  this.load.image('orb','./white.png');

}



function create (){
    this.add.image(400, 300, 'background');
    const create = this;
    setInterval(() => (createOrb(this)), 1000);
    drawLine(create, 200, 600, 200, 0);
    drawLine(create, 400, 600, 400, 0);
    drawLine(create, 600, 600, 600, 0);


    this.add.image(imageWidth, imageHeight, 'background');
    let createObj = this;

    let rect = new Phaser.Geom.Rectangle(rectX, rectY, rectWidth, rectHeight);

    let graphics = this.add.graphics()
    graphics.lineStyle(2, 0xFF0000, 1.0);
    graphics.fillStyle(0xFFFFFF, 1.0);

    this.input.on('pointermove', function(pointer) {
      Phaser.Geom.Rectangle.CenterOn(rect, pointer.x, pointer.y);
      graphics.clear();
       graphics.fillRectShape(rect);
    });
}

function drawLine(create, startX,startY,endX,endY){
  let line = new Phaser.Geom.Line(startX, startY, endX, endY);
  let graphics = create.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });
  graphics.strokeLineShape(line);
}

function createOrb(createObj){
  let particles = createObj.add.particles('orb');
    let emitter = particles.createEmitter({
        speed: 100,
        scale: { start: .25, end: 0 },
        blendMode: 'ADD'
    });
    let circle = createObj.physics.add.image(400,140,"orb");
    // circle.setVelocity(100, 200);
    circle.setBounce(1);
    circle.setCollideWorldBounds(true);

    emitter.startFollow(circle);

    circle.setVelocity(300, 300);
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
    graphics.clear();
    graphics.strokeLineShape(line);
  }
}
