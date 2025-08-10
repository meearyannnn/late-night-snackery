import { useState } from 'react';
import { X, MapPin, Phone, Building } from 'lucide-react';

interface OrderConfirmationModalProps {
  onConfirm: (details: { hostelName: string; roomNo: string; phoneNo: string }) => void;
  onCancel: () => void;
}

export const OrderConfirmationModal = ({ onConfirm, onCancel }: OrderConfirmationModalProps) => {
  const [hostelName, setHostelName] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const isFormValid = hostelName.trim() && roomNo.trim() && phoneNo.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onConfirm({ hostelName: hostelName.trim(), roomNo: roomNo.trim(), phoneNo: phoneNo.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-glass max-w-md w-full p-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Delivery Details</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground mb-6">
          Please provide your delivery details to complete the order.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hostel Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Hostel Name *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={hostelName}
                onChange={(e) => setHostelName(e.target.value)}
                placeholder="e.g., Hostel A, B Block"
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-white/70 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Room Number *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                placeholder="e.g., 201, A-302"
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-white/70 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-white/70 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-6 border border-border rounded-xl font-semibold
                       hover:bg-muted transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300
                ${isFormValid 
                  ? 'btn-hero' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};