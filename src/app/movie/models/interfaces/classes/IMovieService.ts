import { Movie } from "../../entities/movie.model";
import { IGetAllMoviesRequest } from "../requests/IGetAllMoviesRequest";
import { IMoviePayloadRequest } from "../requests/IMoviePayloadRequest";
export interface IMovieService {
    getMovies(query: IGetAllMoviesRequest): Promise<Movie[]>;
    getMovie(id: number): Promise<Movie>;
    createMovie(movie: IMoviePayloadRequest): Promise<Movie>;
    updateMovie(movie: IMoviePayloadRequest): Promise<any>;
    deleteMovie(id: number): Promise<any>;
}
