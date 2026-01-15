import { WishlistProductI } from "./wishlistproduct";

export interface WishlistResponseI {
  status: string;
  count: number;
  data: WishlistProductI[];
}