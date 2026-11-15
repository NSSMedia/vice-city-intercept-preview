# Vice City Intercept - mobile-first standalone preview

This is a **new site**, separate from the previous FLG concept preview and live Shopify site. Its original sunset/palm/vintage-car visual direction references the general contemporary Vice City mood without using official Rockstar images, logos or game assets.

## Site logic

- YouTube SEMA film: hidden numeric clues. They are not duplicated here.
- Instagram: the investigator gives witness statements and information needed to reconstruct the route. That information is not duplicated here.
- This one-page site: short overview, proposed prizes, a single final-answer/registration form, story links (shown as coming soon until real URLs are supplied), the canonical 52-character radiogram with a simple manual-decoding clue, and a rules/status section.
- No camera cards, witness dossiers, on-page game, progress meter, route builder, decoder or counting tools.

## Demo security

The form is visual only. No submission to a server, no database, no email, no persistent storage. Submitted values are cleared before showing a clearly labeled example confirmation. Do not enter real personal data. Real Official Rules, eligibility, prize inventory and dates must be approved before launch.

## Source assets

assets/vice-sunset.svg is original artwork, not an official game graphic.
The secret password from WIKI/MARKETING/MEDIA/SHOW/SEMA-2026-GAME-V1.md is not present in client code.

## Local preview

Run python3 -m http.server 8765 from the site directory and open http://localhost:8765.

Permanent preview intended for a separate GitHub Pages repository.
