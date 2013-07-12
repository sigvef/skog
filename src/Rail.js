function Rail(){
	this.startTime = 0;
}

Rail.prototype.init = function(cb){
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
    
	var loader = new THREE.OBJLoader();
	loader.addEventListener('load', function (event) {
		that.object = event.content;
		that.object.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				child.material.map = texture;
			}
		});
		cb();	//done with the loading
	});
	loader.load(resourceFolderPath + 'rail_track.obj');
};

Rail.prototype.update = function(){
	var relativeT = t - this.startTime;
};