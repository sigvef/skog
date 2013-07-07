#include "SceneSimple.h"

#include "../Mathlib.h"
#include "../Camera.h"

#include "../Shader.h"
#include "../Texture2D.h"

#include "../ResourceManager.h"
#include "../VarManager.h"
#include "../Spline3D/SplineGL.h"

// Initialisation des donn�es propres � la sc�ne
void SceneSimple::Init()
{
	// On acc�de au Resource Manager pour charger des ressources :
	ResourceManager& res = ResourceManager::getInstance();

	// Ici on charge une texture, et on r�cup�re un pointeur sur la donn�e pour y acc�der plus facilement
	m_pMyTex = (Texture2D*)res.LoadResource(ResourceManager::TEXTURE2D, "stones_diffuse.jpg");

	res.LoadResource(ResourceManager::MESH, "cube.obj");

	m_fAngle = 0.0f;


	m_pCamEyeTraj->AddPoint(vec3(0.0f, 0.0f, 0.0f));
	m_pCamEyeTraj->AddPoint(vec3(5.0f, 5.0f, 0.0f));
	m_pCamEyeTraj->AddPoint(vec3(5.0f, 0.0f, 5.0f));
//	m_pCamEyeTraj->Close();
	m_pCamEyeTraj->BuildSplines(true);

	m_pCamLookAtTraj->AddPoint(vec3(0.0f, 0.0f, 0.0f));
	m_pCamLookAtTraj->AddPoint(vec3(-5.0f, -5.0f, 0.0f));
	m_pCamLookAtTraj->AddPoint(vec3(-5.0f, 0.0f, -5.0f));
//	m_pCamLookAtTraj->Close();
	m_pCamLookAtTraj->BuildSplines(true);
}

// Destruction des donn�es propres � la sc�ne
void SceneSimple::Destroy()
{
	SceneBase::Destroy();
	// Les ressources charg�es avec le Resource Manager sont lib�r�es autmatiquement,
	// donc il n'y a rien � faire ici dans ce cas
}

// Evolution des donn�es et traitement des commandes synchones
void SceneSimple::Idle(float fElapsedTime)
{
	// On prend en compte le temps �coul� depuis la frame pr�c�dente
	// pour faire �voluer nos donn�es en fonction du temps
	m_fAngle += 10.0f*fElapsedTime;
}

// D�marrage de la sc�ne
void SceneSimple::Reset()
{
	// On peut par exemple remettre la cam�ra � une position donn�e :
	Camera& cam = Camera::getInstance();
	cam.setEye(vec3(10.0f, 0.0f, 10.0f));
	cam.setAngle(RADIANS(225.f), RADIANS(90.f));

}

// Affichage de la sc�ne
void SceneSimple::Render()
{
	ResourceManager& res = ResourceManager::getInstance();
	VarManager& var = VarManager::getInstance();

	DrawAxes();

	glColor3f(1.0f, 0.0f, 0.0f);
	DrawTraj();


	vec4 white(1.0f, 1.0f, 1.0f, 1.0f);
	glEnable(GL_LIGHTING);
	glEnable(GL_LIGHT0);
	vec4 pos(0.0, 0.0, 1.0, 0.0);
	glLightfv(GL_LIGHT0, GL_POSITION, pos);
	glLightfv(GL_LIGHT0, GL_AMBIENT, white);
	glLightfv(GL_LIGHT0, GL_DIFFUSE, white);
	glLightfv(GL_LIGHT0, GL_SPECULAR, white);

	// Ici on va activer notre texture
	// On pourrait acc�der � notre texture via :
	// Texture2D* pTex = res.getTexture2D("rocks_diffuse.jpg");
	// et cela �viterait d'avoir une variable de classe pour acc�der � la ressource

	// On bind la texture en slot 0
	m_pMyTex->Bind(0);

	for(int j=-5;j<5;j++){
		glPushMatrix();
		glTranslatef(0,j*6.4,0);
		for(int i=0;i<20;i++){
			glPushMatrix();
			glRotatef(i*36/2, 0.0f, 1.0f, 0.0f);
			glTranslatef(20, 0, 0);
			res.getMesh("cube.obj")->Draw();
			glPopMatrix();
		}
		glPopMatrix();
	}
// la teapot est dessin�e dans le mauvais sens, mais c'est un bug de glut,
	// les autres primitives sont, elles, dessin�es dans le bon sens.

	// On la d�bind en slot 0 aussi
	m_pMyTex->Unbind(0);

	glPopMatrix();
}







