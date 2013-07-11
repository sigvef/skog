function TunnelScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'tunnel';
}

TunnelScene.prototype.init = function(cb){
    this.scene = new THREE.Scene();
    this.fov = 0; //also set in reset
    var that = this;
    var scale = 400;
    this.ninjadev = new THREE.Mesh(new THREE.CubeGeometry(1607/scale,0.0001,267/scale), new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('res/NINJADEV.png'),
        color: 0xffffff,
        transparent: true 
    }));
    this.presents = new THREE.Mesh(new THREE.CubeGeometry(1607/scale,0.0001,267/scale), new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('res/PRESENTS.png'),
        color: 0xffffff,
        transparent: true 
    }));
    this.ademocalled = new THREE.Mesh(new THREE.CubeGeometry(1607/scale,0.0001,267/scale), new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('res/ADEMOCALLED.png'),
        color: 0xffffff,
        transparent: true 
    }));
    this.title = new THREE.Mesh(new THREE.CubeGeometry(2000/scale,0.0001,700/scale), new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('res/TITLE.png'),
        color: 0xffffff,
        transparent: true 
    }));
    a = this.camera = new THREE.PerspectiveCamera(this.fov, 16/9, 0.1, 10000); this.scene.add(this.camera);
    this.texture = THREE.ImageUtils.loadTexture('res/dirt.jpg');
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(200,2);
    this.binormal = new THREE.Vector3();
    this.normal = new THREE.Vector3();
    this.parent = new THREE.Object3D();
    this.scene.add(this.parent);
    this.parent.add(this.ninjadev);
    this.parent.add(this.presents);
    this.parent.add(this.ademocalled);
    this.parent.add(this.title);
    this.light = new THREE.PointLight( 0xffffff, 0.2, 100 );
    this.directionalLight = new THREE.PointLight( 0xffffff, 1 );
    this.scene.add(this.ambi);
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
    tubeMesh = new THREE.Mesh(geometry,
        createShaderMaterial(this.uniforms)
    );

    this.parent.add(tubeMesh);
    this.reset();
    cb();
}

TunnelScene.prototype.reset = function(){
    /* reset all the variables! */
    this.firstSet = true;
    this.fov = 172;
    this.targetRotation = 0;
    this.parent.rotation.set(0,0,0);
    this.ninjadev.position.set(9.9, 43.5, -11);
    this.ninjadev.rotation.set(5, 6, 3.3);
    this.presents.position.set(-5, 19, 10);
    this.presents.rotation.set(5, 6, 3.3);
    this.ademocalled.position.set(-19.3, 17.2, 6);
    this.ademocalled.rotation.set(4.83, 3.29, 1.72);
    this.title.position.set(-17, 2, -13);
    this.title.rotation.set(5, 6, 2.7);
}

TunnelScene.prototype.update = function(){
    var length = 500;
    var lightoffset = 190;
    //this.directionalLight.intensity = 0.5 + 0.5 * (length-((lightoffset + t) % length)) / length;
    this.uniforms.fogDensity.value = 0.8 + 0.02*(1 + Math.sin((length-((lightoffset + t) % length)) / length * 2 * Math.PI));

    /*
    */


    var looptime = 10000 * 20;
    var offset =  10000;

    var thyme = ((offset + t) % looptime) / looptime;

    var pos = this.tube.path.getPointAt(thyme);

    var segments = this.tube.tangents.length;
    var pickt = thyme * segments;
    var pick = pickt|0;
    var pickNext = (pick + 1) % segments;
    this.binormal.subVectors(this.tube.binormals[pickNext], this.tube.binormals[pick]);
    this.binormal.multiplyScalar(pickt - pick).add(this.tube.binormals[pick]);

    this.binormal.multiplyScalar(10);

    var dir = this.tube.path.getTangentAt(thyme);

    this.uniforms.time.value = t/200;

    this.camera.position = pos;
    var lookAt = this.tube.path.getPointAt((thyme + 10/this.tube.path.getLength()) % 1).multiplyScalar(1);
    this.light.position = pos;
    this.directionalLight.position = pos;
    this.camera.lookAt(lookAt);
    this.parent.rotation.y += (this.targetRotation - this.parent.rotation.y) * 5;
    a = this.camera;
    if(this.fov > 80){
        this.fov = 80 + (this.fov - 80) / 1.02;
    }else{
        this.fov = 80;
    }
    this.fov = 80;
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();

    var target = lookAt.multiplyScalar(1/3).add(pos).multiplyScalar(3/4);
    if(t > 12600 && t < 12700){
        this.title.position = target.add(this.title.position).multiplyScalar(0.5);
    }else if(t > 12700){
        this.title.position = target;
    }

    if(t > 18761){
        var faraway = 10000;
        this.title.position.set(faraway,faraway,faraway);
    }

}

TunnelScene.prototype.render = function(){
    renderer.render(this.scene, this.camera);
}

