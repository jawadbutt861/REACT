# 🚀 Quick Start Guide

## Start the Application

```bash
npm install
npm run dev
```

Visit: `http://localhost:5173`

## 🛍️ Test the Shopping Flow

### 1. Browse Products (30 seconds)
- Open homepage
- Scroll through featured products
- Click "Products" in navigation

### 2. Add to Cart (1 minute)
- Click "Add to cart" on any product
- Notice cart count badge updates in header
- Add 2-3 more products

### 3. View Product Details (1 minute)
- Click on any product image or name
- Scroll through specifications
- Change quantity
- Click "Add to cart"

### 4. Manage Cart (2 minutes)
- Click cart icon in header
- Update quantities using dropdowns
- Remove an item
- Apply coupon: `SAVE10` or `SAVE20`
- See totals update

### 5. Test Persistence (30 seconds)
- Refresh the page
- Cart items remain
- Navigate to homepage and back

## 🎯 Quick Feature Test

```
✅ Add product → Cart count increases
✅ View cart → See all items
✅ Update quantity → Total updates
✅ Apply SAVE10 → 10% discount applied
✅ Apply SAVE20 → 20% discount applied
✅ Remove item → Item disappears
✅ Clear all → Empty cart message
✅ Refresh page → Cart persists
```

## 🎁 Coupon Codes

- **SAVE10** - Get 10% off
- **SAVE20** - Get 20% off

## 📱 Pages to Visit

1. **Homepage**: `/` - Featured products and deals
2. **Products List**: `/products` - List view with filters
3. **Products Grid**: `/products/grid` - Grid view
4. **Product Detail**: `/product/1` - Single product
5. **Cart**: `/cart` - Shopping cart

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 💡 Pro Tips

1. **Cart Badge**: Shows total item count in header
2. **Persistence**: Cart saves automatically to browser
3. **Coupons**: Try both SAVE10 and SAVE20
4. **Navigation**: Use breadcrumbs to go back
5. **Related Products**: Check product detail pages
6. **Empty Cart**: Remove all items to see empty state

## 🎨 What to Look For

### Design Features
- ✨ Smooth hover effects on products
- 🎯 Clean, modern interface
- 📱 Responsive layout
- 🎨 Consistent color scheme
- ⭐ Star ratings
- 🏷️ Price tags with discounts

### Functional Features
- 🛒 Real-time cart updates
- 💾 Automatic cart saving
- 🔢 Quantity selectors
- 💰 Discount calculations
- 📊 Tax calculations (8%)
- 🎫 Coupon system

## 🐛 If Something Goes Wrong

### Cart not updating?
```bash
# Clear browser storage
localStorage.clear()
# Refresh page
```

### Build errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Port already in use?
```bash
# Vite will automatically try next available port
# Or specify port: npm run dev -- --port 3000
```

## 📚 Documentation

- **Full Guide**: See `USAGE_GUIDE.md`
- **Features**: See `FEATURES.md`
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md`

## ✅ Success Checklist

After starting the app, verify:

- [ ] Homepage loads with products
- [ ] Can navigate to products page
- [ ] Can click on a product
- [ ] Can add product to cart
- [ ] Cart count updates in header
- [ ] Can view cart page
- [ ] Can update quantities
- [ ] Can apply coupon codes
- [ ] Can remove items
- [ ] Cart persists after refresh

## 🎉 You're Ready!

The e-commerce website is fully functional. Start shopping and testing all features!

---

**Need Help?** Check the detailed guides:
- `USAGE_GUIDE.md` - Complete user guide
- `FEATURES.md` - All features explained
- `IMPLEMENTATION_SUMMARY.md` - Technical details
