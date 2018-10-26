const width =screen.width;
const height = screen.height*.95;
const gravity = { y: 100 };



const rectX = 300
const rectY = height*.80
const rectWidth = 150
const rectHeight =  10
let circleArr = [];

let score = 0;
let scoreText="";
let usoHS = 0;
let usoHSText = "";
let newRecord = false;


let burnScore = 0;
let burnScoreText="";
let burnHS = 0;
let burnHSText = "";


let spaceScore = 0;
let spaceScoreText="";
let spaceHS = 0;
let spaceHSText = "";


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
  scene: [ IntroPage, Gameplay, Gameplay2, BurnItDown, Secretgame, SpaceJam ]

};


let game = new Phaser.Game(config);
