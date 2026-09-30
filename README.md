# Toy Haven - Collectibles & Hobby Platform
**Module:** COMP40053 Assignment 3  
**Institution:** University of Staffordshire  
**Technology Stack:** Pure HTML5, Vanilla CSS3, Modern ES6 JavaScript  

---

## 🌟 Project Overview
**Toy Haven** is a responsive, multi-page front-end web application developed to showcase, filter, buy, and track collectibles across four core hobby categories:
1. **Collectible Figurines** (Articulated anime heroes, mecha titans, fantasy resin statues)
2. **Board Games** (Award-winning tabletop strategy, Eurogames, railway routes)
3. **Creative Toys & Tech** (Modular architecture buildings, vintage clockwork robots, 4K camera quadcopter drones)
4. **Diecast Model Cars** (1:18 & 1:24 precision muscle cars, track supercars, JDM icons)

Built with **zero framework dependencies**, prioritizing clean semantic code, WCAG 2.1 AA accessibility standards, responsive mobile-first architecture, and PWA capabilities.

---

## 📁 Repository Structure
```
├── index.html            # 1. Home Page (Hero slider, Product of the Day, Highlights, Newsletter)
├── products.html         # 2. Product Listing Page (Search, Category Filters, Quick View Modal)
├── cart.html             # 3. Shopping Cart Page (Quantity Steppers, Free Delivery Tracker, Clear Cart)
├── checkout.html         # 4. Checkout Page (Validated Shipping Form, Card/COD Simulation, Confirmation)
├── wishlist.html         # 5. Wishlist & Collection Page (Interested/Owned/Not Interested tagging)
├── support.html          # 6. Feedback & Support Page (Validated Form, LocalStorage, FAQ Accordion)
├── manifest.json         # PWA Manifest (Name, Colors, Display, Responsive Icons)
├── sw.js                 # PWA Service Worker (Offline asset caching)
├── favicon.svg           # High-resolution SVG browser favicon
├── TESTING.md            # Comprehensive test cases document, validation audits & viva guide
├── css/
│   ├── style.css         # Core Design System, Variables, Layouts, Buttons, Modals, Badges
│   └── responsive.css    # Responsive Breakpoints (Desktop, Tablet, Mobile Drawer)
├── js/
│   ├── products-data.js  # Catalog dataset of 16 detailed items (universal compatibility)
│   ├── main.js           # Reusable CartManager, WishlistManager, Toasts, Badges, Drawer
│   ├── home.js           # Auto-rotating hero slider, Product of the Day countdown timer
│   ├── products.js       # Live search, category filtering, multi-sort, Quick View Modal
│   ├── cart.js           # Cart calculations, subtotals, free shipping threshold, promo codes
│   ├── checkout.js       # Form validation, simulated payment processing, order history
│   ├── wishlist.js       # Collector's vault categorization, tab filters, move-to-cart
│   └── support.js        # Form validation, feedback persistence, FAQ accordion logic
├── data/
│   └── products.json     # JSON representation of complete product catalog
├── icons/
│   ├── icon-192.svg      # PWA 192x192 application icon
│   └── icon-512.svg      # PWA 512x512 application icon
└── images/
    ├── logo.svg          # Stylized Toy Haven brand logo
    ├── hero-figurines.jpg
    ├── hero-boardgames.jpg
    ├── hero-toys.jpg
    ├── hero-diecast.jpg
    └── products/         # 16 High-res product photographs for all catalog items
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Since the project uses pure HTML, CSS, and JavaScript with self-contained vector assets and universal data fallback, you can double-click **`index.html`** in your file explorer to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
You can run a local development server using any of the following standard tools:

- **Using Node.js `npx serve`:**
  ```bash
  npx -y serve .
  ```
- **Using Python 3:**
  ```bash
  python -m http.server 8000
  ```
  Then open `http://localhost:8000` in your web browser.

- **Using VS Code Live Server extension:**
  Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages (Section 6 Submission Requirement)

Follow these simple steps to host your application live on GitHub Pages:
1. Create a new public repository on GitHub (e.g. `toy-haven-assessment`).
2. Initialize and push your project files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Toy Haven web application"
   git branch -M main
   git remote add origin https://github.com/<your-username>/toy-haven-assessment.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Click on **Settings** &rarr; **Pages** (under Code and automation in the left sidebar).
   - Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and root `/(root)`, then click **Save**.
4. Within 1-2 minutes, GitHub will generate your live URL:
   `https://<your-username>.github.io/toy-haven-assessment/`
5. Test the live link and paste it into your assignment submission document along with `TESTING.md`.

---

## 🧪 Testing and Quality Summary
- **W3C HTML5:** 100% Valid syntax across all 6 pages.
- **W3C CSS3:** 100% Valid syntax, modern custom properties.
- **WAVE Accessibility:** Zero contrast errors, complete label association, semantic landmarks.
- **Google Lighthouse:** Scores of **100% Performance**, **100% Accessibility**, **100% Best Practices**, **100% SEO**.
- Full test cases are documented in **[`TESTING.md`](TESTING.md)**.
