#ifndef SCENESIMPLE_H
#define SCENESIMPLE_H

#include "SceneBase.h"

class Texture2D;

class SceneSimple : public SceneBase
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
	Texture2D*	m_pMyTex;
	float		m_fAngle;
};

#endif

