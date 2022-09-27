-- Service type is the place/location/organisation that is pinning the content.
CREATE OR UPDATE TYPE service_type AS ENUM (
    -- The NFT.Storage cluster in Pinata (LEGACY).
    'Pinata',
    -- The original NFT.Storage cluster.
    'IpfsCluster',
    -- An IPFS Cluster originally commissioned for niftysave.
    'IpfsCluster2',
    -- New cluster with flatfs and better DHT.
    'IpfsCluster3'
    -- The big one.
    'ElasticIpfs'
    );
