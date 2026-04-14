# AMORÉ BOUTIQUE — COMPLETE SETUP GUIDE
## How to go live with your website

---

## 📁 FILE STRUCTURE
```
boutique/
├── index.html          ← Home page
├── shop.html           ← Shop / all products
├── product.html        ← Individual product page
├── checkout.html       ← Order form
├── about.html          ← About page
├── contact.html        ← Contact page
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── products.js     ← Your product catalog ← EDIT THIS
│   ├── cart.js         ← Cart logic
│   ├── main.js         ← Homepage logic
│   ├── shop.js         ← Shop filtering
│   ├── product.js      ← Product page
│   └── checkout.js     ← Order submission
├── GOOGLE_APPS_SCRIPT.js ← Backend (goes on Google, not here)
└── SETUP_GUIDE.md      ← This file
```

---

## STEP 1 — SET UP GOOGLE SHEETS + EMAIL

### A. Create a Google Sheet
1. Go to https://sheets.google.com
2. Create a new spreadsheet
3. Name it "AMORÉ Orders"
4. Copy the Sheet ID from the URL: 
   `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_ID]/edit`

### B. Set up Google Apps Script
1. Go to https://script.google.com
2. Click **New Project**
3. Name it **"Amore Orders"**
4. Delete the default code
5. Open the file `GOOGLE_APPS_SCRIPT.js` from your website folder
6. Copy ALL the code and paste it into Apps Script
7. Change line 14: `const YOUR_EMAIL = 'YOUR_EMAIL_HERE'` → your real email
8. Click 💾 Save

### C. Deploy as Web App
1. Click **Deploy** (top right) → **New Deployment**
2. Click the gear ⚙️ next to "Type" → select **Web App**
3. Set:
   - Description: "Amore Orders v1"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → Allow
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`

### D. Add the URL to your website
1. Open `js/checkout.js`
2. Find line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace with your URL:
   `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc.../exec';`

---

## STEP 2 — ADD YOUR PRODUCTS

### Edit `js/products.js`
Each product looks like this:
```javascript
{
  id: 29,                         // Unique number (keep incrementing)
  name: "My New Product",         // Product name
  category: "jewelry",            // jewelry / accessories / hair / cases / beauty / charms
  subcategory: "Necklaces",       // Must match the subcategories list in CATEGORIES
  price: 25,                      // Price in DT (no "DT", just the number)
  stock: 10,                      // How many you have (0 = sold out)
  badge: "new",                   // "new" / "bestseller" / "limited" / null
  isNew: true,                    // true or false
  emoji: "💎",                    // Emoji shown as placeholder (until you add real images)
  desc: "Description of product", // Shown on product page
  images: []                      // Add image URLs here when you have real photos
}
```

### To add real product photos:
1. Upload your photos somewhere (Cloudinary, ImgBB, or GitHub)
2. Get the image URL (must end in .jpg, .png, etc.)
3. Add to the images array: `images: ["https://your-url.com/photo1.jpg"]`
4. In `js/cart.js`, the `buildProductCard` function already supports images —
   just change `product-img-placeholder` to use an `<img>` tag

---

## STEP 3 — CUSTOMIZE YOUR BRANDING

### In `css/style.css`:
- Line 9: `--rose-deep: #c97088;` ← your main brand color (change to any pink you love)
- Line 10: `--gold: #c9a96e;` ← accent color

### Change the shop name:
- Find all instances of "AMORÉ" and replace with your shop name
- Change the logo text in all HTML files

### Social links:
- Search for `@amoreboutique.tn` and replace with your handles
- Update the TikTok and Instagram links in the footer

---

## STEP 4 — PUT IT ONLINE WITH GITHUB + NETLIFY

### A. Upload to GitHub
1. Go to https://github.com → Sign up / Log in
2. Click **New Repository**
3. Name it `amore-boutique` (or your shop name)
4. Make it **Public**
5. Click **Create Repository**
6. Upload ALL your files (drag and drop, or use GitHub Desktop)

### B. Deploy on Netlify
1. Go to https://netlify.com → Sign up with GitHub
2. Click **Add new site** → **Import an existing project**
3. Choose **Deploy with GitHub**
4. Select your `amore-boutique` repository
5. Leave all settings as default
6. Click **Deploy site**
7. Your site is live! 🎉 Netlify gives you a URL like `amore-boutique.netlify.app`

### C. Custom domain (optional but recommended!)
1. Buy a domain at Namecheap, GoDaddy, or enom (e.g., `amoreboutique.tn`)
2. In Netlify: **Domain settings** → **Add custom domain**
3. Follow the instructions to connect your domain

---

## STEP 5 — MANAGING ORDERS

Every time someone orders:
1. ✉️ You get an email with ALL order details
2. 📊 The order appears in your Google Sheet automatically
3. The Google Sheet has columns: Order#, Date, Name, Phone, Email, Town, Address, Items, Total, Status

### Update order status in the Sheet:
- Change "New 🆕" to "Confirmed ✅", "Shipped 🚚", or "Delivered ✓"

---

## ❓ TROUBLESHOOTING

**Orders not appearing in Google Sheet?**
→ Make sure you deployed the Apps Script as a Web App with "Anyone" access
→ Make sure you replaced YOUR_EMAIL_HERE with your actual email
→ Check the Apps Script logs (View → Logs) for errors

**Website looks broken?**
→ Make sure all files are in the right folders
→ CSS must be at `css/style.css`
→ JS files must be at `js/[filename].js`

**Cart not saving?**
→ This uses localStorage, so it works on any modern browser
→ If testing locally (file:// URL), some browsers block localStorage — use Live Server extension in VS Code

---

## 💡 TIPS

- Test your website on mobile too! It's fully responsive.
- Add your products' real photos as soon as you have them
- Update stock numbers in `products.js` regularly
- The Google Sheet is your order management system — keep it open!
- Share your Netlify URL on TikTok and Instagram to drive traffic 🎉

---

Made with ♡ for AMORÉ Boutique
