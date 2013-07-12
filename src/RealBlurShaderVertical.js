
THREE.RealBlurShaderVertical = {

	uniforms: {
		width: { type: "f" , value: 1.0 }
	},

	vertexShader: [
		"varying vec2 vUv;",

		"void main() {",
			"vUv = uv;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float width;",
		"varying vec2 vUv;",

		"const float blurSize = 1.0/512.0;", //this is the blur size, given by the variable name

		"void main() {",

			"vec4 sum = vec4(0.0);",

			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 4.0*blurSize)) * 0.05;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 3.0*blurSize)) * 0.09;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 2.0*blurSize)) * 0.12;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - blurSize)) * 0.15;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y)) * 0.16;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + blurSize)) * 0.15;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 2.0*blurSize)) * 0.12;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 3.0*blurSize)) * 0.09;",
			"sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 4.0*blurSize)) * 0.05;",

			"gl_FragColor = sum;",

		"}"

	].join("\n")

};
