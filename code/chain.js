function Chain() {
    var particles = []; // particle array
    var springs = []; // spring array
    var numParticles = 10;
    
    this.init = function(physics,posX,posY){
        // create particles and add to array
        for(var i=0;i<numParticles;i++){
            particles[i] = new VerletParticle2D(new Vec2D(posX,posY));
            physics.addParticle(particles[i]);
        }

        // create springs and add to array
        for(var i=0;i<numParticles-1;i++){
            springs[i] = new VerletSpring2D(particles[i],particles[i+1],20,0.1)
            physics.addSpring(springs[i]);
        }
    }

    this.lock = function(){
        particles[0].lock();
        particles[numParticles-1].lock();
    }

    this.unlock = function(){
        //particles[0].unlock();
        particles[numParticles-1].unlock();
    }

    this.drop = function(){
        particles[0].unlock();
    }

    this.display = function(){
        push();
        noFill();
        strokeWeight(random(5));
        stroke(random(255));
        // draw particles
        for(var i=0;i<numParticles;i++){
            //more chain
            ellipse(particles[i].x,particles[i].y,20);
        }  

        // draw springs
        for(var i=0;i<numParticles-1;i++){
            line(particles[i].x,particles[i].y,particles[i+1].x,particles[i+1].y);
        } 
        pop();
    }

    this.interact = function(){
        particles[numParticles-1].x = handX;
        particles[numParticles-1].y = handY;

    }
}