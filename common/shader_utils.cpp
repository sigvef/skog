#include <stdio.h>
#include <stdlib.h>
#include <GL/glew.h>

/* Read file, got some probs with last return of NULL happening before closing read file */
char* file_read(const char*filename) {
    FILE* input = fopen(filename, "rb");
    if(input == NULL) return NULL;

    if(fseek(input, 0, SEEK_END) == -1) return NULL;
    long size = ftell(input);
    if(size == -1) return NULL;
    if(fseek(input,0,SEEK_SET) == -1) return NULL;

    /* if using c-compiler: don't cast malloc's return calue */
    char* content = (char*) malloc( (size_t) size +1 );
    if(content == NULL) return NULL;

    fread(content,1,(size_t)size,input);
    if(ferror(input)) {
        free(content);
        return NULL;
    }

    fclose(input);
    content[size] = '\0';
    return content;
}
 
/* Display compilation errors from the OpenGL shader compiler */

void print_log(GLuint object) {
    GLint log_length = 0;
    if(glIsShader(object))
        glGetShaderiv(object,GL_INFO_LOG_LENGTH, &log_length);
    else if(glIsProgram(object))
        glGetProgramiv(object,GL_INFO_LOG_LENGTH,&log_length);
    else {
        fprintf(stderr, "printlog: Not a shader or a program\n");
        return;
    }

    char*log = (char*)malloc(log_length);

    if(glIsShader(object))
        glGetShaderInfoLog(object,log_length,NULL,log);
    else if(glIsProgram(object))
        glGetProgramInfoLog(object,log_length,NULL,log);

    fprintf(stderr, "%s", log);
    free(log);
}

GLuint create_shader(const char*filename, GLenum type) {
    const GLchar*source=file_read(filename);
    if(source == NULL) {
        fprintf(stderr, "Error opening %s: ", filename); perror("");
        return 0;
    }
    GLuint res = glCreateShader(type);
    const GLchar*sources[] = { 
#ifdef GL_ES_VERSION_2_0
        "#version 100\n"
#else
        "#version 120\n"
#endif
        ,
#ifdef GL_ES_VERSION_2_0
        (type == GL_FRAGMENT_SHADER) ?
            "#ifdef GL_FRAGMENT_PRECISION_HIGH\n"
            "precision highp float;\n"
            "#else\n"
            "precision mediump float;\n"
            "#endif\n"
            : ""
#else
            "#define lowp\n"
            "#define mediump\n"
            "#define highp\n"
#endif
            ,
        source};
    glShaderSource(res,3,sources,NULL);
    free((void*)source);

    glCompileShader(res);
    GLint compile_ok = GL_FALSE;
    glGetShaderiv(res, GL_COMPILE_STATUS, &compile_ok);
    if(compile_ok == GL_FALSE) {
        fprintf(stderr, "%s:", filename);
        print_log(res);
        glDeleteShader(res);
        return 0;
    }

    return res;
}


