var GlowShader = {

    uniforms: {
        tDiffuse: { type: 't', value: null },
        cKernel: { type: "fv1", value: null }
    },

    vertexShader: [
        "varying vec2 vUv;",
        
        "void main() {",
            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}",
    ""].join("\n"),

    fragmentShader: [
        "uniform sampler2D tDiffuse;",
        "uniform float cKernel[ 25 ];",
        "varying vec2 vUv;",

        "void main() {",
            "vec2 imageCoord = vUv;",
            "imageCoord.x -= 25.*0.0001;",
            "vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );",
            "for( int i = 0; i < 25; i ++ ) {",
                "sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];",
                "imageCoord.x += 0.0001;",
            "}",

            "imageCoord = vUv;",
            "imageCoord.x -= 25.*0.0001;",
            "for( int i = 0; i < 25; i ++ ) {",
                "sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];",
                "imageCoord.y += 0.0001;",
            "}",

            "gl_FragColor = texture2D(tDiffuse, vUv) + sum * 0.5;",
        "}",
    ""].join("\n")
}

GlowShader.uniforms.cKernel = { type: "fv1", value: THREE.ConvolutionShader.buildKernel(25)};
