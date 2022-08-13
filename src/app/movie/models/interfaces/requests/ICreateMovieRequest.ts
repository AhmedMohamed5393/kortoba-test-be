export interface ICreateMovieRequest {
    title: string;
    description?: string;
    image: Express.Multer.File;
    category: number;
}
