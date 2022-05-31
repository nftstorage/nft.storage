#!/usr/bin/env bash

# This script runs a command after first starting up all of our service dependencies
# (postgresql, post-rest, ipfs, ipfs-cluster).


PERSIST_VOLUMES=${NFT_STORAGE_DEV_PERSIST_VOLUMES:-false}
EXPOSE_PORTS=${NFT_STORAGE_DEV_EXPOSE_PORTS:-true}

