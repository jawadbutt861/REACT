# E-Commerce Development Guide

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## File Structure Explained

```
ecommerce/
│
├── public/                      # Static assets
│   └── vite.svg                # Vite logo
│
├── src/                        # Source code
│   │
│   ├── assets/                 # Images and media files
│   │   └── assets/
│   │       └── Image/
│   │           ├── backgrounds/  # Background images
│   │           ├── interior/     # Interior product images
│   │           └── tech/         # Tech product images
│   │
│   ├── components/             # Reusable components
│   │   ├── Header.jsx          # Site header with navigation
│   │   ├── Footer.jsx          # Site footer with links
│   │   ├── Navigation.jsx      # Developer navigation bar
│   │   ├── Sidebar.jsx         # Filter sidebar (list view)
│   │   ├── SidebarGrid.jsx     # Filter sidebar (grid view)
│   │   ├── ProductList.jsx     # Product cards (list layout)
│   │   └── ProductGrid.jsx     # Product cards (grid layout)
│   │
│   ├── pages/                  # Page components
│   │   ├── HomePage.jsx        # Landing page
│   │   ├── ProductsPage.jsx    # Products list view
│   │   ├── ProductsGridPage.jsx # Products grid view
│   │   ├── ProductDetailPage.jsx # Single product details
│   │   └── CartPage.jsx        # Shopping cart
│   │
│   ├── styles/                 # CSS files
│   │   ├── Navigation.css      # Navigation bar styles
│   │   ├── ProductsPage.css    # List view styles
│   │   ├── ProductsGridPage.css # Grid view styles
│   │   ├── ProductDetailPage.css # Product detail styles
│   │   └── CartPage.css        # Cart page styles
│   │
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Main app styles
│   ├── index.css               # Global styles
│   └── main.jsx                # App entry point
│
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── README.md                   # Project overview
├── PROJECT_STRUCTURE.md        # Detailed structure docs
└── DEVELOPMENT_GUIDE.md        # This file
```

---

## Component Guide

### Header Component
**Location:** `src/components/Header.jsx`

**Features:**
- Logo and brand name
- Search bar with category dropdown
- User action links (Profile, Message, Orders, Cart)
- Navigation menu
- Language and location selector

**Usage:**
```jsx
import Header from './components/Header'

function Page() {
  return <Header />
}
```

### Footer Component
**Location:** `src/components/Footer.jsx`

**Features:**
- Brand information
- Social media links
- Multiple footer columns
- App download buttons
- Copyright notice

**Usage:**
```jsx
import Footer from './components/Footer'

function Page() {
  return <Footer />
}
```

### Sidebar Components
**Locations:** 
- `src/components/Sidebar.jsx` (for list view)
- `src/components/SidebarGrid.jsx` (for grid view)

**Features:**
- Collapsible filter sections
- Category filters
- Brand checkboxes
- Price range slider
- Condition radio buttons
- Star ratings

**Usage:**
```jsx
import Sidebar from './components/Sidebar'

function ProductsPage() {
  return (
    <div className="layout">
      <Sidebar />
      {/* Other content */}
    </div>
  )
}
```

---

## Page Guide

### 1. Home Page
**Location:** `src/pages/HomePage.jsx`

**Sections:**
- Hero with category sidebar
- Deals and offers
- Category showcases
- Quote request form
- Recommended products
- Services
- Suppliers by region
- Newsletter

**To Display:**
```javascript
// In App.jsx
setCurrentPage('home')
```

### 2. Products List Page
**Location:** `src/pages/ProductsPage.jsx`

**Features:**
- Breadcrumb navigation
- Filter sidebar
- List view products
- Sorting options
- Pagination

**To Display:**
```javascript
setCurrentPage('products')
```

### 3. Products Grid Page
**Location:** `src/pages/ProductsGridPage.jsx`

**Features:**
- Active filter tags
- Grid view products
- View toggle
- Filter sidebar

**To Display:**
```javascript
setCurrentPage('grid')
```

### 4. Product Detail Page
**Location:** `src/pages/ProductDetailPage.jsx`

**Features:**
- Image gallery
- Product specifications
- Supplier information
- Tabbed content
- Related products

**To Display:**
```javascript
setCurrentPage('detail')
```

### 5. Shopping Cart Page
**Location:** `src/pages/CartPage.jsx`

**Features:**
- Cart items list
- Quantity selector
- Cart summary
- Saved items
- Checkout button

**To Display:**
```javascript
setCurrentPage('cart')
```

---

## Styling Guide

### CSS Architecture

1. **Global Styles** (`src/index.css`)
   - CSS resets
   - Base typography
   - Body styles

2. **App Styles** (`src/App.css`)
   - Container styles
   - Common button styles
   - Utility classes

3. **Component Styles**
   - Inline in component files (Header, Footer)
   - Separate CSS files for pages

### Design Tokens

