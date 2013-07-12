function ArmsScene(scale){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 0;
    this.scale = scale;
    /* short name of this scene, must be defined */
    this.NAME = 'arms';

    this.leftArm = null;
    this.rightArm = null;
    this.grouped = new THREE.Object3D();
    arms = this;
}

ArmsScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

    // Begin Arms
    var resourceFolderPath = 'res/';
    var defaultTexturePath = resourceFolderPath + 'tileable_human_skin_texture_zoom.jpg';

    // Texture loader
    var texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();

    loader.addEventListener('load', function (event) {
        texture.image = event.content;
        texture.needsUpdate = true;
    });
    loader.load(defaultTexturePath);

    var that = this;

    // Object loader
    var objPath = resourceFolderPath + "arm low poly" + ".obj";
    var objLoader = new THREE.OBJLoader();

    objLoader.addEventListener( 'load', function ( event ) {
        var object = event.content;

        object.traverse( function ( child ) { 
            if ( child instanceof THREE.Mesh ) { 
                child.material.map = texture; 
            } 
        }); 

        console.log("Working on the arms!");
        //object.position.y -= 80;

        that.leftArm = object.clone();
        that.rightArm = object.clone();
        console.log("Scale is!", that.scale);

        that.leftArm.scale.set(1.3*that.scale, 1.3*that.scale, 1.3*that.scale);
        that.rightArm.scale.set(1.3*that.scale, 1.3*that.scale, 1.3*that.scale);

        // Reposition arms
        that.leftArm.position.y = -6*that.scale;
        that.rightArm.position.y = -6*that.scale;
        that.rightArm.rotation.y -= Math.PI;

        // Public for debugging
        pLeftArm = that.leftArm;
        pRightArm = that.rightArm;

        that.grouped.add(that.leftArm);
        that.grouped.add(that.rightArm);
        that.scene.add(that.grouped);

        /* call cb when you are done loading! */
        cb();
    });
    objLoader.load( objPath );

    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    this.scene.add(pointLight);
}

ArmsScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 100;
}

ArmsScene.prototype.update = function(position){
    //this.grouped.position = position.clone();
}

ArmsScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}
