interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`category-btn ${activeCategory === category ? 'active' : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};