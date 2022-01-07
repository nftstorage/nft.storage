---
title: Retrieve NFT data from IPFS
---


# Retrieve NFT data from IPFS
- For individual users retrieving data from IPFS
    - Run your own node
    - Use Brave
    - Can use a gateway like [ipfs.io](http://ipfs.io) or [dweb.link](http://dweb.link) if you don't want to manage running your own IPFS node for retrieval
    - Regardless: Store a local copy of your off-chain data
- If you have your own end-users
    - Gateways are an easy solution do represent a centralized piece of infrastructure that can provide poor performance under heavy load / worst case can fail
        - Store a local copy of your off-chain data
        - If you have your own end users, consider making your own copy of the data available to them
            - Run your own IPFS node and gateway that stores this data
            - Store on an HTTP server and keep a database mapping IPFS URIs to these HTTP URIs, so you have both options when serving to users