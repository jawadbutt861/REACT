import productImg1 from '../assets/image 23.png'
import productImg2 from '../assets/image 34.png'
import productImg3 from '../assets/image 32.png'
import productImg4 from '../assets/image 33.png'
import productImg5 from '../assets/8.png'
import productImg6 from '../assets/6.png'
import productImg7 from '../assets/image 86.png'
import productImg8 from '../assets/image 29.png'

export const products = [
  {
    id: 1,
    name: 'Canon Camera EOS 2000, Black 10x zoom',
    price: 998.00,
    oldPrice: 1128.00,
    rating: 4.5,
    reviews: 32,
    orders: 154,
    image: productImg1,
    category: 'Electronics',
    brand: 'Canon',
    inStock: true,
    description: 'Professional camera with 10x optical zoom, perfect for photography enthusiasts. Features high-resolution sensor and advanced autofocus system.',
    features: ['10x Optical Zoom', '24MP Sensor', 'WiFi Connectivity', 'Full HD Video'],
    specifications: {
      model: '#CAM2000',
      type: 'DSLR Camera',
      material: 'Metal & Plastic',
      warranty: '2 years',
      weight: '500g'
    }
  },
  {
    id: 2,
    name: 'GoPro HERO6 4K Action Camera - Black',
    price: 449.00,
    oldPrice: 599.00,
    rating: 4.8,
    reviews: 89,
    orders: 342,
    image: productImg2,
    category: 'Electronics',
    brand: 'GoPro',
    inStock: true,
    description: 'Capture stunning 4K video and 12MP photos with this waterproof action camera. Perfect for adventure and sports.',
    features: ['4K Video', 'Waterproof', 'Voice Control', 'Image Stabilization'],
    specifications: {
      model: '#HERO6',
      type: 'Action Camera',
      material: 'Durable Plastic',
      warranty: '1 year',
      weight: '117g'
    }
  },
  {
    id: 3,
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    oldPrice: null,
    rating: 4.3,
    reviews: 156,
    orders: 523,
    image: productImg3,
    category: 'Electronics',
    brand: 'Sony',
    inStock: true,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    features: ['Noise Cancellation', '30hr Battery', 'Bluetooth 5.0', 'Foldable Design'],
    specifications: {
      model: '#WH1000',
      type: 'Over-ear Headphones',
      material: 'Plastic & Foam',
      warranty: '1 year',
      weight: '254g'
    }
  },
  {
    id: 4,
    name: 'Smart Watch Series 6',
    price: 399.00,
    oldPrice: 499.00,
    rating: 4.6,
    reviews: 234,
    orders: 678,
    image: productImg4,
    category: 'Electronics',
    brand: 'Apple',
    inStock: true,
    description: 'Advanced smartwatch with health monitoring, GPS, and cellular connectivity.',
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Always-On Display'],
    specifications: {
      model: '#SW6',
      type: 'Smartwatch',
      material: 'Aluminum',
      warranty: '1 year',
      weight: '36g'
    }
  },
  {
    id: 5,
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    oldPrice: null,
    rating: 4.4,
    reviews: 98,
    orders: 287,
    image: productImg5,
    category: 'Electronics',
    brand: 'JBL',
    inStock: true,
    description: 'Waterproof portable speaker with 12-hour battery life and powerful bass.',
    features: ['Waterproof', '12hr Battery', 'Wireless', 'Compact Design'],
    specifications: {
      model: '#FLIP5',
      type: 'Bluetooth Speaker',
      material: 'Rubber & Plastic',
      warranty: '1 year',
      weight: '540g'
    }
  },
  {
    id: 6,
    name: 'Gaming Mouse RGB',
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.7,
    reviews: 445,
    orders: 892,
    image: productImg6,
    category: 'Electronics',
    brand: 'Logitech',
    inStock: true,
    description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
    features: ['16000 DPI', 'RGB Lighting', '8 Programmable Buttons', 'Ergonomic Design'],
    specifications: {
      model: '#G502',
      type: 'Gaming Mouse',
      material: 'Plastic',
      warranty: '2 years',
      weight: '121g'
    }
  },
  {
    id: 7,
    name: 'Mechanical Keyboard RGB',
    price: 129.99,
    oldPrice: 159.99,
    rating: 4.8,
    reviews: 567,
    orders: 1023,
    image: productImg7,
    category: 'Electronics',
    brand: 'Corsair',
    inStock: true,
    description: 'Premium mechanical keyboard with Cherry MX switches and per-key RGB lighting.',
    features: ['Cherry MX Switches', 'RGB Lighting', 'Aluminum Frame', 'Programmable Keys'],
    specifications: {
      model: '#K95',
      type: 'Mechanical Keyboard',
      material: 'Aluminum & Plastic',
      warranty: '2 years',
      weight: '1200g'
    }
  },
  {
    id: 8,
    name: 'Wireless Earbuds Pro',
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.5,
    reviews: 789,
    orders: 1456,
    image: productImg8,
    category: 'Electronics',
    brand: 'Samsung',
    inStock: true,
    description: 'True wireless earbuds with active noise cancellation and premium sound quality.',
    features: ['ANC', 'Wireless Charging', '8hr Battery', 'IPX7 Waterproof'],
    specifications: {
      model: '#BUDS2PRO',
      type: 'Wireless Earbuds',
      material: 'Plastic',
      warranty: '1 year',
      weight: '5g per earbud'
    }
  },
  {
    id: 9,
    name: 'Laptop Stand Aluminum',
    price: 39.99,
    oldPrice: null,
    rating: 4.6,
    reviews: 234,
    orders: 567,
    image: productImg1,
    category: 'Accessories',
    brand: 'Generic',
    inStock: true,
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle.',
    features: ['Adjustable Height', 'Aluminum Build', 'Cable Management', 'Non-slip Base'],
    specifications: {
      model: '#LS100',
      type: 'Laptop Stand',
      material: 'Aluminum',
      warranty: '1 year',
      weight: '800g'
    }
  },
  {
    id: 10,
    name: 'USB-C Hub 7-in-1',
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.4,
    reviews: 345,
    orders: 678,
    image: productImg2,
    category: 'Accessories',
    brand: 'Anker',
    inStock: true,
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
    features: ['7 Ports', 'HDMI 4K', 'USB 3.0', 'Power Delivery'],
    specifications: {
      model: '#HUB7',
      type: 'USB Hub',
      material: 'Aluminum',
      warranty: '18 months',
      weight: '100g'
    }
  }
]

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category)
}

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  )
}
