#!/usr/bin/env sh

set -x
set -e

dir=$(dirname "$0")

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  if [ "$TRAVIS_BRANCH" = "master" ]; then
    # Build docker image
    docker build --tag registry.ng.bluemix.net/nicedoc/nicedoc .

    # Push to registry
    docker push registry.ng.bluemix.net/nicedoc/nicedoc:latest

    # Decrypt encrypted files
    openssl aes-256-cbc -k "$TRAVIS_ENCRYPT_PASSWORD" -in "${dir}/../helm/values.yaml.enc" -out "${dir}/../helm/values.yaml" -d

    # Installing ibmcloud-cli
    curl -sL https://ibm.biz/idt-installer | bash

    # Stop version validation
    ibmcloud config --check-version=false

    # Log in into IBM Cloud Container Service
    ibmcloud login --apikey ${IBMCLOUD_API_KEY} -g 'IBM RESEARCH PRO' -r 'us-south'

    # Set Kubernetes cluster
    STORE_KUBECONFIG=$(ibmcloud ks cluster-config nicedoc.io | grep KUBECONFIG)
    eval $STORE_KUBECONFIG

    # Install helm
    HELM_URL=https://storage.googleapis.com/kubernetes-helm
    HELM_TGZ=helm-v2.12.1-linux-amd64.tar.gz
    wget -q ${HELM_URL}/${HELM_TGZ}
    tar xzfv ${HELM_TGZ}
    PATH=`pwd`/linux-amd64/:$PATH
    helm init --client-only

    # Deploy
    helm upgrade production ${dir}/../helm --install
  fi
fi
