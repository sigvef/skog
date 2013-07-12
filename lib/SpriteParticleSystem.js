// SpriteParticleSystem.js v0.1

var nextSpawnInterval = function(rate)
{
  return 2.0*Math.random()/rate;
};

var uniformRandom = function(a,b)
{
  return a + (b-a)*Math.random();
};

SpriteParticleSystem = function (param)
{
  // the particle system "is" the source
  THREE.Object3D.call( this );
  this.cloud = param.cloud;
  this.rate = param.rate!==undefined ? param.rate : 3;
  this.num = param.num!==undefined ? param.num : 30;
  this.texture = param.texture;
  this.scaleR = param.scaleR!==undefined ? param.scaleR : [1,10];
  this.speedR = param.speedR!==undefined ? param.speedR : [10,10];
  this.terminalSpeed = param.terminalspeed!==undefined ? param.terminalspeed : null;
  this.rspeedR = param.rspeedR!==undefined ? param.rspeedR : [-.2,.2];
  this.lifespanR = param.lifespanR!==undefined ? param.lifespanR : [3,5];
  this.particlesMoveWithEmitter = param.particlesMoveWithEmitter!==undefined ? param.particlesMoveWithEmitter : false;
  this.forces = [];
  this.xScaleBase = this.texture.image.width;
  this.yScaleBase = this.texture.image.height;
  
  this.particles = [];
  this.lastUpdateTime = null;
  var mat = new THREE.SpriteMaterial({ map: this.texture, useScreenCoordinates: false, depthWrite:false, color: 0xffffff, fog: true });
  for (var i=0;i<this.num;++i)
  {
    var smat = mat.clone();
    var sprite = new THREE.Sprite(smat);
    sprite.visible = false;
    if (this.particlesMoveWithEmitter)
      this.add(sprite);
    else
      this.cloud.add(sprite);
    var particle = {};
    particle.sprite = sprite;
    particle.death = -1;
    this.particles.push( particle );
  }
  this.nextParticleIndex = 0;
};

SpriteParticleSystem.prototype = new THREE.Object3D();
SpriteParticleSystem.prototype.constructor = SpriteParticleSystem;

SpriteParticleSystem.prototype.addForce = function(force)
{
  this.forces.push(force);
};

SpriteParticleSystem.prototype.spawnOne = function(now)
{
  var p = this.particles[this.nextParticleIndex];
  this.nextParticleIndex = (this.nextParticleIndex+1)%this.particles.length;
  p.birth = now;
  p.death = now + 1000*uniformRandom(this.lifespanR[0],this.lifespanR[1]);
  var sprite = p.sprite;
  sprite.visible = true;
  if (!this.particlesMoveWithEmitter)
    //sprite.position.copy( this.position );
    sprite.position.getPositionFromMatrix( this.matrixWorld );
  sprite.rotation = uniformRandom(0,2*Math.PI);
  p.speed = uniformRandom(this.speedR[0],this.speedR[1]);
  var theta = uniformRandom(0,2*Math.PI);
  var phi = uniformRandom(-Math.PI,Math.PI);
  p.vel = new THREE.Vector3();
  p.vel.x = p.speed*Math.cos(phi)*Math.cos(theta);
  p.vel.y = p.speed*Math.cos(phi)*Math.sin(theta);
  p.vel.z = p.speed*Math.sin(phi);
  p.rspeed = uniformRandom(this.rspeedR[0],this.rspeedR[1]);
};

SpriteParticleSystem.prototype.start = function()
{
  this.nextSpawnT = new Date().getTime()+nextSpawnInterval(this.rate);
};

SpriteParticleSystem.prototype.stop = function()
{
  this.nextSpawnT = null;
};

SpriteParticleSystem.prototype.psUpdate = function()
{
  var now = new Date().getTime();
  if (this.lastUpdateTime == null)
  {
    this.lastUpdateTime = now;
    return;
  }
  var dt = (now - this.lastUpdateTime)/1000;
  this.lastUpdateTime = now;

  for (var i=0;i<this.particles.length;++i)
  {
    var p = this.particles[i];
    if (now > p.death)
    {
      p.sprite.opacity = 0;
      p.sprite.visible = false;
      continue;
    }
    var sprite = p.sprite;
    sprite.rotation += dt * p.rspeed;   
    for (var j=0;j<this.forces.length;j++)
    {
      var dv = this.forces[j].clone();
      dv.multiplyScalar(dt);
      p.vel.add(dv);
    }
    
    if (this.terminalSpeed!==null)
    {
      var speed = p.vel.length();
      if (speed>this.terminalSpeed)
        p.vel.multiplyScalar(this.terminalSpeed/speed);
    }
        
    var dpos = p.vel.clone();
    dpos.multiplyScalar(dt);
    sprite.position.add(dpos);
        
    var fracLife = (now-p.birth)/(p.death-p.birth);
    var scale = this.scaleR[0] + fracLife*(this.scaleR[1]-this.scaleR[0]);	
    sprite.scale.set(scale*this.xScaleBase,scale*this.yScaleBase,1.0);
    sprite.material.opacity = 1.0 - fracLife;
  }
  
  while (this.nextSpawnT && now>=this.nextSpawnT)
  {
    this.spawnOne(this.nextSpawnT);
    this.nextSpawnT += 1000*nextSpawnInterval(this.rate);
  }
};
