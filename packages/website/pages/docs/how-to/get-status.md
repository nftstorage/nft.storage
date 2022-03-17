# Getting upload status

import Callout from 'nextra-theme-docs/callout';

The NFT.Storage service provides a few ways to check on the status of an upload.

On the [File listing page](https://nft.storage/files) of the NFT.Storage site, you can see a list of things that you've uploaded to NFT.Storage.

![Screenshot of NFT.Storage file listing page, showing a table with an entry for each upload.](/images/nft-storage-file-listing.png)

The table on the file listing page has two columns related to the current status of the data storage process, [Pin Status](#pin-status), and [Storage Providers](#storage-providers).

The information in the file listing page is also available using the [JavaScript client's `check` method][client-js-check], and via the [HTTP API][client-http] by sending a `GET` request to the `/check/{cid}` endpoint.

## Pin status

When you upload data to NFT.Storage, it is ["pinned"][ipfs-docs-pinning] to several [IPFS clusters][ipfs-cluster], which are groups of machines that coordinate to provide content-addressed data to the [IPFS](https://ipfs.io) peer-to-peer network.

The **Pin Status** column shows the status of the pinning operation. There are three possible values for the Pin Status column: `Queuing`, `Pinned`, and `Failed`.

The `Queuing` status indicates that a request to pin the data has been submitted to a cluster node, and the node has added the request to a queue for pinning. Depending on how busy the cluster is, an upload may stay in the `Queuing` state for some time before transitioning to `Pinned` or `Failed`.

Note that you can [retrieve your data using IPFS][howto-retrieve] even while the status is `Queuing`. You can verify this by retrieving your data from an HTTP gateway. If you've uploaded a directory, try retrieving a sample of the files within the directory. 

A `Pinned` status means that the cluster has successfully pinned the data.

A `Failed` status indicates that an operation failed while attempting to pin the data. Note that a `Failed` status may be temporary, as the cluster will continually retry `Failed` pins in the background and will update the status to `Pinned` if a retry attempt is successful.

In addition to automatic retries by the cluster, a `Failed` pin will change to `Pinned` if the same data is uploaded successfully in a subsequent request. As long as the CID is the same for both uploads, the original upload's status will be marked as `Pinned` after a small delay.

There are several reasons why an upload may end up in the `Failed` state.

If you are able to [retrieve the data from IPFS][howto-retrieve], the cluster is likely waiting to retry a previous attempt and will soon pin the data.

If you uploaded your data directly to the NFT.Storage service using a [client library][client-js], [the HTTP API][client-http], or the [Upload page on the website][upload-page], a `Failed` status may indicate that one or more chunks of data was not recieved by the service. This may happen when uploading large files or directories containing many files and may be resolved by retrying the upload.

If your data was pinned using the Pinning Service API, a `Failed` status usually means that the cluster wasn't able to fetch the complete content over the IPFS peer-to-peer network. These issues can be hard to diagnose due to the many variables involved, especially when original source of the data may have an unreliable connection to the network or is behind a firewall. If the data is being provided by another pinning service such as Pinata, or if you've verified that the data is retrievable using IPFS (ideally from multiple distinct locations), please [file an issue][new-issue] so we can look into the cause.

Please note that the status reported by the NFT.Storage service may not always be in sync with the actual status as reported by the IPFS cluster. The NFT.Storage service checks if `Failed` pins have been found and pinned by the cluster once per week for up to one month after the initial upload. 

If you find that your file is retrievable but the pin status still says `Failed`, please [file an issue][new-issue] with the relevant CIDs and we'll take a look.

## Storage providers

The **Storage Providers** column on the file listing page shows information about the [Filecoin storage providers][fil-docs-storage-providers] that have committed to long-term storage deals for the uploaded data.

When data is first uploaded, the Storage Providers column will show a status of `Queuing`. This indicates that the NFT.Storage service has the data and is aggregating it into a format that can be used to make a storage deal.

Once enough data has been aggregated, the NFT.Storage service will propose several Filecoin [storage deals][fil-docs-deals] with different Filecoin storage providers. These will initially be shown in a "pending" status, while the provider accepts the deal and posts its commitment to the Filecoin blockchain.

When using the HTTP API or client library to check the upload status, information about Filecoin storage is provided in the `deals` array field within the status response object. The `deals` array will be empty while the upload is in the `Queuing` state. 

Once storage deals have been proposed, the `deals` array will contain JSON objects describing each deal. Each object has a `status` field, which will have a value of `"queued"` when the deal is pending. When the deal has been confirmed and published to the Filecoin blockchain, the `status` field will have a value of `"active"`.

Here's an example JSON object that describes an active storage deal:

```json
{
    "status": "active",
    "lastChanged": "2022-03-13T04:17:47.969874+00:00",
    "chainDealID": 4486352,
    "datamodelSelector": "Links/197/Hash/Links/22/Hash/Links/0/Hash",
    "statusText": "containing sector active as of 2022-03-13 09:18:00 at epoch 1628556",
    "dealActivation": "2022-03-14T13:19:00+00:00",
    "dealExpiration": "2023-08-06T13:19:00+00:00",
    "miner": "f0840770",
    "pieceCid": "baga6ea4seaqcfs2mrjyaqnwgdheb4ny76i6yaeeklcylqijaha3kpcwmutnb6ma",
    "batchRootCid": "bafybeig2qsdu6nfmmaxlpnrpcz63jzyb6bzc4ngllv4mcj7q66ei4rq72y"
}
```

You can verify the status of your upload on the Filecoin blockchain at any time after the initial storage deals are made. Once a deal is active, you'll find links to the deal information in the **Storage Providers** column on the file listing page. These will take you to the [Filfox block explorer](https://filfox.info/), which shows details of every Filecoin message and transaction. You can also use the information from the JSON deals object described above to retrieve deal information using native Filecoin software like [Lotus](https://lotus.filecoin.io/).

[howto-retrieve]: /docs/how-to/retrieve/
[client-js]: /docs/client/js/
[client-js-check]: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#check

[client-http]: /docs/client/http/
[upload-page]: https://nft.storage/new-file/

[new-issue]: https://github.com/nftstorage/nft.storage/issues/new?assignees=&labels=kind%2Fbug%2Cneed%2Ftriage&template=bug_report.md&title=
[support-discord]: https://discord.com/invite/KKucsCpZmY

[ipfs-docs-pinning]: https://docs.ipfs.io/how-to/pin-files
[ipfs-cluster]: https://cluster.ipfs.io/
[fil-docs-storage-providers]: https://docs.filecoin.io/storage-provider/
[fil-docs-deals]: https://docs.filecoin.io/storage-provider/how-providing-works/#deals