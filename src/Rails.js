function Rails(){
	this.startTime = 0;
}

Rails.prototype.init = function(cb){
    var that = this;
	
    var resourceFolderPath = 'res/';
    var defaultTexturePath = resourceFolderPath + 'cross_diffuse.jpg';
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.addEventListener('load', function (event) {
    	texture.image = event.content;
    	texture.needsUpdate = true;
    });
    loader.load(defaultTexturePath);
    
    this.rails = [];
    this.grouped = new THREE.Object3D();
    
	var loader = new THREE.OBJLoader();
	loader.addEventListener('load', function (event) {
		that.object = event.content;
		that.object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = texture;
			}
		});
    	for (var i = 0; i < 63; i++) {
    		that.rails[i] = that.object.clone();
    		var y = 800;
    		that.rails[i].position.x = 2700*Math.sin(i*0.1);
    		that.rails[i].position.z = 2700*Math.cos(i*0.1);
    		that.rails[i].rotation.y = 0.1*i + Math.PI * 0.5;
    		var relativeStartY = 5000;
    		that.rails[i].animations = [
	            {
	    	        start: 0,
	    	        end: i*300,
	    	        fromY: y + relativeStartY,
	    	        toY: y + relativeStartY
	            },
	            {
	            	start: i*300,
	            	end: i*300 + 1000,
	            	fromY: y + relativeStartY,
	            	toY: y
	            },
	        ];
    		that.rails[i].activeAnimation = 0;
    	    that.grouped.add(that.rails[i]);
    	}
		cb();	//done with the loading
	});
	loader.load(resourceFolderPath + 'rail_track.obj');
};

Rails.prototype.update = function(){
	var relativeT = t - this.startTime;
	for (var i = 0; i < this.rails.length; i++) {
		var object = this.rails[i];
		if (object.activeAnimation >= 0) {
			var animation = object.animations[object.activeAnimation];
			if (relativeT >= animation.start) {
				var animationLength = animation.end - animation.start;

				//number between 0 and 1
				var animationProgress = Math.min((relativeT - animation.start) / animationLength, 1);
				object.position.y = smoothstep(animation.fromY, animation.toY, animationProgress);
				
				//if animation is done, go to next animation for this object if available
				if (relativeT > animation.end && ++object.activeAnimation === object.animations.length) {
					object.activeAnimation = -1;
				}
			}
		}
	}
};