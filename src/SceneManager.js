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
    for(var scene in this.scenes){
        this.scenes[scene].init(initcb);
    }
    this.sortedScenes = this.sortedScenes.sort(function(a,b){ return a.startTime - b.startTime; });
};

SceneManager.prototype.jumpToScene = function(key, dontResetMusic){
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
        music.currentTime = this.activeScene.startTime / 1000;
        t = music.currentTime;
        old_time = t;
    }
};

SceneManager.prototype.update = function(){
    this.activeScene.update();
    if(this.activeSceneIndex + 1 < this.sortedScenes.length &&
       this.sortedScenes[this.activeSceneIndex+1].startTime < t){
        this.jumpToScene(this.sortedScenes[this.activeSceneIndex+1].NAME, 'dont reset music');
    }
};

SceneManager.prototype.render = function(){
    this.activeScene.render();
};
