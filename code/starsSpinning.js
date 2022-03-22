var n = 0;
class StarSpinning{
  constructor(){
    this.r = random(0,2*PI);
    this.pos = random(height/3,height/2);          
    this.speed = 5;
    this.acc = 0;
  }
  
   display(){
     push(); 
     rotate(this.r);  
     pop();
   }
   
   update(){    
              
    var x = width*0.5 + this.pos*cos(this.r);
    var y = height*0.5 + this.pos*sin(this.r);  
    // console.log(y);
   
    let dis = dist(x,y,mouseX,mouseY);
    
    if (dis < 20 ){
      this.acc = 5;    
    }
    
    if (this.pos < 10 ){
      this.acc = -10;    
    }     
    if(this.pos < 0 ){
      this.speed = 0;
      this.acc = 0;
    }
   
    this.speed += this.acc;
    this.pos -= 0.2*this.speed;    
    }
   
   drawGradient(){
     push(); 
     let radius = this.pos/10;
     for (let r = radius; r > 0; --r) {
        var f=map(r,0,radius,255,0);
        fill(f,f,f);
        ellipse(0,0, r, r);
      }
    pop();          
   }
}


class starbright_large{
  constructor(){
    this.r = - wSpinning*5;
    this.rate = 1;
  }
  drawGradient(){
     this.rate += 0.1;
     this.r+= this.rate;
     let radius = this.r;
     for (let r = radius; r > 0; --r) {
        var f= map(r,0,radius,255,0);
        fill(f,f,f,255);
        ellipse(wSpinning,hSpinning, r,r);
   } 
  }
}

class starbright_small{
  constructor(){
    this.r  = 50;
    this.rate = 0.3;
  }
  drawGradient(){
     this.rate -= 0.01;
     this.r+= this.rate;
     let radius = this.r;
     for (let r = radius; r > 0; --r) {
        var f= map(r,0,radius,255,0);
        fill(f,f,f,255);
        ellipse(wSpinning,hSpinning, r,r);
   } 
  }
}
