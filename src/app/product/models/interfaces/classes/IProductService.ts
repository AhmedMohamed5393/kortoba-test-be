import { Product } from "../../entities/product.model";
import { ICreateProductRequest } from "../requests/ICreateProductRequest";
import { IGetAllProductsRequest } from "../requests/IGetAllProductsRequest";
import { IUpdateProductRequest } from "../requests/IUpdateProductRequest";
export interface IProductService {
    getProducts(query: IGetAllProductsRequest): Promise<Product[]>;
    getProduct(id: number): Promise<Product>;
    createProduct(product: ICreateProductRequest): Promise<Product>;
    updateProduct(product: IUpdateProductRequest): Promise<any>;
    deleteProduct(id: number): Promise<any>;
}
