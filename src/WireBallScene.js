function WireBallScene(){
    /* starting time of this scene in milliseconds, must be defined */
    this.startTime = 2000
    /* short name of this scene, must be defined */
    this.NAME = 'wireball'
}

WireBallScene.prototype.init = function(cb){
    /* do loady stuff here */

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, 16/9, 3.3, 20000)
    this.scene.add(this.camera)

    this.light = new THREE.PointLight( 0xffffff )
    this.light.position.set(GU,500,500)
    this.scene.add(this.light)

    var sphereGeom =  new THREE.SphereGeometry( 50, 32, 16 )

    var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ee00, wireframe: true, transparent: true } )

    this.sphereWire = new THREE.Mesh( sphereGeom.clone(), wireframeMaterial )
    this.sphereWire.position.set(0,50,0)
    this.scene.add( this.sphereWire )

    /* call cb when you are done loading! */
    cb()
}

WireBallScene.prototype.reset = function(){
    /* reset all the variables! */

    this.camera.position.z = 300
}

WireBallScene.prototype.update = function(){
    /* do updatey stuff here */
}

WireBallScene.prototype.render = function(){
    /* do rendery stuff here */

    this.sphereWire.rotation.x = Math.sin(t*0.0052)
    this.sphereWire.rotation.y = Math.sin(t*0.00082)
    this.sphereWire.position.y = Math.sin(t*0.002)*75

    renderer.render(this.scene, this.camera)

}
