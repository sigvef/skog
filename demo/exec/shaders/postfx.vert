
varying vec3 vPixToLight;		// Vecteur du pixel courant � la lumi�re
varying vec3 vPixToEye;			// Vecteur du pixel courant � l'oeil

void main(void)
{
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_Position = ftransform();
}
