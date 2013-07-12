function MountainScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 16700;
    /* short name of this scene, must be defined */
    this.NAME = 'mountain';

    this.segments = 192;
    this.halfSegments = 96;
    this.size = 8000;
}

MountainScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 1, 50000);
    this.scene.add(this.camera);

    c = this.camera;

    this.initMountain();

    this.initWater();

    this.initTrees();

    this.setupLights();
    
    this.initSkyBox();

    /* call cb when you are done loading! */
    this.initTrainAndRails(function() {
    	cb();
    });
};

MountainScene.prototype.initTrainAndRails = function(cb) {
    this.rails = [];
    var that = this;
    this.train = new Train();
    this.train.startTime = this.startTime + 6000;
    this.train.init(function() {
    	that.train.grouped.scale.x = 10;
    	that.train.grouped.scale.y = 10;
    	that.train.grouped.scale.z = 10;
    	that.train.grouped.position.y = 6000;
    	that.scene.add(that.train.grouped);
    	
        that.rails = new Rails();
        that.rails.startTime = that.startTime + 4500;
        that.rails.init(function() {
        	that.scene.add(that.rails.grouped);
        	cb();
        });
    });
};

MountainScene.prototype.initWater = function() {

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
            value: 0.05
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

    var geometry = new THREE.PlaneGeometry(26000, 26000, 128, 128);
    var mesh = new THREE.Mesh(geometry, xm);
    mesh.rotation.x = -1.570796;
    this.scene.add(mesh);

    this.composer = new THREE.EffectComposer(renderer, RENDERTARGET);
    this.composer.addPass( new THREE.RenderPass(this.scene, this.camera));
    var effect = new THREE.ShaderPass(AsciiShader);
    effect.renderToScreen = true;
    this.composer.addPass(effect);
    mesh.position.y = 50;
    

};

MountainScene.prototype.initMountain = function() {

    this.mapData = this.generateHeight(this.segments, this.segments);

    var geometry = new THREE.PlaneGeometry(this.size, this.size, this.segments - 1, this.segments - 1);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

    for (var i=0, l=geometry.vertices.length; i<l; i++) {
        geometry.vertices[i].y = this.mapData[i] * 10;
    }

    texture = new THREE.Texture(
        this.generateTexture(this.mapData, this.segments, this.segments),
        new THREE.UVMapping(),
        THREE.ClampToEdgeWrapping,
        THREE.ClampToEdgeWrapping
    );
    texture.needsUpdate = true;

    this.heightMap = (function(m,s){
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.height = canvas.width = s;
        var imageData = ctx.getImageData(0,0,s,s);
        for(var i=0; i<m.length;i++){
            var height = m[i];
            //if(height > 0) console.log(height);
            imageData.data[i*4 + 0] = height;
            imageData.data[i*4 + 1] = height;
            imageData.data[i*4 + 2] = height;
            imageData.data[i*4 + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
        var tex = new THREE.Texture(canvas);
        tex.needsUpdate = true;
        return tex;
    })(this.mapData, this.segments);


    this.mountainuniforms = {
        time: {type:'f', value: 0},
        gravel: {type: 't', value: THREE.ImageUtils.loadTexture('res/gravel.jpg')},
        grass: {type: 't', value: THREE.ImageUtils.loadTexture('res/floral.jpg')},
        snow: {type: 't', value: THREE.ImageUtils.loadTexture('res/snow.jpg')},
        height: {type: 't', value: this.heightMap}
    };
    this.mountainMesh = new THREE.Mesh(geometry, createMountainShaderMaterial(this.mountainuniforms));
    this.scene.add(this.mountainMesh);
};

MountainScene.prototype.initTrees = function() {
    var tree = new Tree();
    this.trees = [];
    Math.seedrandom("the-forest");
    var treesPlaced = 0;
    while (treesPlaced < 500) {
        var pos = {
            x: Math.random()*6000-3000,
            y: Math.random()*1000+9000,
            z: Math.random()*6000-3000
        };
        yPos = this.getYValue(pos.x, pos.z);
        if (yPos < 400 && yPos > 60) {
            this.trees[treesPlaced] = tree.clone();

            this.trees[treesPlaced].position = pos;
            this.trees[treesPlaced].startYPos = this.trees[treesPlaced].position.y;
            this.trees[treesPlaced].finalYPos = yPos;
            this.trees[treesPlaced].delay = Math.random()*600+600;

            this.scene.add(this.trees[treesPlaced]);
            treesPlaced++;
        }
    }
};

MountainScene.prototype.reset = function(){
    this.camera.position.y = 70;
};

MountainScene.prototype.update = function(){
	this.train.update();
	this.rails.update();

    this.updateCamera();

    //this.camera.position.x = this.train.grouped.position.x + 0.6 * 2650*Math.sin(t*0.0002 + 2);
    //this.camera.position.y = 0.09 * 800*Math.sin(t/2500)+1100;
    //this.camera.position.z = this.train.grouped.position.z + 0.6 * 2650*Math.sin(t*0.0002 + 2);

    if (t > this.startTime + 7300) {
        this.train.grouped.position.x = 2485*Math.sin(t*0.0002);
        this.train.grouped.position.y = 885;
        this.train.grouped.position.z = 2485*Math.cos(t*0.0002);
    }
    this.train.grouped.rotation.y += 0.004;



    //this.camera.lookAt(this.train.grouped.position);
    //this.camera.lookAt(this.rails.rails[30].position);


    this.uniforms.time.value = t/1500;
    this.uniforms.time2.value = t/1500;
    this.uniforms.eyePos.value = this.camera.position;

    if (t < this.startTime + 4000) {
        for (var i=0; i < this.trees.length; i++) {
            if (t > this.startTime + this.trees[i].delay) {
                var treeAnimationTime = (t - this.startTime - this.trees[i].delay)/(4000-this.trees[i].delay);
                this.trees[i].position.y = smoothstep(10000, this.trees[i].finalYPos, treeAnimationTime);
            }
        }
    } else {
        for (var i=0; i < this.trees.length; i++) {
            var moveFactor = (i%2) ? 10 : -10;
            this.trees[i].position.y = moveFactor * Math.sin( (t-this.startTime-4000) / 250*Math.PI ) + this.trees[i].finalYPos;
        }
    }
};

MountainScene.prototype.updateCamera = function() {
    if (t < this.startTime + 4000) {
        var camTime = (t - this.startTime)/4000;
        this.camera.position.x = smoothstep(13000, 2500, camTime);
        this.camera.position.z = smoothstep(13000, 2500, camTime);

        this.camera.lookAt(new THREE.Vector3(0,800,0));
    } else if (t < this.startTime + 5500) {
        if (this.camera.oldRotation === undefined) {
            this.camera.oldRotation = this.camera.rotation.clone();
        }
        var newPos = new THREE.Vector3(
            0, 800, 2700
        );
        var dummy = new THREE.Camera();
        dummy.position = this.camera.position;
        dummy.lookAt(newPos);
        var panTime = (t - this.startTime - 4000)/1500;
        this.camera.rotation.x = smoothstep(
            this.camera.oldRotation.x,
            dummy.rotation.x,
            panTime
        );
        this.camera.rotation.y = smoothstep(
            this.camera.oldRotation.y,
            dummy.rotation.y,
            panTime
        );
        this.camera.rotation.z = smoothstep(
            this.camera.oldRotation.z,
            dummy.rotation.z,
            panTime
        );
        this.camera.fov = smoothstep(
            45,
            15,
            panTime
        );
        this.camera.updateProjectionMatrix();
    } else if (t < this.startTime + 6000) {
        // Blur effects
    } else if (t < this.startTime + 30000) {
        this.camera.fov = 45;
        this.camera.position = new THREE.Vector3(400, 880, 3200);
        this.camera.lookAt(this.train.grouped.position);
    }
}

MountainScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);
    //this.composer.render();
}

