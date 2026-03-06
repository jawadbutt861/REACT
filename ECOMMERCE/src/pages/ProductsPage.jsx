import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import ProductList from '../components/ProductList'

function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <a href="#home" className="text-gray-600 hover:text-blue-600">Home</a>
            <span className="text-gray-400">›</span>
            <a href="#clothings" className="text-gray-600 hover:text-blue-600">Clothings</a>
            <span className="text-gray-400">›</span>
            <a href="#mens" className="text-gray-600 hover:text-blue-600">Men's wear</a>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900">Summer clothing</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-4 sm:py-6 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            
            <div className="flex-1">
              {/* Products Header */}
              <div className="bg-white border border-gray-200 rounded p-3 sm:p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div className="text-sm sm:text-base">
                  <span className="text-gray-700">12,911 items in <strong>Mobile accessory</strong></span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-xs sm:text-sm text-gray-700">Verified only</span>
                  </label>
                  
                  <select className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  
                  <div className="flex border border-gray-300 rounded overflow-hidden">
                    <button 
                      className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <span>⊞</span>
                    </button>
                    <button 
                      className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border-l border-gray-300 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <span>☰</span>
                    </button>
                  </div>
                </div>
              </div>

              <ProductList viewMode={viewMode} />

              {/* Pagination */}
              <div className="bg-white border border-gray-200 rounded p-3 sm:p-4 mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <select className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto">
                  <option>Show 10</option>
                  <option>Show 20</option>
                  <option>Show 50</option>
                </select>
                
                <div className="flex gap-1 sm:gap-2">
                  <button className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50">‹</button>
                  <button className="px-2 sm:px-3 py-1 sm:py-2 bg-blue-600 text-white rounded text-xs sm:text-sm">1</button>
                  <button className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50">2</button>
                  <button className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50">3</button>
                  <button className="px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50">›</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductsPage
