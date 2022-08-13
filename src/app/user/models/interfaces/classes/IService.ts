import { Request, Response, NextFunction } from "express";
export interface IService {
    register(req: Request, res: Response, next: NextFunction): Promise<any>;
    login(req: Request, res: Response, next: NextFunction): Promise<any>;
}
