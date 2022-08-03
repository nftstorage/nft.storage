#!/usr/bin/env bash

THIS_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

COMPOSE_FILE_ARGS=(
  "--file" "$THIS_DIR/docker-compose.yml"
)

# if we're persisting volumes, use a deterministic project name
# so the volumes will be attached on next run.
# otherwise, append the current timestamp so we can run multiple envs
# in parallel
if [[ "$PERSIST_VOLUMES" != "" ]]; then
  PROJECT_NAME="nft-storage-dev-persistent"
  PERSIST_VOLUME_ARGS=""
  VOLUME_CLEANUP=""

  # add docker-compose-persist.yml, to tell docker compose to use external
  # volumes instead of throw-away vols
  COMPOSE_FILE_ARGS=(
    ${COMPOSE_FILE_ARGS[@]}
    "--file" "$THIS_DIR/docker-compose-persist.yml"
  )

  # create named volumes for persistent data (this is idempotent)
  docker volume create nftstorage-pg-data
  docker volume create nftstorage-ipfs-data
  docker volume create nftstorage-cluster-data
  docker volume create nftstorage-minio-data
else
  TS=$(date +'%s')
  PROJECT_NAME="nft-storage-dev-$TS"
  PERSIST_VOLUME_ARGS="--renew-anon-volumes"
  VOLUME_CLEANUP="--volumes"
fi




function cleanup {
  echo "stopping compose project $PROJECT_NAME"
  docker compose --project-name $PROJECT_NAME \
    down \
    --remove-orphans \
    $VOLUME_CLEANUP \
    ;
  echo "compose project $PROJECT_NAME down"
}
# this trap causes cleanup to be run whenever the script exits (including abnormal exit)
trap cleanup EXIT

# get the bound port for a port exposed by a container
# returns ip:port, where ip seems to always be 0.0.0.0
function get_host_port {
  local service_name=$1
  local port_number=$2
  docker compose --project-name $PROJECT_NAME port $service_name $port_number
}

echo "starting docker compose project $PROJECT_NAME"

docker compose \
 "${COMPOSE_FILE_ARGS[@]}" \
 --project-name $PROJECT_NAME \
 up \
 $PERSIST_VOLUME_ARGS \
 --detach \
;

DB_HOST_PORT=$(get_host_port "db" 5432)
POSTGREST_HOST_PORT=$(get_host_port "rest" 3000)
CLUSTER_HOST_PORT=$(get_host_port "cluster" 9094)
MINIO_HOST_PORT=$(get_host_port "minio" 9000)

# this thing below splits the ip:port returned by get_host_port into a bash array of [host, port]
minio_port_components=(${MINIO_HOST_PORT//:/ })

# MINIO_API_PORT and DATABASE_CONNECTION are used by cli.js when creating the
# db schema and s3 bucket
export MINIO_API_PORT=${minio_port_components[1]}
export DATABASE_CONNECTION="postgres://postgres:postgres@$DB_HOST_PORT/postgres"

# The vars below are used to configure the service
export DATABASE_URL="http://$POSTGREST_HOST_PORT"
export CLUSTER_API_URL="http://$CLUSTER_HOST_PORT"
export S3_ENDPOINT="http://$MINIO_HOST_PORT"

echo "services started."
echo "environment overrides:"
echo "MINIO_API_PORT=${MINIO_API_PORT}"
echo "DATABASE_CONNECTION=${DATABASE_CONNECTION}"
echo "DATABASE_URL=${DATABASE_URL}"
echo "CLUSTER_API_URL=${CLUSTER_API_URL}"
echo "S3_ENDPOINT=${S3_ENDPOINT}"
echo

# run ARGV as a command
echo "running $@"
$@