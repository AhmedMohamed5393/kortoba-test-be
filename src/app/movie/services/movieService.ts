import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { logger } from "../../shared/logger";
import { Repository } from "typeorm";
import { Movie } from "../models/entities/movie.model";
import { IMovieService } from "../models/interfaces/classes/IMovieService";
import { IGetAllMoviesRequest } from "../models/interfaces/requests/IGetAllMoviesRequest";
const tag = "movies-dashboard-be:movie:movieServices";
@Injectable()
export class MovieServices implements IMovieService {
    constructor(@InjectRepository(Movie) private readonly movieRepository: Repository<Movie>) {}
    public async getMovies(query: IGetAllMoviesRequest): Promise<Movie[]> {
        try {
            return await this.movieRepository.find({
                order: { id: "DESC" },
                take: query.limit,
                skip: query.offset,
                where: {
                    title: query.title,
                    category: query.categoryId ? { id: query.categoryId } : {},
                },
            });
        } catch (error) {
            const getMoviesErrorMessage = { tag: tag + ":getMovies", message: "There is an error while getting all movies", error, status: 500 };
            logger(getMoviesErrorMessage);
        }
    }
    public async getMovie(id: number): Promise<Movie> {
        try {
            return await this.movieRepository.findOneBy({ id });
        } catch (error) {
            const getMovieErrorMessage = { tag: tag + ":getMovie", message: "There is an error while getting movie by id", error, status: 500 };
            logger(getMovieErrorMessage);
        }
    }
    public async createMovie(movie: any): Promise<Movie> {
        try {
            return await this.movieRepository.save(movie);
        } catch (error) {
            const createMovieErrorMessage = { tag: tag + ":createMovie", message: "There is an error while creating movie", error, status: 500 };
            logger(createMovieErrorMessage);
        }
    }
    public async updateMovie(movie: any): Promise<any> {
        try {
            return await this.movieRepository.update(movie.id, movie);
        } catch (error) {
            const updateMovieErrorMessage = { tag: tag + ":updateMovie", message: "There is an error while updating movie", error, status: 500 };
            logger(updateMovieErrorMessage);
        }
    }
    public async deleteMovie(id: number): Promise<any> {
        try {
            return await this.movieRepository.delete(id);
        } catch (error) {
            const deleteMovieErrorMessage = { tag: tag + ":deleteMovie", message: "There is an error while deleting movie", error, status: 500 };
            logger(deleteMovieErrorMessage);
        }
    }
}
