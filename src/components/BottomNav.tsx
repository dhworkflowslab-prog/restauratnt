import { Home } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-foreground text-background rounded-full px-6 py-3 flex items-center gap-3 shadow-lg">
        <Home className="w-5 h-5" fill="currentColor" />
        <span className="font-medium text-sm">Home</span>
      </div>
    </div>
  );
};

export default BottomNav;
