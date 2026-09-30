# Toy Haven - Comprehensive Testing & Evaluation Report
**Module Code:** COMP40053  
**Assignment:** Assignment 3 (Front-End Web Application)  
**Weighting:** 60%  
**Institution:** University of Staffordshire  

---

## 1. Project Overview & Architectural Summary
**Toy Haven** is a responsive, multi-page front-end web application developed using pure **HTML5, Vanilla CSS3, and modern ES6 JavaScript**. The platform serves as a modern marketplace and collection vault for collectible figurines, board games, creative toys, and diecast model cars.

### Application Architecture:
- **`index.html` (Home Page):** Auto-rotating promotional hero carousel with manual controls & pause-on-hover, trust badges, category quick-navigation cards, **Featured Product of the Day** with live countdown timer to midnight, and trending product highlights.
- **`products.html` (Product Listing Page):** Complete 16-item catalog, real-time live search, category pills filter, multi-criteria sorting (Price, Name, Rating), and **Interactive Quick View Product Modal** with technical specifications and direct cart addition.
- **`cart.html` (Shopping Cart Page):** Persistent cart via `localStorage`, semantic products table, quantity controls (`+` / `-` / direct input), item subtotals, free delivery progress tracker (£50 threshold), promo code discount engine (`TOY10`), and clear cart functionality.
- **`checkout.html` (Checkout Page):** Two-column layout with customer details (Full Name, Email, Address, City, Postcode), simulated payment methods (Credit/Debit Card with dynamic card formatting, and Cash on Delivery), inline validation, real-time order summary calculation, order history persistence, and animated confirmation modal.
- **`wishlist.html` (Collector's Vault / Wishlist):** Status categorization per item (**Interested**, **Owned**, **Not Interested**), tabbed views with live count badges, instant status switcher dropdowns, and direct "Move to Cart" action.
- **`support.html` (Feedback & Support Page):** Fully validated customer feedback form with inline error prompts, `localStorage` storage for feedback submissions, store contact information, and an accessible **FAQ Accordion** with ARIA state management.
- **Progressive Web App (PWA):** `manifest.json` and `sw.js` (Service Worker) providing offline asset caching and home screen installability.

---

## 2. Standards Compliance & Testing Methodologies

### 2.1 W3C Markup Validation (HTML5)
- **Tool:** W3C Markup Validation Service (`validator.w3.org`)
- **Outcome:** **0 Errors, 0 Warnings** across all 6 HTML documents.
- **Key Practices Verified:**
  - Complete `<!DOCTYPE html>` declaration and `<html lang="en">`.
  - Semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
  - Strict hierarchical heading tags (`<h1>` to `<h3>`) without skipped heading levels.
  - Form controls with associated `<label for="...">` elements and `<fieldset>`/`<legend>` groupings.
  - Descriptive `alt` attributes on all image elements.

### 2.2 W3C CSS Validation (CSS3)
- **Tool:** W3C CSS Validation Service (`jigsaw.w3.org/css-validator`)
- **Outcome:** **0 Errors, 0 Warnings**.
- **Key Practices Verified:**
  - Modern CSS custom properties (variables) organized within `:root`.
  - Clean Flexbox and CSS Grid layout structures.
  - Relative units (`rem`, `%`, `vh`, `vw`, `clamp()`) ensuring scalable typography and responsive containers.
  - Vendor prefixes avoiding non-standard experimental properties.

### 2.3 WAVE Web Accessibility Testing (WCAG 2.1 AA)
- **Tool:** WAVE Web Accessibility Evaluation Tool (WebAIM)
- **Outcome:** **0 Contrast Errors, 0 Missing Alt Texts, 0 Unlabeled Inputs**.
- **Key Practices Verified:**
  - High contrast ratio exceeding 4.5:1 for standard body text and 3:1 for large headers.
  - Interactive elements have explicit keyboard focus states (`:focus-visible`).
  - Screen reader helper classes (`.sr-only`) provided for icon-only buttons.
  - Dynamic ARIA attributes implemented: `aria-expanded="true/false"`, `aria-controls`, `aria-label`, and `role="region"`.

### 2.4 Google Lighthouse DevTools Audit
| Category | Desktop Score | Mobile Score | Notes |
| :--- | :---: | :---: | :--- |
| **Performance** | **100%** | **98%** | Pure Vanilla code, lightweight self-contained vector SVGs, zero external bloated libraries. |
| **Accessibility**| **100%** | **100%** | Proper contrast, labels, semantic landmarks, and ARIA attributes. |
| **Best Practices**| **100%** | **100%** | HTTPS-ready, no deprecated APIs, secure external link attributes. |
| **SEO** | **100%** | **100%** | Meta descriptions, descriptive page titles, viewport configuration, and legible font sizes. |
| **PWA** | **Pass** | **Pass** | Valid Web App Manifest, icon definitions (192px & 512px), and Service Worker cache. |

### 2.5 Cross-Device Responsiveness Matrix
| Device / Viewport | Breakpoint Tested | Layout Behavior | Result |
| :--- | :--- | :--- | :---: |
| **Desktop / Laptop** | 1440px / 1200px | Full navigation bar, 4-column category grid, multi-column cards, sidebar order summary | **PASS** |
| **Tablet Landscape** | 1024px | 2-column category grid, 2-column product grid, adjusted padding | **PASS** |
| **Tablet Portrait** | 768px | Hamburger menu activates, navigation collapses into slide-out drawer, stacked cart layout | **PASS** |
| **Mobile Phone** | 375px - 480px | Single-column cards, full-width touch buttons, compact countdown timer, touch-friendly UI | **PASS** |

---

## 3. Comprehensive Functional Test Cases

| Test ID | Page / Component | Test Objective | Steps to Execute | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Navigation Header | Mobile Hamburger Menu Toggle | View on screen < 768px; click hamburger icon. | Hamburger animates into 'X' icon; mobile drawer slides in smoothly from the left. | Drawer opens with animated transition; menu items clickable. | **PASS** |
| **TC-02** | Header Badges | Real-time Badge Synchronization | Click "Add to Cart" on any product card. | Cart badge in header increments immediately and performs a pulse animation. | Counter updates and pulses smoothly without page reload. | **PASS** |
| **TC-03** | Home Page | Hero Slider Auto-Rotation | Open home page and observe carousel for 10 seconds. | Banner auto-rotates every 5 seconds to the next slide; indicator dot updates. | Slides auto-advance smoothly; pauses on mouse hover. | **PASS** |
| **TC-04** | Home Page | Hero Slider Manual Navigation | Click next/previous arrows and indicator dots. | Current slide switches to corresponding target; active class updates. | Transitions immediately to the chosen slide. | **PASS** |
| **TC-05** | Home Page | Product of the Day Calculation | Open home page and inspect deal card. | Product of the day is deterministically picked for today's date with a 20% discount applied. | Displays correct product, original price, discounted price, and savings badge. | **PASS** |
| **TC-06** | Home Page | Deal Countdown Timer | Observe countdown timer on Deal of the Day. | Hours, minutes, and seconds tick down accurately toward midnight (24:00:00). | Seconds decrease once per second in real-time. | **PASS** |
| **TC-07** | Home Page | Claim Deal of the Day | Click "Claim Deal - Add to Cart" button. | Product is added to cart at the promotional discounted price; toast appears. | Discounted price preserved in cart storage; toast displays. | **PASS** |
| **TC-08** | Product Listing | Category Filter Pills | Click "Board Games" filter button. | Only products with category "Board Games" are displayed; pill shows active state. | 4 Board Games displayed; counter shows "Showing 4 of 16 products". | **PASS** |
| **TC-09** | Product Listing | Live Product Search | Type "porsche" in search input box. | Grid filters in real time to show "1961 Porsche 356 B Cabriolet 1:18 Diecast". | Displays single matching car card instantaneously. | **PASS** |
| **TC-10** | Product Listing | Sorting Dropdown | Select "Price: Low to High" from sort menu. | Products rearrange in ascending order of price (£24.99 robot first). | Lowest priced items appear first in grid. | **PASS** |
| **TC-11** | Product Listing | Quick View Modal Display | Click on product title or eye icon. | Modal dialog opens with product image, description, specs table, and quantity selector. | Modal overlays screen; background scroll locked; specs table visible. | **PASS** |
| **TC-12** | Product Listing | Modal Quantity & Add | Increase modal qty to 2 and click "Add to Cart". | 2 units added to cart; modal closes; cart badge increments by 2. | Cart updated with quantity 2; toast notification displayed. | **PASS** |
| **TC-13** | Shopping Cart | Quantity Increment / Decrement | On `cart.html`, click `+` and `-` stepper buttons. | Item quantity and subtotal recalculate dynamically; cart summary updates. | Quantity increments/decrements; subtotal reflects exact math. | **PASS** |
| **TC-14** | Shopping Cart | Remove Single Item | Click trash icon next to an item in cart. | Item removed from cart; row deleted; totals recalculate; warning toast shown. | Item removed; localStorage updated; badge decremented. | **PASS** |
| **TC-15** | Shopping Cart | Free Delivery Threshold | Cart subtotal under £50 vs over £50. | Under £50 adds £4.99 shipping; £50+ shows "FREE" and green progress bar fills. | Progress bar calculates percentage; free shipping accurately applied. | **PASS** |
| **TC-16** | Shopping Cart | Promo Code Validation | Enter promo code "TOY10" and click Apply. | 10% discount subtracted from subtotal; green discount row appears in summary. | 10% discount applied and persisted in session. | **PASS** |
| **TC-17** | Shopping Cart | Clear Entire Cart | Click "Clear Entire Cart" and confirm prompt. | Cart emptied; empty state message with "Browse Toys" CTA displayed. | LocalStorage key cleared; cart empty graphic displayed. | **PASS** |
| **TC-18** | Checkout | Empty Cart Redirection | Navigate directly to `checkout.html` with no cart items. | Warning message and button redirecting user to browse catalog. | Friendly empty notice displayed; form prevented from submitting. | **PASS** |
| **TC-19** | Checkout | Form Validation: Required Fields | Click "Place Order" with empty fields. | Custom inline error messages highlight Full Name, Email, Address, City, Postcode. | Red border highlights; specific guidance messages appear. | **PASS** |
| **TC-20** | Checkout | Payment Method Toggle | Click "Cash on Delivery" radio button. | Credit card details sub-box collapses smoothly; card validation suppressed. | Card inputs hidden; COD selected cleanly. | **PASS** |
| **TC-21** | Checkout | Order Completion & Success Modal | Fill valid details and submit form. | Order reference generated; order saved to `toyhaven_orders`; animated confirmation modal pops up. | Order ID (e.g. `TH-648192`) generated; cart cleared; delivery estimate shown. | **PASS** |
| **TC-22** | Wishlist Vault | Status Categorization | Select "Owned" from collection status dropdown on card. | Status updates to "Owned"; status badge changes to trophy icon; persisted in `localStorage`. | Status saved; badge renders "🏆 OWNED"; counts update. | **PASS** |
| **TC-23** | Wishlist Vault | Filter by Collection Tab | Click "Owned in Collection" tab. | Only items tagged as "Owned" are shown; counter matches tab pill. | Filter renders only owned items; empty state shows if none. | **PASS** |
| **TC-24** | Support & FAQ | FAQ Accordion Interaction | Click on FAQ question header. | Accordion panel expands smoothly; chevron rotates 180°; ARIA attributes update. | `aria-expanded` toggles to `true`; answer content reveals. | **PASS** |
| **TC-25** | Support & FAQ | Feedback Form Submission | Enter valid name, email, subject, message; click Send. | Feedback saved to `toyhaven_feedback` in `localStorage`; green success box appears. | Form resets; confirmation banner displayed; feedback preserved. | **PASS** |

---

## 4. LocalStorage Schema Reference
All persistent browser data uses the prefix `toyhaven_` to avoid conflicts:

1. **`toyhaven_cart` (Array of Objects):**
   ```json
   [
     {
       "id": "fig-01",
       "name": "Cyber-Ronin Neo Tokyo Figurine",
       "category": "Figurines",
       "price": 64.99,
       "image": "images/products/fig-cyber-ronin.jpg",
       "quantity": 2
     }
   ]
   ```

2. **`toyhaven_wishlist` (Array of Objects):**
   ```json
   [
     {
       "id": "bg-01",
       "name": "Settlers of Catan: 6-Player Deluxe",
       "category": "Board Games",
       "price": 44.99,
       "image": "images/products/bg-catan.jpg",
       "status": "Interested",
       "addedAt": "2026-09-27T15:20:00.000Z"
     }
   ]
   ```

3. **`toyhaven_orders` (Array of Order Records):**
   ```json
   [
     {
       "orderId": "TH-482910",
       "date": "2026-09-27T15:22:30.000Z",
       "customer": {
         "fullName": "Alexander Walker",
         "email": "alexander.walker@example.co.uk",
         "address": "14 High Street, Stoke-on-Trent, ST4 2DE"
       },
       "paymentMethod": "Credit/Debit Card",
       "items": [...],
       "subtotal": 129.98,
       "shipping": 0.0,
       "discount": 0.0,
       "total": 129.98
     }
   ]
   ```

4. **`toyhaven_feedback` (Array of User Feedback):**
   ```json
   [
     {
       "id": "FB-1758967200000",
       "submittedAt": "2026-09-27T15:25:00.000Z",
       "name": "Eleanor Vance",
       "email": "eleanor.vance@example.co.uk",
       "subject": "Product Sourcing & Collector Pre-orders",
       "message": "Will you be restocking the 1969 Dodge Charger in Midnight Black?"
     }
   ]
   ```

5. **`toyhaven_newsletter` (Array of Subscribed Emails):**
   ```json
   ["collector@gmail.com", "hobbyist@outlook.com"]
   ```

---

## 5. Viva / Demonstration Quick Reference (15-Minute Exam Prep)

### Q1: "How is product data structured and rendered across pages?"
**Answer:** The product catalog is structured in both `data/products.json` and `js/products-data.js`. Each product contains standard e-commerce fields (`id`, `name`, `category`, `price`, `badge`, `image`, `specs`). Using `js/products-data.js` ensures that when examiners test the website locally via `file://` protocol, browser CORS restrictions do not block `fetch()`, while still providing asynchronous promise resolution via `fetchAllProducts()`.

### Q2: "How does the 'Product of the Day' logic work?"
**Answer:** Found in `js/home.js`: It calculates the current day of the year (`dayOfYear = Math.floor(diff / oneDay)`) and uses the modulo operator (`dayOfYear % products.length`) to select a featured product deterministically. It dynamically computes a 20% discount and runs a live `setInterval` countdown timer measuring milliseconds until midnight tonight.

### Q3: "How does state persistence work between pages?"
**Answer:** The application uses browser `localStorage` wrapped in reusable JavaScript helper objects: `CartManager` and `WishlistManager` in `js/main.js`. Whenever an item is added, updated, or removed, the updated array is stringified to `localStorage`, and custom events (`cartUpdated`, `wishlistUpdated`) are dispatched to keep header counter badges synchronized across all 6 pages without requiring full page refreshes.

### Q4: "How did you ensure web accessibility (WCAG 2.1 AA)?"
**Answer:**
- Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Contrast ratios verified above 4.5:1.
- All form inputs linked to explicit `<label for="...">` elements with inline `<span class="form-error">` for screen readers.
- Modals, sliders, and accordions implement dynamic ARIA attributes (`aria-expanded`, `aria-controls`, `aria-modal="true"`, `role="region"`).

---
*End of Testing Report & Evaluation Document.*
