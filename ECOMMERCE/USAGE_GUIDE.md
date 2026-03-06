# E-Commerce Website - Usage Guide

## 🎯 Quick Start

### Installation
```bash
npm install
npm run dev
```

The application will open at `http://localhost:5173`

## 📱 Features Walkthrough

### 1. Homepage
- **Location**: `/`
- **Features**:
  - Category sidebar with links to products
  - Featured banner
  - Deals and offers section with countdown timer
  - Home & outdoor products grid
  - Consumer electronics grid
  - Quote request form
  - Recommended items
  - Extra services showcase

### 2. Product Listing
- **Location**: `/products`
- **Features**:
  - List view of products
  - Sidebar filters (categories, brands, features, price, ratings)
  - Sort by: Featured, Price, Newest
  - Verified sellers filter
  - Add to cart directly from list
  - Pagination controls

### 3. Product Grid
- **Location**: `/products/grid`
- **Features**:
  - Grid view (3 columns)
  - Active filters display with remove option
  - Quick add to cart
  - Same filtering options as list view

### 4. Product Detail
- **Location**: `/product/:id`
- **Features**:
  - Multiple product images with thumbnail selector
  - Product specifications table
  - Features list with checkmarks
  - Quantity selector
  - Add to cart button
  - Stock status indicator
  - Pricing tiers
  - Tabs: Description, Reviews, Shipping, About seller
  - Related products (same category)
  - "You may like" recommendations
  - Supplier information

### 5. Shopping Cart
- **Location**: `/cart`
- **Features**:
  - View all cart items
  - Update quantities (1-10)
  - Remove individual items
  - Remove all items
  - Coupon code input
  - Order summary with:
    - Subtotal
    - Discount (if coupon applied)
    - Tax (8%)
    - Total
  - Checkout button
  - Product recommendations
  - Empty cart state with "Continue Shopping" link

## 🛒 Shopping Flow

### Adding Products to Cart

1. **From Product List/Grid**:
   ```
   Browse products → Click "Add to cart" → Product added with quantity 1
   ```

2. **From Product Detail**:
   ```
   Click product → Select quantity → Click "Add to cart" → Product added
   ```

### Managing Cart

1. **View Cart**:
   - Click cart icon in header (shows item count)
   - Navigate to `/cart`

2. **Update Quantity**:
   - Use dropdown to select quantity (1-10)
   - Total updates automatically

3. **Remove Items**:
   - Click "Remove" on individual item
   - Click "Remove all" to clear cart

4. **Apply Coupon**:
   - Enter code: `SAVE10` or `SAVE20`
   - Click "Apply"
   - Discount appears in order summary

### Checkout

Currently shows an alert. In production, this would:
1. Collect shipping information
2. Process payment
3. Create order
4. Send confirmation

## 🎨 UI Components

### Header
- Logo (links to home)
- Search bar with category filter
- Navigation links
- User menu: Profile, Messages, Orders, Cart
- Language and shipping location selectors

### Footer
- Newsletter subscription
- Company information
- Social media links
- Quick links (About, Partnership, Information, For users)
- App download buttons

### Product Card (Grid View)
- Product image
- Price (with old price if on sale)
- Star rating
- Product name
- Add to cart button
- Wishlist heart icon

### Product Card (List View)
- Larger image
- Detailed description
- Rating with review count
- Order count
- Free shipping badge
- View details link
- Add to cart button

## 💡 Tips & Tricks

### Coupon Codes
- `SAVE10`: Get 10% off your order
- `SAVE20`: Get 20% off your order

### Navigation
- Use breadcrumbs to navigate back
- Click logo to return to homepage
- Use browser back button safely

### Filters
- Combine multiple filters for precise results
- Clear individual filters or all at once
- Filters persist while browsing

### Cart Persistence
- Cart saves automatically to browser
- Items remain after page refresh
- Clear browser data to reset cart

## 🔍 Product Data

### Available Products
1. Canon Camera EOS 2000 - $998.00
2. GoPro HERO6 4K - $449.00
3. Wireless Bluetooth Headphones - $89.99
4. Smart Watch Series 6 - $399.00
5. Portable Bluetooth Speaker - $79.99
6. Gaming Mouse RGB - $49.99
7. Mechanical Keyboard RGB - $129.99
8. Wireless Earbuds Pro - $199.99
9. Laptop Stand Aluminum - $39.99
10. USB-C Hub 7-in-1 - $59.99

### Product Categories
- Electronics
- Accessories

### Product Brands
- Canon
- GoPro
- Sony
- Apple
- JBL
- Logitech
- Corsair
- Samsung
- Anker

## 🐛 Troubleshooting

### Cart not updating?
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`
- Refresh page

### Products not showing?
- Verify product data in `src/data/products.js`
- Check console for import errors

### Images not loading?
- Ensure images exist in `src/assets/`
- Check import paths in product data

## 📊 Testing Scenarios

### Test Cart Functionality
1. Add 3 different products
2. Update quantities
3. Apply coupon SAVE10
4. Remove one item
5. Verify totals are correct

### Test Navigation
1. Start at homepage
2. Click category
3. View product details
4. Add to cart
5. Go to cart
6. Return to shopping

### Test Filters
1. Go to products grid
2. Select brand filter
3. Select price range
4. Select rating
5. Verify filtered results

## 🎓 For Developers

### Adding New Products
Edit `src/data/products.js`:
```javascript
{
  id: 11,
  name: 'Product Name',
  price: 99.99,
  oldPrice: 129.99, // optional
  rating: 4.5,
  reviews: 100,
  orders: 200,
  image: productImg,
  category: 'Electronics',
  brand: 'Brand Name',
  inStock: true,
  description: 'Product description',
  features: ['Feature 1', 'Feature 2'],
  specifications: {
    model: '#MODEL',
    type: 'Type',
    material: 'Material',
    warranty: '1 year',
    weight: '100g'
  }
}
```

### Modifying Cart Logic
Edit `src/context/CartContext.jsx` to customize:
- Add to cart behavior
- Quantity limits
- Price calculations
- Storage mechanism

### Styling Changes
- All styles use Tailwind CSS
- Modify classes directly in components
- Update `tailwind.config.js` for theme changes
