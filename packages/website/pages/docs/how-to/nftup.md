---
title: Upload files and directories with NFTUp
---

import { ArchSwitch } from 'components/mdx/arch-switch';
import Callout from 'nextra-theme-docs/callout';

# Upload files and directories with NFTUp

NFTUp is the easiest way for content creators to upload their metadata and assets, ready to be minted into NFTs by smart contracts and then traded on marketplaces, and browsed in galleries.

<ArchSwitch>
  <Callout case="Mac OS" emoji="💡">
    **Download for Mac OS**
    - [Mac Universal](https://github.com/nftstorage/nftup/releases/download/v1.0.0-beta.0/NFT-UP-1.0.0-beta.0-universal.dmg)
    - [Mac M1](https://github.com/nftstorage/nftup/releases/download/v1.0.0-beta.0/NFT-UP-1.0.0-beta.0-arm64.dmg)
    - [Mac x86](https://github.com/nftstorage/nftup/releases/download/v1.0.0-beta.0/NFT-UP-1.0.0-beta.0.dmg)
  </Callout>
  <Callout case="Windows" emoji="💡">
    **Download for Windows**
    - [Windows](https://github.com/nftstorage/nftup/releases/download/v1.0.0-beta.0/NFT-UP-Setup-1.0.0-beta.0.exe)
  </Callout>
  [All Releases](https://github.com/nftstorage/nftup/releases)
</ArchSwitch>

While your download is happening, here is a quick preview of what you can expect. First you'll download the disk image and drag and drop NFTUp to your Applications folder.

<img width="652" alt="Install Application" src="https://user-images.githubusercontent.com/253/161602798-50da3381-8626-43ca-942c-9ca84c202c19.png"/>

Then double click to launch the application and you'll see the main screen.

<img width="992" alt="Screenshot 2022-03-31 at 15 09 35" src="https://user-images.githubusercontent.com/253/161609435-9b1ba803-ea1b-48dd-a721-e9250f5ad2d1.png"/>

Now you can drag and drop some files or folders on it. You might be prompted for your NFT.Storage API key. You can [get your key on your account page](https://nft.storage/manage/).

<img width="593" alt="Screen Shot 2022-04-04 at 11 54 35 AM" src="https://user-images.githubusercontent.com/253/161612668-5df79ddc-2e75-484c-acbd-a8b04b2b69e7.png"/>

You can upload any file structure you want. If you are doing something like a HashLips build, you can upload the assets and metadata at the same time by dragging them both to the upload box.

<img width="992" alt="Screenshot 2022-03-31 at 15 14 17" src="https://user-images.githubusercontent.com/253/161602971-2ed0e84b-3f53-47a6-b997-fa903b88c5e7.png"/>

Once the upload is complete, you'll get a link to your content. Click it to fetch your data from the IPFS network.

<img width="992" alt="Screenshot 2022-03-31 at 15 19 49" src="https://user-images.githubusercontent.com/253/161602972-9fc4fee3-d22c-45b2-8289-3d63279c0962.png"/>

Now you are ready to set your [smart contract base URL](https://nft.storage/blog/post/2022-02-15-base-url-apis/), or otherwise share your content with NFT minting services.

Enjoy NFTUp, and if you want to contribute, [the code is available on GitHub.](https://github.com/nftstorage/nftup)
