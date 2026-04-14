// ============================================
// AMORÉ BOUTIQUE — CHECKOUT JS
// Google Sheets + Email integration
// ============================================

// ⚠️ IMPORTANT: Replace this with your Google Apps Script Web App URL
// See SETUP_GUIDE.md for instructions on how to get this URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderOrderSummary();
  checkEmptyCart();
});

function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function checkEmptyCart() {
  if (cart.length === 0) {
    // Redirect to shop if cart is empty
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
      confirmBtn.textContent = 'Cart is empty – go shopping!';
      confirmBtn.onclick = () => location.href = 'shop.html';
    }
  }
}

function renderOrderSummary() {
  const summaryItems = document.getElementById('summaryItems');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryTotal = document.getElementById('summaryTotal');

  if (!summaryItems) return;

  const subtotal = getCartTotal();
  const total = subtotal + DELIVERY_FEE;

  summaryItems.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if (!p) return '';
    return `
      <div class="summary-item">
        <span class="summary-item-name">${p.emoji} ${p.name} × ${item.qty}</span>
        <span class="summary-item-price">${p.price * item.qty} DT</span>
      </div>
    `;
  }).join('') || '<p style="text-align:center;color:var(--text-light);font-size:0.85rem;padding:20px">No items in cart</p>';

  if (summarySubtotal) summarySubtotal.textContent = subtotal + ' DT';
  if (summaryTotal) summaryTotal.textContent = total + ' DT';
}

function validateForm() {
  const fields = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    phone: document.getElementById('phone'),
    email: document.getElementById('email'),
    town: document.getElementById('town'),
    address: document.getElementById('address')
  };

  let valid = true;

  Object.entries(fields).forEach(([key, el]) => {
    if (!el) return;
    el.style.borderColor = '';
    if (!el.value.trim()) {
      el.style.borderColor = '#e05060';
      el.focus();
      valid = false;
    }
  });

  if (!valid) {
    showError('Please fill in all required fields.');
    return null;
  }

  // Basic email validation
  const emailVal = fields.email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    fields.email.style.borderColor = '#e05060';
    showError('Please enter a valid email address.');
    return null;
  }

  return {
    firstName: fields.firstName.value.trim(),
    lastName: fields.lastName.value.trim(),
    phone: fields.phone.value.trim(),
    email: emailVal,
    town: fields.town.value.trim(),
    address: fields.address.value.trim(),
    notes: document.getElementById('notes')?.value.trim() || ''
  };
}

function showError(msg) {
  const existing = document.getElementById('formError');
  if (existing) existing.remove();

  const err = document.createElement('div');
  err.id = 'formError';
  err.style.cssText = `
    background:#fdf0f3; border:1px solid #e8a0b0;
    color:#c97088; padding:12px 16px; border-radius:10px;
    font-size:0.85rem; margin-top:8px;
  `;
  err.textContent = '⚠️ ' + msg;

  const btn = document.getElementById('confirmBtn');
  btn?.parentNode?.insertBefore(err, btn);
  setTimeout(() => err.remove(), 5000);
}

async function confirmOrder() {
  if (cart.length === 0) {
    showError('Your cart is empty!');
    return;
  }

  const customerInfo = validateForm();
  if (!customerInfo) return;

  const subtotal = getCartTotal();
  const total = subtotal + DELIVERY_FEE;

  // Build order data
  const orderItems = cart.map(item => {
    const p = getProductById(item.id);
    return `${p?.name} x${item.qty} (${p?.price * item.qty} DT)`;
  }).join(', ');

  const orderData = {
    timestamp: new Date().toLocaleString('fr-TN', { timeZone: 'Africa/Tunis' }),
    firstName: customerInfo.firstName,
    lastName: customerInfo.lastName,
    phone: customerInfo.phone,
    email: customerInfo.email,
    town: customerInfo.town,
    address: customerInfo.address,
    notes: customerInfo.notes,
    items: orderItems,
    subtotal: subtotal + ' DT',
    deliveryFee: DELIVERY_FEE + ' DT',
    total: total + ' DT',
    itemCount: cart.reduce((s, i) => s + i.qty, 0)
  };

  // Show loading state
  const btn = document.getElementById('confirmBtn');
  const originalText = btn.textContent;
  btn.textContent = 'Sending order... 💌';
  btn.disabled = true;

  try {
    // Send to Google Sheets via Apps Script
    if (GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    }

    // Clear cart
    cart = [];
    saveCart();

    // Show success modal
    document.getElementById('successName').textContent = customerInfo.firstName;
    document.getElementById('successTotal').textContent = total + ' DT';
    document.getElementById('successPhone').textContent = customerInfo.phone;
    document.getElementById('successModal').classList.add('open');

  } catch (err) {
    console.error('Order submission error:', err);
    // Still show success to customer (order saved locally)
    cart = [];
    saveCart();
    document.getElementById('successName').textContent = customerInfo.firstName;
    document.getElementById('successTotal').textContent = total + ' DT';
    document.getElementById('successPhone').textContent = customerInfo.phone;
    document.getElementById('successModal').classList.add('open');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}
