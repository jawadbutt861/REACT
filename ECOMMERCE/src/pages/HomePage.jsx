import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTshirt, faCouch, faLaptop, faTools,
  faFutbol, faPaw, faCog, faEllipsisH, faCar,
  faMagnifyingGlass, faPalette, faPlane, faShieldAlt
} from '@fortawesome/free-solid-svg-icons'
import flagAE from '../assets/AE@2x.png'
import flagAU from '../assets/icon.png'
import flagUS from '../assets/US@2x.png'
import flagRU from '../assets/RU@2x.png'
import flagIT from '../assets/IT@2x.png'
import flagDK from '../assets/DK@2x.png'
import flagFR from '../assets/FR@2x.png'
import flagCN from '../assets/CN@2x.png'
import flagGB from '../assets/GB@2x.png'
import dealImg1 from '../assets/image 23.png'
import dealImg2 from '../assets/6.png'
import dealImg3 from '../assets/image 29.png'
import dealImg4 from '../assets/8.png'
import dealImg5 from '../assets/image 34.png'
import homeImg1 from '../assets/1.png'
import homeImg2 from '../assets/3.png'
import homeImg3 from '../assets/6.png'
import homeImg4 from '../assets/7.png'
import homeImg5 from '../assets/8.png'
import homeImg6 from '../assets/9.png'
import homeImg7 from '../assets/image 89.png'
import homeImg8 from '../assets/image 93.png'
import consumerImg1 from '../assets/image 23.png'
import consumerImg2 from '../assets/image 29.png'
import consumerImg3 from '../assets/8.png'
import consumerImg4 from '../assets/image 32.png'
import consumerImg5 from '../assets/6.png'
import consumerImg6 from '../assets/image 33.png'
import consumerImg7 from '../assets/image 34.png'
import consumerImg8 from '../assets/image 85.png'
import bannerBg from '../assets/Banner-board-800x420 2.png'
import homeOutdoorBg from '../assets/Group 969.png'
import consumerBg from '../assets/image 98.png'
import quotesBg from '../assets/Group 982.png'
import recImg1 from '../assets/image 24.png'
import recImg2 from '../assets/image 26.png'
import recImg3 from '../assets/image 30.png'
import recImg4 from '../assets/image 86.png'
import recImg5 from '../assets/image 90.png'
import recImg8 from '../assets/2 1.png'
import recImg9 from '../assets/Bitmap.png'
import recImg10 from '../assets/Bitmap (2).png'
import serviceImg1 from '../assets/image 106.png'
import serviceImg2 from '../assets/image 107.png'
import serviceImg3 from '../assets/Mask group (1).png'
import serviceImg4 from '../assets/Mask group.png'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            {/* Left Sidebar - Categories */}
            <aside className="w-56 bg-white rounded-lg shadow-sm">
              <ul className="py-2">
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faCar} className="w-4" /> Automobiles
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faTshirt} className="w-4" /> Clothes and wear
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faCouch} className="w-4" /> Home interiors
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faLaptop} className="w-4" /> Computer and tech
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faTools} className="w-4" /> Tools, equipments
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faFutbol} className="w-4" /> Sports and outdoor
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faPaw} className="w-4" /> Animal and pets
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faCog} className="w-4" /> Machinery tools
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer">
                  <Link to="/products" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 text-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="w-4" /> More category
                  </Link>
                </li>
              </ul>
            </aside>

            {/* Center Banner */}
            <div 
              className="flex-1 rounded-lg overflow-hidden bg-cover bg-center relative h-100"
              style={{ backgroundImage: `url(${bannerBg})` }}
            >
              <div className="absolute inset-0 flex flex-col justify-center px-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-1">Latest trending</h2>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Electronic items</h1>
                <button className="bg-white text-gray-800 px-6 py-2 rounded-md hover:bg-gray-100 transition w-fit font-medium">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right Sidebar - User Actions */}
            <aside className="w-56 flex flex-col gap-3">
              <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                <div className="w-11 h-11 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  👤
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Hi, user</p>
                  <p className="text-xs text-gray-600">let's get stated</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-sm">
                Join now
              </button>
              
              <button className="w-full bg-white text-blue-600 border border-gray-300 py-2.5 rounded-md hover:bg-gray-50 transition font-medium text-sm">
                Log in
              </button>
              
              <div className="bg-orange-500 text-white rounded-lg p-4">
                <p className="text-sm font-medium leading-relaxed">Get US $10 off<br/>with a new<br/>supplier</p>
              </div>
              
              <div className="bg-teal-400 text-white rounded-lg p-4">
                <p className="text-sm font-medium leading-relaxed">Send quotes with<br/>supplier<br/>preferences</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
      
      {/* Deals and Offers Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Deals and offers</h2>
                <p className="text-gray-500 text-sm">Hygiene equipments</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-gray-500 text-white px-3 py-2 rounded text-center min-w-[60px]">
                  <span className="block text-xl font-bold">04</span>
                  <small className="text-xs">Days</small>
                </div>
                <div className="bg-gray-500 text-white px-3 py-2 rounded text-center min-w-[60px]">
                  <span className="block text-xl font-bold">13</span>
                  <small className="text-xs">Hour</small>
                </div>
                <div className="bg-gray-500 text-white px-3 py-2 rounded text-center min-w-[60px]">
                  <span className="block text-xl font-bold">34</span>
                  <small className="text-xs">Min</small>
                </div>
                <div className="bg-gray-500 text-white px-3 py-2 rounded text-center min-w-[60px]">
                  <span className="block text-xl font-bold">56</span>
                  <small className="text-xs">Sec</small>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-5 ">
              <div className="border border-gray-200  p-4 hover:shadow-lg transition text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-3 h-40 flex items-center justify-center">
                  <img src={dealImg4} alt="Smart watches" className="max-w-full max-h-full object-contain" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2 text-sm">Smart watches</h3>
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">-25%</span>
              </div>
              
              <div className="border border-gray-200  p-4 hover:shadow-lg transition text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-3 h-40 flex items-center justify-center">
                  <img src={dealImg5} alt="Laptops" className="max-w-full max-h-full object-contain" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2 text-sm">Laptops</h3>
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">-15%</span>
              </div>
              
              <div className="border border-gray-200  p-4 hover:shadow-lg transition text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-3 h-40 flex items-center justify-center">
                  <img src={dealImg2} alt="GoPro cameras" className="max-w-full max-h-full object-contain" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2 text-sm">GoPro cameras</h3>
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">-40%</span>
              </div>
              
              <div className="border border-gray-200  p-4 hover:shadow-lg transition text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-3 h-40 flex items-center justify-center">
                  <img src={dealImg3} alt="Headphones" className="max-w-full max-h-full object-contain" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2 text-sm">Headphones</h3>
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">-25%</span>
              </div>
              
              <div className="border border-gray-200  p-4 hover:shadow-lg transition text-center">
                <div className="bg-gray-50 rounded-lg p-4 mb-3 h-40 flex items-center justify-center">
                  <img src={dealImg1} alt="Canon cameras" className="max-w-full max-h-full object-contain" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2 text-sm">Canon cameras</h3>
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">-25%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Home and Outdoor Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-5 gap-0">
              {/* Left Banner */}
              <div 
                className="rounded-lg p-6 flex flex-col justify-between bg-cover bg-center relative overflow-hidden row-span-2 border-r border-b border-gray-200"
                style={{ backgroundImage: `url(${homeOutdoorBg})` }}
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-16">Home and<br/>outdoor</h2>
                  <button className="bg-white text-gray-800 px-5 py-2 rounded hover:bg-gray-100 transition font-medium text-sm">
                    Source now
                  </button>
                </div>
              </div>
              
              {/* Product Cards - Row 1 */}
              <div className="bg-gray-50 border-r border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Soft chairs</p>
                    <p className="text-xs text-gray-500">From<br/>USD 19</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg1} alt="Soft chairs" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Sofa & chair</p>
                    <p className="text-xs text-gray-500">From<br/>USD 19</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg2} alt="Sofa & chair" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Kitchen dishes</p>
                    <p className="text-xs text-gray-500">From<br/>USD 19</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg3} alt="Kitchen dishes" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Smart watches</p>
                    <p className="text-xs text-gray-500">From<br/>USD 19</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg4} alt="Smart watches" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              {/* Product Cards - Row 2 */}
              <div className="bg-gray-50 border-r border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Kitchen mixer</p>
                    <p className="text-xs text-gray-500">From<br/>USD 100</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg5} alt="Kitchen mixer" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Blenders</p>
                    <p className="text-xs text-gray-500">From<br/>USD 39</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg6} alt="Blenders" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Home appliance</p>
                    <p className="text-xs text-gray-500">From<br/>USD 19</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg7} alt="Home appliance" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Coffee maker</p>
                    <p className="text-xs text-gray-500">From<br/>USD 10</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={homeImg8} alt="Coffee maker" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Consumer Electronics Section */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-5 gap-0">
              {/* Left Banner */}
              <div 
                className="rounded-lg p-6 flex flex-col justify-between bg-cover bg-center relative overflow-hidden row-span-2 border-r border-b border-gray-200"
                style={{ backgroundImage: `url(${consumerBg})` }}
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-16">Consumer<br/>electronics and<br/>gadgets</h2>
                  <button className="bg-white text-gray-800 px-5 py-2 rounded hover:bg-gray-100 transition font-medium text-sm">
                    Source now
                  </button>
                </div>
              </div>
              
              {/* Product Cards - Row 1 */}
              <div className="bg-gray-50 border-r border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Smart watches</p>
                    <p className="text-xs text-gray-500">From<br/>USD 19</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg1} alt="Smart watches" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Cameras</p>
                    <p className="text-xs text-gray-500">From<br/>USD 89</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg2} alt="Cameras" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Headphones</p>
                    <p className="text-xs text-gray-500">From<br/>USD 10</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg3} alt="Headphones" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-b border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Smart watches</p>
                    <p className="text-xs text-gray-500">From<br/>USD 90</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg4} alt="Smart watches" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              {/* Product Cards - Row 2 */}
              <div className="bg-gray-50 border-r border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Gaming set</p>
                    <p className="text-xs text-gray-500">From<br/>USD 35</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg5} alt="Gaming set" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Laptops & PC</p>
                    <p className="text-xs text-gray-500">From<br/>USD 340</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg6} alt="Laptops & PC" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-r border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Smartphones</p>
                    <p className="text-xs text-gray-500">From<br/>USD 19</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg7} alt="Smartphones" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 hover:shadow-md transition">
                <div className="flex flex-col h-full justify-between">
                  <div className="mb-2">
                    <p className="font-medium text-gray-800 text-sm mb-1">Electric kettle</p>
                    <p className="text-xs text-gray-500">From<br/>USD 240</p>
                  </div>
                  <div className="flex justify-end">
                    <img src={consumerImg8} alt="Electric kettle" className="h-16 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quote Request Section */}
      <div className='flex justify-center items-center'>
      <section 
        className="py-12 bg-cover bg-center relative w-300 rounded-lg"
        style={{ backgroundImage: `url(${quotesBg})` }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 items-center">
            <div className="flex-1 text-white">
              <h2 className="text-4xl font-bold mb-4">An easy way to send<br/>requests to all suppliers</h2>
              <p className="text-lg opacity-90">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div className="w-96 bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Send quote to suppliers</h3>
              <input type="text" placeholder="What item you need?" className="w-full px-4 py-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <textarea placeholder="Type more details" className="w-full px-4 py-2 border border-gray-300 rounded mb-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
              <div className="flex gap-2 mb-4">
                <input type="text" placeholder="Quantity" className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <select className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>Pcs</option>
                </select>
              </div>
              <button className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded hover:from-blue-700 hover:to-blue-800 transition">Send inquiry</button>
            </div>
          </div>
        </div>
      </section>
      </div>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Recommended items</h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { img: recImg1, name: 'Product 1', price: '$10.30' },
              { img: recImg2, name: 'Product 2', price: '$9.99' },
              { img: recImg3, name: 'Product 3', price: '$12.50' },
              { img: recImg4, name: 'Product 4', price: '$15.00' },
              { img: recImg5, name: 'Product 5', price: '$8.99' },
              { img: homeImg1, name: 'Product 6', price: '$11.20' },
              { img: homeImg2, name: 'Product 7', price: '$14.99' },
              { img: recImg8, name: 'Product 8', price: '$13.50' },
              { img: recImg9, name: 'Product 9', price: '$16.00' },
              { img: recImg10, name: 'Product 10', price: '$10.99' }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded p-4 hover:shadow-md transition">
                <img src={item.img} alt={item.name} className="w-full h-32 object-contain mb-3" />
                <p className="text-lg font-semibold mb-2">{item.price}</p>
                <p className="text-sm text-gray-600">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Extra Services Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Our extra services</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="relative rounded-lg overflow-hidden group cursor-pointer h-64">
              <img src={serviceImg1} alt="Source from Industry Hubs" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-base text-white">Source from<br/>Industry Hubs</h3>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden group cursor-pointer h-64">
              <img src={serviceImg2} alt="Customize Your Products" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon icon={faPalette} className="text-xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-base text-white">Customize Your<br/>Products</h3>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden group cursor-pointer h-64">
              <img src={serviceImg3} alt="Fast, reliable shipping" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon icon={faPlane} className="text-xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-base text-white">Fast, reliable shipping<br/>by ocean or air</h3>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden group cursor-pointer h-64">
              <img src={serviceImg4} alt="Product monitoring" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/60 to-transparent">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-xl text-blue-600" />
                </div>
                <h3 className="font-semibold text-base text-white">Product monitoring<br/>and inspection</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Suppliers by region</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagAE} alt="UAE" className="w-8 h-auto" />
              <div>
                <p className="font-medium">Arabic Emirates</p>
                <small className="text-gray-600">shopname.ae</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagAU} alt="Australia" className="w-8 h-auto" />
              <div>
                <p className="font-medium">Australia</p>
                <small className="text-gray-600">shopname.ae</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagUS} alt="USA" className="w-8 h-auto" />
              <div>
                <p className="font-medium">United States</p>
                <small className="text-gray-600">shopname.ae</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagRU} alt="Russia" className="w-8 h-auto" />
              <div>
                <p className="font-medium">Russia</p>
                <small className="text-gray-600">shopname.ru</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagIT} alt="Italy" className="w-8 h-auto" />
              <div>
                <p className="font-medium">Italy</p>
                <small className="text-gray-600">shopname.it</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagDK} alt="Denmark" className="w-8 h-auto" />
              <div>
                <p className="font-medium">Denmark</p>
                <small className="text-gray-600">denmark.com.dk</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagFR} alt="France" className="w-8 h-auto" />
              <div>
                <p className="font-medium">France</p>
                <small className="text-gray-600">shopname.com.fr</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagAE} alt="UAE" className="w-8 h-auto" />
              <div>
                <p className="font-medium">Arabic Emirates</p>
                <small className="text-gray-600">shopname.ae</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagCN} alt="China" className="w-8 h-auto" />
              <div>
                <p className="font-medium">China</p>
                <small className="text-gray-600">shopname.ae</small>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4 flex items-center gap-3 hover:shadow-md transition">
              <img src={flagGB} alt="UK" className="w-8 h-auto" />
              <div>
                <p className="font-medium">Great Britain</p>
                <small className="text-gray-600">shopname.co.uk</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default HomePage
