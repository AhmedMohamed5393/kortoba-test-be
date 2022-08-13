import { NextFunction, Request, Response } from "express";
export interface IService {
    getAllMovies(query, res: Response, next: NextFunction): Promise<any>;
    getMovieById(req: Request, res: Response, next: NextFunction): Promise<any>;
    createMovie(req: any, res: Response, next: NextFunction): Promise<any>;
    updateMovie(req: any, res: Response, next: NextFunction): Promise<any>;
    deleteMovie(req: Request, res: Response, next: NextFunction): Promise<any>;
}
