import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFacebookF, faTwitter, faLinkedinIn, 
  faInstagram, faYoutube
} from '@fortawesome/free-brands-svg-icons'
import flagUS from '../assets/US@2x.png'
import appStoreImg from '../assets/Group.png'
import playStoreImg from '../assets/market-button.png'

function Footer() {
  return (
    <>
      {/* Newsletter */}
      <section className="bg-gray-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold mb-2">Subscribe on our newsletter</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email" 
              className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            />
            <button className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded hover:from-blue-700 hover:to-blue-800 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="6" fill="#4A90E2"/>
                  <path d="M16 8L20 16H12L16 8Z" fill="white"/>
                  <rect x="12" y="16" width="8" height="8" fill="white"/>
                </svg>
                <span className="font-semibold text-lg">Brand</span>
              </div>
              <p className="text-gray-600 text-base mb-4">Best information about the company gies here but now lorem ipsum is</p>
              <div className="flex gap-2">
                <a href="#fb" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                  <FontAwesomeIcon icon={faFacebookF} className="text-sm" />
                </a>
                <a href="#tw" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition">
                  <FontAwesomeIcon icon={faTwitter} className="text-sm" />
                </a>
                <a href="#ln" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition">
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-sm" />
                </a>
                <a href="#ig" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition">
                  <FontAwesomeIcon icon={faInstagram} className="text-sm" />
                </a>
                <a href="#yt" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                  <FontAwesomeIcon icon={faYoutube} className="text-sm" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-base">About</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-600 hover:text-blue-600 text-base">About Us</a></li>
                <li><a href="#find" className="text-gray-600 hover:text-blue-600 text-base">Find store</a></li>
                <li><a href="#categories" className="text-gray-600 hover:text-blue-600 text-base">Categories</a></li>
                <li><a href="#blogs" className="text-gray-600 hover:text-blue-600 text-base">Blogs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-base">Partnership</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-600 hover:text-blue-600 text-base">About Us</a></li>
                <li><a href="#find" className="text-gray-600 hover:text-blue-600 text-base">Find store</a></li>
                <li><a href="#categories" className="text-gray-600 hover:text-blue-600 text-base">Categories</a></li>
                <li><a href="#blogs" className="text-gray-600 hover:text-blue-600 text-base">Blogs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-base">Information</h4>
              <ul className="space-y-2">
                <li><a href="#help" className="text-gray-600 hover:text-blue-600 text-base">Help Center</a></li>
                <li><a href="#refund" className="text-gray-600 hover:text-blue-600 text-base">Money Refund</a></li>
                <li><a href="#shipping" className="text-gray-600 hover:text-blue-600 text-base">Shipping</a></li>
                <li><a href="#contact" className="text-gray-600 hover:text-blue-600 text-base">Contact us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-base">For users</h4>
              <ul className="space-y-2">
                <li><a href="#login" className="text-gray-600 hover:text-blue-600 text-base">Login</a></li>
                <li><a href="#register" className="text-gray-600 hover:text-blue-600 text-base">Register</a></li>
                <li><a href="#settings" className="text-gray-600 hover:text-blue-600 text-base">Settings</a></li>
                <li><a href="#orders" className="text-gray-600 hover:text-blue-600 text-base">My Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-base">Get app</h4>
              <div className="space-y-2">
                <a href="#appstore" className="block">
                  <img src={appStoreImg} alt="App Store" className="h-10 w-auto" />
                </a>
                <a href="#playstore" className="block">
                  <img src={playStoreImg} alt="Google Play" className="h-10 w-auto" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm sm:text-base">© 2023 Ecommerce.</p>
            <div className="flex items-center gap-2">
              <img src={flagUS} alt="USA" className="w-5 sm:w-6 h-auto" />
              <span className="text-gray-600 text-sm sm:text-base">English</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
