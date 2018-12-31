#!/usr/bin/env sh

dir=$(dirname "$0")

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
    if [ "$TRAVIS_BRANCH" = "master" ]; then
        # Decrypt encrypted files
        openssl aes-256-cbc -k "$TRAVIS_ENCRYPT_PASSWORD" -in "${dir}/kubernetes/kube-conf.yml.enc" -out "${dir}/kubernetes/kube-conf.yml" -d
        openssl aes-256-cbc -k "$TRAVIS_ENCRYPT_PASSWORD" -in "${dir}/kubernetes/kube-conf.pem.enc" -out "${dir}/kubernetes/kube-conf.pem" -d
        openssl aes-256-cbc -k "$TRAVIS_ENCRYPT_PASSWORD" -in "${dir}/../helm/values.yaml.enc" -out "${dir}/../helm/values.yaml" -d
        export KUBECONFIG=${dir}/kubernetes/kube-conf.yml

        # Install k8scli
        K8SCLI_DIR=$HOME/k8scli
        mkdir -p $K8SCLI_DIR
        curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
        chmod +x ./kubectl
        mv kubectl $K8SCLI_DIR/kubectl
        export PATH=${K8SCLI_DIR}:${PATH}

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
