function GreetScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 100000;
    /* short name of this scene, must be defined */
    this.NAME = 'greet';
}

GreetScene.prototype.init = function(cb){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.fov, 16/9, 0.1, 10000); this.scene.add(this.camera);

    this.composer = new THREE.EffectComposer(renderer, RENDERTARGET);
    this.composer.addPass( new THREE.RenderPass(this.scene, this.camera));

    var effect = new THREE.ShaderPass(GreetShader);
    effect.renderToScreen = true;
    this.composer.addPass(effect);
    this.message = "      greetings to   outracks   mrdoob   solskogen crew   and everybody else      by ninjadev                                             ";
    /* because ascii math is for suckers */
    this.map = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7,
        i: 8,
        j: 9,
        k: 10,
        l: 11,
        m: 12,
        n: 13,
        o: 14,
        p: 15,
        q: 16,
        r: 17,
        s: 18,
        t: 19,
        u: 20,
        v: 21,
        w: 22,
        x: 23,
        y: 24,
        z: 25,
        ' ': 26,
    };
    cb();
}

GreetScene.prototype.reset = function(){
    /* reset all the variables! */
}

GreetScene.prototype.update = function(){
    var txt = [];
    for(var i=0;i<6;i++){
        txt[i] = this.map[this.message[i + (t - this.startTime)/500*1.5|0]];
    }
    GreetShader.uniforms.text.value = txt;
    GreetShader.uniforms.time.value = t - this.startTime;
}

GreetScene.prototype.render = function(){
    this.composer.render();
}
