export interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  thumbnail: string;
  timestamp?: string;
  location?: string;
} // دا اوبجكت ولما نعمل Product[] كدا معناه هنرجع Array of this objects
