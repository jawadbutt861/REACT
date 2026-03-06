import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductGrid({ viewMode }) {
  const { addToCart } = useCart()

  const handleAddToCart = (product, e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <Link to={`/product/${product.id}`} key={product.id} className="bg-white border border-gray-200 rounded p-4 hover:shadow-md transition group">
          <div className="relative mb-3">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
            <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 hover:text-red-500 transition" onClick={(e) => e.preventDefault()}>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
            
            <h3 className="text-sm text-gray-700 group-hover:text-blue-600 transition mb-3">{product.name}</h3>
            
            <button 
              onClick={(e) => handleAddToCart(product, e)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid
