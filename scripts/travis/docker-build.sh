#!/usr/bin/env bash

set -xeo pipefail


root=$(dirname "$0")/../../

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  TAG=us.icr.io/nicedoc/nicedoc:${TRAVIS_PULL_REQUEST_BRANCH}

  # Install IBM Cloud Cli
  curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
  ibmcloud config --check-version=false
  ibmcloud plugin install container-registry
  ibmcloud plugin install container-service

  # Log in into IBM Cloud Container Service
  ibmcloud login --apikey ${IBMCLOUD_API_KEY} -g 'IBM RESEARCH PRO' -r 'us-south'
  ibmcloud cr login

  # Build docker image
  docker pull "${TAG}" || true
  docker build --cache-from ${TAG} --tag ${TAG} ${root}

  # Push image to registry
  docker push ${TAG}

  # Deploy to preview

  # Install helm
  HELM_URL=https://storage.googleapis.com/kubernetes-helm
  HELM_TGZ=helm-v2.12.1-linux-amd64.tar.gz
  wget -q ${HELM_URL}/${HELM_TGZ}
  tar xzfv ${HELM_TGZ}
  PATH=`pwd`/linux-amd64/:$PATH
  helm init --client-only

  # Decrypt encrypted files
  openssl aes-256-cbc -k "$TRAVIS_ENCRYPT_PASSWORD" -in "${root}/scripts/helm/values.yaml.enc" -out "${root}/scripts/helm/values.yaml" -d

  # Set Kubernetes cluster
  STORE_KUBECONFIG=$(ibmcloud ks cluster-config nicedoc.io | grep KUBECONFIG)
  eval $STORE_KUBECONFIG

  # Deploy
  helm upgrade ${TRAVIS_PULL_REQUEST_BRANCH} ${root}/scripts/helm --install

  # Update github status
  OWNER=`echo "${TRAVIS_REPO_SLUG}" | perl -n -e'/(.*)\// && print $1'`
  REPO=`echo "${TRAVIS_REPO_SLUG}" | perl -n -e'/(.*)\/(.*)/ && print $2'`
  docker run -i --rm \
        -e GITHUB_ACTION=update_state \
        -e GITHUB_TOKEN=${GITHUB_TOKEN} \
        -e GITHUB_OWNER=${OWNER} \
        -e GITHUB_REPO=${REPO} \
        -e GITHUB_REF=${TRAVIS_COMMIT} \
        -e GITHUB_STATE=success \
        -e GITHUB_CONTEXT="deploy" \
        -e GITHUB_DESCRIPTION="Deploy preview deployed to" \
        -e GITHUB_TARGET_URL="https://${TRAVIS_PULL_REQUEST_BRANCH}.nicedocio.us-south.containers.appdomain.cloud" \
        cloudposse/github-status-updater
fi

get_last_merged_branch() {
    local OWNER=`echo "${TRAVIS_REPO_SLUG}" | perl -n -e'/(.*)\// && print $1'`
    local MERGED_BRANCH=`git log --merges -n 1 | perl -n -e"/Merge pull request #\d+ from ${OWNER}\/(.*)/ && print \\$1"`
    echo ${MERGED_BRANCH}
}
