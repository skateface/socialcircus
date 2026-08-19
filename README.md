# Social Circus

Free interactive party, icebreaker, and team-building tools, built with [Eleventy](https://www.11ty.dev/). Deployed to GitHub Pages behind Cloudflare at [socialcircus.com](https://socialcircus.com).

## Local development

```bash
npm install
npm run serve
```

This starts a local dev server with live reload (default: http://localhost:8080).

To build the static site without serving it:

```bash
npm run build
```

Output goes to `_site/`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages via GitHub Actions (Settings → Pages → Source: "GitHub Actions"). The `CNAME` file in `src/` sets the custom domain to `socialcircus.com`; Cloudflare DNS should point at GitHub Pages per [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Things to configure before going live

- **AdSense**: replace `adsenseClientId` in `src/_data/site.js`, uncomment the AdSense loader script in `src/_includes/layouts/base.njk`, and uncomment/fill in the real `<ins>` tag in `src/_includes/partials/ad-slot.njk`. Also replace the placeholder line in `src/ads.txt` with your real authorized-seller line from the AdSense dashboard.
- **Amazon Associates**: replace `amazonAffiliateTag` in `src/_data/site.js` with your real tracking ID (used throughout affiliate links).
- **Contact email**: `hello@socialcircus.com` in `src/contact.njk` is a placeholder — set up a real inbox or forwarding address.
- **Social preview image**: `src/images/social-card.svg` is an SVG placeholder. Social platforms generally require a raster `og:image` (PNG/JPG, 1200×630) for reliable link previews — replace `og:image`/`twitter:image` in `src/_includes/partials/meta.njk` once you have one.
- **Analytics**: no analytics are wired up yet. Add your preferred privacy-respecting analytics snippet to `src/_includes/layouts/base.njk` if desired.

## Project structure

```
src/
  _data/site.js              Site-wide config (name, URL, AdSense/affiliate placeholders)
  _includes/layouts/         base, page, tool, post layouts
  _includes/partials/        header, footer, meta, ad-slot, affiliate-card, JSON-LD, etc.
  css/main.css                Design system + all styles
  js/main.js                  Shared JS (nav toggle, toast, confetti, clipboard/share helpers)
  js/data/                    Data arrays for each tool
  js/tools/                   Interaction logic for each tool
  tools/                      4 interactive tool pages + tools index
  blog/                       8 guide articles (Markdown) + blog index
  index.njk, about.njk, ...   Top-level pages
  sitemap.njk, robots.txt, ads.txt, CNAME, site.webmanifest, favicon.svg
```