```css
/* Colors */
--primary-blue: #4A90E2;
--success-green: #00B517;
--error-red: #FF4757;
--warning-orange: #FF9800;
--text-dark: #1C1C1C;
--text-gray: #666;
--border-color: #E0E0E0;
--background-gray: #F7F7F7;

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;

/* Border Radius */
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 12px;
--radius-full: 50px;

/* Typography */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-md: 16px;
--font-size-lg: 20px;
--font-size-xl: 24px;
--font-size-2xl: 32px;
```

### Common CSS Classes

```css
/* Buttons */
.btn-primary { /* Blue button */ }
.btn-secondary { /* White button with border */ }
.btn-white { /* White button */ }
.btn-orange { /* Orange button */ }

/* Layout */
.container { /* Max-width container */ }
.grid { /* CSS Grid layout */ }
.flex { /* Flexbox layout */ }

/* Text */
.text-primary { /* Primary color text */ }
.text-gray { /* Gray text */ }
.text-bold { /* Bold text */ }
```

---

## JavaScript Interactivity

### State Management Examples

1. **Image Gallery**
```jsx
const [selectedImage, setSelectedImage] = useState(0)

// Click handler
const handleThumbnailClick = (index) => {
  setSelectedImage(index)
}
```

2. **Tab Navigation**
```jsx
const [activeTab, setActiveTab] = useState('description')

// Tab switching
<button onClick={() => setActiveTab('description')}>
  Description
</button>
```

3. **Cart Management**
```jsx
const [cartItems, setCartItems] = useState([...])

// Remove item
const removeItem = (id) => {
  setCartItems(cartItems.filter(item => item.id !== id))
}

// Update quantity
const updateQuantity = (id, newQuantity) => {
  setCartItems(cartItems.map(item => 
    item.id === id ? { ...item, quantity: newQuantity } : item
  ))
}
```

4. **Filter Management**
```jsx
const [activeFilters, setActiveFilters] = useState([...])

// Remove filter
const removeFilter = (id) => {
  setActiveFilters(activeFilters.filter(f => f.id !== id))
}

// Clear all
const clearAllFilters = () => {
  setActiveFilters([])
}
```

---

## Adding New Features

### Adding a New Page

1. **Create page component**
   ```jsx
   // src/pages/NewPage.jsx
   import Header from '../components/Header'
   import Footer from '../components/Footer'
   
   function NewPage() {
     return (
       <div className="app">
         <Header />
         <div className="new-page">
           {/* Your content */}
         </div>
         <Footer />
       </div>
     )
   }
   
   export default NewPage
   ```

2. **Create CSS file**
   ```css
   /* src/styles/NewPage.css */
   .new-page {
     /* Your styles */
   }
   ```

3. **Add to App.jsx**
   ```jsx
   import NewPage from './pages/NewPage'
   
   // In return statement
   {currentPage === 'new' && <NewPage />}
   ```

4. **Add to Navigation**
   ```jsx
   // In Navigation.jsx
   <button onClick={() => setCurrentPage('new')}>
     New Page
   </button>
   ```

### Adding a New Component

1. **Create component file**
   ```jsx
   // src/components/NewComponent.jsx
   function NewComponent({ prop1, prop2 }) {
     return (
       <div className="new-component">
         {/* Your JSX */}
       </div>
     )
   }
   
   export default NewComponent
   ```

2. **Import and use**
   ```jsx
   import NewComponent from './components/NewComponent'
   
   <NewComponent prop1="value" prop2="value" />
   ```

---

## Best Practices

### Code Organization
- ✅ One component per file
- ✅ Group related files together
- ✅ Use meaningful file and variable names
- ✅ Keep components small and focused

### CSS Best Practices
- ✅ Use consistent naming conventions
- ✅ Avoid deep nesting
- ✅ Use CSS Grid and Flexbox for layouts
- ✅ Keep specificity low
- ✅ Comment complex styles

### JavaScript Best Practices
- ✅ Use functional components
- ✅ Use hooks for state management
- ✅ Keep functions small and focused
- ✅ Use meaningful variable names
- ✅ Add comments for complex logic

### Git Best Practices
- ✅ Commit frequently with clear messages
- ✅ Use branches for new features
- ✅ Write descriptive commit messages
- ✅ Push code weekly

---

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   npx kill-port 5173
   # Or use a different port
   npm run dev -- --port 3000
   ```

2. **Module not found**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Styles not updating**
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Restart dev server

4. **Images not loading**
   - Check image paths are correct
   - Ensure images are in public or src/assets folder
   - Use correct import syntax

---

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist` folder with optimized files.

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite configuration
4. Deploy

---

## Resources

### Documentation
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

## Support

For questions or issues:
1. Check this documentation
2. Review the code comments
3. Contact your supervisor
4. Create an issue in GitHub repository

---

**Last Updated:** March 2026
**Version:** 1.0.0
