#!/usr/bin/env bash

VOLUMES=(
  nftstorage-pg-data
  nftstorage-ipfs-data
  nftstorage-cluster-data
  nftstorage-minio-data
)

for v in ${VOLUMES[@]}; do
  docker volume rm $v
done
