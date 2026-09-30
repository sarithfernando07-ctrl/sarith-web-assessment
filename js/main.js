/**
 * Toy Haven - Shared JavaScript Framework
 * Module: COMP40053 Assignment 3 | University of Staffordshire
 * 
 * Reusable functions across all pages:
 * - CartManager: localStorage persistence, badge updates, calculations
 * - WishlistManager: localStorage tracking and classification
 * - Toast Notification System
 * - Mobile Navigation Drawer Toggle
 * - Currency Formatter
 * - PWA Service Worker Registration
 */

// ---------------------------------------------------------------------------
// 1. Currency & Formatter Helpers (Reusable across pages)
// ---------------------------------------------------------------------------
function formatPrice(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return '£' + num.toFixed(2);
}

// ---------------------------------------------------------------------------
// 2. Toast Notification System
// ---------------------------------------------------------------------------
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  // SVG Icon based on type
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  }

  toast.innerHTML = `${iconSvg}<span>${message}</span>`;
  container.appendChild(toast);

  // Trigger entrance transition
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 3.2 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, 3200);
}

// ---------------------------------------------------------------------------
// 3. Cart Manager (localStorage: 'toyhaven_cart')
// ---------------------------------------------------------------------------
const CartManager = {
  STORAGE_KEY: 'toyhaven_cart',

  getCart() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read cart from localStorage', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  },

  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart(cart);
    showToast(`Added "${product.name}" to cart!`, 'success');
  },

  updateQuantity(productId, newQty) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    if (newQty <= 0) {
      this.removeFromCart(productId);
    } else {
      item.quantity = newQty;
      this.saveCart(cart);
    }
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    this.saveCart(cart);
    if (item) {
      showToast(`Removed "${item.name}" from cart`, 'warning');
    }
  },

  clearCart() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateBadges();
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: [] } }));
  },

  getTotalCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  updateBadges() {
    const count = this.getTotalCount();
    document.querySelectorAll('.cart-counter-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      badge.classList.remove('bump');
      void badge.offsetWidth; // trigger reflow
      badge.classList.add('bump');
    });
  }
};

// ---------------------------------------------------------------------------
// 4. Wishlist Manager (localStorage: 'toyhaven_wishlist')
// ---------------------------------------------------------------------------
const WishlistManager = {
  STORAGE_KEY: 'toyhaven_wishlist',

  getWishlist() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read wishlist from localStorage', e);
      return [];
    }
  },

  saveWishlist(list) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { wishlist: list } }));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.some(item => item.id === productId);
  },

  addToWishlist(product, status = 'Interested') {
    const list = this.getWishlist();
    const existing = list.find(item => item.id === product.id);

    if (existing) {
      existing.status = status;
      this.saveWishlist(list);
      showToast(`Updated "${product.name}" in wishlist (${status})`, 'success');
    } else {
      list.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        status: status, // "Interested", "Owned", "Not Interested"
        addedAt: new Date().toISOString()
      });
      this.saveWishlist(list);
      showToast(`Added "${product.name}" to Wishlist!`, 'success');
    }
  },

  setStatus(productId, status) {
    const list = this.getWishlist();
    const item = list.find(i => i.id === productId);
    if (item) {
      item.status = status;
      this.saveWishlist(list);
      showToast(`Marked as "${status}"`, 'success');
    }
  },

  removeFromWishlist(productId) {
    let list = this.getWishlist();
    const item = list.find(i => i.id === productId);
    list = list.filter(i => i.id !== productId);
    this.saveWishlist(list);
    if (item) {
      showToast(`Removed "${item.name}" from wishlist`, 'warning');
    }
  },

  updateBadges() {
    const count = this.getWishlist().length;
    document.querySelectorAll('.wishlist-counter-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    });
  }
};

// ---------------------------------------------------------------------------
// 5. Shared Mobile Navigation & Newsletter Listeners
// ---------------------------------------------------------------------------
function initGlobalFeatures() {
  // Update header counters on page load
  CartManager.updateBadges();
  WishlistManager.updateBadges();

  // Mobile Hamburger Toggle
  const hamburger = document.querySelector('.hamburger-btn');
  const mainNav = document.querySelector('.main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mainNav.classList.contains('is-open') &&
        !mainNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mainNav.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Footer Newsletter Subscription
  const newsletterForm = document.getElementById('footer-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput?.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      try {
        const storedEmails = JSON.parse(localStorage.getItem('toyhaven_newsletter') || '[]');
        if (storedEmails.includes(email)) {
          showToast('You are already subscribed to our newsletter!', 'warning');
        } else {
          storedEmails.push(email);
          localStorage.setItem('toyhaven_newsletter', JSON.stringify(storedEmails));
          showToast('Thank you for subscribing to Toy Haven!', 'success');
          emailInput.value = '';
        }
      } catch (err) {
        console.error('Newsletter storage error:', err);
      }
    });
  }

  // PWA Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('ServiceWorker registration error:', err);
      });
    });
  }
}

// Global initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initGlobalFeatures);

// Export to window for global script access
window.CartManager = CartManager;
window.WishlistManager = WishlistManager;
window.formatPrice = formatPrice;
window.showToast = showToast;
