#ifndef SCENETOON_H
#define SCENETOON_H

#include "SceneBase.h"

class Shader;
class Texture2D;
class Mesh;


class SceneToon : public SceneBase
{
public:
	// Initialisation des donn�es propres � la sc�ne
	virtual void Init();

	// Destruction des donn�es propres � la sc�ne
	virtual void Destroy();

	// Evolution des donn�es et traitement des commandes synchones
	virtual void Idle(float fElapsedTime);

	// D�marrage de la sc�ne
	virtual void Reset();

	// Affichage de la sc�ne
	virtual void Render();


private:
	// Ici on met les donn�es propres � la sc�ne
	vec4		m_vLightPos;
	Texture2D*	m_pMyTexGround;
	Texture2D*	m_pMyTexWall;
	Texture2D*	m_pMyTexTop;
	float		m_fAngle;
	Mesh*		m_objHomer;
	Mesh*		m_teapot;
	Shader*		m_shadeToon;
	Mesh*		m_pScene;
};

#endif

