function SceneManager(){
    this.scenes = {};
    this.activeScene = null;
    this.activeKey = '';
    this.activeSceneIndex = -1;
    this.sortedScenes = [];
}

SceneManager.prototype.addScene = function(scene){
    this.scenes[scene.NAME] = scene; 
    this.sortedScenes.push(scene);
};


SceneManager.prototype.initScenes = function(cb){
    var numberOfScenes = 0;
    for(var scene in this.scenes){numberOfScenes++;}
    function initcb(){
        if(!--numberOfScenes){
            cb();
        }
    }
    this.sortedScenes = this.sortedScenes.sort(function(a,b){ return a.startTime - b.startTime; });
    for(var scene in this.scenes){
        this.scenes[scene].init(initcb);
    }
};

SceneManager.prototype.jumpToScene = function(key, dontResetMusic){
    console.log("jumping to scene", key, t)
    this.activeKey = key;
    this.activeScene = this.scenes[key];
    this.activeScene.reset();
    for(var i=0;i<this.sortedScenes.length;i++){
        if(this.activeScene == this.sortedScenes[i]){
            break;
        }
    }
    this.activeSceneIndex = i;
    if(!dontResetMusic){
        old_time = t = _t = this.activeScene.startTime;
        dt = 0;
        music.currentTime = this.activeScene.startTime / 1000;
    }
};

SceneManager.prototype.update = function(){
    this.activeScene.update();
    if(this.activeSceneIndex + 1 < this.sortedScenes.length &&
       this.sortedScenes[this.activeSceneIndex+1].startTime <= t){
        this.jumpToScene(this.sortedScenes[this.activeSceneIndex+1].NAME, 'dont reset music');
    }
};

SceneManager.prototype.render = function(){
    //this.sortedScenes[this.activeSceneIndex+1].render(); //temporarily commented out while deving
    this.activeScene.render();
};

SceneManager.prototype.warmup = function(){
    for(var scene in this.scenes){
        this.scenes[scene].update();
        this.scenes[scene].render();
    }
};
