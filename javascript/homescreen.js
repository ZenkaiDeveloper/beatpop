paddleCollide(letter){

  this.physics.add.collider(circle,this.paddle,()=>{
    this.paddle.displayWidth += this.interval
    if (letter === "a" && 0 < circle.x && circle.x <= width/4) {
      score++;
      circle.destroy();
      this.particles.destroy();
    }else if (letter === "s" && width/4 < circle.x && circle.x <= width/2 ) {

      score++;
      circle.destroy();
      this.particles.destroy();
    }else if (letter === "d" && width/2 < circle.x && circle.x <= 3*width/4) {

      score++;
      circle.destroy();
      this.particles.destroy();
    }else if(letter === "f" && 3*width/4 < circle.x && circle.x <= width){

      score++;
      circle.destroy();
      this.particles.destroy();
    };
  });
}


paddleCollide(){
    this.paddle.displayWidth += this.interval
    if (0 < circle.x && circle.x <= width/4) {
      score++;
      circle.destroy();
      this.particles.destroy();
    }else if (width/4 < circle.x && circle.x <= width/2 ) {

      score++;
      circle.destroy();
      this.particles.destroy();
    }else if (width/2 < circle.x && circle.x <= 3*width/4) {

      score++;
      circle.destroy();
      this.particles.destroy();
    }else if(3*width/4 < circle.x && circle.x <= width){

      score++;
      circle.destroy();
      this.particles.destroy();
    };
}
