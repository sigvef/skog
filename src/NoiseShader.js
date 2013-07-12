
THREE.NoiseShader= {

  uniforms: {
		tDiffuse: { type: "t", value: 0, texture: null },
        amount:   { type: "f", value: 0.1 },
	    time:     { type: "f", value: 0 },
	    width:    { type: "f", value: 900},
	    height:   { type: "f", value: 900}
	},

	vertexShader: [
		"varying vec2 vUv;",

		"void main() {",
			"vUv = vec2(uv.x, uv.y);",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float time;",
		"uniform float amount;",
		"uniform sampler2D tDiffuse;",
		"uniform float width;",
		"uniform float height;",
		"varying vec2 vUv;",

		"float ranieyy(vec2 co) {",
			"return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);",
		"}",

		"void main() {",
		
			"vec4 colorInput = texture2D( tDiffuse, vUv );",

			"vec2 pozz = vec2(floor(width*vUv.x)/width, floor(height*vUv.y)/height);",

			"vec3 color = vec3(.1, 0.1, 0.1) + vec3(ranieyy(vec2(pozz+time/1009.0)));",

			"gl_FragColor = colorInput*(1.0-amount)+amount*vec4(color, 0.1);",

		"}"

	].join("\n")

};