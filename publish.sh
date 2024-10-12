#!/bin/bash

echo "File Path: $file_path"

mvn=$(which mvn)

$mvn deploy -B -f pom.xml -s ./settings.xml \
    -Durl=$url \
    -Dfile=$file_path \
    -DgroupId=$groupId \
    -DartifactId=$artifactId \
    -Dpackaging=jar \
    -Dversion=$version \
    -DrepositoryId=$repositoryId