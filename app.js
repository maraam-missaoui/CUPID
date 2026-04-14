// ===== PRODUCT DATA =====
const PRODUCTS = [
  {
    id: 1,
    name: "Pearl Butterfly Ring",
    price: 45,
    category: "jewelry",
    tags: ["trending"],
    badge: "New",
    inStock: true,
    stock: 8,
    description: "Delicate butterfly ring adorned with a lustrous freshwater pearl. Adjustable band fits most sizes. Perfect for everyday wear or as a dreamy gift.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80"
    ]
  },
  {
    id: 2,
    name: "Cupid Gold Necklace",
    price: 65,
    category: "jewelry",
    tags: ["trending"],
    badge: "Limited",
    badgeType: "limited",
    inStock: true,
    stock: 3,
    description: "18k gold-plated Cupid charm on a dainty 45cm chain. Symbolizes love and romance. Comes in a beautiful gift box.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"
    ]
  },
  {
    id: 3,
    name: "Romantic Gift Box Set",
    price: 120,
    category: "gifts",
    tags: [],
    badge: "Bestseller",
    inStock: true,
    stock: 5,
    description: "A curated gift box with a rose-scented candle, mini perfume, pearl earrings, and a handwritten card. The perfect gift for your bestie or yourself.",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
    ]
  },
  {
    id: 4,
    name: "Pink Bow Hair Clips Set",
    price: 28,
    category: "accessories",
    tags: ["trending"],
    badge: "New",
    inStock: true,
    stock: 15,
    description: "Set of 6 satin bow hair clips in blush pink, dusty rose, and ivory. Aesthetic and functional — salon quality at an affordable price.",
    images: [
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=600&q=80",
      "https://images.unsplash.com/photo-1596543682005-78ff8e75b5d2?w=600&q=80"
    ]
  },
  {
    id: 5,
    name: "Heart Locket Necklace",
    price: 55,
    category: "jewelry",
    tags: [],
    badge: null,
    inStock: true,
    stock: 7,
    description: "Silver-toned locket heart pendant that opens for a photo or small note. The most romantic piece in our collection.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
    ]
  },
  {
    id: 6,
    name: "Birthday Bestie Box",
    price: 95,
    category: "gifts",
    tags: [],
    badge: "Popular",
    inStock: false,
    stock: 0,
    description: "Everything your bestie needs to feel special on her birthday. Includes a mini makeup bag, lip gloss duo, crystal bracelet, and birthday card.",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80"
    ]
  },
  {
    id: 7,
    name: "Dainty Star Bracelet",
    price: 38,
    category: "jewelry",
    tags: ["trending"],
    badge: null,
    inStock: true,
    stock: 12,
    description: "Minimalist bracelet with tiny star charms on a fine chain. Stacks beautifully with other bracelets. Available in gold and silver tones.",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
    ]
  },
  {
    id: 8,
    name: "Floral Silk Scrunchie Set",
    price: 22,
    category: "accessories",
    tags: [],
    badge: "Value",
    inStock: true,
    stock: 20,
    description: "Set of 4 silk-feel scrunchies in a floral print. Gentle on hair, cute in photos. A must-have for the aesthetic girlie.",
    images: [
      "https://images.unsplash.com/photo-1596543682005-78ff8e75b5d2?w=600&q=80",
      "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=600&q=80"
    ]
  }
];

