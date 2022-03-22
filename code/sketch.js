let polyCount = 50; // how many points in the circle

let count = 15;
var boba = [];
var piece_hit = [];

let t = 0; // time passed
let tChange =0.01; // how quick time flies

let nVal; // noise value
let nInt = 0.3; // noise intensity
let r_=[];

let bg = 255;
let bga = 50;
let mode = 'P2D';

//========chain========
var chains = [];
var physics;
var numChains = 50;

//========universe-gradient=============
let particles = [];
let stars = [];
var num_dust = 1000;
var num_star = 1;
var diagonal;
var n = 0;
var rotation = 0;
var ro_acc= 0;

//=======universe-spinning=============
let particlesSpinning = [];
let starsSpinning = [];
var num_dustSpinning = 1000;
var num_starSpinning = 1;
var diagonalSpinning;
var nSpinning = 0;
var rotationSpinning = 0;
var ro_accSpinning= 0;

let bright_large = [];
let bright_small = [];
var wSpinning;
var hSpinning;

//=========universe-door=============
let dots = [];
let dots_left = [];
let dots_right = [];
let bright = [];
var total = 5000;
var newborn =50;
var w;
var h;
var dis;

//=========heaven============
let theShader;
let colors = "331832-d81e5b-f0544f-c6d8d3-fdf0d5".split("-").map(a=>"#"+a);;
const MAX_PARTICLE_COUNT = 250;
var circles = []
function preload(){
	theShader = new p5.Shader(this.renderer,vert,frag)
}
let pg;

//===========sand============
let sandx = [];
let sandy = [];

//===========posenet=========
let handX;
let handY;
let pHandX;
let pHandY;


function setup() {
	c = createCanvas(windowWidth, windowWidth,P2D);
  setupPoseNet();
  pHandX = width/2;
  pHandY = height/2;

	//bubble
	angleMode(DEGREES);
	noiseDetail(1);
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
      let x =(windowWidth/count*i) + random(-300,300);
      let y =(windowWidth/count*j) + random(-300,300);
      r_ = random(150,200);
    
      boba.push(new Bubble(x, y,r_,i,boba));
      piece_hit.push(new Piece (x,y));
		}
	}

	//============chain============
	// Initialize the physics
	physics = new VerletPhysics2D();
	physics.setWorldBounds(new Rect(0,0,width,height));
	physics.addBehavior(new GravityBehavior(new Vec2D(0,0.5)));
	
	for (var i=0;i<numChains;i++){
		chains[i] = new Chain();
		if (i%4 == 0){
		chains[i].init(physics,random(width),0);
		}else if(i%4 == 1){
		chains[i].init(physics,random(width),height);
		}else if(i%4 == 2){
		chains[i].init(physics,0,random(height));
		}else{
		chains[i].init(physics,width,random(height));
		}
		chains[i].lock();
	}

	//============universe-gradient=============
	push();
	imageMode(CENTER);
	background(0);
	for(let i = 0;i<num_dust;i++){
		particles.push(new Dust());
	}
	
	for(let i = 0;i<num_star+n;i++){
		stars[i] = new Star();
		stars[i].create_image();
	}
	pop();
	noStroke();
  
  //============universe-spinning=============
  wSpinning = width/2;
  hSpinning = height/2;
  push();
  imageMode(CENTER);
  background(0);
  for(let i = 0;i<num_dustSpinning;i++){
    particlesSpinning.push(new Dust());
  }  
  for(let i = 0;i<num_starSpinning+nSpinning;i++){
    starsSpinning[i] = new StarSpinning();
  }   
  noStroke();
  pop();

	//============universe-door=============
	w = width/2;
	h = height/2;
	dis = dist(0,0,w,h);
	noStroke();

	//===========heaven============
	pg = createGraphics(windowWidth, windowHeight,WEBGL);
	pg.noStroke()
	pg.background(100);
	pg.pixelDensity(1);

	handX = width/2;
	handY = height/2;
	
}

userControl = true;

