CC=g++
LDLIBS=-lGLEW -framework OpenGL -framework GLUT -lm
all:triangle
clean:
	rm -f *.o triangle
triangle: common/shader_utils.o
.PHONY: all clean
