import { NextFunction, Request, Response } from "express";
export interface IService {
    updateRate(req: Request, res: Response, next: NextFunction): Promise<any>;
}
