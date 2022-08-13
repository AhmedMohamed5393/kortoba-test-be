import { logger } from "../../shared/logger";
import { IMoviePayloadRequest } from "../models/interfaces/requests/IMoviePayloadRequest";
import { IGetMovie } from "../models/interfaces/responses/IGetMovie";
import { Movie } from "../models/entities/movie.model";
const tag = "movie-dashboard:movie:movieMapper";
export class MovieMapper {
    public updateMovieMapper(req: any): IMoviePayloadRequest {
        try {
            let payload = {} as IMoviePayloadRequest;
            const request = req;
            delete request.id;
            delete request.title;
            delete request.description;
            delete request.category;
            if (!!req.id) payload["id"] = req.id;
            if (!!req.originalname) payload["image"] = req.originalname;
            if (!!req.title) payload["title"] = req.title;
            if (!!req.description) payload["description"] = req.description;
            if (!!req.category) payload["category"] = req.category;
            return payload;
        } catch (error) {
            const updateMovieMapperErrorMessage = { tag: tag + ":updateMovieMapper", message: "There is an error while getting mapped movie to create it", error, status: 500 };
            logger(updateMovieMapperErrorMessage);
        }
    }
    public createMovieMapper(req: any): IMoviePayloadRequest {
        try {
            const request = req;
            delete request.id;
            delete request.title;
            delete request.description;
            delete request.category;
            return { title: req.title, description: req.description, category: req.category, image: req.originalname };
        } catch (error) {
            const createMovieMapperErrorMessage = { tag: tag + ":createMovieMapper", message: "There is an error while getting mapped movie to create it", error, status: 500 };
            logger(createMovieMapperErrorMessage);
        }
    }
    public getMoviesMapper(movies: Movie[], selectedRate?: number): IGetMovie[] {
        try {
            let response: IGetMovie[] = [];
            for (const movie of movies) {
                const rates = movie.rate?.map((r) => { return r.value });
                const rate = rates?.reduce((partialSum, a) => partialSum + a, 0) / rates?.length;
                response.push({ id: movie.id, category: movie.category.title, title: movie.title, description: movie.description, image: movie.image, rate });
            }
            if (selectedRate) response = response.filter((movie) => movie.rate === selectedRate);
            return response;
        } catch (error) {
            const getMoviesMapperErrorMessage = { tag: tag + ":getMoviesMapper", message: "There is an error while getting mapped movies", error, status: 500 };
            logger(getMoviesMapperErrorMessage);
        }
    }
}