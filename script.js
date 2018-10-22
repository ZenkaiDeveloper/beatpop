var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};


var game = new Phaser.Game(config);

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

    this.add.image(400, 300, 'background');
    let createObj = this;


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


    // var logo = this.physics.add.image(400, 100, 'logo');




    //
    // logo.setBody({
    //   type: 'circle',
    //   radius: 20
    // });


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

  }
