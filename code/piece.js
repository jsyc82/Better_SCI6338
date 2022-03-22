
function Piece(positionx, positiony){
  this.pos = new p5.Vector (positionx, positiony);
  this.c = color(255, random(100,200), random(0,150));
  this.cw = color(255,255,255,255);
  this.size = random(10);
  let ms;
  let r;
  let clr;
  let acc = new p5.Vector(0, 0);
  let rotateX = 0;
  let rotateOffset = random(0.5,1);


    ms = random(100) ;
    xv = random(-2,2);
    yv = random(-2,2);
    clr = color(255,0,0);
  
  
  this.render = function() {

    push();
    beginShape();
    //this.c.setAlpha(128 + 128 * sin(millis()));
    translate(this.pos.x,this.pos.y);
    //fill(this.c);
    //noStroke();
    noFill();
    strokeWeight(random(1));
    stroke(this.c);
    vertex(random(20), random(20));
    vertex(random(20), random(20));
    vertex(random(20), random(20));
    endShape(CLOSE);
    pop();


    //rotate(rotateX);
    //rect(0,0,ms,ms);
    //rotateX += rotateOffset;
    //circle(this.pos.x,this.pos.y,ms); 
  }
    

}
