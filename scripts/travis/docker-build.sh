#!/usr/bin/env bash

set -xeo pipefail


root=$(dirname "$0")/../../

get_last_merged_branch() {
    local OWNER=`echo "${TRAVIS_REPO_SLUG}" | perl -n -e'/(.*)\// && print $1'`
    local MERGED_BRANCH=`git log --merges -n 1 | perl -n -e"/Merge pull request #\d+ from ${OWNER}\/(.*)/ && print \\$1"`
    echo ${MERGED_BRANCH}
}

install_ibm_cli() {
  # Install IBM Cli
  curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
  ibmcloud config --check-version=false
  ibmcloud plugin install container-registry
  ibmcloud plugin install container-service

  # Log in into IBM Cloud Container Service
  ibmcloud login --apikey ${IBMCLOUD_API_KEY} -g 'IBM RESEARCH PRO' -r 'us-south'
  ibmcloud cr login
}

install_helm() {
  # Install Helm 2.12.1
  HELM_URL=https://storage.googleapis.com/kubernetes-helm
  HELM_TGZ=helm-v2.12.1-linux-amd64.tar.gz
  wget -q ${HELM_URL}/${HELM_TGZ}
  tar xzfv ${HELM_TGZ}
  PATH=`pwd`/linux-amd64/:$PATH
  helm init --client-only
}

update_github_pr_status() {
  # Update github status
  curl "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/statuses/${TRAVIS_PULL_REQUEST_SHA}" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "Content-Type: application/json" \
    -H "Accept: 'application/vnd.github.v3+json'" \
    -X POST \
    -d "{\"state\": \"success\", \"context\": \"deploy\", \"description\": \"Deploy preview\", \"target_url\": \"https://${TRAVIS_PULL_REQUEST_BRANCH}.nicedocio.us-south.containers.appdomain.cloud\"}"
}

setup_k8s() {
  # Set Kubernetes cluster
  local STORE_KUBECONFIG=$(ibmcloud ks cluster-config nicedoc.io | grep KUBECONFIG)
  eval ${STORE_KUBECONFIG}
}

helm_deploy_branch() {
  local NAME=$1
  local REPLICAS=$2
  helm upgrade ${1} ${root}/scripts/helm --install --set replicaCount=${REPLICAS} --set GITHUB_TOKEN=${GITHUB_TOKEN}
}

helm_delete_branch() {
  helm del --purge ${1}
}

docker_build_and_push() {
  local TAG=$1

  # Build docker image
  docker pull "${TAG}" || true
  docker build --cache-from ${TAG} --tag ${TAG} ${root}

  # Push image to registry
  docker push ${TAG}
}

docker_registry_tag() {
  local FROM=$1
  local TO=$2
  docker pull ${FROM}
  docker tag ${FROM} ${TO}
  docker push ${TO}
}

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  BRANCH=${TRAVIS_PULL_REQUEST_BRANCH}
  TAG=us.icr.io/nicedoc/nicedoc:${BRANCH}

  install_ibm_cli
  install_helm

  docker_build_and_push ${TAG}

  setup_k8s

  helm_deploy_branch ${BRANCH} 1
  update_github_pr_status
fi

if [[ "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  PR_BRANCH=$(get_last_merged_branch)
  BRANCH=${TRAVIS_BRANCH}

  PR_TAG=us.icr.io/nicedoc/nicedoc:${PR_BRANCH}
  DEPLOY_TAG=us.icr.io/nicedoc/nicedoc:${BRANCH}

  install_ibm_cli
  install_helm

  docker_registry_tag ${PR_TAG} ${DEPLOY_TAG}

  setup_k8s
  helm_deploy_branch ${BRANCH} 3
  helm_delete_branch ${PR_BRANCH}
fi


