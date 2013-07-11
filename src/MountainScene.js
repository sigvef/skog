function MountainScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 1;
    /* short name of this scene, must be defined */
    this.NAME = 'mountain';
}

MountainScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 10, 50000);
    this.scene.add(this.camera);

    this.initMountain();

    this.setupLights();


    this.uniforms = {
        time: {
            type: "f",
            value: 0.1
        },
        time2: {
            type: "f",
            value: 0.1
        },
        //envMap: {type: "t", value: 1, texture: textureCube},
        texture2: {
            type: "t",
            value: THREE.ImageUtils.loadTexture("res/water.jpg")
        },
        eyePos: {
            type: "v3",
            value: new THREE.Vector3(300, 50, 4)
        },
        waterHeight: {
            type: "f",
            value: 1.0
        },
        amplitude: {
            type: "fv1",
            value: [.5, .25, .17, .125, .1, .083, .714, .063]
        },
        wavelength: {
            type: "fv1",
            value: [25.133, 12.566, 8.378, 6.283, 5.027, 4.189, 3.590, 3.142]
        },
        speed: {
            type: "fv1",
            value: [1.2, 2.0, 2.8, 3.6, 4.4, 5.2, 6.0, 6.8]
        }
    };

    var angle = [];
    for(var i=0; i<8; i++) {
        var a = Math.random() * (2.0942) + (-1.0471);
        angle[i] = new THREE.Vector2(Math.cos(a), Math.sin(a));
    }
    this.uniforms.direction = {type: "v2v", value: angle};

    var xm = createWaterShaderMaterial(this.uniforms);

    var geometry = new THREE.PlaneGeometry(16000, 16000, 128, 128);
    var mesh = new THREE.Mesh(geometry, xm);
    mesh.doubleSided = true;
    mesh.rotation.x = -1.570796;
    this.scene.add(mesh);

    mesh.position.y = 50;

    /* call cb when you are done loading! */
    cb();
}

MountainScene.prototype.initMountain = function() {
    var worldWidth = 192,
        worldDepth = 192,
        worldHalfWidth = worldWidth / 2,
        worldHalfDepth = worldDepth / 2;

    this.mapData = this.generateHeight(worldWidth, worldDepth);

    var geometry = new THREE.PlaneGeometry(8000, 8000, worldWidth - 1, worldDepth - 1);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    for (var i=0, l=geometry.vertices.length; i<l; i++) {
        geometry.vertices[i].y = this.mapData[i] * 10;
    }

    texture = new THREE.Texture(
        this.generateTexture(this.mapData, worldWidth, worldDepth),
        new THREE.UVMapping(),
        THREE.ClampToEdgeWrapping,
        THREE.ClampToEdgeWrapping
    );
    texture.needsUpdate = true;

    mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({map: texture}));
    this.scene.add(mesh);
}

MountainScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.y = 4000;
}

MountainScene.prototype.update = function(){
    this.camera.position.x = 4500*Math.sin(t/5000);
    this.camera.position.z = 4500*Math.cos(t/5000);

    var toOrigo = new THREE.Vector3(0,this.camera.position.y,0).sub(this.camera.position);
    var sideways = toOrigo.cross(new THREE.Vector3(0,1,0));

    this.camera.lookAt(sideways);

    this.uniforms.time.value = t/1000;
    this.uniforms.time2.value = t/1000;
    this.uniforms.eyePos.value = this.camera.position;
}

MountainScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}

MountainScene.prototype.setupLights = function() {
    var light = new THREE.DirectionalLight(0xdefbff, 1.75);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);
    this.scene.add(light);
}

MountainScene.prototype.generateHeight = function(width, height) {

    var size = width * height, data = new Float32Array(size);

    Math.seedrandom(".thegreatmountain");
    var perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

    for (var i=0; i < size; i++) {
        data[i] = 0
    }

    for (var j=0; j<4; j++) {
        for (var i=0; i < size; i++) {
            var x = i % width, y = ~~ (i / width);
            var radius = Math.sqrt(Math.pow(x-width/2, 2) + Math.pow(y-height/2, 2));
            var heightRatio = Math.max(1-radius/width*2, 0);
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * Math.pow(heightRatio,2) * 7);
        }
        quality *= 5;
    }

    return data;
}

MountainScene.prototype.generateTexture = function(data, width, height) {

    var canvas, canvasScaled, context, image, imageData,
    level, diff, vector3, sun, shade;

    vector3 = new THREE.Vector3(0, 0, 0);

    sun = new THREE.Vector3(1, 1, 1);
    sun.normalize();

    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);

    image = context.getImageData(0, 0, canvas.width, canvas.height);
    imageData = image.data;

    for (var i=0, j=0, l=imageData.length; i<l; i+=4, j++) {

        vector3.x = data[j-2] - data[j+2];
        vector3.y = 2;
        vector3.z = data[j - width*2] - data[j + width*2];
        vector3.normalize();

        shade = vector3.dot(sun);

        imageData[i] = ( 96 + shade * 128 ) * ( 0.5 + data[j] * 0.007 );
        imageData[i + 1] = ( 96 + shade * 128 ) * ( 0.5 + data[j] * 0.007 );
        imageData[i + 2] = ( 96 + shade * 128 ) * ( 0.5 + data[j] * 0.007 );

    }

    context.putImageData(image, 0, 0);

    // Scaled 4x

    canvasScaled = document.createElement('canvas');
    canvasScaled.width = width * 4;
    canvasScaled.height = height * 4;

    context = canvasScaled.getContext('2d');
    context.scale(4, 4);
    context.drawImage(canvas, 0, 0);

    image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
    imageData = image.data;

    Math.seedrandom(".theterrain");
    for (var i=0, l = imageData.length; i<l; i+=4) {

        var v = ~~ (Math.random() * 5);

        imageData[i] += v;
        imageData[i + 1] += v;
        imageData[i + 2] += v;

    }

    context.putImageData(image, 0, 0);

    return canvasScaled;
}
