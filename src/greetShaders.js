var GreetShader = {

    uniforms: {
        floral: {type:'t', value: THREE.ImageUtils.loadTexture('res/red_floral.jpg')},
        abet: {type:'t', value: THREE.ImageUtils.loadTexture('res/alphabet.png')},
        text: {type:'iv1', value: [0,0,0,2,1,1]},
        time: {type:'f', value: 0},
        tDiffuse: { type: 't', value: null }
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
        "uniform sampler2D floral;",
        "uniform sampler2D abet;",
        "uniform int text[6];",
        "uniform float time;",
        "varying vec2 vUv;",

        "vec2 coords(vec2 inp) {",
            "vec2 coord = vec2(0.);",
            "coord.x = (inp.x - 2./8.) * 8.;",
            "float letter = float(text[int((inp.x - 2./8.) * 8./6. * 6.)]);",
            "coord.x = inp.x - floor(inp.x*8.)/8. + (letter - 8.*floor(letter/8.))*1./8.;",
            "coord.y = inp.y + 3./4. - floor((letter/8.))*1./4.;",
            "return coord;",
        "}",
        
        "void main() {",
            "vec4 color = 0.5*texture2D(floral, vUv * 0.5 + 0.1 * sin(vUv * time / 1000.) );",

            "int letter = text[5];",
            "vec2 coord = vec2(0.);",
            "vec2 inp = vUv;",
            "int otherletter = int(floor(vUv.x*8.) + floor((1.-vUv.y)*4.)*8.);",
            "float scaler = 0.3;",

            "if(otherletter == letter){",
                "scaler = 1.;",
            "}",

            "color += scaler * texture2D(abet, vUv);",


            "if(vUv.x > 2./8. && vUv.y < 1./4.){",
                "color += texture2D(abet, coords(vUv));",
            "}",

            "if(time > 30000.){",
                "color += vec4(1.) * (time - 30000.) / 2000.;",
            "}",

            "gl_FragColor = color;",
        "}",
    ""].join("\n")
}
