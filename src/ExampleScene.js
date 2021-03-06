function ExampleScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 118000;
    /* short name of this scene, must be defined */
    this.NAME = 'example';
}

ExampleScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});

    this.sphere = new THREE.Mesh( new THREE.SphereGeometry(
        50, 16, 16), sphereMaterial);

    this.scene.add(this.sphere);


    /* call cb when you are done loading! */
    cb();
}

ExampleScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 300;
}

ExampleScene.prototype.update = function(){
    /* do updatey stuff here */
}

ExampleScene.prototype.render = function(){
    /* do rendery stuff here */
    renderer.render(this.scene, this.camera);

}
