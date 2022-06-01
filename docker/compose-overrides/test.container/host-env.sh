# Environment variables to set on the host when running docker compose
# with this override. Sourced in packages/api/scripts/run-with-dependencies.sh
# when this override is active.

export DATABASE_URL=http://post-rest-test:3000
export CLUSTER_API_URL=http://ipfs-cluster-test:9094