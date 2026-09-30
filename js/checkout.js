/**
 * Toy Haven - Checkout & Order Processing
 * Module: COMP40053 Assignment 3 | University of Staffordshire
 * 
 * Features:
 * 1. Form validation (Full Name, Email, Delivery Address, Card/COD payment)
 * 2. Calculate final totals dynamically from cart in localStorage
 * 3. Render real-time order summary
 * 4. Animated order confirmation modal
 * 5. Order history storage in localStorage and cart clearing
 */

document.addEventListener('DOMContentLoaded', () => {
  initCheckoutPage();
});

function initCheckoutPage() {
  const form = document.getElementById('checkout-form');
  const orderItemsList = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountEl = document.getElementById('checkout-discount');
  const totalEl = document.getElementById('checkout-total');
  const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
  const cardDetailsSection = document.getElementById('card-details-section');

  const cart = CartManager.getCart();

  // If cart is empty, alert and redirect
  if (!cart || cart.length === 0) {
    const layout = document.getElementById('checkout-container');
    if (layout) {
      layout.innerHTML = `
        <div class="empty-state" style="margin: 4rem auto; max-width: 600px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <h3>Your cart is empty</h3>
          <p style="color: #64748b; margin-bottom: 1.5rem;">Add some collectibles or toys before proceeding to checkout.</p>
          <a href="products.html" class="btn btn-primary">Browse Catalog</a>
        </div>
      `;
    }
    return;
  }

  // Render Order Summary Sidebar
  const subtotal = CartManager.getSubtotal();
  const shipping = subtotal >= 50 ? 0.0 : 4.99;
  const isPromo = sessionStorage.getItem('toyhaven_promo') === 'TOY10';
  const discount = isPromo ? (subtotal * 0.10) : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  if (orderItemsList) {
    orderItemsList.innerHTML = cart.map(item => `
      <div class="order-mini-item">
        <img src="${item.image}" alt="${item.name}" />
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${item.name}
          </div>
          <div style="font-size: 0.75rem; color: #64748b;">
            Qty: ${item.quantity} &times; ${formatPrice(item.price)}
          </div>
        </div>
        <span style="font-weight: 700; font-size: 0.85rem; color: #0f172a;">
          ${formatPrice(item.price * item.quantity)}
        </span>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);

  if (discountRow && discountEl) {
    if (isPromo) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-${formatPrice(discount)} (10%)`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (totalEl) totalEl.textContent = formatPrice(total);

  // Toggle Card Details Box depending on selected payment method
  paymentMethods.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('is-selected'));
      radio.closest('.payment-method-card').classList.add('is-selected');

      if (radio.value === 'card') {
        if (cardDetailsSection) cardDetailsSection.style.display = 'block';
      } else {
        if (cardDetailsSection) cardDetailsSection.style.display = 'none';
      }
    });
  });

  // Card Number Auto-Formatter
  const cardNumberInput = document.getElementById('card-number');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = formatted;
    });
  }

  // Card Expiry Auto-Formatter MM/YY
  const cardExpiryInput = document.getElementById('card-expiry');
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
    });
  }

  // Form Submit & Comprehensive Validation
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 1. Full Name
      const nameInput = document.getElementById('fullName');
      const nameVal = nameInput?.value.trim() || '';
      if (!nameVal || nameVal.split(' ').length < 2) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // 2. Email Address
      const emailInput = document.getElementById('email');
      const emailVal = emailInput?.value.trim() || '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // 3. Street Address
      const addressInput = document.getElementById('address');
      const addressVal = addressInput?.value.trim() || '';
      if (!addressVal || addressVal.length < 5) {
        setFieldError(addressInput, true);
        isValid = false;
      } else {
        setFieldError(addressInput, false);
      }

      // 4. City
      const cityInput = document.getElementById('city');
      const cityVal = cityInput?.value.trim() || '';
      if (!cityVal) {
        setFieldError(cityInput, true);
        isValid = false;
      } else {
        setFieldError(cityInput, false);
      }

      // 5. Postal Code
      const postcodeInput = document.getElementById('postcode');
      const postcodeVal = postcodeInput?.value.trim() || '';
      if (!postcodeVal || postcodeVal.length < 3) {
        setFieldError(postcodeInput, true);
        isValid = false;
      } else {
        setFieldError(postcodeInput, false);
      }

      // 6. Payment Method Validation
      const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'card';

      if (selectedPayment === 'card') {
        const cardNum = document.getElementById('card-number');
        const cleanCard = (cardNum?.value || '').replace(/\s/g, '');
        if (cleanCard.length < 16) {
          setFieldError(cardNum, true);
          isValid = false;
        } else {
          setFieldError(cardNum, false);
        }

        const cardExp = document.getElementById('card-expiry');
        const expVal = cardExp?.value || '';
        if (!/^\d{2}\/\d{2}$/.test(expVal)) {
          setFieldError(cardExp, true);
          isValid = false;
        } else {
          setFieldError(cardExp, false);
        }

        const cardCvv = document.getElementById('card-cvv');
        const cvvVal = cardCvv?.value || '';
        if (cvvVal.length < 3) {
          setFieldError(cardCvv, true);
          isValid = false;
        } else {
          setFieldError(cardCvv, false);
        }
      }

      if (!isValid) {
        showToast('Please correct the highlighted fields.', 'error');
        return;
      }

      // Build Order Object
      const orderId = 'TH-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        orderId: orderId,
        date: new Date().toISOString(),
        customer: {
          fullName: nameVal,
          email: emailVal,
          address: `${addressVal}, ${cityVal}, ${postcodeVal}`
        },
        paymentMethod: selectedPayment === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery simulation',
        items: cart,
        subtotal: subtotal,
        shipping: shipping,
        discount: discount,
        total: total
      };

      // Save Order History in localStorage
      try {
        const orderHistory = JSON.parse(localStorage.getItem('toyhaven_orders') || '[]');
        orderHistory.unshift(newOrder);
        localStorage.setItem('toyhaven_orders', JSON.stringify(orderHistory));
      } catch (err) {
        console.error('Error saving order history:', err);
      }

      // Clear Cart from localStorage
      CartManager.clearCart();
      sessionStorage.removeItem('toyhaven_promo');

      // Trigger Animated Success Modal
      showOrderSuccessModal(newOrder);
    });
  }
}

