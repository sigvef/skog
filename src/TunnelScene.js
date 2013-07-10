function TunnelScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'tunnel';
}

TunnelScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();

    this.fov = 100; //also set in reset

    this.camera = new THREE.PerspectiveCamera(this.fov, 16/9, 0.1, 10000); this.scene.add(this.camera);

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


    this.binormal = new THREE.Vector3();
    this.normal = new THREE.Vector3();

    this.parent = new THREE.Object3D();

    this.scene.add(this.parent);

    this.light = new THREE.PointLight( 0xffffff, 0.2, 100 );
    this.directionalLight = new THREE.PointLight( 0xffffff, 1 );
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
    this.tube = new THREE.TubeGeometry(extrudePath, segments, 4, radiusSegments, false, true);
    var geometry = this.tube;
    geometry.computeTangents();
    var color = 0xffffff;
    this.uniforms = {

        fogDensity: { type: "f", value: 100000 },
        fogColor: { type: "v3", value: new THREE.Vector3( 0, 0, 0 ) },
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2(16*GU, 9*GU) },
        uvScale: { type: "v2", value: new THREE.Vector2( 100.0, 1.0 ) },
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture( "res/dirt.jpg" ) },
        texture2: { type: "t", value: THREE.ImageUtils.loadTexture( "res/lavatile.jpg" ) }

    };
    this.debugball = new THREE.Mesh(new THREE.CubeGeometry(1,1,1), 
        new THREE.MeshLambertMaterial({
            color: 0xff00ff
        })
    );
    //this.scene.add(this.debugball);
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
    this.fov = 172;
}

TunnelScene.prototype.update = function(){
    /* do updatey stuff here */

    var length = 500;
    var lightoffset = 190;
    this.directionalLight.intensity = 0.5 + 0.5 * (length-((lightoffset + t) % length)) / length;
    this.uniforms.fogDensity.value = 0.8 + 0.02*(1 + Math.sin((length-((lightoffset + t) % length)) / length * 2 * Math.PI));

    // Try Animate Camera Along Spline
    var looptime = 10000 * 20;
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
    this.light.position = pos;
    this.camera.lookAt(lookAt);

    this.debugball.position = lookAt.multiplyScalar(0.5).add(pos).multiplyScalar(0.66666);

    this.parent.rotation.y += (this.targetRotation - this.parent.rotation.y) * 5;
    a = this.camera;
    if(this.fov > 80){
        this.fov = 80 + (this.fov - 80) / 1.05;
    }else{
        this.fov = 80;
    }
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
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

    //this.composer.render();
    renderer.render(this.scene, this.camera);
}

