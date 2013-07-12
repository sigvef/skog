
THREE.SquashShader= {

  uniforms: {
  		tDiffuse: { type: "t", texture: null },
  		amount: { type: "f", value: 1.0 }
    },

	vertexShader: [
		"uniform float amount;",
		"varying vec2 vUv;",

		"void main() {",
			"vUv = vec2(uv.x - 1.0*amount, uv.y);",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",

		"void main() {",

			"gl_FragColor = texture2D(tDiffuse, vUv);",

		"}"

	].join("\n")

};