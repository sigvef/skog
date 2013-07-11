FRAME_LENGTH = 20;
DIRTY = true;
t = 0;
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
        window.setTimeout(callback, 0);
    };
})();
window.makeFullscreen = function(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
};

function loop(){
    t = music.currentTime*1000;
    dt += (t-old_time);
    old_time = music.currentTime*1000;
    while(dt >= FRAME_LENGTH){
        sm.update();
        dt-= FRAME_LENGTH;
        DIRTY = true;
    }

    if(DIRTY){
        sm.render();
        DIRTY = false;
    }

    if (!music.ended){
        requestAnimFrame(loop);
    }
}


function start(){
    old_time = 0;
    dt = 0;

    sm = new SceneManager(); 
    //sm.addScene(new ExampleScene());
    sm.addScene(new TrainScene());
    //sm.addScene(new TunnelScene());
    sm.initScenes(function(){
        music.play();
        sm.jumpToScene('train');
        setTimeout(loop, 0);
    });
}


function bootstrap(){
    document.addEventListener("keydown",function(e){
        if(e.keyCode == /*ESC*/ 27){
            window.open('', '_self', ''); //bug fix
            window.close(); 
        }

        if(e.keyCode == /*R*/ 82){
            sm.jumpToScene(sm.activeKey);
        }

        if(e.keyCode == /*LEFT*/ 37){
            console.log("LEFT");
            sm.jumpToScene(sm.sortedScenes[sm.activeSceneIndex - 1].NAME);
        }

        if(e.keyCode == /*RIGHT*/ 39){
            sm.jumpToScene(sm.sortedScenes[sm.activeSceneIndex + 1].NAME);
        }

        if(e.keyCode == /*SPACE*/ 32){
            music.paused ? music.play() : music.pause();
        }

        if(e.keyCode == /*PLUS*/ 187){
            music.playbackRate *= 1.1;
        }

        if(e.keyCode == /*MINUS*/ 189){
            music.playbackRate /= 1.1;
        }

        if(e.keyCode == /*ZERO*/ 48){
            music.playbackRate = 1;
        }

        if(e.keyCode == /*M*/ 77){
            music.muted = !music.muted;
        }
    });

    renderer = new THREE.WebGLRenderer({ maxLights: 10,antialias:true}); 
    renderer.setClearColor(0xffffff, 1);
    renderer.sortObjects = false;
    resize();
    document.body.appendChild(renderer.domElement);
    music = document.getElementById("music");
    setTimeout(start,0);
}


function resize(){
    if(window.innerWidth/window.innerHeight > 16/9){
        GU = (window.innerHeight/9);
        }else{
        GU = (window.innerWidth/16);
    }
    renderer.setSize(16*GU, 9*GU);
    renderer.domElement.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
    RENDERTARGET = new THREE.WebGLRenderTarget( 16*GU, 9*GU, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        stencilBuffer: false
    });
}

window.onresize = resize;
