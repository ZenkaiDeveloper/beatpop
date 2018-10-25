update(){


    this.moveBar();
    circleArr.forEach((circle)=> {
      this.physics.add.collider(circle,this.paddle,()=>{

        if (0 < circle.x && circle.x <= width/4 && this.key_a.isDown) {

          this.paddle.displayWidth += this.interval
          this.hitCircle()
          circle.destroy();
          this.particles.destroy();

        }else if ( width/4 < circle.x && circle.x <= width/2  && this.key_s.isDown) {
          // debugger
          this.paddle.displayWidth += this.interval

          this.hitCircle()
          circle.destroy();
          this.particles.destroy();
        }else if (width/2 < circle.x && circle.x <= 3*width/4 && this.key_d.isDown) {
          this.paddle.displayWidth += this.interval
          this.hitCircle()
          circle.destroy();
          this.particles.destroy();
        }else if(3*width/4 < circle.x && circle.x <= width && this.key_f.isDown){
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