const REVIEWS = [
  { name: "Sana M.", sub: "Tunis 🇹🇳", emoji: "🌸", text: "Absolutely obsessed with my pearl butterfly ring! Came so beautifully packaged, I cried a little. Will definitely order again.", stars: 5 },
  { name: "Lina K.", sub: "Sfax", emoji: "💗", text: "The gift box was perfect for my best friend's birthday. She loved every single thing in it. 10/10 recommend!", stars: 5 },
  { name: "Rania B.", sub: "Sousse", emoji: "✨", text: "Fast delivery and payment on delivery made it so easy. The necklace is even prettier in real life!", stars: 5 },
  { name: "Yasmine H.", sub: "Monastir", emoji: "🎀", text: "Finally a Tunisian shop that gets the aesthetic! The packaging is chef's kiss. Already placed my second order.", stars: 5 },
  { name: "Cyrine A.", sub: "Bizerte", emoji: "💫", text: "The bow clips are so cute and the quality is amazing for the price. My whole friend group ordered them now lol", stars: 5 },
  { name: "Mariem T.", sub: "Ariana", emoji: "🌷", text: "Love that I didn't have to pay online. Got my bracelet, it's beautiful, and I paid at the door. Super trustworthy shop!", stars: 5 },
];

const DELIVERY_FEE = 8;
let cart = JSON.parse(localStorage.getItem('cupid_cart') || '[]');
let currentFilter = 'all';
let currentSort = 'default';
let currentProductId = null;

// ===== SAVE CART =====
function saveCart() {
  localStorage.setItem('cupid_cart', JSON.stringify(cart));
  updateCartCount();
}

// ===== CART COUNT =====
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = count;
  if (count > 0) {
    el.classList.add('visible');
  } else {
    el.classList.remove('visible');
  }
}

// ===== ADD TO CART =====
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !product.inStock) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({ id: productId, qty: quantity });
  }
  saveCart();
  showToast(`💗 ${product.name} added to cart!`);
}

// ===== REMOVE FROM CART =====
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCartPage();
}

// ===== UPDATE QTY =====
function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    saveCart();
    renderCartPage();
  }
}

// ===== CART TOTAL =====
function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== PAGE ROUTING =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  // Close mobile menu
  document.getElementById('mainNav').classList.remove('open');

  // Render specific pages
  if (page === 'cart') renderCartPage();
  if (page === 'checkout') renderCheckoutSummary();
  if (page === 'shop') renderShopGrid();
}

// ===== PRODUCT CARD HTML =====
function productCardHTML(product) {
  const badgeType = product.badgeType || '';
  const badgeHTML = product.badge
    ? `<div class="product-badge ${badgeType} ${!product.inStock ? 'out' : ''}">${!product.inStock ? 'Sold Out' : product.badge}</div>`
    : (!product.inStock ? `<div class="product-badge out">Sold Out</div>` : '');

  return `
    <div class="product-card" onclick="openProduct(${product.id})">
      <div class="product-img-container">
        ${badgeHTML}
        <img class="img-main" src="${product.images[0]}" alt="${product.name}" loading="lazy" />
        ${product.images[1] ? `<img class="img-hover" src="${product.images[1]}" alt="${product.name}" loading="lazy" />` : ''}
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <div class="product-price-row">
          <div class="product-price">${product.price}<span> DT</span></div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})"
            ${!product.inStock ? 'disabled' : ''} title="Add to cart">
            <i class="fas fa-${product.inStock ? 'plus' : 'times'}"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ===== RENDER FEATURED =====
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.inStock).slice(0, 4);
  grid.innerHTML = featured.map(productCardHTML).join('');
}

// ===== RENDER SHOP =====
function renderShopGrid() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  let products = [...PRODUCTS];

  // Filter
  if (currentFilter !== 'all') {
    products = products.filter(p =>
      p.category === currentFilter || p.tags.includes(currentFilter)
    );
  }

  // Sort
  if (currentSort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (currentSort === 'name') products.sort((a, b) => a.name.localeCompare(b.name));

  grid.innerHTML = products.length
    ? products.map(productCardHTML).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
        <div style="font-size:40px;margin-bottom:16px">🌸</div>
        <p>No products in this category yet. Check back soon!</p>
       </div>`;
}

// ===== FILTER =====
function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('#shopFilters .cat-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderShopGrid();
}

function filterAndGo(filter) {
  currentFilter = filter;
  showPage('shop');
  // Update pills after page renders
  setTimeout(() => {
    document.querySelectorAll('#shopFilters .cat-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filter);
    });
    renderShopGrid();
  }, 50);
}

