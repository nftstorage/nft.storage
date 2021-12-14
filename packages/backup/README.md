# Backup

A tool to backup all data for disaster recovery.

## Usage

Drop a `.env` file in the project root and populate:

```
DATABASE_CONNECTION=postgres://postgres:postgres@127.0.0.1:5432/postgres
IPFS_ADDRS=...
```

Replace `DATABASE_CONNECTION` with the database you want to read from/write to and `IPFS_ADDRS` with the multiaddrs of nodes where content can be found.

Start the backup:

```sh
DEBUG=backup:* node index.js
# with optional start date:
DEBUG=backup:* node index.js 2021-12-25
```