function flatten(arr){
	let passData = []
	arr.forEach(a=>passData=passData.concat(a)) 
	return passData
}
var attracting = false
function draw() {
  background(bg,bga);
  updatePoseNet();

  if (skeletons.length > 0) {
    let hand = skeletons[0].points[9];
    handX = hand.x;
    handY = hand.y;
  }
  if (key_ == 0){
    bg = 255;
    bga = 50;
  }
  if (key_ == 1){
    bg = 255;
    for (let i = 0; i < boba.length; i++) {

      if (i%3 == 0){
      boba[i].render();}
      if (i%3 == 1){
      boba[i].render1();}
      if (i%3 == 2){
      boba[i].render2();}
      
    boba[i].move();
    boba[i].changeClr();
    }
    
    t += tChange;
  }
  
  if (key_ == 2){
    bg = 0;
    for (let i = 0; i < boba.length; i++) {
      boba[i].hit();
      piece_hit[i].pos = new p5.Vector(boba[i].px,boba[i].py);
      piece_hit[i].render();
    }
  }

  if (key_ == 3){
    push();
    bg = 0;
    bga = 255;
    boba = [];
    piece_hit = [];
    for (var i=0;i<numChains;i++){
      chains[i].display();
      physics.update();
    }
    if(mouseIsPressed){
      for (var i=0;i<numChains;i++){
        chains[i].interact();
      }
    }

    if(keyIsPressed){
      if (key == 'u'){
        for (var i=0;i<numChains;i++){
          chains[i].unlock();
        }
      }
      if(key == 'd'){
        for (var i=0;i<numChains;i++){
          chains[i].drop();
        }
      }
    }
    pop();
  }

  if (key_ == 4){
    bg = 0;
    chains = [];
    fill(0,100);
    rect(0, 0, width, height);  
    push();
    translate(width/2, height/2);  
    
    for (let i = 0; i< num_star+n; i++) {
      stars[i].update();
      stars[i].display();
      stars[i].create_image();
    }
    
    for (let i = 0; i< num_dust; i++) {
      particles[i].display();
    }
    pop();  
    if(keyIsPressed){
      if(key == 'n'){
        stars[n+num_star] = new Star();
        stars[n+num_star].create_image();
        n++;
      }
    }
  }

  if (key_==5) {
    bga = 50;
    stars = [];
    particles = [];
    fill(0,100);
    rect(0, 0, width, height);
    
    for(let i = 0; i<1; i++) {
      bright_large.push(new starbright_large());
      bright_large[i].drawGradient();
      bright_small.push(new starbright_small());
      bright_small[i].drawGradient();
    }
    
    push();
    translate(width/2, height/2);  
   
    ro_accSpinning += pow(10,-3);
    rotationSpinning -= ro_accSpinning*ro_accSpinning; 
  
    rotate(rotationSpinning);
    
    for (let i = 0; i< num_dustSpinning; i++) {
     particlesSpinning[i].display();
    }
    pop();    
  }

  if(key_ == 6){
    starsSpinning = [];
    particlesSpinning = [];
    fill(0, map(dist(handX, handY, w, h), 0, dis, 100, 0));
    rect(0, 0, width, height);
  
    
    for(let i = 0; i<1; i++) {
      bright.push(new starbright());
      bright[i].drawGradient();
    }
    
    for (let i = 0; i< newborn; i++) {
      dots.push(new Dot());
      dots_left.push(new Dot_left());
    }
    for(let i = 0; i<dots.length; i++){   
      if(dots[i].x<0){
        dots.splice(i,1);
      }
      dots[i].update();
      dots[i].display();   
    }
    if (dots.length > total){
      for(let i = 0; i < newborn; i++){   
        dots.splice(i,1);  
      }
    }
  }

  if(key_ ==7){
    bg = 0;
    bga = 0;
    //Line 338 - 390 using open-source codes from CHE YU WU Frozen Bird Brush
    //https://www.openprocessing.org/sketch/928943
    //===================================
    if (!userControl){
      let rr = width*0.32+ width*0.05*sin(frameCount/20);
      pHandX = handX;
      pHandY = handY;
      handX = width/2+rr*cos(frameCount/6);
      handY = height/2+rr*sin(frameCount/6);
      attracting = sin(frameCount/100)<0;
    }else{
      attracting = true;
    }

    pg.shader(theShader);
    theShader.setUniform('u_resolution',[width/windowWidth,height/windowHeight]);
    theShader.setUniform('u_time',millis()/1000);
    theShader.setUniform('u_mouse',[handX/width,handY/height]);
    let arr = circles.map(p=>[
      p.p.x/width,
      p.p.y/height,
      p.r/10
    ])
	
    theShader.setUniform('particles',flatten(arr));
    let arr2 = circles.map(p=>[
      p.color._getRed()/255,
      p.color._getGreen()/255,
      p.color._getBlue()/255
    ])
    
    theShader.setUniform('colors',flatten(arr2));
    theShader.setUniform('tex0',c);
    
    for(var i=0;i<2;i++){
      circles.push({
        p: createVector(handX,handY),
        r: random(5,20),
        v: p5.Vector.random2D().mult(random(8)).add(
          createVector(handX-pHandX,handY-pHandY).limit(5)
        ),
        color:  color(random(colors)),
        atFactor: random(0.5,2)
      })
    }
    circles = circles.slice(-MAX_PARTICLE_COUNT)
    circles.forEach(p=>{
      p.r*=0.98;
      p.p.add(p.v);
      p.v.mult(0.995);
      if (attracting){
        p.v.add(createVector(handX,handY).sub(p.p).limit(p.atFactor) );
      }
    })
    circles = circles.filter(p=>p.r>0.05);
    pg.rect(-width/2,-height/2,width,height);
    //==========================================
    image(pg,0,0);
    
  }
  if(key_==8){
    clear();
    push();
    fill(0);
    rect(0,0,width,height);
    pop();
  }
  if(key_ == 9){
    bg = 0;
    
    for (let sandi = 0; sandi < sandx.length; sandi++){
      strokeWeight(random(5));
      stroke(50,180,random(200,255));
      point(sandx[sandi], sandy[sandi]);
      sandy[sandi] = sandy[sandi] + 2;
      sandx[sandi] = sandx[sandi] + random(-2, 2);
    }

    let pointPosXOffset  = 50;
    for (let pointPosX = 0; pointPosX<width; pointPosX+=pointPosXOffset){
      sandx = append(sandx, pointPosX);
      sandy = append(sandy, 20+sin(pointPosX)*10);
      pointPosXOffset = random(40,50);
    }
  }
  pHandX = handX;
  pHandY = handY;
}

