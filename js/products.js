/**
 * Toy Haven - Product Listing & Filtering
 * Module: COMP40053 Assignment 3 | University of Staffordshire
 * 
 * Features:
 * 1. Category filtering (All, Figurines, Board Games, Toys, Diecast Cars)
 * 2. Real-time search by product name and description
 * 3. Sorting (Featured, Price Low to High, Price High to Low, Name A-Z)
 * 4. Interactive Quick View Modal with specifications & direct add-to-cart
 * 5. Dynamic cart count updates and wishlist synchronization
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductsPage();
});

function initProductsPage() {
  const products = window.TOY_PRODUCTS || [];
  const gridContainer = document.getElementById('products-grid');
  const searchInput = document.getElementById('product-search');
  const sortSelect = document.getElementById('product-sort');
  const categoryPills = document.querySelectorAll('.pill-btn');
  const resultsCountEl = document.getElementById('results-count');

  if (!gridContainer) return;

  // State
  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'featured';

  // Check URL query parameters (e.g. products.html?category=Figurines)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  if (paramCategory) {
    currentCategory = paramCategory.toLowerCase();
    categoryPills.forEach(pill => {
      if (pill.dataset.category.toLowerCase() === currentCategory) {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
    });
  }

  // Render & Filter function
  function render() {
    let filtered = products.filter(item => {
      // Category match
      const matchCat = (currentCategory === 'all') || (item.category.toLowerCase() === currentCategory);

      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchSearch = !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query);

      return matchCat && matchSearch;
    });

    // Sorting
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name-az') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Update Counter
    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${filtered.length} of ${products.length} products`;
    }

    // Empty state
    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>No matching toys found</h3>
          <p style="color: #64748b; margin-bottom: 1.25rem;">Try adjusting your search terms or clearing your category filters.</p>
          <button class="btn btn-secondary" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;

      document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
        currentCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        categoryPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
        render();
      });
      return;
    }

    // Render Cards
    gridContainer.innerHTML = filtered.map(product => {
      const isWish = WishlistManager.isInWishlist(product.id);

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media">
            <span class="product-badge-overlay badge badge-primary">${product.badge}</span>
            <div class="product-card-actions">
              <button class="btn-card-action ${isWish ? 'active-wish' : ''} btn-wishlist-toggle" data-id="${product.id}" title="Save to Wishlist" aria-label="Save to Wishlist">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
              <button class="btn-card-action btn-quick-view" data-id="${product.id}" title="Quick View" aria-label="Quick View Details">
                <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
          </div>
          <div class="product-body">
            <span class="product-category-meta">${product.category}</span>
            <h3 class="product-title" title="${product.name}">
              <a href="#" class="quick-view-link" data-id="${product.id}">${product.name}</a>
            </h3>
            <div class="product-rating">
              <span class="stars-list">★★★★★</span>
              <span>${product.rating} (${product.reviewsCount})</span>
            </div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.75rem; line-height: 1.4;">${product.shortDescription}</p>
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
  }

  // Category Pills Click Listener
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category.toLowerCase();
      render();
    });
  });

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  // Sort Dropdown Listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      render();
    });
  }

  // Event Delegation for Grid Actions (Add to Cart, Wishlist, Quick View)
  gridContainer.addEventListener('click', (e) => {
    // 1. Add to Cart button
    const cartBtn = e.target.closest('.btn-add-cart');
    if (cartBtn) {
      const prodId = cartBtn.dataset.id;
      const product = products.find(p => p.id === prodId);
      if (product) {
        CartManager.addToCart(product, 1);
      }
      return;
    }

    // 2. Wishlist Toggle button
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
      return;
    }

    // 3. Quick View Modal trigger
    const qvBtn = e.target.closest('.btn-quick-view') || e.target.closest('.quick-view-link');
    if (qvBtn) {
      e.preventDefault();
      const prodId = qvBtn.dataset.id;
      const product = products.find(p => p.id === prodId);
      if (product) {
        openQuickViewModal(product);
      }
    }
  });

  // Initial render
  render();

  // Listen for external wishlist changes to keep heart states updated
  window.addEventListener('wishlistUpdated', render);
}

// ---------------------------------------------------------------------------
// Quick View Product Modal Implementation
// ---------------------------------------------------------------------------
function openQuickViewModal(product) {
  let modalBackdrop = document.getElementById('quick-view-modal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'quick-view-modal';
    modalBackdrop.className = 'modal-backdrop';
    document.body.appendChild(modalBackdrop);
  }

  // Format Specs Table
  const specsRows = product.specs ? Object.entries(product.specs).map(([key, val]) => `
    <tr>
      <td>${key}</td>
      <td><strong>${val}</strong></td>
    </tr>
  `).join('') : '';

  const isWish = WishlistManager.isInWishlist(product.id);

  modalBackdrop.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-prod-title">
      <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <div class="modal-body">
        <div class="modal-image-box">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="modal-details">
          <div>
            <span class="badge badge-primary">${product.category}</span>
            <span class="badge badge-emerald" style="margin-left: 0.5rem;">${product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}</span>
          </div>
          <h2 id="modal-prod-title" style="font-size: 1.5rem; font-weight: 800; line-height: 1.25;">${product.name}</h2>
          
          <div style="display: flex; align-items: baseline; gap: 0.75rem;">
            <span style="font-size: 1.75rem; font-weight: 800; color: #0f172a;">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span style="text-decoration: line-through; color: #94a3b8;">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>

          <p style="font-size: 0.9rem; color: #475569; line-height: 1.6;">${product.description}</p>

          <table class="modal-specs-table">
            <tbody>
              ${specsRows}
            </tbody>
          </table>

          <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem; flex-wrap: wrap;">
            <div class="qty-stepper">
              <button class="qty-btn" id="modal-qty-minus">-</button>
              <input type="number" id="modal-qty-input" class="qty-input" value="1" min="1" max="${product.stockCount || 10}" readonly />
              <button class="qty-btn" id="modal-qty-plus">+</button>
            </div>
            
            <button class="btn btn-primary" id="modal-add-cart-btn" style="flex: 1;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Add to Cart
            </button>

            <button class="btn btn-secondary ${isWish ? 'active-wish' : ''}" id="modal-add-wish-btn" title="Add to Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWish ? '#ef4444' : 'none'}" stroke="${isWish ? '#ef4444' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Open modal animation
  requestAnimationFrame(() => {
    modalBackdrop.classList.add('is-open');
  });

  // Quantity controls
  const qtyInput = document.getElementById('modal-qty-input');
  document.getElementById('modal-qty-minus')?.addEventListener('click', () => {
    let val = parseInt(qtyInput.value) || 1;
    if (val > 1) qtyInput.value = val - 1;
  });
  document.getElementById('modal-qty-plus')?.addEventListener('click', () => {
    let val = parseInt(qtyInput.value) || 1;
    const max = product.stockCount || 10;
    if (val < max) qtyInput.value = val + 1;
  });

  // Add to cart from modal
  document.getElementById('modal-add-cart-btn')?.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value) || 1;
    CartManager.addToCart(product, qty);
    closeModal();
  });

  // Add to wishlist from modal
  document.getElementById('modal-add-wish-btn')?.addEventListener('click', () => {
    if (WishlistManager.isInWishlist(product.id)) {
      WishlistManager.removeFromWishlist(product.id);
    } else {
      WishlistManager.addToWishlist(product, 'Interested');
    }
    closeModal();
  });

  // Close handlers
  function closeModal() {
    modalBackdrop.classList.remove('is-open');
  }

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}
