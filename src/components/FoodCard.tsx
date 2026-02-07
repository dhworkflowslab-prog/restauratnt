import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import type { FoodItem } from "@/data/foodData";

interface FoodCardProps {
  item: FoodItem & { available?: boolean };
  index: number;
}

const FoodCard = ({ item, index }: FoodCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const isAvailable = item.available !== false;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAvailable) {
      toast({ title: "This item is out of stock", variant: "destructive" });
      return;
    }
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    toast({ title: `${item.name} added to cart` });
  };

  return (
    <div
      onClick={() => navigate(`/product/${item.id}`)}
      className={`bg-card rounded-2xl p-3.5 cursor-pointer active:scale-[0.97] transition-all duration-200 animate-fade-in border border-border/50 hover:border-border ${
        !isAvailable ? "opacity-50" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image container */}
      <div className="bg-background rounded-xl overflow-hidden mb-3 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-destructive text-xs font-bold">OUT OF STOCK</span>
          </div>
        )}
      </div>
      <p className="text-foreground font-medium text-sm mb-0.5">{item.name}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-foreground font-semibold text-sm">
          $ {item.price.toFixed(2)}
        </span>
        <button
          onClick={handleAdd}
          className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-background hover:opacity-90 transition-opacity"
          aria-label="Add to cart"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
