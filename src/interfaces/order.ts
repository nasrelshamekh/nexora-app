export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CartItemProduct {
  _id: string;
  title: string;
  imageCover: string;
  brand: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartItemProduct;
}

export interface Order {
  _id: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface OrdersResponse {
  status: string;
  data: Order[];
}