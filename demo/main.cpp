#ifdef WIN32
#include <windows.h>
#endif

#include <GL/glew.h>
#include <GL/glut.h>



#include <iostream>
#include <iomanip>
#include <sstream>
#include <fstream>
#include <string>
#include <cmath>
#include <assert.h>
using namespace std;

#include "Mathlib.h"
#include "Camera.h"
#include "Mesh.h"
#include "Timer.h"
#include "Sky.h"

#include "glInfo.h"
#include "Shader.h"
#include "TextureCubemap.h"
#include "Texture2D.h"
#include "FrameBufferObject.h"
#include "Inputs.h"
#include "Scenes/SceneManager.h"
#include "ResourceManager.h"
#include "VarManager.h"
#include "Scenes/SceneBase.h"
#include "Effects.h"
//#define CHECK_ERRORS



GLenum err;


static void displayGL(void)
{
	ResourceManager& res = ResourceManager::getInstance();
	VarManager& var = VarManager::getInstance();
	SceneManager& scenes = SceneManager::getInstance();

	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

	
	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	Camera::getInstance().RenderLookAt();

	// PREMIERE PASSE DE RENDU
	scenes.PreRender();

	// DEUXIEME PASSE DE RENDU
	Effects::getInstance().Render();

	// Affichage du texte
	glColor3f(1.0f, 1.0f, 1.0f);
	std::stringstream strStream1;
	strStream1 << Timer::getInstance().getFPSCounter() << " FPS";
	SceneBase::DrawString(vec2(1.0f, (float)var.geti("win_height") - 20.0f), GLUT_BITMAP_HELVETICA_18, strStream1.str());
	std::stringstream strStream2;
	strStream2 << (int)(var.getf("time_speed")*100.0f) << " %";
	SceneBase::DrawString(vec2(1.0f, (float)var.geti("win_height") - 40.0f), GLUT_BITMAP_HELVETICA_18, strStream2.str());

	

	glutSwapBuffers();
}




static void reshapeGL(int newwidth, int newheight)
{
	VarManager& var = VarManager::getInstance();
	var.set("win_width", newwidth);
	var.set("win_height", newheight);

	float ratio = (float)newwidth/(float)newheight;
	glViewport(0, 0, (GLint)newwidth, (GLint)newheight);

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective((GLdouble)var.getf("cam_fovy"), (GLdouble)ratio, (GLdouble)var.getf("cam_znear"), (GLdouble)var.getf("cam_zfar"));


	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	// Recréation des FBO
	Effects::getInstance().reshapeFBO(newwidth, newheight);
}

static void idleGL(void)
{
	Timer& timer = Timer::getInstance();
	Inputs& inputs = Inputs::getInstance();
	VarManager& var = VarManager::getInstance();
	Camera& cam = Camera::getInstance();

	timer.Idle();

	float fElapsedTime = var.getf("time_speed") * timer.getElapsedTime();

	SceneManager::getInstance().Idle(fElapsedTime);

	if( inputs.SKey(GLUT_KEY_UP) )		Camera::getInstance().PlayerMoveForward(20.0f*fElapsedTime);
	if( inputs.SKey(GLUT_KEY_DOWN) )	Camera::getInstance().PlayerMoveForward(-20.0f*fElapsedTime);
	if( inputs.SKey(GLUT_KEY_LEFT) )	Camera::getInstance().PlayerMoveStrafe(20.0f*fElapsedTime);
	if( inputs.SKey(GLUT_KEY_RIGHT) )	Camera::getInstance().PlayerMoveStrafe(-20.0f*fElapsedTime);

	Effects::getInstance().idle();

	glutPostRedisplay();
}

static void quit(void)
{
	std::cout << "Exiting..." << std::endl;
	SceneManager::getInstance().Destroy();

	exit(0);
}




static void initGL(int argc, 
		   char **argv)
{
	glClearColor(0.0f,0.0f,0.0f,1.0f);

	glEnable(GL_CULL_FACE);
	glCullFace(GL_BACK);
	glFrontFace(GL_CCW);
	glEnable(GL_DEPTH_TEST);
	glHint(GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);	// Really Nice Perspective Calculations
	glDisable(GL_LIGHTING);
	glShadeModel(GL_SMOOTH);
	glDisable(GL_BLEND);
	glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);


	glInfo::getInstance().Init();
	glInfo::getInstance().PrintInfo();

