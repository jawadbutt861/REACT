import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, faEnvelope, faShoppingCart, faBox, 
  faBars, faChevronDown, faMapMarkerAlt, faGlobe
} from '@fortawesome/free-solid-svg-icons'
import flagDE from '../assets/DE@2x.png'
import logo from '../assets/logo-colored.png'

function Header() {
  const navigate = useNavigate()
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/products/grid')
  }

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Logo - Smaller on mobile */}
            <Link to="/" className="shrink-0">
              <img src={logo} alt="Brand Logo" className="h-6 sm:h-8 md:h-10" />
            </Link>
            
            {/* Search Bar - Responsive */}
            <form className="flex-1 flex border-2 border-blue-600 rounded-md overflow-hidden max-w-2xl" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search"
                className="flex-1 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 outline-none text-xs sm:text-sm min-w-0"
              />
              <select className="hidden md:block px-3 lg:px-4 py-1.5 sm:py-2 border-l border-gray-200 bg-white cursor-pointer outline-none text-xs sm:text-sm">
                <option>All category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
              </select>
              <button type="submit" className="px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-xs sm:text-sm shrink-0">
                Search
              </button>
            </form>
            
            {/* Desktop Icons */}
            <div className="hidden lg:flex gap-2 xl:gap-4 shrink-0">
              <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faUser} className="text-lg" />
                <span className="hidden xl:inline">Profile</span>
              </Link>
              <Link to="/messages" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                <span className="hidden xl:inline">Message</span>
              </Link>
              <Link to="/orders" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faBox} className="text-lg" />
                <span className="hidden xl:inline">Orders</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold relative">
                <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
                <span className="hidden xl:inline">My cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation - Hidden on mobile */}
      <nav className="py-2 sm:py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-2 lg:gap-4 xl:gap-6 overflow-x-auto">
            <button className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition font-semibold text-xs sm:text-sm whitespace-nowrap shrink-0">
              <FontAwesomeIcon icon={faBars} /> <span className="hidden lg:inline">All category</span>
            </button>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-xs sm:text-sm font-semibold whitespace-nowrap">Hot offers</Link>
            <Link to="/products/grid" className="text-gray-900 hover:text-blue-600 text-xs sm:text-sm font-semibold whitespace-nowrap hidden lg:inline">Gift boxes</Link>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-xs sm:text-sm font-semibold whitespace-nowrap hidden xl:inline">Projects</Link>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-xs sm:text-sm font-semibold whitespace-nowrap hidden xl:inline">Menu item</Link>
            <a href="#help" className="text-gray-900 hover:text-blue-600 text-xs sm:text-sm items-center gap-1 font-semibold whitespace-nowrap hidden lg:flex">
              Help <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
            </a>
            <div className="ml-auto flex gap-2 lg:gap-4 text-xs shrink-0">
              <span className="hidden lg:flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600 whitespace-nowrap">
                <FontAwesomeIcon icon={faGlobe} /> <span className="hidden xl:inline">English, USD</span> <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
              </span>
              <span className="hidden lg:flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600 whitespace-nowrap">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="hidden xl:inline">Ship to</span>
                <img src={flagDE} alt="Germany" className="w-4 lg:w-5 h-auto ml-1" />
                <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
              </span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-2.5 px-2">
          <Link to="/" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600 text-xs min-w-[60px]">
            <FontAwesomeIcon icon={faBars} className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">Menu</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600 text-xs min-w-[60px]">
            <FontAwesomeIcon icon={faBox} className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">Products</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600 text-xs relative min-w-[60px]">
            <FontAwesomeIcon icon={faShoppingCart} className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-3 sm:right-4 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-blue-600 text-xs min-w-[60px]">
            <FontAwesomeIcon icon={faUser} className="text-lg sm:text-xl" />
            <span className="text-[10px] sm:text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
