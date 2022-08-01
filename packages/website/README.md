# Website

Frontend build for the NFT.Storage website.

## Usage

See [DEVELOPMENT.md](../../DEVELOPMENT.md) in the project root, and follow step 1 and 2 from the [Getting started section](../../DEVELOPMENT.md#getting-started).

In particular, make sure to add your Magic Link publishable key to a `.env.local` file, as described in the [local environment configuration](../../DEVELOPMENT.md#local-environment-configuration) section.

The `.env.development` file will be automatically loaded when running locally using `yarn dev`, and it is configured to connect to the default local development API server URL. If you're running the API on a different port or targetting a different environment, add an override for the `NEXT_PUBLIC_API` variable to your `.env.local` file and set it to the correct URL.

For production, Sentry environment configuration must also be set via Environment variables.

### Running Locally

```bash
cd packages/website
yarn dev
```

## Updating text content and docs

There are a few places in this project to surface information about the project to the public.

### FAQ

The FAQ page is defined in `pages/faq.js`, and it pulls content from `lib/faqContent.js`. To edit an existing entry, update the definition in `lib/faqContent.js`.

To add a new FAQ, add an entry to the `faqContent` object in `lib/faqContent.js`, and _also_ add a new entry to the `faqs` array in `pages/faq.js`.

### Blog

Blog post content lives in [`posts`](./posts/). To create a new blog post, create a new Markdown in that folder, with a YAML "front matter" block to define some metadata. You can copy an existing post to get an idea of the metadata format.

### ToS

The terms of service are in [`pages/terms.js`](./pages/terms.js).

### Public documentation

The content of https://nft.storage/docs is populated from the Markdown content in [`pages/docs`](./pages/docs).

We're using a framework called [Nextra](https://docs-nextra.kontenbase.com/) to integrate the docs with the main NextJS app. Page titles in the navigation menu are controlled by the `meta.json` files in each directory.

Nextra uses [MDX](https://docs-nextra.kontenbase.com/features/mdx), which is an extension of Markdown that supports inline React components.

You can generally just write Markdown as usual without thinking about it, but avoid HTML comments, since the MDX parser doesn't understand `<-- html comment syntax -->`. If you want to put comments in Markdown, you can use `{ /* this MDX syntax instead */ }`.

There are a couple of MDX components available when writing docs:

- The Nextra [`Callout` component](https://docs-nextra.kontenbase.com/themes/docs/callout) is used for informational callouts to draw attention to a block of text.
- A custom `Tabs` component lives in [`components/mdx/tabs.js`](./components/mdx/tabs.js). It's modeled after the API of the [Docusaurus Tabs component](https://docusaurus.io/docs/markdown-features/tabs) but does not support linked "tab groups". See [`pages/docs/quickstart.md`](./pages/docs/quickstart.md) for an example.

**Important gotcha when adding new docs pages**: due to an [issue with Nextra](https://github.com/shuding/nextra/issues/35), each markdown page needs an entry in the `exportPathMap` field in [`next.config.js`](./next.config.js). Without this, things will work in local development but break in production.
