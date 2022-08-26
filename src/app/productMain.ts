import { Product } from "./product";

export interface ProductMain {
    success : boolean;
    message : string;
    data: Product;
}
