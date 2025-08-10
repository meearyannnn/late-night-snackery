import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-secondary to-secondary-glow' 
    : 'bg-gradient-to-r from-destructive to-red-500';

  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl 
                      backdrop-blur-sm border border-white/20 flex items-center gap-3 min-w-[300px]`}>
        <Icon className="w-6 h-6 flex-shrink-0" />
        <span className="font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};