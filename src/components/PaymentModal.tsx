import { useState } from 'react';
import { X, CreditCard, Smartphone, Banknote, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  totalPrice: number;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export const PaymentModal = ({ totalPrice, onPaymentSuccess, onCancel }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const finalAmount = Math.round(totalPrice * 1.05); // Including GST

  const paymentMethods = [
    {
      id: 'upi' as const,
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay using UPI apps',
      popular: true
    },
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'cod' as const,
      name: 'Cash on Delivery',
      icon: Banknote,
      description: 'Pay when you receive'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    onPaymentSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-glass max-w-lg w-full p-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Payment</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            disabled={isProcessing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Summary */}
        <div className="card-glass p-4 mb-6 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-primary">₹{finalAmount}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Including GST and delivery charges
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Choose Payment Method</h3>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                disabled={isProcessing}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                  ${selectedMethod === method.id
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border hover:border-primary/50 hover:bg-primary/2'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    selectedMethod === method.id ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{method.name}</span>
                      {method.popular && (
                        <span className="px-2 py-1 bg-accent text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{method.description}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedMethod === method.id 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300
            ${isProcessing 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'btn-hero'
            }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            <span>Pay ₹{finalAmount}</span>
          )}
        </button>

        {/* Security Notice */}
        <div className="mt-4 text-center">
          <div className="text-xs text-muted-foreground">
            🔒 Your payment is secured with 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  );
};