import { Plus, Star, Clock } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick, onAddToCart }: ProductCardProps) => {
  return (
    <div 
      className="product-card group"
      onClick={() => onProductClick(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            <span>{product.time}</span>
          </div>
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full btn-success flex items-center justify-center gap-2 relative overflow-hidden group/btn"
        >
          <Plus className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-90" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};