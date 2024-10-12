#!/bin/bash

echo "File Path: $file_path"


# mvn deploy -B -f pom.xml -s ./settings.xml \
#                     -Durl=${{ vars.NEXUS_URL }} \
#                     -Dfile=target/$ARTIFACTID.jar \
#                     -DgroupId=$GROUPID \
#                     -DartifactId=$ARTIFACTID \
#                     -Dpackaging=jar \
#                     -Dversion=${{ steps.variables.outputs.version }} \
#                     -DrepositoryId=${{ vars.NEXUS_REPO_NAME_SNAP }}