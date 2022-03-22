//reference: moving though space #2 by yiyao
//https://www.openprocessing.org/sketch/529882
class Dot{
  
    constructor(){
      this.x = random(0,width);
      this.y = random(0,height);
      this.velx = random(0,2);
      this.vely = random(0.2,2);
      this.accx = 0;
      this.accy = 0;
      this.age = 0;
      this.r = random(0,0.05);
      this.l=0;
    } 
    display(){
      this.age++;
      var d = random(0.1,3);
      var radius = d*(map(noise(this.x, this.y,0.001*frameCount),0,1,0.1,2));
      fill(255,min(2*this.age,255));
      ellipse(this.x, this.y,radius ,radius); 
    }  
    update(){    
      this.l+=5;
      var scale = map(0.5*abs(handX-w),0,w,0,0.5);
      if (this.x<w){
        var speedx = 0.05*this.velx*abs((1-scale)*w-this.x);
        this.x -= map(this.accx, 0, width, -speedx, speedx);
      } 
      if (this.x>w){
        var speedx = -0.05*this.velx*abs(this.x-(1+scale)*w);
        this.x -= map(this.accx, 0, width, -speedx, speedx);
      }
      var speedy = 0.1*this.vely*(h-this.y);
      this.accx++;    
      this.y -= map(0.5*abs(handX-w), 0, w, 0,-speedy);
    }
  }
  
  
  class Dot_left{
  }
  class starbright{
    constructor(){
      this.r = width;
    }
    drawGradient(){
       this.r-= 20;
       let radius = this.r;
       for (let r = radius; r > 0; --r) {
          var f= map(r,0,radius,255,0);
          fill(f,f,f,255);
          ellipse(w,h, r,r);
     } 
    }
  }
  