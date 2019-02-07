#!/usr/bin/env sh

set -x
set -e

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  if [ "$TRAVIS_BRANCH" = "master" ]; then
    echo "$DOCKER_TOKEN" | docker login -u token --password-stdin registry.ng.bluemix.net
  fi
fi
