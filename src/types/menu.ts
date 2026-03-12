export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
}
