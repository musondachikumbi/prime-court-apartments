# Prime Court Apartments — Launch Checklist

This is everything left before the site is ready to go live. Code/structure is done — what's left is real business content and a couple of account sign-ups.

## 1. Content & assets to supply
- [ ] **Logo** → save as `images/logo.png` (referenced in the header on both pages)
- [ ] **Apartment photos** (4 needed) → `images/studio-placeholder.jpg`, `one-bedroom-placeholder.jpg`, `two-bedroom-placeholder.jpg`, `executive-suite-placeholder.jpg` (or give real filenames and the `src` attributes can be updated to match)
- [ ] **Favicon** → save as `favicon.ico` in the root folder
- [ ] **Real phone number** → replace `+260 00 000 0000` (appears in `index.html` Contact + Directions, and in `privacy.html`)
- [ ] **Real email address** → replace `info@primecourtapartments.com` (same spots)
- [ ] **Confirm or correct rental prices** → currently placeholder ZMW figures on each apartment card in `index.html`
- [ ] **Real social media links** → currently `#` placeholders in the footer (Facebook / Instagram / WhatsApp)

## 2. Accounts to set up
- [ ] **Formspree** (formspree.io) — sign up, create a form (one per form is cleanest: booking, appointment, contact), then replace every `YOUR_FORM_ID` placeholder in `index.html` with your real endpoint ID. Without this, the forms will show an error message on submit instead of actually sending anywhere.
- [ ] **VoiceFlow** — build your agent's conversation flows, publish it, then replace `'YOUR_PROJECT_ID'` near the bottom of `index.html` with your real project ID.

## 3. Before going live
- [ ] Double-check the confirmed business address still matches: *53593/2 Airport Road, Low Density, Off 2/2/6, Mkushi, Zambia*
- [ ] Update the "Last updated" date in `privacy.html` if you make further changes to data practices
- [ ] Test all three forms end-to-end once Formspree IDs are in place
- [ ] Test the VoiceFlow widget once it's published
- [ ] Check the site on an actual phone, not just by resizing a desktop browser window

## 4. Nice-to-haves (optional, not blockers)
- Real guest testimonials beyond the two existing Google reviews already pulled into the Testimonials section
- An `og:image` for social link previews (currently no image tag set)
- Hooking `window.PrimeCourt.scrollToBooking()` / `.scrollToSchedule()` / `.scrollToDirections()` into a VoiceFlow Custom Action, so the AI agent can actually move the page, not just talk
- A real shared backend/database so VoiceFlow bookings and the manual booking form end up in one place (currently they'd be two separate, disconnected systems even after both are wired up)
