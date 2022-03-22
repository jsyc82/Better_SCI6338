function Bubble(xpos,ypos,r,id, bobaarray){
  this.px = xpos;
  this.py = ypos;
  this.this_r =  r;
  this.velx = 0;
  this.vely = 0;
  this.Bobaarray = bobaarray;
  this.accx = random(-0.02,0.02);
  this.accy = random(-0.02,0.02);
  this.c = color(255, random(100,200), random(0,150));
  this.sc = color(red(this.c), green(this.c)-50, blue(this.c)+50);
  let spring = 0.001;

  // let c = color(255, random(100,200), random(0,150));
  let rb = random(cos(t)/2);
  let vControl = 2;
 
  this.hit = function(){
   let mouseDistance = dist(this.px, this.py, handX, handY);
   this.ACC = new p5.Vector(handX-this.px, handY-this.py);
   this.VEL = new p5.Vector(0,0);
   this.ACC.setMag(mouseDistance/20);


      this.VEL.add(this.ACC);
      this.px += this.VEL.x;
      this.py += this.VEL.y;
    
   if ((this.px < 0 ) || (this.px > windowWidth))   {this.VEL.x = - this.VEL.x; this.px += this.VEL.x; }
   if ((this.py < 0) || (this.py > windowHeight ))   {this.VEL.y = - this.VEL.y; this.py += this.VEL.y;} 
   if (abs(mouseDistance)<50){
      this.move();
      // this.VEL.x = - this.VEL.x; this.px += this.VEL.x;
      // this.VEL.y = - this.VEL.x; this.py += this.VEL.y;
   }
  }
  
  
  this.move = function(){
   
   this.velx += this.accx;
   this.vely += this.accy;
   this.px += this.velx;
   this.py += this.vely;
    
    
    //boundary control
   if ((this.px < 0 && this.velx < 0) || (this.px > windowWidth  && this.velx > 0))   {this.velx = - this.velx;}
    if ((this.py < 0 && this.vely < 0) || (this.py > windowHeight && this.vely > 0))   {this.vely = - this.vely;}
   
    //mouse repulsion
    let mouseDistance = dist(this.px, this.py, handX, handY);
    if (mouseDistance < r) {
      let repulse = new p5.Vector(this.px, this.py);
      repulse.sub(handX, handY);
      repulse.mult(map(mouseDistance, r, 0, 0, 1));

      this.velx += repulse.x;
      this.vely += repulse.y;
      this.px += this.velx;
      this.py += this.vely;

    }  
    
    //collide reference: https://p5js.org/examples/motion-bouncy-bubbles.html
    for (let i = id + 1; i < bobaarray.length; i++) {
      let dx = this.Bobaarray[i].px - this.px;
      let dy = this.Bobaarray[i].py - this.py;
      let distance = sqrt(dx*dx + dy*dy);
      let minDist = (this.Bobaarray[i].this_r + r)*0.75;
      if (distance < minDist) { 
        let angle = atan2(dy, dx);
        let targetX = this.px + cos(angle) * minDist;
        let targetY = this.py + sin(angle) * minDist;
        let ax = (targetX - this.Bobaarray[i].px) * spring;
        let ay = (targetY - this.Bobaarray[i].py) * spring;
        this.velx -= ax;
        this.vely -= ay;
        this.Bobaarray[i].velx += ax;
        this.Bobaarray[i].vely += ay;
      }
    } 
    
    //slow down if too fast
    if (this.velx > vControl || this.velx < -vControl ||this.vely > vControl || this.vely < -vControl) {
      
      this.velx = this.velx * 0.5;
      this.vely = this.vely * 0.5;
    }
    
   }

  //reference: noisy circle https://www.openprocessing.org/sketch/112858/
  //bubble movement pattern 0
  this.render = function(){
    push();
    strokeWeight(1);
    stroke(this.sc);
    fill(this.c);

     beginShape();
      for (let a=0; a<=360; a+=360/polyCount) {

      nVal = noise( cos(a)*nInt+1, sin(a)*nInt+1,t-rb)+0.08; 
      
      let ppx =cos(a)*r *nVal+this.px;
      let ppy =sin(a)*r *nVal+this.py;
      
      
      vertex(ppx, ppy);
    
      
    }
  endShape(CLOSE);
  pop();
}
  //bubble movement pattern 1
 this.render1 = function(){
   push();
    strokeWeight(1);
    stroke(this.sc);
    fill(this.c);
     //translate(pos.x,pos.y);
     beginShape();
      for (let a=0; a<=360; a+=360/polyCount) {

      nVal = noise( cos(a)*nInt+1-t+rb, sin(a)*nInt+1-t-rb)+0.05; 
      
      let ppx =cos(a)*r *nVal+this.px;
      let ppy =sin(a)*r *nVal+this.py;
      
      
      vertex(ppx, ppy);
    
      
    }
  endShape(CLOSE);
  pop();
}
  //bubble movement pattern 2
 this.render2 = function(){
    push();
    strokeWeight(1);
    stroke(this.sc);
    fill(this.c);

     //translate(pos.x,pos.y);
     beginShape();
      for (let a=0; a<=360; a+=360/polyCount) {
      
      //nVal = noise( cos(a)*nInt+1, sin(a)*nInt+1, t); 
      nVal = noise(cos(a)*nInt+1+(t/2), sin(a)*nInt+1-(t/2),t+rb)+0.1;
      
      
     let ppx =cos(a)*r *nVal+this.px;
     let ppy =sin(a)*r *nVal+this.py;
      
      
      vertex(ppx, ppy);
   
    }
  endShape(CLOSE);
  pop();
}

this.changeClr = function(){
  let tmpVal = 75 + 75 * sin(millis()/10);
  //this.c.setGreen(tmpVal);
  this.c.setBlue(tmpVal);
  this.c.setAlpha(tmpVal+75);
  //this.sc = color(255,255,255,tmpVal);
  this.sc = color(red(this.c), green(this.c), blue(this.c),100);
  //console.log(alpha(this.c));
}

}
