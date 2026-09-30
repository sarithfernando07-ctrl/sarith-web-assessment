/**
 * Toy Haven - Shopping Cart Logic
 * Module: COMP40053 Assignment 3 | University of Staffordshire
 * 
 * Features:
 * 1. Render all added products from localStorage
 * 2. Quantity controls (+ / -) and item subtotal calculations
 * 3. Free shipping threshold calculation (£50 target) with animated progress
 * 4. Promo code discount simulation (e.g. 'TOY10' for 10% off)
 * 5. Clear cart confirmation & Proceed to Checkout CTA
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartPage();
});

function initCartPage() {
  const tableBody = document.getElementById('cart-table-body');
  const cartLayout = document.getElementById('cart-layout');
  const emptyState = document.getElementById('cart-empty-state');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');
  const freeShippingText = document.getElementById('free-shipping-text');
  const shippingProgressBar = document.getElementById('shipping-progress-bar');
  const clearCartBtn = document.getElementById('btn-clear-cart');
  const promoForm = document.getElementById('promo-form');
  const promoInput = document.getElementById('promo-input');

  let activeDiscountPercent = 0;

  // Check if promo already applied in session
  const savedPromo = sessionStorage.getItem('toyhaven_promo');
  if (savedPromo === 'TOY10') {
    activeDiscountPercent = 0.10;
  }

  function renderCart() {
    const cart = CartManager.getCart();

    if (!cart || cart.length === 0) {
      if (cartLayout) cartLayout.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (cartLayout) cartLayout.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    // Render Table Rows
    if (tableBody) {
      tableBody.innerHTML = cart.map(item => {
        const itemSubtotal = item.price * item.quantity;

        return `
          <tr data-id="${item.id}">
            <td class="cart-product-cell">
              <img src="${item.image}" alt="${item.name}" class="cart-thumb" />
              <div>
                <h4 class="cart-item-title">${item.name}</h4>
                <span class="cart-item-cat">${item.category}</span>
              </div>
            </td>
            <td>
              <span style="font-weight: 700; color: #1e293b;">${formatPrice(item.price)}</span>
            </td>
            <td>
              <div class="qty-stepper">
                <button class="qty-btn btn-cart-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                <input type="number" class="qty-input cart-qty-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}" readonly />
                <button class="qty-btn btn-cart-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
              </div>
            </td>
            <td>
              <span style="font-weight: 800; color: #0f172a;">${formatPrice(itemSubtotal)}</span>
            </td>
            <td style="text-align: right;">
              <button class="btn-remove-item btn-cart-remove" data-id="${item.id}" title="Remove item" aria-label="Remove item from cart">
                <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Calculations
    const subtotal = CartManager.getSubtotal();
    const FREE_SHIPPING_THRESHOLD = 50.0;
    let shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0.0 : 4.99;
    let discountAmount = subtotal * activeDiscountPercent;
    let grandTotal = Math.max(0, subtotal - discountAmount + shipping);

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
      shippingEl.style.color = shipping === 0 ? '#10b981' : '#1e293b';
    }

    if (discountRow && discountEl) {
      if (activeDiscountPercent > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${formatPrice(discountAmount)} (10%)`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (totalEl) totalEl.textContent = formatPrice(grandTotal);

    // Free Shipping Progress
    if (shippingProgressBar && freeShippingText) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingProgressBar.style.width = '100%';
        freeShippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Delivery</strong>!`;
      } else {
        const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
        const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingProgressBar.style.width = `${percent}%`;
        freeShippingText.innerHTML = `Add <strong>£${remaining}</strong> more to get <strong>FREE Delivery</strong>!`;
      }
    }
  }

  // Event Delegation for Cart Table
  if (tableBody) {
    tableBody.addEventListener('click', (e) => {
      const minusBtn = e.target.closest('.btn-cart-minus');
      if (minusBtn) {
        const id = minusBtn.dataset.id;
        const cart = CartManager.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          CartManager.updateQuantity(id, item.quantity - 1);
          renderCart();
        }
        return;
      }

      const plusBtn = e.target.closest('.btn-cart-plus');
      if (plusBtn) {
        const id = plusBtn.dataset.id;
        const cart = CartManager.getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          CartManager.updateQuantity(id, item.quantity + 1);
          renderCart();
        }
        return;
      }

      const removeBtn = e.target.closest('.btn-cart-remove');
      if (removeBtn) {
        const id = removeBtn.dataset.id;
        CartManager.removeFromCart(id);
        renderCart();
      }
    });
  }

  // Clear Cart Button
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove all items from your cart?')) {
        CartManager.clearCart();
        renderCart();
        showToast('Cart cleared', 'warning');
      }
    });
  }

  // Promo Code Form
  if (promoForm && promoInput) {
    promoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'TOY10') {
        activeDiscountPercent = 0.10;
        sessionStorage.setItem('toyhaven_promo', 'TOY10');
        showToast('Promo code "TOY10" applied! 10% discount added.', 'success');
        renderCart();
      } else {
        showToast('Invalid promo code. Try "TOY10"', 'error');
      }
    });
  }

  // Initial render & sync
  renderCart();
  window.addEventListener('cartUpdated', renderCart);
}
