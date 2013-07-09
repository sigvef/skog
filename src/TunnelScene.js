function TunnelScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'tunnel';
}

TunnelScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(100, 16/9, 0.1, 10000); this.scene.add(this.camera);

    this.texture = THREE.ImageUtils.loadTexture('res/dirt.jpg');
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(200,2);

    // postprocessing
    this.composer = new THREE.EffectComposer( renderer, RENDERTARGET);

    this.composer.addPass( new THREE.RenderPass(this.scene, this.camera));
    var strength = 1.1;
    var kernelSize =  25;
    var sigma =  1.0;
    var resolution = 512;
    this.composer.addPass( new THREE.BloomPass(strength, kernelSize, sigma, resolution));
    var effect = new THREE.ShaderPass(THREE.CopyShader);
    effect.renderToScreen = true;
    this.composer.addPass(effect);

    this.particles = new THREE.Geometry();
    this.particleCount = 1800;

    for(var p = 0; p < this.particleCount; p++) {

      // create a particle with random
      // position values, -250 -> 250
      var pX = Math.random() * 50 - 25,
          pY = Math.random() * 50 - 25,
          pZ = Math.random() * 50 - 25,
          particle = new THREE.Vector3(pX, pY, pZ);

          /*
          particle.velocity = new THREE.Vector3(
              0,              // x
              -Math.random(), // y: random vel
              0);  
*/

      // add it to the geometry
      this.particles.vertices.push(particle);
    }
    a = this.particles;
    // create the particle variables
    var pMaterial =
      new THREE.ParticleBasicMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          "res/smoke.png"
        ),
        opacity: 0.01,
        blending: THREE.AdditiveBlending,
        transparent: true
      });
    this.particlesystem = new THREE.ParticleSystem(this.particles, pMaterial);

    // also update the particle system to
    // sort the particles which enables
    // the behaviour we want
    this.particlesystem.sortParticles = true;
    this.scene.add(this.particlesystem);

    this.binormal = new THREE.Vector3();
    this.normal = new THREE.Vector3();

    this.parent = new THREE.Object3D();

    this.scene.add(this.parent);

    this.light = new THREE.PointLight( 0xffdddd, 0.2, 100 );
    this.directionalLight = new THREE.PointLight( 0xffbbaa, 1 );
    this.scene.add(this.light);
    this.scene.add(this.directionalLight);

    this.targetRotation = 0;

    var cos = Math.cos;
    var sin = Math.sin;

    var Knot = THREE.Curve.create(

            function(s) {

            this.scale = (s === undefined) ? 40 : s;

            },

            function(t) {

            var fi = t * Math.PI * 2;
            var x = cos(4 * fi) * (1 + 0.5 * (cos(5 * fi) + 0.4 * cos(20 * fi))),
            y = sin(4 * fi) * (1 + 0.5 * (cos(5 * fi) + 0.4 * cos(20 * fi))),
            z = 0.35 * sin(15 * fi);
            /*
            var x = cos(4 * fi) * (1 + 0.5 * (cos(5 * fi))) ,
            y = sin(4 * fi) * (1 + 0.5 * (cos(5 * fi) )),
            z = 0.35 * sin(15 * fi);
            */

            return new THREE.Vector3(x, y, z).multiplyScalar(this.scale);
            }
            );

    var extrudePath = new Knot();
    var segments = 200;
    var radiusSegments = 40;
    this.tube = new THREE.TubeGeometry(extrudePath, segments, 4, radiusSegments, false, false);
    var geometry = this.tube;
    geometry.computeTangents();
    var color = 0xffffff;
    this.uniforms = {

        fogDensity: { type: "f", value: 0.5 },
        fogColor: { type: "v3", value: new THREE.Vector3( 0, 0, 0 ) },
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        uvScale: { type: "v2", value: new THREE.Vector2( 300.0, 1.0 ) },
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture( "res/cloud.png" ) },
        texture2: { type: "t", value: THREE.ImageUtils.loadTexture( "res/lavatile.jpg" ) }

    };
    tubeMesh = new THREE.Mesh(geometry,
        createShaderMaterial(this.uniforms)
        /*
        new THREE.MeshLambertMaterial({
            map: this.texture,
            mapBump: this.texture,
            color: color,
            opacity: (geometry.debug) ? 0.2 : 0.1,
            transparent: false,
            side: THREE.BackSide
        })
        */
    );

    this.parent.add(tubeMesh);
    /* call cb when you are done loading! */
    cb();
}

