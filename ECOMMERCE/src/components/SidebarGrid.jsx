import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

function SidebarGrid() {
  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    features: true,
    priceRange: false,
    condition: false,
    ratings: false,
    manufacturer: false
  })

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <aside className="w-64 bg-white border border-gray-200 rounded p-4 space-y-4">
      {/* Category */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-3" onClick={() => toggleSection('category')}>
          <h3 className="font-semibold">Category</h3>
          <FontAwesomeIcon icon={openSections.category ? faChevronUp : faChevronDown} className="text-gray-400 text-sm" />
        </div>
        {openSections.category && (
          <div>
            <ul className="space-y-2 mb-3">
              <li><a href="#mobile" className="text-sm text-gray-600 hover:text-blue-600">Mobile accessory</a></li>
              <li><a href="#electronics" className="text-sm text-gray-600 hover:text-blue-600">Electronics</a></li>
              <li><a href="#smartphones" className="text-sm text-gray-600 hover:text-blue-600">Smartphones</a></li>
              <li><a href="#modern" className="text-sm text-gray-600 hover:text-blue-600">Modern tech</a></li>
            </ul>
            <button className="text-sm text-blue-600 hover:text-blue-700">See all</button>
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-3" onClick={() => toggleSection('brands')}>
          <h3 className="font-semibold">Brands</h3>
          <FontAwesomeIcon icon={openSections.brands ? faChevronUp : faChevronDown} className="text-gray-400 text-sm" />
        </div>
        {openSections.brands && (
          <div>
            <div className="space-y-2 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-gray-700">Samsung</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-gray-700">Apple</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-700">Huawei</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-gray-700">Pocco</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-700">Lenovo</span>
              </label>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700">See all</button>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-3" onClick={() => toggleSection('features')}>
          <h3 className="font-semibold">Features</h3>
          <FontAwesomeIcon icon={openSections.features ? faChevronUp : faChevronDown} className="text-gray-400 text-sm" />
        </div>
        {openSections.features && (
          <div>
            <div className="space-y-2 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-gray-700">Metallic</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-700">Plastic cover</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-700">8GB Ram</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-700">Super power</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-700">Large Memory</span>
              </label>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700">See all</button>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-3" onClick={() => toggleSection('priceRange')}>
          <h3 className="font-semibold">Price range</h3>
          <FontAwesomeIcon icon={openSections.priceRange ? faChevronUp : faChevronDown} className="text-gray-400 text-sm" />
        </div>
        {openSections.priceRange && (
          <div>
            <input type="range" min="0" max="999999" className="w-full mb-3" />
            <div className="flex items-center gap-2 mb-3">
              <input type="number" placeholder="0" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" />
              <span className="text-gray-400">-</span>
              <input type="number" placeholder="999999" className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm" />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm">Apply</button>
          </div>
        )}
      </div>

      {/* Condition */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-3" onClick={() => toggleSection('condition')}>
          <h3 className="font-semibold">Condition</h3>
          <FontAwesomeIcon icon={openSections.condition ? faChevronUp : faChevronDown} className="text-gray-400 text-sm" />
        </div>
        {openSections.condition && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="condition" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-gray-700">Any</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="condition" className="w-4 h-4" />
              <span className="text-sm text-gray-700">Refurbished</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="condition" className="w-4 h-4" />
              <span className="text-sm text-gray-700">Brand new</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="condition" className="w-4 h-4" />
              <span className="text-sm text-gray-700">Old items</span>
            </label>
          </div>
        )}
      </div>

      {/* Ratings */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center cursor-pointer mb-3" onClick={() => toggleSection('ratings')}>
          <h3 className="font-semibold">Ratings</h3>
          <FontAwesomeIcon icon={openSections.ratings ? faChevronUp : faChevronDown} className="text-gray-400 text-sm" />
        </div>
        {openSections.ratings && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-yellow-400">★★★★★</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-yellow-400">★★★★☆</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-yellow-400">★★★☆☆</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-yellow-400">★★☆☆☆</span>
            </label>
          </div>
        )}
      </div>

      {/* Manufacturer */}
      <div>
        <div className="flex justify-between items-center cursor-pointer mb-3" onClick={() => toggleSection('manufacturer')}>
          <h3 className="font-semibold">Manufacturer</h3>
          <FontAwesomeIcon icon={openSections.manufacturer ? faChevronUp : faChevronDown} className="text-gray-400 text-sm" />
        </div>
        {openSections.manufacturer && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-700">China</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-700">USA</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-700">Japan</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm text-gray-700">Korea</span>
            </label>
          </div>
        )}
      </div>
    </aside>
  )
}

export default SidebarGrid
