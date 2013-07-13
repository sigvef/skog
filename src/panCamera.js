function panCamera(startCamera, camera, toPos, time, zoom, t) {
    var dummy = new THREE.Camera();
    dummy.position = camera.position;
    dummy.lookAt(toPos);
    var panTime = t/time;
    camera.rotation.x = smoothstep(
        startCamera.rotation.x,
        dummy.rotation.x,
        panTime
    );
    camera.rotation.y = smoothstep(
        startCamera.rotation.y,
        dummy.rotation.y,
        panTime
    );
    camera.rotation.z = smoothstep(
        startCamera.rotation.z,
        dummy.rotation.z,
        panTime
    );
    camera.fov = smoothstep(
        startCamera.fov,
        startCamera.fov/zoom,
        panTime
    );
    camera.updateProjectionMatrix();
}