// ===== SORT =====
function sortProducts(value) {
  currentSort = value;
  renderShopGrid();
}

// ===== OPEN PRODUCT PAGE =====
function openProduct(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  currentProductId = id;

  const inner = document.getElementById('productPageInner');
  inner.innerHTML = `
    <div class="product-back-btn" onclick="history.back()">
      <i class="fas fa-arrow-left"></i> Back
    </div>
    <div class="product-page-layout">
      <div class="product-gallery">
        <div class="product-gallery-main" id="galleryMain">
          <img src="${product.images[0]}" alt="${product.name}" id="mainProductImg" />
        </div>
        ${product.images.length > 1 ? `
        <div class="product-gallery-thumbs">
          ${product.images.map((img, i) => `
            <img src="${img}" alt="${product.name}" class="${i === 0 ? 'active' : ''}"
              onclick="switchProductImg('${img}', this)" />
          `).join('')}
        </div>` : ''}
      </div>
      <div class="product-detail">
        <p class="product-category">✦ ${product.category}</p>
        <h1>${product.name}</h1>
        <div class="product-detail-price">${product.price}<span> DT</span></div>
        <div class="product-detail-stock ${product.inStock ? 'in-stock' : 'out-stock'}">
          <i class="fas fa-${product.inStock ? 'check-circle' : 'times-circle'}"></i>
          ${product.inStock ? `In Stock (${product.stock} left)` : 'Out of Stock'}
        </div>
        <p class="product-detail-desc">${product.description}</p>
        <div class="product-detail-actions">
          <button class="btn btn-primary" onclick="addToCart(${product.id})"
            ${!product.inStock ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
            <i class="fas fa-bag-shopping"></i> Add to Cart
          </button>
          <button class="btn btn-ghost" onclick="addToCart(${product.id}); showPage('cart')"
            ${!product.inStock ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
            Buy Now
          </button>
        </div>
        <div class="product-detail-info">
          <p>🎀 <strong>Gift-ready packaging</strong> included with every order<br/>
          💳 <strong>Payment on delivery</strong> — no online payment needed<br/>
          🚚 Delivery fee: <strong>${DELIVERY_FEE} DT</strong> added at checkout</p>
        </div>
      </div>
    </div>
  `;

  showPage('product');
}

