#!/bin/bash

file_path=$1

echo "File Path: $file_path"

mvn=$(which mvn)

# $mvn deploy -B -f pom.xml -s ./settings.xml \
#     -Dfile=target/$ARTIFACTID.jar \
#     -DgroupId=$GROUPID \
#     -DartifactId=$ARTIFACTID \
#     -Dpackaging=jar \
#     -Dversion=${{ steps.variables.outputs.version }} \
#     -DrepositoryId=${{ vars.NEXUS_REPO_NAME_SNAP }} \
#     -Durl=${{ vars.NEXUS_URL }} \