TunnelScene.prototype.reset = function(){
    /* reset all the variables! */
    this.firstSet = true;
}

TunnelScene.prototype.update = function(){
    /* do updatey stuff here */

    var length = 500;
    var lightoffset = 190;
    this.directionalLight.intensity = (length-((lightoffset + t) % length)) / length;

    // Try Animate Camera Along Spline
    var looptime = 10000 * 25;
    var offset =  10000;
    var thyme = ((offset + t) % looptime) / looptime;

    var pos = this.tube.path.getPointAt(thyme);

    // interpolation
    var segments = this.tube.tangents.length;
    var pickt = thyme * segments;
    var pick = pickt|0;
    var pickNext = (pick + 1) % segments;
    this.binormal.subVectors(this.tube.binormals[pickNext], this.tube.binormals[pick]);
    this.binormal.multiplyScalar(pickt - pick).add(this.tube.binormals[pick]);

    this.binormal.multiplyScalar(10);

    var dir = this.tube.path.getTangentAt(thyme);

    var somethng = this.normal.copy(this.binormal).cross(dir);

    this.uniforms.time.value += .1;

    this.camera.position = pos;
    var lookAt = this.tube.path.getPointAt((thyme + 10/this.tube.path.getLength()) % 1).multiplyScalar(1);
    this.directionalLight.position = lookAt;
    this.light.position = lookAt;
    this.camera.lookAt(lookAt);
    this.particlesystem.position = pos;
    this.particlesystem.rotation = this.camera.rotation;

    this.parent.rotation.y += (this.targetRotation - this.parent.rotation.y) * 0.05;
    this.particlesystem.rotation.y += (this.targetRotation - this.parent.rotation.y) * 0.05 * 2;


    if(this.firstSet){
        this.firstSet = false;
      var pCount = this.particleCount;
      while(pCount--) {

        // get the particle
        var particle =
          this.particles.vertices[pCount];

        // update the velocity with
        // a splat of randomniz
        var sc = 10;
        particle.x = dir.x * sc * (Math.random() - 0.5);
        particle.y = dir.y * sc * (Math.random() - 0.5);
        particle.z = dir.z * sc * (Math.random() - 0.5);

        /*
        particle.x += this.binormal.x * (Math.random() < 0.5 ? -1 : 1) * (0.6 + 0.5*(Math.random() - 0.5));
        particle.y += this.binormal.y * (Math.random() < 0.5 ? -1 : 1) * (0.6 + 0.5*(Math.random() - 0.5));
        particle.z += this.binormal.z * (Math.random() < 0.5 ? -1 : 1) * (0.6 + 0.5*(Math.random() - 0.5));
        */

        particle.x += this.binormal.x * (Math.random() < 0.5 ? -1 : 1) * Math.random();
        particle.y += this.binormal.y * (Math.random() < 0.5 ? -1 : 1) * Math.random();
        particle.z += this.binormal.z * (Math.random() < 0.5 ? -1 : 1) * Math.random();

        particle.x += this.normal.x * (Math.random() - 0.5);
        particle.y += this.normal.y * (Math.random() - 0.5);
        particle.z += this.normal.z * (Math.random() - 0.5);

        particle.x += 2*particle.x/Math.abs(particle.x);
        particle.y += 2*particle.y/Math.abs(particle.y);
        particle.z += 2*particle.z/Math.abs(particle.z);
      }

      //particle.add(particle.velocity);

      // flag to the particle system
      // that we've changed its vertices.
    }
      this.particlesystem.
        geometry.
        __dirtyVertices = true;
}

TunnelScene.prototype.render = function(){
    /* do rendery stuff here */

    if(RENDERTARGET != this.composer.renderTarget1){
        this.composer.renderTarget1 = RENDERTARGET; 
        this.composer.renderTarget2 = RENDERTARGET.clone(); 
        this.uniforms.resolution.value.x = 16*GU;
        this.uniforms.resolution.value.y = 9*GU;
        this.composer.reset();
    }

    this.composer.render();
}

