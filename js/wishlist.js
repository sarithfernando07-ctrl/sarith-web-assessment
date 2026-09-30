/**
 * Toy Haven - Wishlist & Collector's Vault
 * Module: COMP40053 Assignment 3 | University of Staffordshire
 * 
 * Features:
 * 1. Read saved products from localStorage ('toyhaven_wishlist')
 * 2. Status categorization: "Interested", "Owned", "Not Interested"
 * 3. Dynamic filter tabs with item counters
 * 4. In-card status switcher dropdown with instant localStorage updates
 * 5. Move to Cart functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initWishlistPage();
});

function initWishlistPage() {
  const gridContainer = document.getElementById('wishlist-grid');
  const emptyState = document.getElementById('wishlist-empty-state');
  const tabs = document.querySelectorAll('.wish-tab-btn');

  let activeTab = 'all';

  function render() {
    const list = WishlistManager.getWishlist();

    // Update Counter Badges on Tabs
    const allCount = list.length;
    const interestedCount = list.filter(i => (i.status || 'Interested') === 'Interested').length;
    const ownedCount = list.filter(i => i.status === 'Owned').length;
    const notInterestedCount = list.filter(i => i.status === 'Not Interested').length;

    document.getElementById('count-all')?.replaceChildren(document.createTextNode(allCount));
    document.getElementById('count-interested')?.replaceChildren(document.createTextNode(interestedCount));
    document.getElementById('count-owned')?.replaceChildren(document.createTextNode(ownedCount));
    document.getElementById('count-not-interested')?.replaceChildren(document.createTextNode(notInterestedCount));

    // Filter items according to active tab
    const filtered = list.filter(item => {
      const status = item.status || 'Interested';
      if (activeTab === 'all') return true;
      if (activeTab === 'interested') return status === 'Interested';
      if (activeTab === 'owned') return status === 'Owned';
      if (activeTab === 'not-interested') return status === 'Not Interested';
      return true;
    });

    if (filtered.length === 0) {
      if (gridContainer) gridContainer.style.display = 'none';
      if (emptyState) {
        emptyState.style.display = 'block';
        const emptyMsg = document.getElementById('wishlist-empty-msg');
        if (emptyMsg) {
          if (activeTab === 'all') {
            emptyMsg.textContent = 'Your wishlist is currently empty. Explore our catalog to add collectibles!';
          } else {
            emptyMsg.textContent = `No items currently marked as "${activeTab.replace('-', ' ')}".`;
          }
        }
      }
      return;
    }

    if (gridContainer) gridContainer.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    gridContainer.innerHTML = filtered.map(item => {
      const status = item.status || 'Interested';

      // Badge class based on status
      let badgeClass = 'status-badge-interested';
      if (status === 'Owned') badgeClass = 'status-badge-owned';
      if (status === 'Not Interested') badgeClass = 'status-badge-not-interested';

      return `
        <article class="product-card" data-id="${item.id}">
          <div class="product-media">
            <span class="product-badge-overlay badge ${badgeClass}">
              ${status === 'Owned' ? '🏆 ' : status === 'Interested' ? '⭐ ' : '💤 '}${status.toUpperCase()}
            </span>
            <div class="product-card-actions">
              <button class="btn-card-action btn-wishlist-remove" data-id="${item.id}" title="Remove from Vault" aria-label="Remove item">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="product-body">
            <span class="product-category-meta">${item.category}</span>
            <h3 class="product-title" title="${item.name}">${item.name}</h3>

            <div class="wish-status-selector">
              <label style="font-size: 0.7rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Collection Status:</label>
              <select class="wish-status-select" data-id="${item.id}">
                <option value="Interested" ${status === 'Interested' ? 'selected' : ''}>⭐ Interested</option>
                <option value="Owned" ${status === 'Owned' ? 'selected' : ''}>🏆 Owned</option>
                <option value="Not Interested" ${status === 'Not Interested' ? 'selected' : ''}>💤 Not Interested</option>
              </select>
            </div>

            <div class="product-footer">
              <span class="current-price">${formatPrice(item.price)}</span>
              <button class="btn-add-cart btn-wish-to-cart" data-id="${item.id}">
                <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Move to Cart
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Tab Switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      render();
    });
  });

  // Event Delegation for Wishlist Grid
  if (gridContainer) {
    // Status change listener
    gridContainer.addEventListener('change', (e) => {
      const select = e.target.closest('.wish-status-select');
      if (select) {
        const id = select.dataset.id;
        const newStatus = select.value;
        WishlistManager.setStatus(id, newStatus);
        render();
      }
    });

    // Remove or Move to Cart click listener
    gridContainer.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.btn-wishlist-remove');
      if (removeBtn) {
        const id = removeBtn.dataset.id;
        WishlistManager.removeFromWishlist(id);
        render();
        return;
      }

      const cartBtn = e.target.closest('.btn-wish-to-cart');
      if (cartBtn) {
        const id = cartBtn.dataset.id;
        const list = WishlistManager.getWishlist();
        const item = list.find(i => i.id === id);
        if (item) {
          CartManager.addToCart(item, 1);
        }
      }
    });
  }

  // Initial render
  render();
  window.addEventListener('wishlistUpdated', render);
}
