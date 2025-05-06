// globals
let particleTexture;
let particleSystem;

//testing

// Define helper functions first
function drawVector(v, loc, scale) {
  push();
  let arrowSize = 4;
  translate(loc.x, loc.y);
  stroke(255);
  strokeWeight(3);
  rotate(v.heading());

  let length = v.mag() * scale;
  line(0, 0, length, 0);
  line(length, 0, length - arrowSize, +arrowSize / 2);
  line(length, 0, length - arrowSize, -arrowSize / 2);
  pop();
}

class Particle {
  constructor(pos, imageTexture) {
    this.loc = pos.copy();
    let xSpeed = randomGaussian() * 0.3;
    let ySpeed = randomGaussian() * 0.3 - 1.0;

    this.velocity = createVector(xSpeed, ySpeed);
    this.acceleration = createVector();
    this.lifespan = 100.0;
    this.texture = imageTexture;
    this.color = color(frameCount % 256, 255, 255);
  }

  run() {
    this.update();
    this.render();
  }

  render() {
    imageMode(CENTER);
    tint(this.color, this.lifespan);
    image(this.texture, this.loc.x, this.loc.y);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  isDead() {
    return this.lifespan <= 0.0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.loc.add(this.velocity);
    this.lifespan -= 2.5;
    this.acceleration.mult(0);
  }
}

class ParticleSystem {
  constructor(particleCount, origin, textureImage) {
    this.particles = [];
    this.origin = origin.copy();
    this.img = textureImage;
    for (let i = 0; i < particleCount; ++i) {
      this.particles.push(new Particle(this.origin, this.img));
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  applyForce(dir) {
    for (let particle of this.particles) {
      particle.applyForce(dir);
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.img));
  }
}

function preload() {
  particleTexture = loadImage('..images/Yak-pngarts-Image.png');
}

function setup() {
  createCanvas(720, 400);
  colorMode(HSB);

  particleSystem = new ParticleSystem(
    0,
    createVector(width / 2, height - 60),
    particleTexture
  );

  describe(
    'White circle gives off smoke in the middle of the canvas, with wind force determined by the cursor position.'
  );
}

function draw() {
  background(20);

  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);

  particleSystem.applyForce(wind);
  particleSystem.run();
  for (let i = 0; i < 2; i += 1) {
    particleSystem.addParticle();
  }

  drawVector(wind, createVector(width / 2, 50, 0), 500);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function keyPressed(e) {
  if (e.key === 's') {
    saveCanvas(`succulent-${width}-${height}-${fxhash}.png`);
  }
}