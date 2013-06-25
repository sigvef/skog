#include <stdio.h>
#include <stdlib.h>
#include <GL/glew.h>
#include <GLUT/glut.h>
#ifdef WIN32
	#include <gl/GL.h>
#else
	#include <OpenGL/OpenGL.h>
#endif
#include <math.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include "common/shader_utils.h"

GLuint program;
GLint attribute_coord3d, attribute_v_color;
GLuint vbo_triangle;//, vbo_triangle_colors;
GLint uniform_m_transform;

struct attributes {
    GLfloat coord3d[3];
    GLfloat v_color[3];
};
 
int init_resources(void)
{
    struct attributes triangle_attributes[] = {
        {{0.0, 0.8, 0.0}, {0.6, 1.0, 0.0}},
        {{-.8, -.8, 0.0}, {0.3, 0.8, 1.0}},
        {{0.8, -.8, 0.0}, {1.0, 0.4, 0.7}}
    };

    glGenBuffers(1, &vbo_triangle);
    glBindBuffer(GL_ARRAY_BUFFER, vbo_triangle);
    glBufferData(GL_ARRAY_BUFFER, sizeof(triangle_attributes), triangle_attributes, GL_STATIC_DRAW);

    GLint link_ok = GL_FALSE;

    GLuint vs, fs;
    if((vs = create_shader("triangle.v.glsl", GL_VERTEX_SHADER)) == 0) return 0;
    if((fs = create_shader("triangle.f.glsl", GL_FRAGMENT_SHADER)) == 0) return 0;

    program = glCreateProgram();
    glAttachShader(program, vs);
    glAttachShader(program, fs);
    glLinkProgram(program);
    glGetProgramiv(program,GL_LINK_STATUS,&link_ok);
    if(!link_ok) {
        fprintf(stderr, "glLinkProgram:");
        print_log(program);
        return 0;
    }

    const char*attribute_name = "coord3d";
    attribute_coord3d = glGetAttribLocation(program, attribute_name);
    if(attribute_coord3d == -1) {
        fprintf(stderr, "Could not bind attribute %s\n", attribute_name);
        return 0;
    }

    attribute_name = "v_color";
    attribute_v_color = glGetAttribLocation(program, attribute_name);
    if(attribute_v_color == -1) {
        fprintf(stderr, "Could not bind attribute %s\n", attribute_name);
        return 0;
    }
   
    const char*uniform_name = "m_transform";
    uniform_m_transform = glGetUniformLocation(program, uniform_name);
    if(uniform_m_transform == -1) {
        fprintf(stderr, "Could not bind uniform %s\n", uniform_name);
        return 0;
    }

    return 1;
}
 
void idle() {
    float move = sinf(glutGet(GLUT_ELAPSED_TIME) / 1000.0 * (2*3.14) / 5); // -1<->+1 every 5 sec
    float angle = glutGet(GLUT_ELAPSED_TIME) / 1000.0 * 45; //45 degrees pr sec
    glm::vec3 axis_z(0,0,1);
    glm::mat4 m_transform = glm::translate(glm::mat4(1.0f), glm::vec3(move, 0.0, 0.0))
        * glm::rotate(glm::mat4(1.0f), angle, axis_z);

    glUseProgram(program);
    glUniformMatrix4fv(uniform_m_transform, 1, GL_FALSE, glm::value_ptr(m_transform));
    glutPostRedisplay();
}

void onDisplay()
{
    glClearColor(1.0,1.0,1.0,1.0);
    glClear(GL_COLOR_BUFFER_BIT);

    glUseProgram(program);

    glEnableVertexAttribArray(attribute_coord3d);
    glEnableVertexAttribArray(attribute_v_color);
    glBindBuffer(GL_ARRAY_BUFFER, vbo_triangle);
    /* Describe our vertices array to openGL (it can't guess its format automaticly) */
    glVertexAttribPointer(
            attribute_coord3d,      //attribute
            3,                      //number of elements pr vertex, here (x,y)
            GL_FLOAT,               //the type of each element
            GL_FALSE,               //take our values as-is
            sizeof(struct attributes),    //next coord2d appears every 5 floats
            0                       //offset of first element
    );
    
    glVertexAttribPointer(
            attribute_v_color,      //attribute
            3,                      //number of elements pr vertex, here (x,y)
            GL_FLOAT,               //the type of each element
            GL_FALSE,               //take our values as-is
            sizeof(struct attributes),    //next color appears every 5 floats
            (void*) offsetof(struct attributes, v_color)       //offset of first element
    );


    /* Push each element in buffer_vertices to the vertex shader */
    glDrawArrays(GL_TRIANGLES, 0, 3);
    glDisableVertexAttribArray(attribute_coord3d);
    glDisableVertexAttribArray(attribute_v_color);

    /* Display result */
    glutSwapBuffers();
}
 
void free_resources()
{
    glDeleteProgram(program);
    glDeleteBuffers(1, &vbo_triangle);
}

int main(int argc, char* argv[])
{
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_RGBA|GLUT_ALPHA|GLUT_DOUBLE|GLUT_DEPTH);
  glutInitWindowSize(600, 600);
  glutCreateWindow("My First Triangle");
 
  GLenum glew_status = glewInit();
  if (glew_status != GLEW_OK)
  {
    fprintf(stderr, "Error: %s\n", glewGetErrorString(glew_status));
    return EXIT_FAILURE;
  }

  if(!GLEW_VERSION_2_0) {
      fprintf(stderr, "Error: your graphic card does not support OpenGL 2.0\n");
      return 1;
  }
 
  if (init_resources())
  {
    glutDisplayFunc(onDisplay);
    glutIdleFunc(idle);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glutMainLoop();
  }
 
  free_resources();
  return EXIT_SUCCESS;
}
