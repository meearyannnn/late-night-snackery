import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetails } from '@/components/ProductDetails';
import { Cart } from '@/components/Cart';
import { OrderConfirmationModal } from '@/components/OrderConfirmationModal';
import { PaymentModal } from '@/components/PaymentModal';
import { Toast } from '@/components/Toast';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { CategoryFilter } from '@/components/CategoryFilter';
import { HeroSection } from '@/components/HeroSection';

// Mock product data
const productsData = [
  { 
    id: 1, 
    name: 'Maggi Masala Noodles', 
    price: 20, 
    description: '2-minute instant noodles, a classic Indian snack. Perfect for late-night cravings with authentic masala flavor.', 
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/11/363457980/JT/YE/VI/158100183/maggi-1-500x500.jpg', 
    category: 'Noodles',
    rating: 4.5,
    time: '2 mins'
  },
  { 
    id: 2, 
    name: 'Kurkure Masala Munch', 
    price: 10, 
    description: 'Crunchy, spicy corn puffs perfect for munching. Essential for any movie night with friends.', 
    image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/vfxj7wbbqpw3fitccckr', 
    category: 'Chips',
    rating: 4.2,
    time: 'Ready to eat'
  },
  { 
    id: 3, 
    name: 'Lays Classic Salted Chips', 
    price: 20, 
    description: 'Thinly sliced potatoes, perfectly salted for a timeless snacking experience. A must-have for chip lovers.', 
    image: 'https://m.media-amazon.com/images/I/61e+UwnsWwL._SX679_.jpg', 
    category: 'Chips',
    rating: 4.3,
    time: 'Ready to eat'
  },
  { 
    id: 4, 
    name: 'Parle Monaco Biscuits', 
    price: 10, 
    description: 'Light, salted crackers great with tea or as a quick bite. A crispy snack for any time of the day.', 
    image: 'https://media.starquik.com/catalog/product/SQ107883.jpg', 
    category: 'Biscuits',
    rating: 4.1,
    time: 'Ready to eat'
  },
  { 
    id: 5, 
    name: 'Bingo Tedhe Medhe', 
    price: 10, 
    description: 'Fun, twisted crunchy sticks with tangy masala flavor. A playful snack that will spice up your evening.', 
    image: 'https://m.media-amazon.com/images/I/71e9pUGU4tL.jpg', 
    category: 'Snacks',
    rating: 4.4,
    time: 'Ready to eat'
  },
  { 
    id: 6, 
    name: 'Haldiram Aloo Bhujia', 
    price: 35, 
    description: 'Spicy and crunchy potato snack, an authentic Indian treat. Savory mixture of potato and gram flour.', 
    image: 'https://images-cdn.ubuy.co.in/670b8b4c6b8b4e2235273807-haldirams-aloo-bhujia-1kg.jpg', 
    category: 'Snacks',
    rating: 4.6,
    time: 'Ready to eat'
  },
  { 
    id: 7, 
    name: 'Haldiram Moong Dal', 
    price: 35, 
    description: 'Crispy fried moong lentils, a popular and healthy snack. Great protein-rich option for a light munch.', 
    image: 'https://www.haridwarmart.com/wp-content/uploads/2021/01/haridwar-mart-haldiram-moong-dal.png', 
    category: 'Snacks',
    rating: 4.3,
    time: 'Ready to eat'
  },
  { 
    id: 8, 
    name: 'Banana Chips (Salted)', 
    price: 50, 
    description: 'Crispy salted banana chips made from raw bananas. A unique and delicious alternative to potato chips.', 
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR6-zfkeutv2PsBQ9IN3olfIOX8g7s01d1kNvWoMmXcrwJO-4CeJN8I5VgWofsKw9JMXVfJzCuwcSUcIP7eimoKcj4iuQsdiIm-hLZjiIZQ-NA2g3pjzxP7mg', 
    category: 'Chips',
    rating: 4.0,
    time: 'Ready to eat'
  },
];

const categories = ['All', 'Noodles', 'Chips', 'Biscuits', 'Snacks'];

type Product = typeof productsData[0];
type CartItem = Product & { quantity: number };

type CurrentPage = 'home' | 'product' | 'cart';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    setToast({ message: `${product.name} added to cart!`, type: 'success' });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    setToast({ message: 'Item removed from cart', type: 'success' });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    setShowOrderModal(true);
  };

  const handleConfirmOrder = (details: { hostelName: string; roomNo: string; phoneNo: string }) => {
    setShowOrderModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setShowPaymentModal(false);
    setCurrentPage('home');
    setToast({ message: 'Order placed successfully! 🎉', type: 'success' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main className="min-h-screen">
            <HeroSection />
            <div className="container mx-auto px-4 py-8">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={handleProductClick}
                        onAddToCart={handleAddToCart}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                        No snacks found
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or category filter
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        );
      
      case 'product':
        return selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setCurrentPage('home')}
            onAddToCart={handleAddToCart}
          />
        ) : null;
      
      case 'cart':
        return (
          <Cart
            cart={cart}
            onBack={() => setCurrentPage('home')}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onPlaceOrder={handlePlaceOrder}
            totalPrice={totalPrice}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={() => setCurrentPage('cart')}
        onLogoClick={() => setCurrentPage('home')}
        cartItemCount={totalItems}
      />
      
      {renderContent()}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showOrderModal && (
        <OrderConfirmationModal
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowOrderModal(false)}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          totalPrice={totalPrice}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default Index;