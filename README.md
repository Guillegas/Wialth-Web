# Wialth — Landing Page

> Marketing landing page for **Wialth**, a personal finance app that helps users track, grow, and protect their wealth.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)

---

## Overview

This repository contains the public-facing landing page for the Wialth app. It is built as a fast, SEO-friendly single-page application designed to convert visitors into waitlist sign-ups.

### Key sections

| Section | Description |
|---|---|
| **Hero** | Main headline, sub-copy and primary CTA with phone mockup |
| **Benefits** | Three-column feature highlights |
| **How It Works** | Step-by-step onboarding flow |
| **Stats** | Social-proof numbers with animated ticker |
| **FAQ** | Accordion with common questions |
| **CTA** | Final conversion section |
| **Footer** | Navigation, legal links |
| **Sticky CTA** | Floating button that appears after scrolling past Hero |

---

## Tech Stack

- **React 18** — UI component library
- **Vite 6** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first styling
- **React Router v7** — Client-side routing for legal pages
- **Vercel** — Hosting & deployment

---

## Project Structure

```
wialth-landing/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── Benefits.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Stats.jsx
│   │   ├── Faq.jsx
│   │   ├── CtaSection.jsx
│   │   ├── Footer.jsx
│   │   ├── StickyCta.jsx
│   │   ├── PhoneMockup.jsx
│   │   ├── PhoneMockupChat.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Testimonials.jsx
│   │   ├── TickerBanner.jsx
│   │   ├── Toast.jsx
│   │   └── LegalLayout.jsx
│   ├── pages/           # Legal pages
│   │   ├── AvisoLegal.jsx
│   │   ├── Cookies.jsx
│   │   └── Privacidad.jsx
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── api/                 # Serverless API routes (Vercel)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Guillegas/Wialth-Web.git
cd Wialth-Web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

---

## Deployment

The project is deployed automatically on **Vercel** on every push to `main`.

To deploy manually:

```bash
npm run deploy
```

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production — always deployable |
| `develop` | Integration branch — merges features before release |
| `feature/*` | New features and improvements |
| `hotfix/*` | Urgent production fixes |

---

## License

Private — All rights reserved. Wialth © 2025.
