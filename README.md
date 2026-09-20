# Christine Noelle Travel

Boutique travel agency website — minimalist editorial design, built with Vite (no framework), vanilla CSS/JS.

## Pages

- `index.html` — Home
- `about.html` — About (agency + Christine)
- `benefits.html` — Benefits
- `plan-my-trip.html` — Plan My Trip (inquiry form)

## Local development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Connecting the "Plan My Trip" form to your email

The form posts to [Formspree](https://formspree.io) so submissions land in **cnduverney@gmail.com** with no backend to maintain.

1. Create a free account at formspree.io and add a new form.
2. Verify **cnduverney@gmail.com** as the receiving address (Formspree will email a confirmation link).
3. Copy your form ID (looks like `xxxxabcd`).
4. In `plan-my-trip.html`, find:
   ```html
   <form id="trip-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   Replace `YOUR_FORM_ID` with your real ID.
5. Rebuild/redeploy. Test by submitting the form — you should get an inline "Thank you" message and an email.

Formspree's free tier includes 50 submissions/month, spam filtering, and email notifications — sufficient to start; upgrade if volume grows.

## Images

Property photography lives in `public/images/<property-folder>/` and is credited automatically via the small caption in the bottom-left of each photo (`.media__credit`). Property code → name mapping used across the site:

- `SBT` → Four Seasons Safari Lodge Serengeti
- `MAL` → Four Seasons Resort Maldives at Kuda Huraa
- `KON` → Four Seasons Resort Hualalai
- `JAC` → Four Seasons Resort Jackson Hole
- `GHF` → Grand-Hôtel du Cap-Ferrat, A Four Seasons Hotel
- `FLO` → Four Seasons Hotel Florence

To add a photo: drop the file in the matching folder, then reference it with an `<img>` inside a `.media` wrapper plus a `<span class="media__credit">Property Name</span>`, following the existing examples on the Home/About/Benefits pages.

## Deploying

This is a static site (`dist/` after `npm run build`) — deploy to Netlify, Vercel, Cloudflare Pages, or any static host. Point the host's build command to `npm run build` and publish directory to `dist`.
