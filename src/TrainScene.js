function TrainScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 10000;
    /* short name of this scene, must be defined */
    this.NAME = 'train';
}

TrainScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

	var texture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.addEventListener('load', function (event) {
		texture.image = event.content;
		texture.needsUpdate = true;
	});
	loader.load('res/wooden train diffuse.jpg');

	var that = this;
	
	var loader = new THREE.OBJLoader();
	loader.addEventListener('load', function (event) {
		that.train = event.content;
		that.train.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = texture;
			}
		});
		that.train.position.y = - 80;
		that.scene.add(that.train);
	});
	loader.load('res/wooden train.obj');
	
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
    this.camera.position.z = 300;
};

TrainScene.prototype.update = function(){
	/* do updatey stuff here */
	this.camera.position.z -= 1;
	this.camera.position.x += Math.sin(0.001*t);
	this.camera.lookAt(this.train.position);
	
};

TrainScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);
};
