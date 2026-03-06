/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductList({ viewMode }) {
  const { addToCart } = useCart()

  const handleAddToCart = (product, e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="space-y-4">
      {products.slice(0, 8).map(product => (
        <div key={product.id} className="bg-white border border-gray-200 rounded p-4 flex gap-4 hover:shadow-md transition">
          <Link to={`/product/${product.id}`} className="relative shrink-0">
            <img src={product.image} alt={product.name} className="w-48 h-48 object-contain" />
            <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 hover:text-red-500 transition" onClick={(e) => e.preventDefault()}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </Link>
          
          <div className="flex-1">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition">{product.name}</h3>
            </Link>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span>{product.rating}</span>
              </div>
              <span>• {product.reviews} reviews</span>
              <span>• {product.orders} orders</span>
              <span>• Free Shipping</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            
            <div className="flex gap-3">
              <Link to={`/product/${product.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">View details</Link>
              <button 
                onClick={(e) => handleAddToCart(product, e)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
