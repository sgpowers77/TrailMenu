# Trail Menu

A browsable catalog of Southwest Peaks and Trails, the trails in and around Doña Ana county from the Trail Menu deck: 118 widescreen slides, grouped by area in deck order.

Each trail keeps the drive time, vehicle access, fee, time on trail, and notes printed on its slide. Every slide still has a numbered 16:9 slot; the photos themselves are left out for now and can be added later at `public/slides/001.png` through `118.png`. The Whaling list is its own page. Difficulty uses the deck’s four marks: green circle, blue square, white diamond, and doubled diamond.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Next prints. Production files are a static export:

```bash
npm run build
npm run preview
```

`npm run preview` serves the `out/` directory with Wrangler Pages.

## Cloudflare Pages

The production site is [https://trail-menu.pages.dev](https://trail-menu.pages.dev), project `trail-menu` on the `sgpowers77@gmail.com` account. [`wrangler.jsonc`](wrangler.jsonc) points Pages at the static export in `out/`.

Deploy again from a machine that is already logged in to Cloudflare:

```bash
npm run deploy
```

The Cloudflare MCP server for this project is in [`.cursor/mcp.json`](.cursor/mcp.json) at `https://mcp.cloudflare.com/mcp`. Cursor asks for Cloudflare OAuth the first time that server is used.
