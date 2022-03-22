var n = 0;
class Star{
  constructor(){
    this.r = random(PI,2*PI);
    this.mass = 100.0;
    this.pos = random(height/3,height/2);
    this.x = width*0.5 + this.pos*cos(this.r);
    this.y = height*0.5 + this.pos*sin(this.r);            
    this.speed = 2;
    this.acc = 0;
    this.img;
  }
  
  display(){
    push(); 
    rotate(this.r);
    image(this.img, this.pos, 0); 
    //console.log(this.r);
    pop();
  }

  displaySpinning(){
    push(); 
    rotate(this.r);  
    pop();
  }
   
  update(){
  
    var x = width*0.5 + this.pos*cos(this.r);
    var y = height*0.5 + this.pos*sin(this.r);
    
    let dis = dist(x,y,mouseX,mouseY);
    
    // if (dis < 20 ){
    //   this.acc = 5;    
    // }

    if (keyIsPressed && key == 't' ){
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

  updateSpinning(){
  
    var x = width*0.5 + this.pos*cos(this.r);
    var y = height*0.5 + this.pos*sin(this.r);
    
    let dis = dist(x,y,mouseX,mouseY);
    
    if (dis < 20 ){
      this.acc = 5;    
    }
    
    if (this.pos < 10 ){
      this.acc = -100;    
    } 
    
    if(this.pos < 0 ){
      this.speed = 0;
      this.acc = 0;
    }
    
    this.speed += this.acc;
    this.pos -= 0.2*this.speed;   
  }
  
  create_image(){     
    var side = 100;
    var center = 50;

    this.img = createImage(side, side);
    var imgr = map(this.pos,0,height/2,0,2);
    var num = pow(10,imgr);    

    var Cr =255;
    var Cg =255;
    var Cb =200;
    
    this.img.loadPixels();
    for (var y = 0; y < 200; y++) {
      for (var x = 0; x < 200; x++) {
        var d = (sq(center - x) + sq(center - y))/num;
        var col = color(Cr/d, Cg/d, Cb/d);
        this.img.set(x, y, col);
      }
    }
    this.img.updatePixels();
    return this.img;
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
