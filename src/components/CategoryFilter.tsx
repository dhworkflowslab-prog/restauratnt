interface CategoryFilterProps {
  categories: { id: string; icon: string; label: string }[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

const CategoryIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "burger":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h18M3 11c0-4 4-7 9-7s9 3 9 7M5 11v2c0 1 0 2 1 3h12c1-1 1-2 1-3v-2M4 16h16l1 2H3l1-2Z" />
          <circle cx="8" cy="13" r="0.5" fill="currentColor" />
          <circle cx="12" cy="13" r="0.5" fill="currentColor" />
          <circle cx="16" cy="13" r="0.5" fill="currentColor" />
        </svg>
      );
    case "drink":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2h8l-1 10H9L8 2Z" />
          <path d="M12 12v4" />
          <path d="M8 20h8" />
          <path d="M10 16h4" />
        </svg>
      );
    case "icecream":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 0 0-5 5c0 1 .3 2 1 3h8c.7-1 1-2 1-3a5 5 0 0 0-5-5Z" />
          <path d="M8 10l4 12 4-12" />
        </svg>
      );
    case "noodles":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16" />
          <path d="M4 12c0 4 3.6 8 8 8s8-4 8-8" />
          <path d="M7 12V6" />
          <path d="M11 12V4" />
          <path d="M15 12V6" />
          <path d="M19 12V8" />
        </svg>
      );
    default:
      return null;
  }
};

const CategoryFilter = ({ categories, activeCategory, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex items-center gap-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
            activeCategory === cat.id
              ? "bg-foreground text-background"
              : "bg-secondary text-muted-foreground"
          }`}
          aria-label={cat.label}
        >
          <CategoryIcon type={cat.icon} className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
