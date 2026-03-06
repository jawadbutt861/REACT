import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowLeft, faLock, faComments, faTruck, 
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

function CartPage() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const savedItems = products.slice(0, 4)

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(getCartTotal() * 0.1)
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(getCartTotal() * 0.2)
    } else {
      alert('Invalid coupon code')
    }
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08
  const total = subtotal - discount + tax

  const handleCheckout = () => {
    alert('Checkout functionality will be implemented here')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">My cart ({cartItems.length})</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded p-8 sm:p-12 text-center">
              <FontAwesomeIcon icon={faShoppingCart} className="text-4xl sm:text-6xl text-gray-300 mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">Add some products to get started</p>
              <Link to="/products" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition text-sm sm:text-base">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="bg-white border border-gray-200 rounded mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 border-b border-gray-200 last:border-b-0">
                      <Link to={`/product/${item.id}`} className="mx-auto sm:mx-0">
                        <img src={item.image} alt={item.name} className="w-32 h-32 object-contain" />
                      </Link>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold mb-2 hover:text-blue-600">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-1">Brand: {item.brand}</p>
                        <p className="text-sm text-gray-600 mb-3">Category: {item.category}</p>
                        
                        <div className="flex gap-3">
                          <button className="text-sm text-red-600 hover:text-red-700" onClick={() => removeFromCart(item.id)}>
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-semibold mb-4">${item.price.toFixed(2)}</div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-600">Qty:</label>
                          <select 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mb-6">
                  <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 transition" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to shop
                  </button>
                  <button className="px-6 py-3 border border-red-600 text-red-600 rounded hover:bg-red-50 transition" onClick={clearCart}>
                    Remove all
                  </button>
                </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
                <div className="bg-white border border-gray-200 rounded p-4 flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faLock} className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure payment</h4>
                    <p className="text-sm text-gray-600">Have you ever finally just</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded p-4 flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faComments} className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Customer support</h4>
                    <p className="text-sm text-gray-600">Have you ever finally just</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded p-4 flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={faTruck} className="text-gray-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Free delivery</h4>
                    <p className="text-sm text-gray-600">Have you ever finally just</p>
                  </div>
                </div>
              </div>

              {/* Saved for Later */}
              <div className="bg-white border border-gray-200 rounded p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">You may also like</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {savedItems.map(item => (
                    <Link to={`/product/${item.id}`} key={item.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
                      <img src={item.image} alt={item.name} className="w-full h-32 object-contain mb-3" />
                      <p className="text-lg font-semibold mb-2">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600 mb-3">{item.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white border border-gray-200 rounded p-4 sm:p-6 lg:sticky lg:top-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Have a coupon?</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter code (SAVE10 or SAVE20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button onClick={applyCoupon} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Apply</button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Try: SAVE10 or SAVE20</p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%):</span>
                    <span>+ ${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-3 rounded hover:from-green-700 hover:to-green-800 transition font-semibold mb-4"
                >
                  Checkout
                </button>

                <div className="flex justify-center gap-2">
                  <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-xs">VISA</div>
                  <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-xs">MC</div>
                  <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-xs">AMEX</div>
                  <div className="w-10 h-7 bg-gray-200 rounded flex items-center justify-center text-xs">PP</div>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Discount Banner */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-8 flex justify-between items-center text-white mt-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Super discount on more than 100 USD</h2>
              <p>Have you ever finally just write dummy info</p>
            </div>
            <button className="bg-orange-500 text-white px-8 py-3 rounded hover:bg-orange-600 transition">Shop now</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CartPage