function setFieldError(inputEl, isError) {
  if (!inputEl) return;
  inputEl.classList.toggle('is-invalid', isError);
  const errorMsg = inputEl.parentElement.querySelector('.form-error');
  if (errorMsg) {
    errorMsg.style.display = isError ? 'block' : 'none';
  }
}

function showOrderSuccessModal(order) {
  let modal = document.getElementById('order-success-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'order-success-modal';
    modal.className = 'success-modal';
    document.body.appendChild(modal);
  }

  // Delivery estimation: 2-3 business days
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const dateFormatted = deliveryDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  modal.innerHTML = `
    <div class="success-card">
      <div class="success-icon-wrap">
        <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      </div>
      <span class="badge badge-emerald" style="margin-bottom: 0.75rem;">ORDER CONFIRMED</span>
      <h2 style="font-size: 1.85rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Thank You, ${order.customer.fullName.split(' ')[0]}!</h2>
      <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem;">
        Your order <strong>#${order.orderId}</strong> has been placed successfully. A confirmation receipt has been sent to <strong>${order.customer.email}</strong>.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; text-align: left; margin-bottom: 1.75rem; font-size: 0.85rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="color: #64748b;">Order Total:</span>
          <strong style="color: #0f172a; font-size: 1rem;">${formatPrice(order.total)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="color: #64748b;">Payment Method:</span>
          <strong>${order.paymentMethod}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="color: #64748b;">Estimated Delivery:</span>
          <strong style="color: #10b981;">${dateFormatted}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b;">Delivery Address:</span>
          <span style="text-align: right; max-width: 200px;">${order.customer.address}</span>
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
        <a href="index.html" class="btn btn-secondary">Return to Home</a>
        <a href="products.html" class="btn btn-primary">Continue Shopping</a>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    modal.classList.add('is-active');
  });
}
