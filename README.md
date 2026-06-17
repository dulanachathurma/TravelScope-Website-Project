# TravelScope 🌴

Explore Sri Lanka's most beautiful destinations.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel

1. Push to GitHub
2. Go to https://vercel.com → New Project
3. Import your repo
4. Framework: **Vite**
5. Click Deploy ✅

No extra config needed — `vercel.json` handles SPA routing.

## Project Structure

```
src/
  components/
    Navbar.jsx
    HomePage.jsx
    SearchPage.jsx
    PlaceCard.jsx
    MapModal.jsx
    Footer.jsx
    Snow.jsx
  data/
    placesData.js      ← All places & provinces here
  App.jsx
  App.css
  index.css
  main.jsx
public/
  images/              ← Put your images here (same paths as original)
vercel.json
```

## Images

Your original image paths work exactly the same.
Copy your `images/` folder into `public/` and all cards/carousel will load automatically.

Built with React + Vite ⚡
