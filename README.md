# Yan BTY — E-commerce Website

> Morocco's premium multi-brand beauty destination.  
> Built with React + Vite · Mobile-first · Brand Guidelines v1 Autumn 2025

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Brand Guidelines](#brand-guidelines)
6. [Content Management (content.json)](#content-management)
7. [Key Features](#key-features)
8. [Deployment](#deployment)
9. [Font Licensing](#font-licensing)
10. [Developer Notes](#developer-notes)

---

## Project Overview

Yan BTY is a premium multi-brand beauty e-commerce website for the Moroccan market, inspired by Sephora and Charlotte Tilbury. The site:

- Showcases **multi-brand products** (Clarins, Charlotte Tilbury, NARS, La Roche-Posay, etc.)
- Highlights **Yan&One** — the brand's own in-house signature collection
- Is fully **mobile-first responsive**
- Implements beauty-specific UX (skin profile, "Good For You" tags, beauty journal, kenzup loyalty)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 8 |
| Routing | React Router v6 |
| Styling | CSS Modules (per-component) |
| Icons | lucide-react |
| SEO | react-helmet-async |
| State | React Context API (Cart, Auth, BeautyProfile) |
| Node | v18+ (tested on v24.15.0 via NVM) |

---

## Getting Started

### Prerequisites
- Node.js v18+ — recommended via NVM: `nvm use 24`

### Install and run
```bash
# Clone
git clone https://github.com/ralialahlou/yan-bty.git
cd yan-bty

# Install dependencies
npm install

# Start dev server — http://localhost:5173
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
yan-bty/
├── public/
│   ├── favicon.svg              # Yan BTY "y" icon (brand guidelines p.46)
│   └── images/                  # Static brand images
│       ├── cat-makeup.png       # Category images (from brand guidelines assets)
│       ├── cat-skincare.png
│       ├── cat-haircare.png
│       ├── cat-bodycare.png
│       ├── cat-suncare.png
│       ├── cat-scents.png
│       ├── pillow-talk-1..6     # Pillow Talk product images
│       └── gift-card-1..3       # Gift card brand reference images
│
├── src/
│   ├── content.json             ← EDITABLE: all site text & configuration
│   ├── index.css                # Global styles + CSS variables (brand palette)
│   ├── App.jsx                  # Routes + global providers + ScrollToTop
│   │
│   ├── context/
│   │   ├── CartContext.jsx      # Cart state, gift message, samples
│   │   ├── AuthContext.jsx      # Auth, multi-list wishlists
│   │   └── BeautyProfileContext.jsx  # Skin profile, "Good For You" logic
│   │
│   ├── data/                    # Mock data — replace with API calls in production
│   │   ├── products.js          # Full product catalogue
│   │   ├── brands.js            # Brand list
│   │   ├── categories.js        # Categories + subcategory groups
│   │   └── editorial.js         # Journal articles + routine steps
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx       # Sticky header, full-width mega menus, search
│   │   │   └── Footer.jsx       # Newsletter, links, social, pattern strip
│   │   ├── cart/
│   │   │   └── CartDrawer.jsx   # Slide-in cart with wishlist upsell
│   │   ├── products/
│   │   │   └── ProductCard.jsx  # Reusable product card
│   │   └── common/
│   │       ├── Logo.jsx         # Two-line yan® / BTY wordmark
│   │       ├── LogoIcon.jsx     # Circular "y" icon
│   │       ├── Button.jsx / Badge.jsx / RatingStars.jsx
│   │       ├── AuthModal.jsx    # Login / register modal
│   │       ├── WishlistPicker.jsx / WishlistDrawer.jsx
│   │       └── SEO.jsx          # Per-page meta + OG tags
│   │
│   └── pages/
│       ├── HomePage.jsx         # Hero, categories, Yan&One, editorial sections
│       ├── ProductListPage.jsx  # PLP: filters sidebar, subcategory accordion
│       ├── ProductDetailPage.jsx # PDP: swatches, store availability, UGC
│       ├── CheckoutPage.jsx     # 3-step checkout
│       ├── AccountPage.jsx      # Profile, orders, wishlists, loyalty, addresses
│       ├── JournalPage.jsx      # Beauty journal: index + rich article view
│       ├── BrandPage.jsx        # Brand pages (Yan&One + partner brands)
│       ├── StorePage.jsx        # Store locator (6 Moroccan stores)
│       ├── GiftCardsPage.jsx    # Monetary gift cards + category gift sets
│       └── OurStoryPage.jsx     # About / brand story
```

---

## Brand Guidelines

Visual identity follows **Yan BTY Brand Guidelines v1, Autumn 2025**.

### Colour Palette (p.49)
| CSS Variable | Name | Hex |
|---|---|---|
| `--color-brown` | YB Brown | `#332114` |
| `--color-tabla-red` | YB Tabla Red | `#b25745` |
| `--color-light-tabla-red` | YB Light Tabla Red | `#d4a391` |
| `--color-medium-taupe` | YB Medium Taupe | `#ebdecc` |
| `--color-light-taupe` | YB Light Taupe | `#ebe8e0` |

All tokens are in `src/index.css` `:root { }`.

### Typography (p.54–57)
- **Brand font:** Kometa Uniforma (Fontfabric — **commercial licence required**, see below)
- **Dev substitute:** `Outfit` — Google Fonts, weights 200–600
- **Logo "yan" letterforms:** `Comfortaa` Light 300 (closest free match)
- To activate Uniforma: change `--font-primary` in `src/index.css`

### Logo (p.35–46)
Two-line stacked wordmark:
```
  yan®          ← Comfortaa Light 300
B  T  Y         ← Outfit 200, letter-spacing 0.55em
```
Usage: single colour per context — never split.
- Light backgrounds → `<Logo variant="dark" />`
- Dark/brown backgrounds → `<Logo variant="light" />`
- Accent contexts → `<Logo variant="red" />`

---

## Content Management

**`src/content.json`** — edit any text, price thresholds, store info, and social links without touching React components.

```jsonc
{
  "promoBar": "Free shipping on orders over 500 MAD · ...",
  "homepage": {
    "heroLine1": "Be Your",
    "heroLine2": "Beautiful.",
    "loyaltyTitle": "Join kenzup Loyalty",
    ...
  },
  "stores": [ { "name": "Yan BTY Morocco Mall", ... } ],
  "loyalty": { "pointsPerMad": 1, "reviewBonus": 50, ... },
  "checkout": { "freeShippingThreshold": 500, "shippingCost": 49 }
}
```

After any edit: `npm run build`

---

## Key Features

### Shopping
- **PLP** — Brand, skin type, concern, certification filters; subcategory accordion (first section, above Brand); sort; grid/list toggle
- **PDP** — Multi-image gallery, colour swatches (hex-based), size selector, accordion (description/how-to/ingredients), store availability modal (6 stores), "As Seen on Social" UGC grid, awards strip, verified reviews
- **Cart drawer** — Free shipping progress, wishlist upsell (first item only), no gift message in cart
- **Checkout** — 3 steps: Details → Shipping (gift opt-in toggle + Yan&One sample selector) → Payment (card / COD)

### Beauty Intelligence
- **Beauty Profile** — Skin type + concerns + preferences
- **"Good For You"** — Products matching profile badge (green); requires all 3 conditions to pass
- **Ingredient transparency** — Key/full ingredient list, pregnancy-safe labels

### Account
- **Multi-list Wishlists** — Tabs per list, add/remove products, create/delete lists
- **Orders** — History with product thumbnails + order detail + inline review form (+50 kenzup points)
- **kenzup Loyalty** — Points balance, tier progress bar, app download (kenzup.com)
- **Addresses** — Add / edit / delete; default address

### Content
- **Beauty Journal** — Rich articles: pullquotes, benefit grids, step-by-step accordions, author bio, product recs with Add to Bag
- **Scroll reveal** — IntersectionObserver fade-up on all sections
- **SEO** — Per-page `<title>`, description, OG tags, structured data (Website + Product)

---

## Deployment

Static build → `dist/` folder. Deployable to Vercel, Netlify, or any static host.

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
Connect this GitHub repo. Settings:
- Build command: `npm run build`
- Publish directory: `dist`
- Add `public/_redirects` file with: `/* /index.html 200`

### Environment variables
No `.env` needed for dev. For production add:
```
VITE_API_URL=https://api.yanbty.ma
```

---

## Font Licensing

| Font | Usage | Licence |
|------|-------|---------|
| **Kometa Uniforma** | Brand body + display text | Commercial — purchase from [fontfabric.com](https://www.fontfabric.com/) |
| Comfortaa | Logo "yan" wordmark | Free — Google Fonts |
| Outfit | All UI text (Uniforma substitute) | Free — Google Fonts |

### Activating Uniforma
1. Place font files in `public/fonts/uniforma-extralight.woff2` and `uniforma-regular.woff2`
2. Add to `src/index.css`:
```css
@font-face {
  font-family: 'Uniforma';
  src: url('/fonts/uniforma-extralight.woff2') format('woff2');
  font-weight: 200;
  font-display: swap;
}
@font-face {
  font-family: 'Uniforma';
  src: url('/fonts/uniforma-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```
3. Change in `:root`: `--font-primary: 'Uniforma', 'Outfit', sans-serif;`

---

## Developer Notes

### Adding a product
In `src/data/products.js` each product accepts:
```js
{
  id, name, brand, brandName, category, subcategory,
  price, currency,          // MAD
  image,                    // primary image URL
  images: [],               // gallery
  variantType: 'color',     // triggers hex swatch UI
  variants: [{ id, name, hex, inStock }],
  sizes: [{ label, price }],
  skinTypes: [],            // 'Normal','Dry','Oily','Combination','Sensitive'
  skinConcerns: [],
  certifications: [],       // 'Clean Beauty','Vegan','Cruelty-Free', etc.
  ugcImages: [{ src, user, likes }],  // "As Seen on Social" section
  pregnancySafe: true/false,
  awards: [],
  isNew, isBestseller, isEditorsPick
}
```

### Adding a brand
`src/data/brands.js` — set `isOwn: true` for Yan&One.

### Adding a category
`src/data/categories.js` — add `groups[]` for the PLP subcategory accordion and mega menu.

### Connecting a real backend
1. Replace `src/data/*.js` functions with `fetch`/`axios` calls
2. Update `CartContext` / `AuthContext` to call real endpoints
3. Move `content.json` strings to a CMS (Contentful, Sanity, Strapi)

### Known limitations (current mock-only build)
- No real payments — Stripe integration needed
- No real auth — add JWT + API
- No real order persistence — backend required
- Product data is static JSON — connect to a product database

---

*Yan BTY · www.yanbty.ma · Built with Claude Code*
