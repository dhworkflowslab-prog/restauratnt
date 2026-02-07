import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, MoreVertical, Heart, Plus, Clock, Star } from "lucide-react";
import { foodItems } from "@/data/foodData";
import { useMenu } from "@/hooks/useMenu";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { menuItems } = useMenu();
  const { addItem } = useCart();

  const itemIndex = foodItems.findIndex((f) => f.id === id);
  const item = foodItems[itemIndex];

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        Product not found
      </div>
    );
  }

  // Override name from API
  const apiItem = menuItems[itemIndex];
  const displayName = apiItem ? apiItem.food_item : item.name;
  const isAvailable = apiItem ? apiItem.status === "Available" : true;

  const heroImage = item.heroImage || item.image;
  const detailPrice = item.id === "3" ? 45.0 : item.price + 5;

  const handleAdd = () => {
    if (!isAvailable) {
      toast({ title: "This item is out of stock", variant: "destructive" });
      return;
    }
    addItem({ id: item.id, name: displayName, price: detailPrice, image: item.image });
    toast({ title: `${displayName} added to cart` });
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {/* Hero Image Section */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 pt-6">
          <button onClick={() => navigate(-1)} className="text-foreground" aria-label="Go back">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button className="text-foreground" aria-label="More options">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-4 right-5 z-10">
          <button
            className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg"
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-4 mt-4 rounded-3xl overflow-hidden bg-card aspect-[4/5]">
          <img src={heroImage} alt={displayName} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-6 pb-32">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-heading italic text-foreground text-2xl font-bold">{displayName}</h1>
          <div className="flex items-center gap-1.5">
            <Star className="w-5 h-5 text-star fill-star" />
            <span className="text-foreground font-semibold">{item.rating}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-6">{item.description}</p>

        {!isAvailable && (
          <div className="bg-destructive/20 text-destructive rounded-xl px-4 py-3 mb-4 text-sm font-medium text-center">
            This item is currently out of stock
          </div>
        )}

        <div className="flex items-end gap-3">
          <div className="flex-1 bg-card rounded-2xl px-4 py-4">
            <p className="text-muted-foreground text-xs mb-2">Delivery Time</p>
            <div className="flex items-center gap-1.5 text-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{item.deliveryTime}</span>
            </div>
          </div>

          <div className="flex-1 bg-accent rounded-2xl px-4 py-4">
            <p className="text-accent-foreground/70 text-xs mb-2">Price</p>
            <p className="text-accent-foreground text-xl font-bold">$ {detailPrice.toFixed(2)}</p>
          </div>

          <div className="flex flex-col items-center gap-0">
            <button
              onClick={handleAdd}
              className="w-11 h-11 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg"
              aria-label="Add to cart"
            >
              <Plus className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={handleAdd}
              className="bg-foreground text-background rounded-b-2xl px-3 py-2 flex items-center justify-center font-bold text-[10px] tracking-wider uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed", height: "72px" }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
