#include "SceneManager.h"
#include "SceneBase.h"
#include "SceneSimple.h"
#include "../VarManager.h"
#include <assert.h>
#include "../Spline3D/SplineGL.h"

static int current = -1;

void ScriptIdle(float fElapsedTime)
{
	SceneManager& manag = SceneManager::getInstance();
	SceneBase* pScene = manag.getCurrentScenePointer();
	assert(pScene);

	static std::string tSceneName[8] = {"simple"};

	switch(current) {
	case -1: {break;}
	case 0: {
		manag.setCurrent(tSceneName[0]);
		/*
		if(pScene->getCamEyeSpline()->isFinished()) {
			manag.setCurrent(tSceneName[1]);
			current = 1;
		}
		*/
		break;}
	
	default:
		assert(0);
	}
}


