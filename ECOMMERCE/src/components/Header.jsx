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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Brand Logo" className="h-10" />
            </Link>
            
            <form className="flex-1 flex border-2 border-blue-600 rounded-md overflow-hidden" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search"
                className="flex-1 px-4 py-2 outline-none"
              />
              <select className="px-4 py-2 border-l border-gray-200 bg-white cursor-pointer outline-none">
                <option>All category</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
              </select>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Search
              </button>
            </form>
            
            <div className="flex gap-5">
              <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faUser} className="text-xl" />
                <span>Profile</span>
              </Link>
              <Link to="/messages" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                <span>Message</span>
              </Link>
              <Link to="/orders" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold">
                <FontAwesomeIcon icon={faBox} className="text-xl" />
                <span>Orders</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-semibold relative">
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                <span>My cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50 transition font-semibold">
              <FontAwesomeIcon icon={faBars} /> All category
            </button>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-sm font-semibold">Hot offers</Link>
            <Link to="/products/grid" className="text-gray-900 hover:text-blue-600 text-sm font-semibold">Gift boxes</Link>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-sm font-semibold">Projects</Link>
            <Link to="/products" className="text-gray-900 hover:text-blue-600 text-sm font-semibold">Menu item</Link>
            <a href="#help" className="text-gray-900 hover:text-blue-600 text-sm flex items-center gap-1 font-semibold">
              Help <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
            </a>
            <div className="ml-auto flex gap-4 text-sm">
              <span className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600">
                <FontAwesomeIcon icon={faGlobe} /> English, USD <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
              </span>
              <span className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Ship to 
                <img src={flagDE} alt="Germany" className="w-5 h-auto ml-1" />
                <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
