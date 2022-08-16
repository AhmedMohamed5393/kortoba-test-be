import { Product } from "../../entities/product.model";
import { IGetAllProductsRequest } from "../requests/IGetAllProductsRequest";
export interface IProductService {
    getProducts(query: IGetAllProductsRequest): Promise<Product[]>;
    getProduct(id: number): Promise<Product>;
    createProduct(product: any): Promise<Product>;
    updateProduct(product: any): Promise<any>;
    deleteProduct(id: number): Promise<any>;
}
