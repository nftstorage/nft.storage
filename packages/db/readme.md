# Local Fauna

```shell
docker pull fauna/faunadb:latest
docker run --name faunadb -p 8443:8443 -p 8084:8084 -v /var/lib/faunadb fauna/faunadb
docker start faunadb
docker stop faunadb

fauna add-endpoint http://localhost:8443/ --alias local --key secret
fauna create-database nft-storage --endpoint=local
fauna create-key nft-storage --endpoint=local

```
