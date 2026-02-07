import { useState } from "react";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

const ORDER_API = "https://n8n.srv1302157.hstgr.cloud/webhook/Place-order";

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
}

const CartSheet = ({ open, onClose }: CartSheetProps) => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!customerName.trim() || !phoneNumber.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (phoneNumber.trim().length < 10) {
      toast({ title: "Enter a valid phone number", variant: "destructive" });ls
      return;
    }

    setPlacing(true);
    try {
      const orderItems = items.map((item) => ({
        customer_name: customerName.trim(),
        phone_number: phoneNumber.trim(),
        food_name: item.name,
        quantity: item.quantity,
      }));

      // Send each item as a separate order or batch
      const res = await fetch(ORDER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderItems.length === 1 ? orderItems[0] : orderItems),
      });

      if (!res.ok) throw new Error("Failed to place order");

      toast({ title: "Order placed successfully! 🎉" });
      clearCart();
      setStep("cart");
      setCustomerName("");
      setPhoneNumber("");
      onClose();
    } catch {
      toast({ title: "Failed to place order. Try again.", variant: "destructive" });
    } finally {
      setPlacing(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-card rounded-t-3xl p-5 pb-8 animate-fade-in max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading italic text-foreground text-xl font-bold">
            {step === "cart" ? "Your Cart" : "Place Order"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "cart" ? (
          <>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">Your cart is empty</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-secondary rounded-2xl p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium truncate">{item.name}</p>
                        <p className="text-accent-foreground text-sm font-bold">
                          $ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-foreground"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-foreground text-sm font-semibold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center text-background"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total + Checkout */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground text-sm">Total</span>
                  <span className="text-foreground text-xl font-bold">
                    $ {totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full bg-accent text-accent-foreground rounded-2xl py-4 font-bold text-sm tracking-wide"
                >
                  PROCEED TO CHECKOUT
                </button>
              </>
            )}
          </>
        ) : (
          /* Checkout Form */
          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground text-xs mb-1.5 block">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                maxLength={100}
                className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label className="text-muted-foreground text-xs mb-1.5 block">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                maxLength={15}
                className="w-full bg-secondary text-foreground rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-secondary rounded-2xl p-4 space-y-2">
              <p className="text-muted-foreground text-xs mb-2">Order Summary</p>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span className="text-foreground text-sm">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-foreground text-sm font-semibold">
                    $ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
                <span className="text-foreground text-sm font-bold">Total</span>
                <span className="text-foreground text-sm font-bold">$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep("cart")}
                className="flex-1 bg-secondary text-foreground rounded-2xl py-4 font-bold text-sm"
              >
                BACK
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="flex-1 bg-accent text-accent-foreground rounded-2xl py-4 font-bold text-sm tracking-wide disabled:opacity-50"
              >
                {placing ? "PLACING..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSheet;
