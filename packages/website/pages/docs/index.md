---
title: Welcome
---


# Quickstart

**Ready to get started using NFT.Storage right now?** Get up and running in minutes by following this quickstart guide. In this guide, we'll walk through the following steps:

1. [Create an NFT.Storage account](#create-an-account)
1. [Uploading a file via the website](#uploading-a-file-using-the-website)
1. [Get a free API token](#get-an-api-token)
1. [Using the JavaScript API](#using-the-javascript-api)

**This guide uses Node.js since it's the fastest way to get started using the Web3.Storage JavaScript client programmatically**, but don't worry if Node isn't your favorite runtime environment — or if you'd rather not do any coding at all. You can also use NFT.Storage in the following ways:
- Using the JavaScript client in web browsers.
- Upload and retrieve files directly from your [Files page](https://nft.storage/files/) on the NFT.Storage website.

You can also use the [HTTP API][reference-http-api] directly using any programming language or tooling that can send HTTP requests.

:::tip
When using the HTTP API, make sure to read about [CAR files][concepts-car-files] to learn how to support large uploads!
:::

### Create an account

For this guide, you'll need an NFT.Storage account to get your API token and manage your stored data. You can sign up **for free** using your email address or GitHub.

Signup Using Email
1. Go to [nft.storage/login](https://nft.storage/login) to get started.
1. Enter your email address.
1. Check your inbox for a verification email from NFT.Storage, and click the **Log in** button in the email.
1. You're all set!

Signup Using Github
1. Go to [nft.storage/login](https://nft.storage/login) to get started.
1. Click **GitHub** on the Login screen.
1. **Authorize** Web3.Storage when asked by GitHub.
1. You're all set!


### Uploading a file using the website

Once you're logged in, you can get started with NFT.Storage right away by uploading files using the website.

1. Click **Files** to go to your [NFT.Storage file listing page](https://nft.storage/files/). 
1. Click the **Upload** button to go to the [File upload page](https://nft.storage/new-file/).
1. Click the **Choose File** button to select a file from your device:
    ![Screenshot of new file page showing "Choose File" button](/images/new-file.png)
1. If you're uploading a [CAR file][concepts-car-files], tick the **is CAR?** check box.
1. Click the **Upload** button to store your file!

Once the upload is complete, you'll be able to view your file in the [file listing page](https://nft.storage/files/).

### Get an API Token

It only takes a few moments to get a free API token from NFT.Storage. This token enables you to interact with the NFT.Storage service without using the main website, enabling you to incorporate files stored using NFT.Storage directly into your applications and services.

1. Click **Account** to go to your [NFT.Storage account page](https://nft.storage/account).
1. Click **Create an API token**.
1. Enter a descriptive name for your API token and click **Create**.
1. Make a note of the **Token** field somewhere secure where you know you won't lose it. You can click **Copy** to copy your new API token to your clipboard.

:::warning Keep your API token private 
Do not share your API token with anyone else. This key is specific to your account.
:::


### Using the JavaScript API

{/* TODO(yusef): add simple node upload example */}


[reference-http-api]: https://nft.storage/api-docs/
[concepts-car-files]: ./concepts/car-files.md

