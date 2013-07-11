function TrainScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    /* short name of this scene, must be defined */
    this.NAME = 'train';
	
	this.parts = [
          {
        	  name:'front_left_wheel0',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(-19.15,5,0),
        	  activeAnimation: 0,
        	  animation: [
	              {
	            	  start: 0,
	            	  end: 2000,
	            	  fromPos: {
	            		  x: 0,
	            		  y: 0,
	            		  z: 20
	            	  },
	            	  toPos: {
	            		  x: 0,
	            		  y: 0,
	            		  z: 0
	            	  }
	              },
              ]
          },
          {
        	  name:'front_left_wheel1',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(-12.7,5,0)
          },
          {
        	  name:'front_right_wheel0',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(-19.15,5,0)
          },
          {
        	  name:'front_right_wheel1',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(-12.7,5,0)
          },
          {
        	  name:'middle_left_wheel0',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(-1.1,5,0)
          },
          {
        	  name:'middle_left_wheel1',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(5.4,5,0)
          },
          {
        	  name:'middle_right_wheel0',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(-1.1,5,0)
          },
          {
        	  name:'middle_right_wheel1',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(5.4,5,0)
          },
          {
        	  name:'rear_left_wheel0',
        	  loaded:false,
        	  type:'wheel',
        	  offset: new THREE.Vector3(16.6,5,0)
          },
          {
        	  loaded:false,
        	  name:'rear_left_wheel1',
        	  type:'wheel',
        	  offset: new THREE.Vector3(23.1,5,0)
          },
          {
        	  loaded:false,
        	  name:'rear_right_wheel0',
        	  type:'wheel',   offset: new THREE.Vector3(16.6,  5,0)},
          {
              loaded: false,
              name: 'rear_right_wheel1',
              type: 'wheel',
              offset: new THREE.Vector3(23.1, 5, 0)
          },
          {
              loaded: false,
              name: 'chimney'
          },
          {
              loaded: false,
              name: 'cube0'
          },
          {
              loaded: false,
              name: 'cube1'
          },
          {
              loaded: false,
              name: 'cube2'
          },
          {
              loaded: false,
              name: 'cube3'
          },
          {
              loaded: false,
              name: 'front_body'
          },
          {
              loaded: false,
              name: 'front_bullet'
          },
          {
              loaded: false,
              name: 'front_plate'
          },
          {
              loaded: false,
              name: 'lower_plate'
          },
          {
              loaded: false,
              name: 'middle_body'
          },
          {
              loaded: false,
              name: 'middle_plate'
          },
          {
              loaded: false,
              name: 'pole0'
          },
          {
              loaded: false,
              name: 'pole1'
          },
          {
              loaded: false,
              name: 'pole2'
          },
          {
              loaded: false,
              name: 'pole3'
          },
          {
              loaded: false,
              name: 'pole4'
          },
          {
              loaded: false,
              name: 'pole5'
          },
          {
              loaded: false,
              name: 'rear_body'
          },
          {
              loaded: false,
              name: 'roof1'
          },
          {
              loaded: false,
              name: 'roof2'
          },
          {
              loaded: false,
              name: 'roof3'
          },
          {
              loaded: false,
              name: 'upper_plate'
          }
      ];
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
    pointLight.position.z = -130;
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
			for (var i = 0; i < that.parts.length; i++) {
				if (that.parts[i].name === name) {
					that.parts[i].loaded = true;
					if (that.parts[i].type === 'wheel') {
						var offset = that.parts[i].offset;
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
				if (!that.parts[i].loaded) {
					everythingIsLoaded = false;
				}
			}
			if (everythingIsLoaded) {
				//console.log("all objects are loaded");
				cb();	//done with the loading
			}
		});
		loader.load(objPath);
	};
	
	for (var i = 0; i < this.parts.length; i++) {
		var partName = this.parts[i].name;
		var objPath = resourceFolderPath + partName + '.obj';
		loadObject(objPath, partName);
	}
};

TrainScene.prototype.reset = function(){
    /* reset all the variables! */
    this.camera.position.x = 0;
    this.camera.position.z = -20;
    
};

TrainScene.prototype.update = function(){
	//this.camera.position.y += 0.01;
	this.camera.lookAt(this.objects['roof1'].position);
	
	for (var i = 0; i < this.parts.length; i++) {
		var object = this.objects[this.parts[i].name];
		var part = this.parts[i];
		if (part.type === 'wheel') {
			object.rotation.z -= 0.06*Math.PI;
		}
		if (part.activeAnimation >= 0) {
			var animation = part.animations[part.activeAnimation];
			
			if (++part.activeAnimation === part.animations.length) {
				part.activeAnimation = -1;
			}
		}
	}
	
};

TrainScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);
};
