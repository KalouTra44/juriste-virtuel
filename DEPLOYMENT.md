# Deployment Guide

## Domain & Hosting (Web)
- Choose a registrar: Cloudflare, Namecheap, or Google Domains.
- Register your domain, e.g., `yourbrand.com`.
- Hosting options:
  - Static hosting (recommended for this repo): Cloudflare Pages, Netlify, Vercel, GitHub Pages.
- Build & deploy:
  - Deploy `/workspace/web` as a static site. Entry: `index.html`.
  - Set DNS: `A`/`CNAME` for root and `www` to hosting provider.

## Mobile Builds (Expo + EAS)
- Requirements: Expo account, Apple Developer account, Google Play Console.
- Configure identifiers in `mobile/app.json`:
  - iOS `bundleIdentifier`
  - Android `package`
- Install deps:
  ```bash
  cd mobile
  npm i
  npx expo install
  ```
- Login and build:
  ```bash
  npm run eas:login
  npm run build:prod
  ```
- Artifacts will be available in Expo build logs.

## Store Submission
- iOS (App Store Connect):
  - Create App with the `bundleIdentifier`.
  - Upload via EAS Submit or Transporter.
  - Fill metadata, screenshots, privacy, and submit for review.
- Android (Google Play Console):
  - Create App with the `package` name.
  - Upload AAB, create release, privacy, content rating, and roll out.

## OTA Updates
- Use Expo Updates for over-the-air JS updates (configure channels, EAS Update).

## Environment & Secrets
- Store keys in Expo (EAS secrets), hosting provider project secrets, and never commit them.