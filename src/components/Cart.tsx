import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onBack: () => void;
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onPlaceOrder: () => void;
  totalPrice: number;
}

export const Cart = ({ 
  cart, 
  onBack, 
  onRemoveFromCart, 
  onUpdateQuantity, 
  onPlaceOrder, 
  totalPrice 
}: CartProps) => {
  if (cart.length === 0) {
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

        {/* Empty Cart */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="card-glass p-12">
              <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any snacks yet. Let's fix that!
              </p>
              <button onClick={onBack} className="btn-hero">
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Menu</span>
            </button>
            <h1 className="text-xl font-bold">Your Cart ({cart.length} items)</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="card-glass p-6">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {item.name}
                      </h3>
                      <p className="text-primary font-bold text-lg">₹{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border-2 border-primary bg-white hover:bg-primary hover:text-white
                                 transition-colors duration-300 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border-2 border-primary bg-white hover:bg-primary hover:text-white
                                 transition-colors duration-300 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-2 text-destructive hover:bg-destructive hover:text-white rounded-lg
                               transition-colors duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="flex justify-end pt-4 border-t border-border mt-4">
                    <span className="text-lg font-bold text-primary">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-glass p-6 sticky top-32">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>GST (5%)</span>
                    <span>₹{Math.round(totalPrice * 0.05)}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{Math.round(totalPrice * 1.05)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onPlaceOrder}
                  className="w-full btn-hero text-lg py-4"
                >
                  Place Order
                </button>

                <div className="mt-4 text-xs text-muted-foreground text-center">
                  🔒 Secure payment • 💳 Multiple payment options
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};