function switchProductImg(src, thumb) {
  document.getElementById('mainProductImg').src = src;
  document.querySelectorAll('.product-gallery-thumbs img').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// ===== RENDER CART =====
function renderCartPage() {
  const itemsEl = document.getElementById('cartItems');
  const summaryEl = document.getElementById('orderSummary');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛍️</div>
        <h3>Your bag is empty</h3>
        <p>Add something cute to get started!</p>
        <br/>
        <button class="btn btn-primary" onclick="showPage('shop')">Shop Now ✨</button>
      </div>`;
    summaryEl.innerHTML = '';
    return;
  }

  const subtotal = getCartTotal();
  const total = subtotal + DELIVERY_FEE;

  itemsEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${p.images[0]}" alt="${p.name}" />
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <p>${p.category}</p>
        </div>
        <div class="cart-item-controls">
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQty(${p.id}, -1)">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${p.id}, 1)">+</button>
          </div>
          <div class="cart-item-price">${(p.price * item.qty).toFixed(0)} DT</div>
          <button class="remove-btn" onclick="removeFromCart(${p.id})" title="Remove">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`;
  }).join('');

  summaryEl.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-row"><span>Subtotal (${cart.reduce((s, i) => s + i.qty, 0)} items)</span><span>${subtotal} DT</span></div>
    <div class="summary-row"><span>Delivery</span><span>${DELIVERY_FEE} DT</span></div>
    <div class="summary-row total"><span>Total</span><span>${total} DT</span></div>
    <div class="delivery-note">💳 You pay when you receive your package — no online payment!</div>
    <button class="btn btn-primary checkout-btn" onclick="showPage('checkout')">
      Checkout <i class="fas fa-arrow-right"></i>
    </button>
    <button class="btn btn-ghost checkout-btn" onclick="showPage('shop')" style="margin-top:8px">
      Continue Shopping
    </button>`;
}

// ===== RENDER CHECKOUT SUMMARY =====
function renderCheckoutSummary() {
  const el = document.getElementById('checkoutSummary');
  if (!el) return;

  const subtotal = getCartTotal();
  const total = subtotal + DELIVERY_FEE;

  el.innerHTML = `
    <h3>Your Order</h3>
    ${cart.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      if (!p) return '';
      return `<div class="checkout-product-row">
        <span>${p.name} × ${item.qty}</span>
        <span>${(p.price * item.qty)} DT</span>
      </div>`;
    }).join('')}
    <div class="summary-row" style="margin-top:12px"><span>Subtotal</span><span>${subtotal} DT</span></div>
    <div class="summary-row"><span>Delivery</span><span>${DELIVERY_FEE} DT</span></div>
    <div class="summary-row total"><span>Total</span><span>${total} DT</span></div>
    <div class="delivery-note" style="margin-top:16px">💳 Payment on delivery — you pay when you get your package!</div>
  `;
}

// ===== PLACE ORDER =====
function placeOrder() {
  const fullName = document.getElementById('cFullName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const address = document.getElementById('cAddress').value.trim();
  const notes = document.getElementById('cNotes').value.trim();

  if (!fullName) { showToast('⚠️ Please enter your full name'); return; }
  if (!phone) { showToast('⚠️ Please enter your phone number'); return; }
  if (!address) { showToast('⚠️ Please enter your delivery address'); return; }
  if (cart.length === 0) { showToast('⚠️ Your cart is empty!'); return; }

  const subtotal = getCartTotal();
  const total = subtotal + DELIVERY_FEE;
  const orderNumber = 'CC-' + Date.now().toString().slice(-6);

  // Build confirmation details
  const detailsEl = document.getElementById('confirmDetails');
  detailsEl.innerHTML = `
    <strong>Order #${orderNumber}</strong><br/>
    <strong>Name:</strong> ${fullName}<br/>
    <strong>Phone:</strong> ${phone}<br/>
    <strong>Address:</strong> ${address}<br/>
    ${notes ? `<strong>Notes:</strong> ${notes}<br/>` : ''}
    <br/>
    <strong>Items:</strong><br/>
    ${cart.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.id);
      return p ? `• ${p.name} × ${item.qty} — ${(p.price * item.qty)} DT` : '';
    }).join('<br/>')}
    <br/><br/>
    <strong>Subtotal:</strong> ${subtotal} DT<br/>
    <strong>Delivery:</strong> ${DELIVERY_FEE} DT<br/>
    <strong style="color:var(--rose);font-size:16px">Total to pay on delivery: ${total} DT 💗</strong>
  `;

  // Clear cart
  cart = [];
  saveCart();

  showPage('confirmation');
}

// ===== REVIEWS =====
function renderReviews() {
  const inner = document.getElementById('reviewsInner');
  if (!inner) return;

  const doubled = [...REVIEWS, ...REVIEWS]; // duplicate for infinite scroll
  inner.innerHTML = doubled.map(r => `
    <div class="review-card">
      <div class="review-stars">${'⭐'.repeat(r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.emoji}</div>
        <div>
          <div class="review-author-name">${r.name}</div>
          <div class="review-author-sub">${r.sub}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== SCROLL TO FEATURED =====
function scrollToFeatured() {
  const el = document.getElementById('featured');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===== MOBILE MENU =====
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('open');
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 24px rgba(180,80,100,0.12)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ===== SCROLL FADE-IN ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.why-card, .product-card, .review-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderFeatured();
  renderReviews();
  renderShopGrid();

  // Small delay to let DOM render
  setTimeout(initScrollAnimations, 100);
});

// Handle browser back button
window.addEventListener('popstate', () => {
  // simple fallback
  showPage('home');
});
