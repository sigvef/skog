
function createMountainShaderMaterial(uniforms){

	uniforms.gravel.value.wrapS = uniforms.gravel.value.wrapT = THREE.RepeatWrapping;
	uniforms.grass.value.wrapS = uniforms.grass.value.wrapT = THREE.RepeatWrapping;
	uniforms.snow.value.wrapS = uniforms.snow.value.wrapT = THREE.RepeatWrapping;
	var vertexShader = [
		"uniform float time;",
		"varying vec2 vUv;",
		"void main() {",
			"vUv = uv;",
			"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"gl_Position = projectionMatrix * mvPosition;",
		"}",
	""].join("\n");


	var fragmentShader = [
		"uniform float time;",
		"uniform float party;",
		"uniform sampler2D gravel;",
		"uniform sampler2D grass;",
		"uniform sampler2D snow;",
		"uniform sampler2D height;",
		"varying vec2 vUv;",
		"void main( void ) {",
			//"gl_FragColor = height * texture2D(gravel, vUv) + (1.-height) * texture2D(grass, vUv);",
			"vec4 height = texture2D(height, vUv);",
			"vec4 color = vec4(1.);",
			"if(height.x < .03){",
				"color = texture2D(gravel, vUv);",
			"}",
			"else if(height.x < .8){",
				"color = 0.1 + 0.8 * texture2D(grass, vUv*5.);",
			"}",

			"if(party > 0.){",
				"color = texture2D(grass, vUv * 5. + .1 * sin(time/500.));",
				"color *= 0.2;",
				"color += cos(3.141592 * time / 500.) * sin(3.141592 * time * vUv.y / 697. / 1.3) * sin(3.141592 * time * vUv.x / 887. / 1.3) * vec4(.6, 0., .2, .1);",
			"}",
			"gl_FragColor = color;",
		"}",

	""].join("\n");


	material = new THREE.ShaderMaterial( {

		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	} );

	return material;
}
