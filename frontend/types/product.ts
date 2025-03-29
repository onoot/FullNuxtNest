export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
}

export interface ProductResponse {
  products: Product[];
  total: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
} 