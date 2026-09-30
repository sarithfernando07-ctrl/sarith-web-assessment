/**
 * Toy Haven - Home Page Interactions
 * Module: COMP40053 Assignment 3 | University of Staffordshire
 * 
 * Features:
 * 1. Auto-rotating promotional hero carousel (Figurines, Board Games, Toys, Diecast Cars)
 * 2. Featured "Product of the Day" logic with dynamic countdown timer to midnight
 * 3. Featured product highlights showcase
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initProductOfTheDay();
  renderFeaturedHighlights();
});

// ---------------------------------------------------------------------------
// 1. Auto-Rotating Promotional Hero Slider
// ---------------------------------------------------------------------------
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const sliderSection = document.querySelector('.hero-slider-section');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  const ROTATE_INTERVAL = 5000; // 5 seconds per slide

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, ROTATE_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Next / Previous Buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  // Indicator Dots Click
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoPlay();
    });
  });

  // Pause on mouse hover for friendly UX
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', stopAutoPlay);
    sliderSection.addEventListener('mouseleave', startAutoPlay);
  }

  // Keyboard navigation support
  sliderSection.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    }
  });

  startAutoPlay();
}

// ---------------------------------------------------------------------------
// 2. Featured "Product of the Day" Logic & Countdown Timer
// ---------------------------------------------------------------------------
function initProductOfTheDay() {
  const dealContainer = document.getElementById('deal-of-the-day-container');
  if (!dealContainer) return;

  // Use the global TOY_PRODUCTS catalog
  const products = window.TOY_PRODUCTS || [];
  if (!products.length) return;

  // Logic: Deterministically pick a product based on day-of-year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const dealIndex = dayOfYear % products.length;
  const dealProduct = products[dealIndex];

  // Apply a promotional 20% discount for the deal of the day
  const discountedPrice = Math.round(dealProduct.price * 0.8 * 100) / 100;
  const savings = Math.round((dealProduct.price - discountedPrice) * 100) / 100;

  dealContainer.innerHTML = `
    <div class="deal-card">
      <div class="deal-media">
        <span class="deal-badge">🔥 DEAL OF THE DAY (20% OFF)</span>
        <img src="${dealProduct.image}" alt="${dealProduct.name}" loading="lazy" />
      </div>
      <div class="deal-content">
        <span class="badge badge-amber">${dealProduct.category.toUpperCase()} HIGHLIGHT</span>
        <h3 style="font-size: 1.85rem; font-weight: 800; line-height: 1.2;">${dealProduct.name}</h3>
        <p style="color: #cbd5e1; font-size: 0.95rem;">${dealProduct.shortDescription}</p>
        
        <div class="deal-price-row">
          <span class="deal-current-price">${formatPrice(discountedPrice)}</span>
          <span class="deal-original-price">${formatPrice(dealProduct.price)}</span>
          <span class="deal-savings">Save ${formatPrice(savings)}</span>
        </div>

        <div>
          <p style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 700;">
            Offer Ends Tonight In:
          </p>
          <div class="deal-countdown-box">
            <div class="countdown-unit">
              <span class="countdown-num" id="deal-hours">00</span>
              <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-unit">
              <span class="countdown-num" id="deal-minutes">00</span>
              <span class="countdown-label">Mins</span>
            </div>
            <div class="countdown-unit">
              <span class="countdown-num" id="deal-seconds">00</span>
              <span class="countdown-label">Secs</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; align-items: center; margin-top: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-primary btn-lg" id="btn-add-deal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Claim Deal - Add to Cart
          </button>
          <a href="products.html" class="btn btn-outline" style="border-color: #64748b; color: #e2e8f0;">
            Browse All Toys &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach Add Deal to Cart click handler
  document.getElementById('btn-add-deal')?.addEventListener('click', () => {
    // Add product at promotional discounted price
    CartManager.addToCart({
      ...dealProduct,
      price: discountedPrice
    }, 1);
  });

  // Start live countdown timer ticking to midnight
  startDealCountdown();
}

function startDealCountdown() {
  function updateTimer() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // End of today

    const diff = midnight - now;

    if (diff <= 0) {
      document.getElementById('deal-hours').textContent = '00';
      document.getElementById('deal-minutes').textContent = '00';
      document.getElementById('deal-seconds').textContent = '00';
      return;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const hoursEl = document.getElementById('deal-hours');
    const minsEl = document.getElementById('deal-minutes');
    const secsEl = document.getElementById('deal-seconds');

    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ---------------------------------------------------------------------------
// 3. Featured Highlights Showcase (1 product per category)
// ---------------------------------------------------------------------------
function renderFeaturedHighlights() {
  const container = document.getElementById('featured-products-container');
  if (!container) return;

  const products = window.TOY_PRODUCTS || [];
  if (!products.length) return;

  // Pick 1 flagship item from each of the 4 categories
  const categories = ['Figurines', 'Board Games', 'Toys', 'Diecast Cars'];
  const featured = categories.map(cat => products.find(p => p.category === cat)).filter(Boolean);

  container.innerHTML = featured.map(product => {
    const isWish = WishlistManager.isInWishlist(product.id);

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-media">
          <span class="product-badge-overlay badge badge-primary">${product.badge}</span>
          <div class="product-card-actions">
            <button class="btn-card-action ${isWish ? 'active-wish' : ''} btn-wishlist-toggle" data-id="${product.id}" title="Add to Wishlist" aria-label="Add to Wishlist">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
        </div>
        <div class="product-body">
          <span class="product-category-meta">${product.category}</span>
          <h3 class="product-title" title="${product.name}">${product.name}</h3>
          <div class="product-rating">
            <span class="stars-list">★★★★★</span>
            <span>(${product.reviewsCount})</span>
          </div>
          <div class="product-footer">
            <div class="product-price-box">
              <span class="current-price">${formatPrice(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <button class="btn-add-cart" data-id="${product.id}">
              <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Event delegation for Add to Cart
  container.addEventListener('click', (e) => {
    const addCartBtn = e.target.closest('.btn-add-cart');
    if (addCartBtn) {
      const prodId = addCartBtn.dataset.id;
      const product = products.find(p => p.id === prodId);
      if (product) {
        CartManager.addToCart(product, 1);
      }
      return;
    }

    const wishBtn = e.target.closest('.btn-wishlist-toggle');
    if (wishBtn) {
      const prodId = wishBtn.dataset.id;
      const product = products.find(p => p.id === prodId);
      if (product) {
        if (WishlistManager.isInWishlist(prodId)) {
          WishlistManager.removeFromWishlist(prodId);
          wishBtn.classList.remove('active-wish');
        } else {
          WishlistManager.addToWishlist(product, 'Interested');
          wishBtn.classList.add('active-wish');
        }
      }
    }
  });
}
