
THREE.NoiseShader= {

  uniforms: {
		tDiffuse: { type: "t", value: 0, texture: null },
        amount:   { type: "f", value: 0.1 },
	    time:     { type: "f", value: 0 }
	},

	vertexShader: [

		"void main() {",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",

		"float rand(vec2 in) {",
			"return fract(sin(dot(in.xy, vec(8.31232, 91.23231))) * 2314.313);",
		"}",

		"void main() {",
		
			"vec4 colorOutput = texture2D( tDiffuse, vUv);",

			"vec3 color = vec3(0.1, 1.0, 0.1)*vec3(rand(time/1000.0));",

			"gl_FragColor = colorOutput*(1.0-amount)+amount*vec4(color, 1.0 );",

		"}"

	].join("\n")

};