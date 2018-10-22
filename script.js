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


function create ()
{

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


  let particles = this.add.particles('orb');
  setInterval(()=>{
    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: .25, end: 0 },
      blendMode: 'ADD'
    });


    let circle = this.physics.add.image(400,140,"orb");
    // circle.setVelocity(100, 200);
    circle.setBounce(1);
    circle.setCollideWorldBounds(true);

    emitter.startFollow(circle);

    circle.setVelocity(300, 300);
  }, 1000)



  function update(){
    graphics.clear();
    graphics.strokeLineShape(line);
  }
}
