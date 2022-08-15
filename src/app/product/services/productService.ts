import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { logger } from "../../shared/logger";
import { Repository } from "typeorm";
import { Product } from "../models/entities/product.model";
import { IProductService } from "../models/interfaces/classes/IProductService";
import { IGetAllProductsRequest } from "../models/interfaces/requests/IGetAllProductsRequest";
const tag = "kortoba-test-be:product:productServices";
@Injectable()
export class ProductServices implements IProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}
    public async getProducts(query: IGetAllProductsRequest): Promise<Product[]> {
        try {
            const where = !!query.userId ? { user: { id: query.userId } } : {};
            return await this.productRepository.find({ order: { id: "DESC" }, take: query.size, skip: query.index, where });
        } catch (error) {
            const getProductsErrorMessage = { tag: tag + ":getProducts", message: "There is an error while getting all products", error, status: 500 };
            logger(getProductsErrorMessage);
        }
    }
    public async getProduct(id: number): Promise<Product> {
        try {
            return await this.productRepository.findOneBy({ id });
        } catch (error) {
            const getProductErrorMessage = { tag: tag + ":getProduct", message: "There is an error while getting product by id", error, status: 500 };
            logger(getProductErrorMessage);
        }
    }
    public async createProduct(product: any): Promise<Product> {
        try {
            return await this.productRepository.save(product);
        } catch (error) {
            const createProductErrorMessage = { tag: tag + ":createProduct", message: "There is an error while creating product", error, status: 500 };
            logger(createProductErrorMessage);
        }
    }
    public async updateProduct(product: any): Promise<any> {
        try {
            return await this.productRepository.update(product.id, product);
        } catch (error) {
            const updateProductErrorMessage = { tag: tag + ":updateProduct", message: "There is an error while updating product", error, status: 500 };
            logger(updateProductErrorMessage);
        }
    }
    public async deleteProduct(id: number): Promise<any> {
        try {
            return await this.productRepository.delete(id);
        } catch (error) {
            const deleteProductErrorMessage = { tag: tag + ":deleteProduct", message: "There is an error while deleting product", error, status: 500 };
            logger(deleteProductErrorMessage);
        }
    }
}
