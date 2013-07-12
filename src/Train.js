function Train(){
	this.startTime = 0;
}

Train.prototype.init = function(cb){
    this.objects = [];
    this.grouped = new THREE.Object3D();
    var that = this;
	
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
						that.objects[name] = object;
					} else {
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
					}
					if (typeof trainParts[i].initPos !== 'undefined') {
						console.log(trainParts[i].initPos);
						that.objects[name].position.x += trainParts[i].initPos.x;
						that.objects[name].position.y += trainParts[i].initPos.y;
						that.objects[name].position.z += trainParts[i].initPos.z;
					}
					that.grouped.add(that.objects[name]);
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

Train.prototype.update = function(){
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
				if (relativeT > animation.end && ++part.activeAnimation === part.animations.length) {
					console.log("an animation for " + part.name + " has ended at " + t);
					part.activeAnimation = -1;
				}
			}
		} else if (part.type === 'wheel') {
			object.rotation.z -= 0.1*Math.PI;
		}
	}
};