function TrainScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'train';
}

TrainScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

    this.objects = [];
    var that = this;
    
    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);
    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    // add to the scene
    this.scene.add(pointLight);
	
    var resourceFolderPath = 'res/';
    var defaultTexturePath = resourceFolderPath + 'wooden train diffuse.jpg';
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.addEventListener('load', function (event) {
    	texture.image = event.content;
    	texture.needsUpdate = true;
    });
    loader.load(defaultTexturePath);
    
	var loadObject = function (objPath, name) {
		var loader = new THREE.OBJLoader();
		loader.addEventListener('load', function (event) {
			var object = event.content;
			object.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					child.material.map = texture;
				}
			});
			var everythingIsLoaded = true;
			for (var i = 0; i < trainParts.length; i++) {
				if (trainParts[i].name === name) {
					trainParts[i].loaded = true;
					if (trainParts[i].animations && trainParts[i].animations.length > 0) {
						trainParts[i].activeAnimation = 0;
					}
					if (typeof trainParts[i].offset === 'undefined') {
						trainParts[i].offset = new THREE.Vector3(0, 0, 0);
					}
					if (trainParts[i].type === 'wheel') {
						var offset = trainParts[i].offset;
						var pivot = new THREE.Object3D();
						pivot.position.x = -offset.x;
						pivot.position.y = -offset.y;
						pivot.position.z = -offset.z;
						object.position.x += offset.x;
						object.position.y += offset.y;
						object.position.z += offset.z;
						pivot.add(object);
						that.objects[name] = pivot;
						that.scene.add(pivot);
					} else {
						that.objects[name] = object;
						that.scene.add(object);
					}
				}
				if (!trainParts[i].loaded) {
					everythingIsLoaded = false;
				}
			}
			if (everythingIsLoaded) {
				console.log("all train parts are loaded");
				cb();	//done with the loading
			}
		});
		loader.load(objPath);
	};
	
	for (var i = 0; i < trainParts.length; i++) {
		var partName = trainParts[i].name;
		var objPath = resourceFolderPath + partName + '.obj';
		loadObject(objPath, partName);
	}
};

TrainScene.prototype.reset = function(){
    /* reset all the variables! */
    this.camera.position.y = 5;
    this.camera.position.z = 80;
};

TrainScene.prototype.update = function(){
	//this.camera.position.y += 0.01;
	var relativeT = t - this.startTime;
	
	for (var i = 0; i < trainParts.length; i++) {
		var object = this.objects[trainParts[i].name];
		var part = trainParts[i];
		if (part.activeAnimation >= 0) {
			var animation = part.animations[part.activeAnimation];
			if (relativeT >= animation.start) {
				var animationLength = animation.end - animation.start;

				//number between 0 and 1
				var animationProgress = Math.min((relativeT - animation.start) / animationLength, 1);
				
				var x = smoothstep(animation.fromPos.x, animation.toPos.x, animationProgress);
				var y = smoothstep(animation.fromPos.y, animation.toPos.y, animationProgress);
				var z = smoothstep(animation.fromPos.z, animation.toPos.z, animationProgress);
				
				object.position.x = x - part.offset.x;
				object.position.y = y - part.offset.y;
				object.position.z = z - part.offset.z;
				
				//if animation is done, go to next animation for this object if available
				if (t > animation.end && ++part.activeAnimation === part.animations.length) {
					console.log("an animation for " + part.name + " has ended at " + t);
					part.activeAnimation = -1;
				}
			}
		} else if (part.type === 'wheel') {
			object.rotation.z -= 0.06*Math.PI;
		}
	}
	
};

TrainScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);
};
