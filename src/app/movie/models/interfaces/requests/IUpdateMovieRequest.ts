export interface IUpdateMovieRequest {
    id: number;
    title?: string;
    description?: string;
    image?: Express.Multer.File;
    category?: number;
}
