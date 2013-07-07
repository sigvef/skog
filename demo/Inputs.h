#ifndef INPUTS_H
#define INPUTS_H

#ifdef WIN32
#include <windows.h>
#endif
#include <GL/gl.h>
#include <iostream>
#include "Mathlib.h"
#include "Singleton.h"


SINGLETON_BEGIN( Inputs )
public:
	// Fonctions callback pour glut
	void MouseFunc(int button, int state, int x, int y);
	void MotionFunc(int x, int y);
	void PassiveMotionFunc(int x, int y);
	void KeyboardFunc(unsigned char key);
	void KeyboardUpFunc(unsigned char key);
	void SpecialFunc(int key);
	void SpecialUpFunc(int key);

	// Acc�s aux donn�es
	inline ivec2&		MousePos()				{return vMouse;}
	inline GLboolean&	MouseButton(int button)	{return tMouse[button];}
	inline GLboolean&	Key(unsigned char key)	{return tBoard[key];}
	inline GLboolean&	SKey(int key)			{return tSpecial[key];}

protected:
	Inputs();
	~Inputs() {}

private:
	ivec2 vMouse;				// position de la souris
	GLboolean tMouse[3];		// �tats de la souris
	GLboolean tBoard[256];		// �tats des touches clavier
	GLboolean tSpecial[256];	// �tats des commandes sp�ciales

SINGLETON_END()

#endif