//	Shader::PrintSupportedExtensions();
	Shader::Init();
	

	SceneManager::getInstance().Init();

	Sky::getInstance().Init();

	Camera::getInstance().setEye(vec3(2.0f, 0.0f, 0.0f));

	Effects::getInstance().init();

	Camera::getInstance().setType(Camera::DRIVEN);

	glInfo::getInstance().CheckErrors();
}



static void initVars()
{
	VarManager& var = VarManager::getInstance();

	var.set("win_posx", 150);
	var.set("win_posy", 150);
	var.set("win_width", 800);
	var.set("win_height", 600);

	var.set("mouse_sensivity", 0.005f);

	var.set("cam_znear", 0.1f);
	var.set("cam_zfar", 800.0f);
	var.set("cam_fovy", 60.0f);

	var.set("terrain_chunks_drawn", 0);
	var.set("terrain_chunks_reflected_drawn", 0);

	var.set("time_speed", 1.0f);

	var.set("water_height", 4.2f);
}





static void glutKeyboardFunc(unsigned char key, int x, int y) {
	Inputs::getInstance().KeyboardFunc(key);
	SceneManager::getInstance().Keyboard(false, key);
	VarManager& var = VarManager::getInstance();

	switch(key){ 
	case 27: quit(); break;
	case '+': {
		float speed = var.getf("time_speed");
		speed += 0.1f;
		if(speed > 10.0f) speed = 10.0f;
		var.set("time_speed", speed);
		break;}

	case '-': {
		float speed = var.getf("time_speed");
		speed -= 0.1f;
		if(speed < 0.1f) speed = 0.1f;
		var.set("time_speed", speed);
		break;}

	case 'r': SceneManager::getInstance().getCurrentScenePointer()->Reset(); break;
	case ' ': {
		switch(Camera::getInstance().getType()) {
		case Camera::FREE:		Camera::getInstance().setType(Camera::DRIVEN);	break;
		case Camera::DRIVEN:	Camera::getInstance().setType(Camera::FREE);	break;
		};
		break;}

	break;
	}
}

static void glutKeyboardUpFunc(unsigned char key, int x, int y)	{Inputs::getInstance().KeyboardUpFunc(key);}
static void glutSpecialFunc(int key, int x, int y)				{Inputs::getInstance().SpecialFunc(key); SceneManager::getInstance().Keyboard(true, key);}
static void glutSpecialUpFunc(int key, int x, int y)			{Inputs::getInstance().SpecialUpFunc(key);}
static void glutMouseFunc(int button, int state, int x, int y)	{Inputs::getInstance().MouseFunc(button, state, x, y);}
static void glutMotionFunc(int x, int y)						{Inputs::getInstance().MotionFunc(x, y);}
static void glutPassiveMotionFunc(int x, int y)					{Inputs::getInstance().PassiveMotionFunc(x, y);}





int main(int argc, 
	 char **argv)
{
	initVars();
	

	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE | GLUT_DEPTH);

	VarManager& var = VarManager::getInstance();
	glutInitWindowPosition(var.geti("win_posx"), var.geti("win_posy"));
	glutInitWindowSize(var.geti("win_width"), var.geti("win_height"));

	if(glutCreateWindow("Skog") == 0){ 
		return 1;
	}

	glutReshapeFunc(reshapeGL);
	glutDisplayFunc(displayGL);
	glutIdleFunc(idleGL);

	
	glutKeyboardFunc(glutKeyboardFunc);
	glutKeyboardUpFunc(glutKeyboardUpFunc);
	glutSpecialFunc(glutSpecialFunc);
	glutSpecialUpFunc(glutSpecialUpFunc);
	glutMouseFunc(glutMouseFunc);
	glutMotionFunc(glutMotionFunc);
	glutPassiveMotionFunc(glutPassiveMotionFunc);
	

  initGL(argc, argv);

  glutMainLoop();

  return 0;
}


