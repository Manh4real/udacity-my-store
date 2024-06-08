export interface Product {
  [index: string]: number | string;

  product_id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
  quantity: number;
}
