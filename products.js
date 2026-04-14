// ============================================
// CUPID BOUTIQUE — PRODUCT CATALOG
// Edit this file to manage your products!
// ============================================

const DELIVERY_FEE = 8;

const CATEGORIES = {
  jewelry: {
    label: "Jewelry",
    icon: "💎",
    subcategories: ["Necklaces", "Earrings", "Rings", "Bracelets", "Hand Chains"]
  },
  accessories: {
    label: "Accessories",
    icon: "👜",
    subcategories: ["Waist Chains", "Bag Charms"]
  },
  hair: {
    label: "Hair",
    icon: "🎀",
    subcategories: ["Hair Accessories"]
  },
  cases: {
    label: "Cases",
    icon: "💻",
    subcategories: ["Laptop Cases", "Pencil Cases"]
  },
  beauty: {
    label: "Beauty",
    icon: "💄",
    subcategories: ["Makeup Pouches", "Small Makeup Pouches", "Lip Gloss Holders"]
  },
  charms: {
    label: "Charms",
    icon: "🌸",
    subcategories: ["Bag Charms"]
  }
};

// ============================================
// PRODUCT DATABASE
// To add a product: copy a block and change the values.
// emoji: pick a cute emoji to show as product image placeholder
// stock: how many you have (0 = sold out)
// badge: "new", "limited", "bestseller", or null
// images: [array of image URLs] (or leave empty to use emoji)
// ============================================

