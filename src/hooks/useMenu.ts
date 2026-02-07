import { useState, useEffect } from "react";

const MENU_API = "https://n8n.srv1302157.hstgr.cloud/webhook/menu";

export interface MenuItem {
  food_item: string;
  status: string;
}

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(MENU_API);
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data: MenuItem[] = await res.json();
        setMenuItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return { menuItems, loading, error };
};