MountainScene.prototype.setupLights = function() {
    var light = new THREE.DirectionalLight(0xdefbff, 1.75);
    light.position.set(50, 200, 100);
    light.position.multiplyScalar(1.3);
    this.scene.add(light);
};

MountainScene.prototype.generateHeight = function(width, height) {

    var size = width * height, data = new Float32Array(size);

    Math.seedrandom("0");
    var perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

    for (var i=0; i < size; i++) {
        data[i] = 0;
    }

    for (var j=0; j<4; j++) {
        for (var i=0; i < size; i++) {
            var x = i % width, y = ~~ (i / width);
            var radius = Math.sqrt(Math.pow(x-width/2, 2) + Math.pow(y-height/2, 2));
            var heightRatio = Math.max(1-radius/width*2, 0);
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * Math.pow(heightRatio,2) * 5);
        }
        quality *= 5;
    }

    return data;
};

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
};

MountainScene.prototype.getYValue = function(x,z) {
    if ( z > this.size/2
        || z < -this.size/2
        || x > this.size/2
        || x < -this.size/2) {
        return false;
    }

    var factor = this.size / this.segments;

    var scaled_x = ( x / factor ) | 0;
    var scaled_z = ( z / factor ) | 0;

    var dataIndex = ( this.segments/2 + scaled_x ) + this.segments * ( this.segments/2 + scaled_z);
    var height = this.mapData[ dataIndex ] * 10; // geometry is scaled by this value 

    return height;
};

MountainScene.prototype.initSkyBox = function() {
    var imagePath = "res/red_floral.jpg";
    var skyGeometry = new THREE.CubeGeometry( 26000, 26000, 26000 );   
    var materialArray = [];
    for (var i = 0; i < 6; i++) {
    	materialArray.push( new THREE.MeshBasicMaterial({
    		map: THREE.ImageUtils.loadTexture(imagePath),
    		side: THREE.BackSide
    	}));
    }
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.position.y = 12000;
    this.scene.add(skyBox);
};
