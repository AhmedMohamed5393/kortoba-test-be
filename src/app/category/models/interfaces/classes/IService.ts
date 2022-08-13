import { NextFunction, Request, Response } from "express";
export interface IService {
    getAllCategories(req: Request, res: Response, next: NextFunction): Promise<any>;
    getCategoryById(req: Request, res: Response, next: NextFunction): Promise<any>;
    createCategory(req: Request, res: Response, next: NextFunction): Promise<any>;
    updateCategory(req: Request, res: Response, next: NextFunction): Promise<any>;
    deleteCategory(req: Request, res: Response, next: NextFunction): Promise<any>;
}
