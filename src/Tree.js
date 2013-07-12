function Tree() {
    var combined = new THREE.Geometry();
    var matrix = new THREE.Matrix4();

    var topGeometry = new THREE.CylinderGeometry(0, 35, 70, 6, 6, false);
    topGeometry.applyMatrix(matrix.makeTranslation(0, 115, 0));

    var middleGeometry = new THREE.CylinderGeometry(15, 45, 60, 6, 6, false);
    middleGeometry.applyMatrix(matrix.makeTranslation(0, 55, 0));

    var bottomGeometry = new THREE.CylinderGeometry(10, 10, 55, 3, 3, true);

    THREE.GeometryUtils.merge(topGeometry, middleGeometry);

    var repeat = 30;
    var grassMap = THREE.ImageUtils.loadTexture('res/grasstile_c.jpg');

    grassMap.wrapS = grassMap.wrapT = THREE.RepeatWrapping;
    grassMap.repeat.set(repeat,repeat);
    grassMap.anisotropy = 16;

    this.topPart = new THREE.Mesh(topGeometry, new THREE.MeshLambertMaterial({
        map: grassMap
    }));
    this.bottomPart = new THREE.Mesh(bottomGeometry, new THREE.MeshLambertMaterial({color: 0x884400}));
    
    this.tree = new THREE.Object3D();
    this.tree.add(this.topPart);
    this.tree.add(this.bottomPart);

    return this.tree;
}
