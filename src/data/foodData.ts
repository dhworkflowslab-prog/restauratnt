import shrimpBurger from "@/assets/shrimp-burger.png";
import crabBurger from "@/assets/crab-burger.png";
import chickenBurger from "@/assets/chicken-burger.png";
import garlicChicken from "@/assets/garlic-chicken.png";
import chickenBurgerHero from "@/assets/chicken-burger-hero.png";

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
  heroImage?: string;
  rating: number;
  description: string;
  deliveryTime: string;
  category: string;
}

export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Shrimp Burger",
    price: 40.0,
    image: shrimpBurger,
    rating: 4.8,
    description:
      "A delicious shrimp burger with crispy golden shrimp, fresh lettuce, tomatoes, and our signature sauce.",
    deliveryTime: "20 mins",
    category: "burger",
  },
  {
    id: "2",
    name: "Crab Burger",
    price: 40.0,
    image: crabBurger,
    rating: 4.9,
    description:
      "A premium crab burger with charcoal bun, juicy patty, melted cheese, and crispy bacon strips.",
    deliveryTime: "25 mins",
    category: "burger",
  },
  {
    id: "3",
    name: "Chicken Burger",
    price: 40.0,
    image: chickenBurger,
    heroImage: chickenBurgerHero,
    rating: 5.0,
    description:
      "A protein-packed, fiber-rich multigrain burger with grilled chicken, fresh veggies, and creamy hummus.",
    deliveryTime: "25 mins",
    category: "burger",
  },
  {
    id: "4",
    name: "Garlic Chicken",
    price: 40.0,
    image: garlicChicken,
    rating: 4.7,
    description:
      "Crispy garlic chicken burger loaded with cheese sauce, fresh greens, and tangy pickles.",
    deliveryTime: "30 mins",
    category: "burger",
  },
];

export const categories = [
  { id: "burger", icon: "burger", label: "Burgers" },
  { id: "drink", icon: "drink", label: "Drinks" },
  { id: "icecream", icon: "icecream", label: "Ice Cream" },
  { id: "noodles", icon: "noodles", label: "Noodles" },
];
