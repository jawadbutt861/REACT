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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo} alt="Brand Logo" className="h-8 sm:h-10" />
            </Link>
            
            <form className="flex-1 flex border-2 border-blue-600 rounded-md overflow-hidden" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search"
                className="flex-1 px-2 sm:px-4 py-1 sm:py-2 outline-none text-sm"
              />
              <select className="hidden sm:block px-2 md:px-4 py-1 sm:py-2 border-l border-gray-200 bg-white cursor-pointer outline-none text-sm">
                <option>All category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
              </select>
              <button type="submit" className="px-3 sm:px-6 py-1 sm:py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-sm">
                Search
              </button>
            </form>
            
            <div className="hidden lg:flex gap-3 xl:gap-5">
              <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faUser} className="text-lg xl:text-xl" />
                <span className="hidden xl:inline">Profile</span>
              </Link>
              <Link to="/messages" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faEnvelope} className="text-lg xl:text-xl" />
                <span className="hidden xl:inline">Message</span>
              </Link>
              <Link to="/orders" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faBox} className="text-lg xl:text-xl" />
                <span className="hidden xl:inline">Orders</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold relative">
                <FontAwesomeIcon icon={faShoppingCart} className="text-lg xl:text-xl" />
                <span className="hidden xl:inline">My cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
            
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="lg:hidden relative">
              <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="py-2 sm:py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 lg:gap-4 xl:gap-6 overflow-x-auto">
            <button className="px-3 lg:px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition font-semibold text-sm whitespace-nowrap">
              <FontAwesomeIcon icon={faBars} /> <span className="hidden lg:inline">All category</span>
            </button>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-sm font-semibold whitespace-nowrap">Hot offers</Link>
            <Link to="/products/grid" className="text-gray-900 hover:text-blue-600 text-sm font-semibold whitespace-nowrap hidden lg:inline">Gift boxes</Link>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-sm font-semibold whitespace-nowrap hidden xl:inline">Projects</Link>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-sm font-semibold whitespace-nowrap hidden xl:inline">Menu item</Link>
            <a href="#help" className="text-gray-900 hover:text-blue-600 text-sm flex items-center gap-1 font-semibold whitespace-nowrap hidden lg:inline-flex">
              Help <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
            </a>
            <div className="ml-auto flex gap-2 lg:gap-4 text-xs lg:text-sm">
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <Link to="/" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs">
            <FontAwesomeIcon icon={faBars} className="text-xl" />
            <span>Menu</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs">
            <FontAwesomeIcon icon={faBox} className="text-xl" />
            <span>Products</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs relative">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-2 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
