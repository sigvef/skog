function Tree() {
    var combined = new THREE.Geometry();

    var topGeometry = new THREE.CylinderGeometry(0, 35, 70, 50, 50, false);
    var middleGeometry = new THREE.CylinderGeometry(15, 45, 60, 50, 50, false);
    var bottomGeometry = new THREE.CylinderGeometry(10, 10, 35, 25, 25, false);

    var topMesh = new THREE.Mesh(topGeometry);
    topMesh.position.y = 60;
    
    THREE.GeometryUtils.merge(combined, topMesh);
    THREE.GeometryUtils.merge(combined, middleGeometry);

    this.topPart = new THREE.Mesh(combined, new THREE.MeshLambertMaterial({color: 0x66ff66}));
    this.bottomPart = new THREE.Mesh(bottomGeometry, new THREE.MeshLambertMaterial({color: 0x884400}));

    this.topPart.position.y = 35;
    
    this.tree = new THREE.Object3D();
    this.tree.add(this.topPart);
    this.tree.add(this.bottomPart);

    return this.tree;
}
