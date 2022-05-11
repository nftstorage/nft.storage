# Snippet to run playwright tests via docker-compose run:
set compose_args "-f ./docker/docker-compose.yml -f ./docker/docker-compose.test.yml"
docker-compose $compose_args down --remove-orphans
and docker-compose $compose_args build
and docker-compose $compose_args run playwright
ls
