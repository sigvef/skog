function ExampleScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 145000;
    /* short name of this scene, must be defined */
    this.NAME = 'example';
}

ExampleScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 10000);
    this.scene.add(this.camera);

    this.renderModel = new THREE.RenderPass(this.scene, this.camera);
    this.renderModel.clear = false;

    this.composerScene = new THREE.EffectComposer(renderer, new THREE.WebGLRenderTarget(16*GU, 9*GU, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        stencilBuffer: true
    }));

    this.noiseEffect = new THREE.ShaderPass(THREE.NoiseShader);
    this.noiseEffect.renderToScreen = true;

    this.updateEffects();

    this.composer = new THREE.EffectsComposer(renderer, new THREE.WebGLRenderTarget(16*GU, 9*GU, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        stencilBuffer: true
    }));
    this.composer.addPass(this.renderScene);
    this.composer.addPass(this.noiseEffect);

    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

    this.sphere = new THREE.Mesh( new THREE.SphereGeometry(
        50, 16, 16), sphereMaterial);

    this.light = new THREE.PointLight( 0xffffff, 0.2, 100 );
    this.scene.add(this.light);
    
    this.scene.add(this.sphere);


    /* call cb when you are done loading! */
    cb();
}

ExampleScene.prototype.updateEffects = function() {
    this.noiseEffect.uniforms["amount"].value = 0.2;
    this.noiseEffect.uniforms["time"].value = t/1000;
};

ExampleScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 300;
}

ExampleScene.prototype.update = function(){
    /* do updatey stuff here */
}

ExampleScene.prototype.render = function(){
    /* do rendery stuff here */
    var delta = 0.2;
    //renderer.render(this.scene, this.camera);
    renderer.setViewport(0,0,16*GU,9*GU);
    renderer.clear();
    this.composerScene.render(delta);
    renderer.setViewport(0,0,16*GU,9*GU);
    this.composer.render(delta);

}
