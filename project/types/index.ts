export interface FoodItem {
  id: string;
  name: string;
  fileName: string;
  description: string;
  price: number;
  slug: string;
  countInStock: number;
  categoryId: number;
  image?: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | number; // ✅ support both local and remote images
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  items: {
    name: string;
    quantity: number;
  }[];
  total: number;
}
