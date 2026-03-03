import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>ShopHub</h1>
        </div>
        
        <nav className="nav-menu">
          <a href="/" className="nav-link">Home</a>
          <a href="/products" className="nav-link">Products</a>
          <a href="/categories" className="nav-link">Categories</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
        </nav>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
          />
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="header-actions">
          <button className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button className="icon-btn cart-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 2L7 6M17 2l2 4M1 6h22M3 6l2 14h14l2-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
