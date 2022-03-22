//single non-force applied dust
class Dust{
    constructor(){
      this.l = 0;
      this.n = random(1,width/2);
      this.r = random(0,2*PI);
      this.o = random (1, random(1, width/this.n));
      this.radius = random(3,10);
  }  
  display() {       
    push();
    angleMode(RADIANS);    
    this.l +=1;
    this.o += 0.01;    
    rotate(this.r); 
    
    translate((this.n/this.o)*width*0.01,0);
    
    fill(255,random(this.l*0.1,100));
    noStroke();
    ellipse(0,0,width/(this.o*60), width/(this.o*60));
    pop();
  }
}
