function TunnelScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'tunnel';
}

TunnelScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

    this.binormal = new THREE.Vector3();
    this.normal = new THREE.Vector3();

    this.parent = new THREE.Object3D();

    this.scene.add(this.parent);

    this.light = new THREE.PointLight( 0xffffff, 1, 100 );
    this.scene.add(this.light);

    this.cameraHelper = new THREE.CameraHelper(this.camera);

    this.camera.add(this.cameraHelper);

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
    var segments = 400;
    var radiusSegments = 20;
    this.tube = new THREE.TubeGeometry(extrudePath, segments, 3, radiusSegments, false, false);
    var geometry = this.tube;
    var color = 0x00ffff;
    tubeMesh = THREE.SceneUtils.createMultiMaterialObject(geometry, [
            new THREE.MeshLambertMaterial({
                color: color,
                opacity: (geometry.debug) ? 0.2 : 0.8,
                transparent: true
            }),
            new THREE.MeshLambertMaterial({
                color: 0xf000f0,
                opacity: 1,
                wireframe: true
            })]);

    if (geometry.debug) tubeMesh.add(geometry.debug);
    this.parent.add(tubeMesh);
    /* call cb when you are done loading! */
    cb();
}

TunnelScene.prototype.reset = function(){
    /* reset all the variables! */
}

TunnelScene.prototype.update = function(){
    /* do updatey stuff here */
}

TunnelScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

    // Try Animate Camera Along Spline
    var looptime = 1000 * 100;
    var thyme = (t % looptime) / looptime;

    var pos = this.tube.path.getPointAt(thyme);

    // interpolation
    var segments = this.tube.tangents.length;
    var pickt = thyme * segments;
    var pick = pickt|0;
    var pickNext = (pick + 1) % segments;
    this.binormal.subVectors(this.tube.binormals[pickNext], this.tube.binormals[pick]);
    this.binormal.multiplyScalar(pickt - pick).add(this.tube.binormals[pick]);


    var dir = this.tube.path.getTangentAt(thyme);

    this.normal.copy(this.binormal).cross(dir);

    this.camera.position = pos;
    this.light.position = pos;


    // Camera Orientation 1 - default look at
    // camera.lookAt(lookAt);

    // Using arclength for stablization in look ahead.
    var lookAt = this.tube.path.getPointAt((thyme + 10/this.tube.path.getLength()) % 1).multiplyScalar(1);

    // Camera Orientation 2 - up orientation via normal
    this.camera.matrix.lookAt(this.camera.position, lookAt, this.normal);
    this.camera.rotation.setEulerFromRotationMatrix(this.camera.matrix);

    this.cameraHelper.update();

    this.parent.rotation.y += (this.targetRotation - this.parent.rotation.y) * 0.05;
    renderer.render(this.scene, this.camera);
}

