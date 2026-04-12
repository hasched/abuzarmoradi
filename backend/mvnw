#!/bin/sh
if [ -z "$JAVA_HOME" ]; then
  javaExecutable="`which java`"
  if [ -n "$javaExecutable" ]; then
    JAVA_HOME="$(dirname "$(dirname "$(readlink -f "$javaExecutable")")")"
  fi
fi

MAVEN_PROJECTBASEDIR="${PWD}"
MAVEN_WRAPPER_JAR=".mvn/wrapper/maven-wrapper.jar"

if [ ! -f "$MAVEN_WRAPPER_JAR" ]; then
  mkdir -p ".mvn/wrapper"
  if command -v curl > /dev/null; then
    curl -fsSL "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar" -o "$MAVEN_WRAPPER_JAR"
  elif command -v wget > /dev/null; then
    wget -q "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar" -O "$MAVEN_WRAPPER_JAR"
  fi
fi

exec "$JAVA_HOME/bin/java" \
  $MAVEN_OPTS \
  -classpath "$MAVEN_WRAPPER_JAR" \
  "-Dmaven.multiModuleProjectDirectory=$MAVEN_PROJECTBASEDIR" \
  org.apache.maven.wrapper.MavenWrapperMain "$@"
