import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeart, faGlobe, faShieldAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import flagDE from '../assets/DE@2x.png'

function ProductDetailPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  
  const [activeTab, setActiveTab] = useState('description')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">Back to products</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const productImages = [product.image, product.image, product.image, product.image]
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6)
  const youMayLike = products.filter(p => p.id !== product.id).slice(0, 5)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

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

      {/* Product Detail Section */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 mb-8">
            {/* Left - Images */}
            <div className="w-96">
              <div className="bg-white border border-gray-200 rounded p-4 mb-4">
                <img src={productImages[selectedImage]} alt="Product" className="w-full h-96 object-contain" />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {productImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`border-2 rounded p-2 cursor-pointer ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-16 object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Middle - Product Info */}
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded p-6">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded mb-4">
                  <FontAwesomeIcon icon={faCheck} /> {product.inStock ? 'In stock' : 'Out of stock'}
                </div>
                
                <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-yellow-400 text-lg">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                  <span className="text-orange-500 font-semibold">{product.rating}</span>
                  <span className="text-gray-600">• {product.reviews} reviews</span>
                  <span className="text-gray-600">• {product.orders} sold</span>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex-1 border-2 border-blue-600 rounded p-4 bg-blue-50">
                    <div className="text-2xl font-bold text-blue-600 mb-1">${product.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Current price</div>
                  </div>
                  {product.oldPrice && (
                    <div className="flex-1 border border-gray-300 rounded p-4">
                      <div className="text-2xl font-bold mb-1 line-through text-gray-400">${product.oldPrice.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Original price</div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex"><span className="w-32 text-gray-600">Brand:</span><span className="font-medium">{product.brand}</span></div>
                  <div className="flex"><span className="w-32 text-gray-600">Category:</span><span>{product.category}</span></div>
                  <div className="flex"><span className="w-32 text-gray-600">Model:</span><span>{product.specifications.model}</span></div>
                  <div className="flex"><span className="w-32 text-gray-600">Type:</span><span>{product.specifications.type}</span></div>
                  <div className="flex"><span className="w-32 text-gray-600">Material:</span><span>{product.specifications.material}</span></div>
                  <div className="flex"><span className="w-32 text-gray-600">Warranty:</span><span>{product.specifications.warranty}</span></div>
                  <div className="flex"><span className="w-32 text-gray-600">Weight:</span><span>{product.specifications.weight}</span></div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm font-medium">Quantity:</label>
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold mb-3"
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>
              </div>
            </div>

            {/* Right - Supplier Info */}
            <div className="w-80">
              <div className="bg-white border border-gray-200 rounded p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">R</div>
                  <div>
                    <div className="text-xs text-gray-600">Supplier</div>
                    <div className="font-semibold">Guanjoi Trading LLC</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <img src={flagDE} alt="Germany" className="w-5 h-auto" />
                    <span>Germany, Berlin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600" />
                    <span>Verified Seller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faGlobe} className="text-blue-600" />
                    <span>Worldwide shipping</span>
                  </div>
                </div>

                <button className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded mb-2 hover:from-blue-700 hover:to-blue-800 transition">Send inquiry</button>
                <button className="w-full bg-white border border-blue-600 text-blue-600 py-3 rounded hover:bg-blue-50 transition">Seller's profile</button>
              </div>

              <button className="w-full bg-white border border-gray-300 py-3 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <FontAwesomeIcon icon={faHeart} /> Save for later
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              <div className="bg-white border border-gray-200 rounded">
                <div className="flex border-b border-gray-200">
                  <button 
                    className={`flex-1 py-4 px-6 font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    className={`flex-1 py-4 px-6 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </button>
                  <button 
                    className={`flex-1 py-4 px-6 font-medium ${activeTab === 'shipping' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('shipping')}
                  >
                    Shipping
                  </button>
                  <button 
                    className={`flex-1 py-4 px-6 font-medium ${activeTab === 'seller' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    onClick={() => setActiveTab('seller')}
                  >
                    About seller
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === 'description' && (
                    <div className="space-y-4">
                      <p className="text-gray-700">{product.description}</p>
                      
                      <table className="w-full border border-gray-200">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 px-4 bg-gray-50 font-medium">Model</td>
                            <td className="py-2 px-4">{product.specifications.model}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 px-4 bg-gray-50 font-medium">Type</td>
                            <td className="py-2 px-4">{product.specifications.type}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 px-4 bg-gray-50 font-medium">Material</td>
                            <td className="py-2 px-4">{product.specifications.material}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2 px-4 bg-gray-50 font-medium">Warranty</td>
                            <td className="py-2 px-4">{product.specifications.warranty}</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 bg-gray-50 font-medium">Weight</td>
                            <td className="py-2 px-4">{product.specifications.weight}</td>
                          </tr>
                        </tbody>
                      </table>

                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCheck} className="text-green-600" /> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="text-center py-8 text-gray-600">
                      <p>Customer reviews will be displayed here.</p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="space-y-3">
                      <p className="text-gray-700">Free shipping on orders over $50</p>
                      <p className="text-gray-700">Standard delivery: 5-7 business days</p>
                      <p className="text-gray-700">Express delivery: 2-3 business days</p>
                    </div>
                  )}
                  {activeTab === 'seller' && (
                    <div className="space-y-3">
                      <p className="text-gray-700">Verified seller with 4.8 rating</p>
                      <p className="text-gray-700">Member since 2020</p>
                      <p className="text-gray-700">Ships from: United States</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* You may like sidebar */}
            <div className="w-80">
              <div className="bg-white border border-gray-200 rounded p-4">
                <h3 className="font-semibold mb-4">You may like</h3>
                <div className="space-y-4">
                  {youMayLike.map(likeProduct => (
                    <Link to={`/product/${likeProduct.id}`} key={likeProduct.id} className="flex gap-3 hover:bg-gray-50 p-2 rounded transition">
                      <img src={likeProduct.image} alt={likeProduct.name} className="w-20 h-20 object-contain" />
                      <div>
                        <h4 className="text-sm font-medium mb-1">{likeProduct.name}</h4>
                        <p className="text-sm text-gray-600">${likeProduct.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Related products</h2>
            <div className="grid grid-cols-6 gap-4">
              {relatedProducts.map(relProduct => (
                <Link to={`/product/${relProduct.id}`} key={relProduct.id} className="bg-white border border-gray-200 rounded p-4 hover:shadow-md transition">
                  <img src={relProduct.image} alt={relProduct.name} className="w-full h-32 object-contain mb-3" />
                  <h3 className="text-sm font-medium mb-2">{relProduct.name}</h3>
                  <p className="text-sm text-gray-600">${relProduct.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Discount Banner */}
          <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-8 flex justify-between items-center text-white">
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

export default ProductDetailPage
