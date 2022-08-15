import { NextFunction, Request, Response } from "express";
export interface IService {
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<any>;
    getProductById(req: Request, res: Response, next: NextFunction): Promise<any>;
    createProduct(req: Request, res: Response, next: NextFunction): Promise<any>;
    updateProduct(req: Request, res: Response, next: NextFunction): Promise<any>;
    deleteProduct(req: Request, res: Response, next: NextFunction): Promise<any>;
}
