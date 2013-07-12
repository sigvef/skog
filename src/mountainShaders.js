
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
