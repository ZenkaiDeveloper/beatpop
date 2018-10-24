const width =screen.width;
const height = screen.height*.95;
const gravity = { y: 100 };


const rectX = 300
const rectY = height*.80
const rectWidth = 150
const rectHeight =  10
let platforms;
let circle;
let score = 0;
let scoreText;


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
  scene: [ Gameplay ]

};


let game = new Phaser.Game(config);