let key_ = 0;

function keyPressed (){
  switch (key) {
    case '0':
      key_ = 0;
      break;
    case '1':
      key_ = 1;
      break;
    case '2':
      key_ = 2;
      break;
    case '3':
      key_ = 3; 
      break;
    case '4':
      key_ = 4; 
      break;
    case '5':
      key_ = 5; 
      break;
    case '6':
      key_ = 6; 
      break;
    case '7':
      key_ = 7; 
      break;
    case '8':
      key_ = 8; 
      break;
    case '9':
      key_ = 9; 
      break;
  }
}


let video;
let poseNet;
let poses = [];
let skeletons = [];

function setupPoseNet() {
  video = createCapture(VIDEO);
  video.size(width, height);

  console.log("Loading Model...");

  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();
}

function modelReady() {
  console.log("Model Ready!");
}

function displayPoseNet() {
  image(video, 0, 0, width, height);
  drawKeypoints();
  drawSkeleton();
}

function updatePoseNet() {
  if (poses.length > 0) {
    skeletons = [];
  }
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;

    let bodyPoints = [];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      bodyPoints.push(new BodyPoint(keypoint.position.x, keypoint.position.y, keypoint.score));
    }
    skeletons.push(new Skeleton(bodyPoints));
  }
}

function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        text(j, keypoint.position.x + 8, keypoint.position.y);
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

class BodyPoint {
  constructor(x, y, p) {
    this.x = x;
    this.y = y;
    this.probability = p;
  }
}

class Skeleton {
  constructor(pointArray) {
    this.points = pointArray;
  }
}