const PRODUCTS = [
  // ——— JEWELRY: NECKLACES ———
  {
    id: 1,
    name: "Pearl Bow Choker",
    category: "jewelry",
    subcategory: "Necklaces",
    price: 18,
    stock: 8,
    badge: "bestseller",
    isNew: false,
    emoji: "🤍",
    desc: "Delicate pearl choker with a tiny bow charm. Perfect for everyday wear or gifting. Adjustable length, gold-plated chain.",
    images: []
  },
  {
    id: 2,
    name: "Gold Heart Locket",
    category: "jewelry",
    subcategory: "Necklaces",
    price: 24,
    stock: 5,
    badge: "limited",
    isNew: true,
    emoji: "💛",
    desc: "Vintage-inspired gold heart locket. Can hold a tiny photo inside. The cutest gift for your bestie.",
    images: []
  },
  {
    id: 3,
    name: "Cupid Arrow Necklace",
    category: "jewelry",
    subcategory: "Necklaces",
    price: 22,
    stock: 12,
    badge: "new",
    isNew: true,
    emoji: "✨",
    desc: "Dainty gold arrow pendant. Cupid-core vibes all the way. Gift-ready packaging included.",
    images: []
  },
  // ——— JEWELRY: EARRINGS ———
  {
    id: 4,
    name: "Star Drop Earrings",
    category: "jewelry",
    subcategory: "Earrings",
    price: 14,
    stock: 20,
    badge: null,
    isNew: false,
    emoji: "⭐",
    desc: "Tiny gold star drop earrings. Lightweight and so pretty. Goes with everything.",
    images: []
  },
  {
    id: 5,
    name: "Pearl Stud Set (3 pairs)",
    category: "jewelry",
    subcategory: "Earrings",
    price: 19,
    stock: 15,
    badge: "bestseller",
    isNew: false,
    emoji: "🤍",
    desc: "A set of 3 pearl studs in different sizes. Classic, elegant, must-have. Perfect for multiple piercings.",
    images: []
  },
  {
    id: 6,
    name: "Butterfly Hoop Earrings",
    category: "jewelry",
    subcategory: "Earrings",
    price: 16,
    stock: 0,
    badge: "sold-out",
    isNew: false,
    emoji: "🦋",
    desc: "Tiny butterfly charms on delicate hoops. So cute and feminine.",
    images: []
  },
  // ——— JEWELRY: RINGS ———
  {
    id: 7,
    name: "Adjustable Rose Ring",
    category: "jewelry",
    subcategory: "Rings",
    price: 12,
    stock: 18,
    badge: null,
    isNew: true,
    emoji: "🌹",
    desc: "Adjustable gold ring with a tiny rose detail. One size fits all. So romantic.",
    images: []
  },
  {
    id: 8,
    name: "Daisy Stacking Ring Set",
    category: "jewelry",
    subcategory: "Rings",
    price: 16,
    stock: 10,
    badge: "new",
    isNew: true,
    emoji: "🌼",
    desc: "Set of 4 stackable rings with daisy details. Mix and match to create your perfect look.",
    images: []
  },
  // ——— JEWELRY: BRACELETS ———
  {
    id: 9,
    name: "Beaded Charm Bracelet",
    category: "jewelry",
    subcategory: "Bracelets",
    price: 15,
    stock: 25,
    badge: null,
    isNew: false,
    emoji: "📿",
    desc: "Delicate beaded bracelet with gold charms. Perfect for layering. Adjustable.",
    images: []
  },
  {
    id: 10,
    name: "Gold Tennis Bracelet",
    category: "jewelry",
    subcategory: "Bracelets",
    price: 28,
    stock: 6,
    badge: "limited",
    isNew: false,
    emoji: "💫",
    desc: "Elegant crystal tennis bracelet in gold tone. Looks so luxurious at a fraction of the price.",
    images: []
  },
  // ——— JEWELRY: HAND CHAINS ———
  {
    id: 11,
    name: "Dainty Hand Chain",
    category: "jewelry",
    subcategory: "Hand Chains",
    price: 20,
    stock: 8,
    badge: "new",
    isNew: true,
    emoji: "✨",
    desc: "Delicate finger-to-wrist chain bracelet. The most aesthetic accessory for your hands.",
    images: []
  },
  // ——— ACCESSORIES: WAIST CHAINS ———
  {
    id: 12,
    name: "Pearl Waist Chain",
    category: "accessories",
    subcategory: "Waist Chains",
    price: 26,
    stock: 7,
    badge: "limited",
    isNew: true,
    emoji: "🤍",
    desc: "Dreamy pearl waist chain. Wear over dresses, jeans, or as a belt. Y2K meets soft girl aesthetic.",
    images: []
  },
  {
    id: 13,
    name: "Gold Layered Waist Chain",
    category: "accessories",
    subcategory: "Waist Chains",
    price: 22,
    stock: 10,
    badge: null,
    isNew: false,
    emoji: "💛",
    desc: "Multi-layer gold waist chain. Adjustable. Perfect for summer outfits.",
    images: []
  },
  // ——— CASES: LAPTOP ———
  {
    id: 14,
    name: "Floral Laptop Sleeve 13\"",
    category: "cases",
    subcategory: "Laptop Cases",
    price: 38,
    stock: 12,
    badge: "bestseller",
    isNew: false,
    emoji: "🌸",
    desc: "Padded laptop sleeve with pink floral print. Fits 13\" laptops. So cute, it doubles as a clutch.",
    images: []
  },
  {
    id: 15,
    name: "Ribbon Bow Laptop Case 15\"",
    category: "cases",
    subcategory: "Laptop Cases",
    price: 42,
    stock: 8,
    badge: "new",
    isNew: true,
    emoji: "🎀",
    desc: "Pink laptop case with bow detail for 15\" laptops. Girly and protective. Every class's main character.",
    images: []
  },
  // ——— CASES: PENCIL CASES ———
  {
    id: 16,
    name: "Pink Bow Pencil Case",
    category: "cases",
    subcategory: "Pencil Cases",
    price: 14,
    stock: 30,
    badge: null,
    isNew: false,
    emoji: "🎀",
    desc: "Aesthetic pink pencil case with bow zipper pull. Holds all your pens and highlighters.",
    images: []
  },
  {
    id: 17,
    name: "Clear Sparkle Pencil Pouch",
    category: "cases",
    subcategory: "Pencil Cases",
    price: 12,
    stock: 20,
    badge: null,
    isNew: false,
    emoji: "✨",
    desc: "Clear pencil pouch with glitter sides. See all your pens at a glance. Trendy and practical.",
    images: []
  },
  // ——— BEAUTY: MAKEUP POUCHES ———
  {
    id: 18,
    name: "Quilted Makeup Bag",
    category: "beauty",
    subcategory: "Makeup Pouches",
    price: 24,
    stock: 15,
    badge: "bestseller",
    isNew: false,
    emoji: "💄",
    desc: "Pink quilted makeup bag with gold zipper. Fits all your makeup essentials. Looks designer.",
    images: []
  },
  {
    id: 19,
    name: "Floral Travel Makeup Bag",
    category: "beauty",
    subcategory: "Makeup Pouches",
    price: 28,
    stock: 9,
    badge: null,
    isNew: false,
    emoji: "🌸",
    desc: "Large floral makeup bag with multiple pockets. Perfect for travel. Wipe-clean lining.",
    images: []
  },
  // ——— BEAUTY: SMALL POUCHES ———
  {
    id: 20,
    name: "Mini Satin Pouch",
    category: "beauty",
    subcategory: "Small Makeup Pouches",
    price: 10,
    stock: 40,
    badge: null,
    isNew: false,
    emoji: "🎀",
    desc: "Tiny satin pouch for lip products, earrings, or coins. Perfect as a gift bag.",
    images: []
  },
  // ——— BEAUTY: LIP GLOSS HOLDERS ———
  {
    id: 21,
    name: "Bow Lip Gloss Holder",
    category: "beauty",
    subcategory: "Lip Gloss Holders",
    price: 13,
    stock: 22,
    badge: "new",
    isNew: true,
    emoji: "💋",
    desc: "Keychain lip gloss holder with bow. Clip to your bag and always have your gloss ready. Viral on TikTok!",
    images: []
  },
  {
    id: 22,
    name: "Heart Mirror Lip Case",
    category: "beauty",
    subcategory: "Lip Gloss Holders",
    price: 15,
    stock: 18,
    badge: null,
    isNew: true,
    emoji: "❤️",
    desc: "Heart-shaped lip gloss case with built-in mirror. Holds 2 lip glosses. So cute.",
    images: []
  },
  // ——— CHARMS: BAG CHARMS ———
  {
    id: 23,
    name: "Cherry Bag Charm",
    category: "charms",
    subcategory: "Bag Charms",
    price: 11,
    stock: 35,
    badge: "bestseller",
    isNew: false,
    emoji: "🍒",
    desc: "Adorable cherry keychain / bag charm. Viral aesthetic piece. Makes any bag look 10x cuter.",
    images: []
  },
  {
    id: 24,
    name: "Teddy Bear Bag Charm",
    category: "charms",
    subcategory: "Bag Charms",
    price: 14,
    stock: 20,
    badge: null,
    isNew: true,
    emoji: "🧸",
    desc: "Mini fluffy teddy bear bag charm. Soft, cute, and giftable. Your bag's new best friend.",
    images: []
  },
  {
    id: 25,
    name: "Pearl Ribbon Bag Charm",
    category: "charms",
    subcategory: "Bag Charms",
    price: 12,
    stock: 25,
    badge: "new",
    isNew: true,
    emoji: "🤍",
    desc: "Pearl bead strand with ribbon bow bag charm. Elegant and ultra-feminine.",
    images: []
  },
  // ——— HAIR ACCESSORIES ———
  {
    id: 26,
    name: "Satin Ribbon Hair Set",
    category: "hair",
    subcategory: "Hair Accessories",
    price: 10,
    stock: 50,
    badge: "bestseller",
    isNew: false,
    emoji: "🎀",
    desc: "Set of 5 satin ribbon scrunchies and hair ties. Every color you need.",
    images: []
  },
  {
    id: 27,
    name: "Pearl Hair Clip Set",
    category: "hair",
    subcategory: "Hair Accessories",
    price: 13,
    stock: 30,
    badge: null,
    isNew: false,
    emoji: "🤍",
    desc: "Set of 8 pearl claw clips and barrettes. Pearl hair = effortless chic.",
    images: []
  },
  {
    id: 28,
    name: "Bow Claw Clip",
    category: "hair",
    subcategory: "Hair Accessories",
    price: 9,
    stock: 60,
    badge: null,
    isNew: true,
    emoji: "🎀",
    desc: "Oversized bow claw clip. The iconic soft girl hair accessory. Available in pink, white, and brown.",
    images: []
  }
];

// Helper functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductsByCategory(cat) {
  if (cat === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === cat);
}

function getProductsBySubcategory(subcat) {
  return PRODUCTS.filter(p => p.subcategory === subcat);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.badge === 'bestseller' || p.stock > 0).slice(0, 8);
}

function getNewArrivals() {
  return PRODUCTS.filter(p => p.isNew && p.stock > 0).slice(0, 4);
}

function getRelatedProducts(product, count = 4) {
  return PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, count);
}

function getStockLabel(stock) {
  if (stock === 0) return { label: '✕ Sold Out', class: 'stock-out' };
  if (stock <= 5) return { label: `⚡ Only ${stock} left!`, class: 'stock-low' };
  return { label: '✓ In Stock', class: 'stock-in' };
}
