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
			that.objects[name] = event.content;
			that.objects[name].traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					child.material.map = texture;
				}
			});
			that.scene.add(that.objects[name]);
		});
		loader.load(objPath);
	};
	
	parts = [
	              'chimney',
	              'cube0',
	              'cube1',
	              'cube2',
	              'cube3',
	              'front_body',
	              'front_bullet',
	              'front_plate',
	              'front_left_wheel0',
	              'front_left_wheel1',
	              'front_right_wheel0',
	              'front_right_wheel1',
	              'lower_plate',
	              'middle_body',
	              'middle_plate',
	              'middle_left_wheel0',
	              'middle_left_wheel1',
	              'middle_right_wheel0',
	              'middle_right_wheel1',
	              'pole0',
	              'pole1',
	              'pole2',
	              'pole3',
	              'pole4',
	              'pole5',
	              'rear_body',
	              'rear_left_wheel0',
	              'rear_left_wheel1',
	              'rear_right_wheel0',
	              'rear_right_wheel1',
	              'roof0',
	              'roof1',
	              'roof2',
	              'roof3',
	              'upper_plate'
    ];
	for (var i = 0; i < parts.length; i++) {
		var partName = parts[i];
		var objPath = resourceFolderPath + partName + '.obj';
		loadObject(objPath, partName);
	}
	
	// create a point light
	var pointLight = new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	this.scene.add(pointLight);

    /* call cb when you are done loading! */
    cb();
};

TrainScene.prototype.reset = function(){
    /* reset all the variables! */
    this.camera.position.x = 0;
    this.camera.position.z = 100;
    
};

TrainScene.prototype.update = function(){
	/* do updatey stuff here */
	this.camera.position.y += 0.01;
	this.camera.position.z -= 0.1;
	
	if (this.loaded) {
		this.camera.lookAt(this.objects['upper_plate'].position);
	}
};

TrainScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);
};
