import { NextFunction, Request, Response } from "express";
export interface IService {
    getAllProducts(req: Request, res: Response, next: NextFunction): Promise<any>;
    getProductById(req: Request, res: Response, next: NextFunction): Promise<any>;
    createProduct(file: Express.Multer.File, body: any, req: Request, res: Response): Promise<any>;
    updateProduct(file: Express.Multer.File, body: any, req: Request, res: Response): Promise<any>;
    deleteProduct(req: Request, res: Response, next: NextFunction): Promise<any>;
}
