function createWaterShaderMaterial(uniforms) {

    uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;
    uniforms.texture2.value.repeat.set(25, 25);

    var vertexShaders = [
        "const float pi = 3.141592;",
        "const int numWaves = 8;",
        "uniform float waterHeight;",
        "uniform float time;",
        "uniform float amplitude[8];",
        "uniform float wavelength[8];",
        "uniform float speed[8];",
        "uniform vec2 direction[8];",
        "varying vec3 vPosition;",
        "varying vec3 worldNormal;",
        "varying vec3 eyeNormal;",
        "varying vec2 vUv;",

        "float wave(int i, float x, float y) {",
            "float frequency = 2.0*pi/wavelength[i];",
            "float phase = speed[i] * frequency;",
            "float theta = dot(direction[i], vec2(x, y));",
            "return amplitude[i] * sin(theta * frequency + time * phase);",
        "}",
            "float waveHeight(float x, float y) {",
            "float height = 0.0;",
            "for (int i=0; i < numWaves; ++i)",
            "height += 10.0*wave(i, x, y);",
            "return height;",
        "}",

        "float dWavedx(int i, float x, float y) {",
            "float frequency = 2.0*pi/wavelength[i];",
            "float phase = speed[i] * frequency;",
            "float theta = dot(direction[i], vec2(x, y));",
            "float A = amplitude[i] * direction[i].x * frequency;",
            "return A * cos(theta * frequency + time * phase);",
        "}",

        "float dWavedy(int i, float x, float y) {",
            "float frequency = 2.0*pi/wavelength[i];",
            "float phase = speed[i] * frequency;",
            "float theta = dot(direction[i], vec2(x, y));",
            "float A = amplitude[i] * direction[i].y * frequency;",
            "return A * cos(theta * frequency + time * phase);",
            "}",
        "vec3 waveNormal(float x, float y) {",
            "float dx = 0.0;",
            "float dy = 0.0;",
            "for (int i=0; i < numWaves; ++i) {",
            "dx += dWavedx(i, x, y);",
            "dy += dWavedy(i, x, y);",
            "}",
            "vec3 n = vec3(-dx, -dy, 1.0);",
            "return normalize(n);",
        "}",

        "void main() {",
            "vUv = vec2( 2.0, 2.0 ) * uv;",
            "vec4 pos = vec4(position, 1.0);",
            "pos.z = waterHeight * waveHeight(pos.x, pos.y);",
            "vPosition = pos.xyz / pos.w;",
            "worldNormal = waveNormal(pos.x, pos.y);",
            "eyeNormal = normalMatrix * worldNormal;",
            "vec4 mvPosition = modelViewMatrix * pos;",
            "gl_Position = projectionMatrix * mvPosition;",
        "}",
    ""].join("\n");

    var fragmentShaders = [
        "varying vec2 vUv;",
        "uniform sampler2D texture2;",
        "uniform float time2;",

        "void main() {",
            "vec2 position = -1.0 + 2.0 * vUv;",
            "vec4 noise = texture2D(texture2, vUv);",
            "vec2 T = vUv + vec2(-2.5, 10.0) * time2 * 0.01;",

            "T.x -= noise.y * 0.2;",
            "T.y += noise.z * 0.2;",

            "vec4 color = texture2D(texture2, T * 1.5);",
            "gl_FragColor = color;",
        "}",
    ""].join("\n");

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShaders,
        fragmentShader: fragmentShaders
    });

    return material;
}
