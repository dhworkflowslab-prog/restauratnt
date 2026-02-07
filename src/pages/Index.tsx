import { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import FoodCard from "@/components/FoodCard";
import CategoryFilter from "@/components/CategoryFilter";
import BottomNav from "@/components/BottomNav";
import CartSheet from "@/components/CartSheet";
import { foodItems, categories } from "@/data/foodData";
import { useMenu } from "@/hooks/useMenu";
import { useCart } from "@/hooks/useCart";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("burger");
  const [cartOpen, setCartOpen] = useState(false);
  const { menuItems, loading } = useMenu();
  const { totalItems } = useCart();

  // Merge API food names onto existing cards (keep images/prices, replace names)
  const mergedItems = foodItems.map((item, index) => {
    const apiItem = menuItems[index];
    return {
      ...item,
      name: apiItem ? apiItem.food_item : item.name,
      available: apiItem ? apiItem.status === "Available" : true,
    };
  });

  const filteredItems = mergedItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button className="text-foreground" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCartOpen(true)}
          className="w-11 h-11 bg-foreground text-background rounded-full flex items-center justify-center relative"
          aria-label="Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-[10px] font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Heading */}
      <div className="px-5 mb-6">
        <h1 className="font-heading italic text-foreground text-3xl leading-tight">
          Fresh Flavors,
          <br />
          Every Bite!
        </h1>
      </div>

      {/* Categories */}
      <div className="px-5 mb-6">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Food Grid */}
      <div className="px-5 grid grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-3.5 animate-pulse h-56"
              />
            ))
          : filteredItems.map((item, index) => (
              <FoodCard key={item.id} item={item} index={index} />
            ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Cart Sheet */}
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
