function MountainScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 16700;
    /* short name of this scene, must be defined */
    this.NAME = 'mountain';

    this.segments = 192;
    this.halfSegments = 96;
    this.size = 8000;
};
 
MountainScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 1, 50000);
    this.scene.add(this.camera);

    this.initMountain();

    this.initWater();

    this.initTrees();

    this.setupLights();
    
    this.initSkyBox();

    this.initSmokePuffs();

    /* call cb when you are done loading! */
    this.initTrainAndRails(function() {
    	cb();
    });
};

MountainScene.prototype.initTrainAndRails = function(cb) {
    this.rails = [];
    var that = this;
    this.train = new Train();
    this.train.startTime = this.startTime + 10000;
    this.train.init(function() {
    	that.train.grouped.scale.x = 10;
    	that.train.grouped.scale.y = 10;
    	that.train.grouped.scale.z = 10;
    	that.train.grouped.position.y = 885;
        that.train.grouped.position.x = 2485*Math.sin(300*0.0002);
        that.train.grouped.position.z = 2485*Math.cos(300*0.0002);
    	that.scene.add(that.train.grouped);
    	
        that.rails = new Rails();
        that.rails.startTime = that.startTime + 8500;
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

    this.composernoise = new THREE.EffectComposer(renderer, RENDERTARGET);
    this.composernoise.addPass( new THREE.RenderPass(this.scene, this.camera));
    this.noiseShaderEffect = new THREE.ShaderPass(THREE.NoiseShader);
    this.noiseShaderEffect.renderToScreen = true;
    this.composernoise.addPass(this.noiseShaderEffect);

    this.composersquash = new THREE.EffectComposer( renderer, RENDERTARGET );
    this.composersquash.addPass( new THREE.RenderPass(this.scene, this.camera));
    this.squashShaderEffect = new THREE.ShaderPass(THREE.SquashShader);
    this.squashShaderEffect.renderToScreen = true;
    this.composersquash.addPass(this.squashShaderEffect);

    mesh.position.y = 50;
};

MountainScene.prototype.attachArms = function() {
    var that = this;
    this.arms = new Arms(20);
    this.arms.init(function() {
        that.scene.add(that.arms.grouped);
        that.arms.title.style.opacity = 1;
    });
};

MountainScene.prototype.detachArms = function() {
    this.scene.remove(this.arms.grouped);
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
        party: {type:'f', value: 0},
        gravel: {type: 't', value: THREE.ImageUtils.loadTexture('res/gravel.jpg')},
        grass: {type: 't', value: THREE.ImageUtils.loadTexture('res/floral.jpg')},
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
    while (treesPlaced < 100) {
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

MountainScene.prototype.initSmokePuffs = function() {
    this.smokePuffs = new Array();
};

MountainScene.prototype.reset = function(){
    this.camera.position.y = 70;
};

MountainScene.prototype.update = function(){
	var relativeT = t - this.startTime;
	this.train.update();
	this.rails.update();

    this.mountainuniforms.time.value = t;
    this.mountainuniforms.party.value = +(t > (32180 + this.startTime));

    if(t == 64740){
        swapstagroover(); 
    }
    if(t == 80700){
        swapstagroover(); 
    }

    this.updateCamera(relativeT);

    for(var i=0;i<this.smokePuffs.length; i++) {
        this.updateSmoke(this.smokePuffs[i]);
    }

    var timeToStartMovingTrain = 30500;
    if (relativeT > timeToStartMovingTrain) {
        this.train.grouped.position.x = 2485*Math.sin((relativeT-timeToStartMovingTrain)*0.0002);
        this.train.grouped.position.z = 2485*Math.cos((relativeT-timeToStartMovingTrain)*0.0002);
        this.train.grouped.rotation.y += 0.004;
        this.train.rotateWheels();
        if(relativeT > 32250)
        this.train.partytime();
    }

    this.uniforms.time.value = t/1500;
    this.uniforms.time2.value = t/1500;
    this.uniforms.eyePos.value = this.camera.position;

    if (relativeT < 4000) {
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

    this.noiseShaderEffect.uniforms.width.value = (16*GU)/4;
    this.noiseShaderEffect.uniforms.time.value = t/1000 % 1000;
    this.noiseShaderEffect.uniforms.height.value = (9*GU)/4;
    //this is how much noise there should be
    this.noiseShaderEffect.uniforms.amount.value = Math.max(0.025, Math.min(0.07, Math.sin(t/1000)-0.9));
};

MountainScene.prototype.updateCamera = function(relativeT) {
    if (relativeT < 4000) {
        var camTime = relativeT/4000;
        this.camera.position.x = smoothstep(13000, 2500, camTime);
        this.camera.position.z = smoothstep(13000, 2500, camTime);
        this.camera.position.y = smoothstep(550, 70, camTime);

        this.camera.lookAt(new THREE.Vector3(0,500,0));
    } else if (relativeT < 8000) {
        var camTime = (relativeT-4000)/4000;
        this.camera.position.x = smoothstep(2500, 3000, camTime);
        this.camera.position.y = smoothstep(70, 900, camTime);
        this.camera.position.z = smoothstep(2500, -1500, camTime);
        this.camera.lookAt(new THREE.Vector3(0, 500, 0));
    } else if (relativeT < 10500) {
        var camTime = (relativeT-8000)/2500;
        this.camera.position.x = smoothstep(3000, 2000, camTime);
        this.camera.position.y = smoothstep(900, 700, camTime);
        this.camera.position.z = smoothstep(-1500, -2000, camTime);
        this.camera.fov = smoothstep(45, 25, camTime);
        this.camera.updateProjectionMatrix();
    } else if (relativeT < 20000) {
        this.camera.fov = 45;
        this.camera.updateProjectionMatrix();
        if (this.startCameraThree === undefined) {
            this.startCameraThree = {
                position: new THREE.Vector3(-300, 800, 2800),
                fov: this.camera.fov
            };
        }
        moveCamera(
            this.startCameraThree,
            this.camera,
            new THREE.Vector3(540, 840, 2800),
            9500,
            1,
            relativeT - 10500
        );
        this.camera.lookAt(this.train.grouped.position);
    } else if (relativeT < 21000) {
        // Wait
    } else if (relativeT < 24000) {
        var camTime = (relativeT-21000)/3000;
        this.camera.position.x = smoothstep(300, 550, camTime);
        this.camera.position.y = smoothstep(1100, 920, camTime);
        this.camera.position.z = 2675;

        this.camera.lookAt(new THREE.Vector3(0, 820, 2700));
    } else if (relativeT < 29000) {
        var camTime = (relativeT-24000)/5000;
        this.camera.position.x = smoothstep(-2000, -1500, camTime);
        this.camera.position.y = 2300;
        this.camera.position.z = smoothstep(3800, 3600, camTime);

        this.camera.lookAt(new THREE.Vector3(0, 820, 2700));
    } else if (relativeT < 32000) {
        var camTime = (relativeT - 29000) / 3000;
        if (this.startCameraFour === undefined) {
            this.startCameraFour = {
                position: new THREE.Vector3(500, 800, 2650),
                fov: this.camera.fov
            };
        }
        moveCamera(
            this.startCameraFour,
            this.camera,
            new THREE.Vector3(700, 800, 2950),
            3000,
            1,
            relativeT - 29000
        );

        var cameraTarget = {
            x: smoothstep(300, 550, camTime),
            y: 850,
            z: smoothstep(2650, 2600, camTime)
        };
        this.camera.lookAt(new THREE.Vector3(
            cameraTarget.x,
            cameraTarget.y,
            cameraTarget.z
        ));
    } else if (relativeT > (80700 - 14000)) {
        if (this.arms) { 
            this.arms.update(this.train.grouped.position.y, this.train.grouped.rotation.y + Math.PI/2, relativeT); 
        } else {
            this.attachArms();
        }

        this.camera.position.y = this.arms.grouped.position.y + 100 + smoothstep(-100, 100, (relativeT - (80700 - 14000)) / 6000 );
        this.camera.position.x = 2700*Math.sin((relativeT + 3000)*0.0002);
        this.camera.position.z = 2700*Math.cos((relativeT + 3000)*0.0002);

        this.camera.fov = 25;
        this.camera.updateProjectionMatrix();

        var hackyPos = this.arms.grouped.position.clone();
        hackyPos.y += 150;
        this.camera.lookAt(hackyPos);
    } else {
        // this.camera.lookAt(this.train.grouped.position);
    }
};

MountainScene.prototype.updateSmoke = function(updateParticleGroup){
    
    for ( var c = 0; c < updateParticleGroup.children.length; c ++ ) 
    {
        var sprite = updateParticleGroup.children[ c ];

            // particle wiggle
             var wiggleScale = 2;
             sprite.position.x += wiggleScale * (Math.random() - 0.5);
             sprite.position.y += wiggleScale * (Math.random() - 0.5);
             sprite.position.z += wiggleScale * (Math.random() - 0.5);

        var a = particleAttributes.randomness[c] + 1;
        var pulseFactor = Math.sin(a * 0.01 * t) * 0.1 + 0.9;
        sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
        sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor + updateParticleGroup.rotation.y*40;
        sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;
    }

    updateParticleGroup.rotation.y = t * 0.00075;
    if(particleGroup.rotation.y>20) {
        this.scene.remove(updateParticleGroup)
    }
}

MountainScene.prototype.addSmokePuff = function(x,y,z) {
    var particleTexture = THREE.ImageUtils.loadTexture( 'images/smokeparticle.png' );
    
    particleGroup = new THREE.Object3D();
    particleAttributes = { startSize: [], startPosition: [], randomness: [] };

    var totalParticles = 200;
    var radiusRange = 50;
    for( var i = 0; i < totalParticles; i++ ) 
    {
        var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, useScreenCoordinates: false, color: 0xffffff } );

        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set( 32, 32, 1.0 ); // imageWidth, imageHeight
        sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
        sprite.position.setLength( radiusRange * (Math.random() * 0.1 + 0.9) );

        sprite.material.color.setHSL( 0, 0, 0.4 ); 
        sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
        particleGroup.add( sprite );
        particleAttributes.startPosition.push( sprite.position.clone() );
        particleAttributes.randomness.push( Math.random() );
    }
    particleGroup.position.set(x,y,z);
    this.smokePuffs.push(particleGroup);
    this.scene.add( particleGroup );
}

MountainScene.prototype.render = function(){
    /* do rendery stuff here */
    if(t > 64239 && t < 64740 || t > 80700 && t < 81200) {
        this.composersquash.render();
    } else {
        music.volume ? this.composernoise.render()
                     : this.composer.render();
    }

};

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
    var material =  new THREE.MeshBasicMaterial({
    		map: THREE.ImageUtils.loadTexture(imagePath),
    		side: THREE.BackSide
    	});
    for (var i = 0; i < 6; i++) {
        materialArray[i] = material;
    }
    var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
    skyBox.position.y = 12000;
    this.scene.add(skyBox);
};
