import { useState } from 'react';
import { ArrowLeft, Star, Clock, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  time: string;
}

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetails = ({ product, onBack, onAddToCart }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Menu</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="card-glass p-8 h-fit">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                />
                
                {/* Category Badge */}
                <div className="absolute top-12 left-12">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full font-medium text-primary border border-primary/20">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-muted-foreground">(120+ reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>{product.time}</span>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="card-glass p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                  <span className="text-muted-foreground">per pack</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-lg">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-full border-2 border-primary bg-white hover:bg-primary hover:text-white
                               transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                    
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-10 h-10 rounded-full border-2 border-primary bg-white hover:bg-primary hover:text-white
                               transition-colors duration-300 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-hero text-lg py-4 flex items-center justify-center gap-3"
                >
                  <span>Add {quantity} to Cart</span>
                  <span className="font-bold">₹{product.price * quantity}</span>
                </button>
              </div>

              {/* Features */}
              <div className="card-glass p-6">
                <h3 className="font-bold text-lg mb-4">Why you'll love it</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Fresh & Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Best Price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};