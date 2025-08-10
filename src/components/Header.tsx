import { Search, ShoppingCart, UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCartClick: () => void;
  onLogoClick: () => void;
  cartItemCount: number;
}

export const Header = ({ 
  searchTerm, 
  onSearchChange, 
  onCartClick, 
  onLogoClick, 
  cartItemCount 
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={onLogoClick}
            className="flex items-center gap-3 text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
          >
            <div className="p-2 bg-gradient-primary rounded-xl shadow-lg">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            SnackHub
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for delicious snacks..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-white/70 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-300 shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative p-3 rounded-full bg-white/70 backdrop-blur-sm border border-border
                     hover:bg-primary hover:text-white hover:scale-110 
                     transition-all duration-300 shadow-lg hover:shadow-glow group"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent
                             text-white text-xs font-bold min-w-[1.25rem] h-5 
                             flex items-center justify-center rounded-full px-1
                             animate-bounce-in shadow-lg">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search snacks..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-white/70 backdrop-blur-sm
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all duration-300 shadow-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};