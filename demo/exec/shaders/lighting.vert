

varying vec4 vPixToLightTBN[1];	// Vecteur du pixel courant � la lumi�re
varying vec3 vPixToEyeTBN;					// Vecteur du pixel courant � l'oeil
varying vec3 vVertexMV;
varying vec3 vNormalMV;
varying vec3 vPixToLightMV;
varying vec3 vLightDirMV;

// SHADOW MAPPING //
uniform int enable_shadow_mapping;
////////////////////


#define MODE_PHONG		0
#define MODE_BUMP		1
#define MODE_PARALLAX	2
#define MODE_RELIEF		3
uniform int mode;

#define LIGHT_DIRECTIONAL		0.0
#define LIGHT_OMNIDIRECTIONAL	1.0
#define LIGHT_SPOT				2.0
				
void main(void)
{

	gl_Position = ftransform();
	gl_TexCoord[0] = gl_MultiTexCoord0;
	
	vec3 vTangent = gl_MultiTexCoord1.xyz;
	vec3 n = normalize(gl_NormalMatrix * gl_Normal);
	vec3 t = normalize(gl_NormalMatrix * vTangent);
	vec3 b = cross(n, t);
	
	vNormalMV = n;
	
	vec4 vLightPosMV = gl_LightSource[0].position;		// Position (ou direction) de la lumi�re dans la MV
	vVertexMV = vec3(gl_ModelViewMatrix * gl_Vertex);	// Position du vertex dans la MV
	
	vec3 tmpVec;



	if(vLightPosMV.w == LIGHT_DIRECTIONAL)
		tmpVec = -vLightPosMV.xyz;					// Lumi�re directionelle
	else
		tmpVec = vLightPosMV.xyz - vVertexMV.xyz;	// Lumi�re ponctuelle

	vPixToLightMV = tmpVec;
/*
	if(mode == MODE_PHONG)
	{
		vPixToLightTBN[0].xyz = tmpVec.xyz;
		vPixToLightTBN[0].w = vLightPosMV.w;	// ponctuelle ou directionnelle
		
		vPixToEyeTBN = -vVertexMV;
	}
	else*/
	{
		// Position ou direction de la lumi�re
		vPixToLightTBN[0].x = dot(tmpVec, t);
		vPixToLightTBN[0].y = dot(tmpVec, b);
		vPixToLightTBN[0].z = dot(tmpVec, n);
		vPixToLightTBN[0].w = vLightPosMV.w;	// ponctuelle ou directionnelle
			
		// Vecteur vue
		tmpVec = -vVertexMV;
		vPixToEyeTBN.x = dot(tmpVec, t);
		vPixToEyeTBN.y = dot(tmpVec, b);
		vPixToEyeTBN.z = dot(tmpVec, n);
	}
	
	
	
	if(length(gl_LightSource[0].spotDirection) > 0.001)
	{
		// Lumi�re spot
		vLightDirMV = normalize(gl_LightSource[0].spotDirection);
		vPixToLightTBN[0].w = LIGHT_SPOT;
	}
	else
	{
		// Lumi�re non spot
		vLightDirMV = gl_LightSource[0].spotDirection;
	}
	
	if(enable_shadow_mapping != 0) {
		// pos a subit les transformations + la cam�ra
		vec4 pos = gl_ModelViewMatrix * gl_Vertex;
		// on multiplie par la matrice inverse de la cam�ra : pos a seulement subit les transformations
		pos = gl_TextureMatrix[0] * pos;
		// on multiplie par la matrice de la lumi�re : position du Vertex dans le rep�re de la lumi�re
		gl_TexCoord[1] = gl_TextureMatrix[1] * pos;
	}
}
