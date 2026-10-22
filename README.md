# Trail Menu

A browsable catalog of the Las Cruces and Organ Mountains trails from the Trail Menu deck: 118 widescreen slides, grouped by area in deck order.

Each trail keeps the drive time, vehicle access, fee, time on trail, and notes printed on its slide, plus the preview image for every slide that belongs to it. The Whaling list is its own page. Difficulty uses the deck’s four marks: green circle, blue square, white diamond, and doubled diamond.

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

`npm run preview` serves the `out/` directory with Wrangler.

## Cloudflare Workers

This repo is set up as a static-assets Worker. [`wrangler.jsonc`](wrangler.jsonc) uploads `out/` and does not run a Worker script.

Connect it to [github.com/sgpowers77/TrailMenu](https://github.com/sgpowers77/TrailMenu) in Workers Builds:

- Repository: `https://github.com/sgpowers77/TrailMenu`
- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

Deploy from a machine that is already logged in to Cloudflare:

```bash
npm run deploy
```

The Cloudflare MCP server for this project is in [`.cursor/mcp.json`](.cursor/mcp.json) at `https://mcp.cloudflare.com/mcp`. Cursor asks for Cloudflare OAuth the first time that server is used.
