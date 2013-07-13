function Arms(scale){
    this.scale = scale;
    this.leftArm = null;
    this.rightArm = null;
    this.grouped = new THREE.Object3D();
    this.doneLoading = false;
}

Arms.prototype.init = function(cb){
    // Begin Arms
    var resourceFolderPath = 'res/';
    var defaultTexturePath = resourceFolderPath + 'tileable_human_skin_texture_zoom.jpg';

    // Begin hasGoneTooFar loader
    this.title = new Image();
    this.title.src = 'res/It has gone too far.png';
    this.title.style.opacity = 0;
    this.title.style.position = 'absolute';
    this.title.style.zIndex = 99999999999;
    
    var w = 1024/16*GU*0.13;
    var h = 1024/16*GU*0.13;

    this.title.style.width =  w + 'px';
    this.title.style.height = h + 'px';
    this.title.style.left = renderer.domElement.offsetLeft + 8*GU - w/2 + 'px';
    this.title.style.top = renderer.domElement.offsetTop + 4.5*GU - h/2 + 'px';
    document.body.appendChild(this.title);

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
    var objPath = resourceFolderPath + "armswag" + ".obj";
    var objLoader = new THREE.OBJLoader();

    objLoader.addEventListener( 'load', function ( event ) {
        var object = event.content;

        object.traverse( function ( child ) { 
            if ( child instanceof THREE.Mesh ) { 
                child.material.map = texture; 
            } 
        }); 

        that.leftArm = object.clone();
        that.rightArm = object.clone();

        that.leftArm.scale.set(2*that.scale, 2*that.scale, 2*that.scale);
        that.rightArm.scale.set(2*that.scale, 2*that.scale, 2*that.scale);

        that.rightArm.rotation.y -= Math.PI;

        that.leftArm.position.x = 0.5*that.scale;
        that.rightArm.position.x = -0.5*that.scale;

        that.leftArm.position.y = -6.3 * that.scale;
        that.rightArm.position.y = -6.3 * that.scale;

        // Public for debugging
        pLeftArm = that.leftArm;
        pRightArm = that.rightArm;

        that.grouped.add(that.leftArm);
        that.grouped.add(that.rightArm);

        that.doneLoading = true;
        cb();
    });

    objLoader.load( objPath );
}

Arms.prototype.update = function(trainY, yRotate, relativeT){
    // Update the armGroup position
    if (this.doneLoading) {
        this.grouped.position.y = trainY - 105;
        this.grouped.position.x = 2700*Math.sin((relativeT + 1000)*0.0002);
        this.grouped.position.z = 2700*Math.cos((relativeT + 1000)*0.0002);

        // Rotate the arms
        this.leftArm.rotation.y = yRotate + Math.PI/8 * Math.sin(relativeT/50);
        this.rightArm.rotation.y = yRotate + Math.PI - Math.PI/8 * Math.sin(relativeT/50);
    }
}