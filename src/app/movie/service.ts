import { Controller, Delete, Get, Inject, Next, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiCookieAuth, ApiQuery, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiParam, ApiBody, ApiCreatedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request, Response, NextFunction } from "express";
import { Roles } from "../shared/decorators/role.decorator";
import { UserRole } from "../shared/enums/roles.enum";
import { FileExtender } from "./utils/fileExtender";
import { AuthGuard } from "../shared/guards/auth.guard";
import { RolesGuard } from "../shared/guards/role.guard";
import { logger } from "../shared/logger";
import { IMovieService } from "./models/interfaces/classes/IMovieService";
import { IService } from "./models/interfaces/classes/IService";
import { IGetAllMoviesRequest } from "./models/interfaces/requests/IGetAllMoviesRequest";
import { MovieServices } from "./services/movieService";
import { MovieMapper } from "./mappers/movieMapper";
const tag = "movies-dashboard-be:movie:movieService";
@Controller("/api/movie")
@UseGuards(AuthGuard, RolesGuard)
export class MovieService implements IService {
    private movieMapper: MovieMapper;
    constructor (@Inject(MovieServices) private readonly movieService: IMovieService) {
        this.movieMapper = new MovieMapper();
    }
    @ApiCookieAuth("token")
    @ApiQuery({ type: "string", name: "size", example: "15", required: false })
    @ApiQuery({ type: "string", name: "index", example: "1", required: false })
    @ApiQuery({ type: "string", name: "rate", example: "5", required: false })
    @ApiQuery({ type: "string", name: "title", example: "Through the window", required: false })
    @ApiQuery({ type: "string", name: "categoryId", example: "1", required: false })
    @ApiOkResponse({ status: 200, description: "Movies are fetched successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't get all movies" })
    @Roles(UserRole.admin, UserRole.guest)
    @Get("/")
    public async getAllMovies(@Query() query, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const limit = (Number(query["size"]) > 10 ? 10 : Number(query["size"])) || 10;
            const offset = (Number(query["index"]) - 1) * limit || 0;
            const queryRequest: IGetAllMoviesRequest = { limit, offset, categoryId: query["categoryId"], title: query["title"], rate: query["rate"] };
            const filteredMovies = await this.movieService.getMovies(queryRequest);
            const movies = this.movieMapper.getMoviesMapper(filteredMovies, queryRequest.rate);
            const data = { total: movies.length, limit, offset, movies };
            return res.status(200).json({ bit: "success", message: "Movies are fetched successfully", data });
        } catch (error) {
            const getAllMoviesErrorMessage = { tag: tag + ":getAllMovies", message: "There is an error while getting all movies", error, status: 500 };
            logger(getAllMoviesErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't get all movies" });
        }
    }
    @ApiCookieAuth("token")
    @ApiParam({ type: "string", name: "id", example: "1", required: true })
    @ApiOkResponse({ status: 200, description: "Movie is fetched successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't get movie by its id" })
    @Roles(UserRole.admin, UserRole.guest)
    @Get("/:id")
    public async getMovieById(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const movieById = await this.movieService.getMovie(id);
            const mappedMovies = this.movieMapper.getMoviesMapper([movieById]);
            return res.status(200).json({ bit: "success", message: "Movie is fetched successfully", data: mappedMovies[0] });
        } catch (error) {
            const getMovieByIdErrorMessage = { tag: tag + ":getMovieById", message: "There is an error while getting the movie by id", error, status: 500 };
            logger(getMovieByIdErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't get the movie by id" });
        }
    }
    @ApiCookieAuth("token")
    @ApiBody({
        schema: {
            type: "object",
            properties: { title: { type: "string" }, category: { type: "number" }, description: { type: "string" }, image: { type: "string", format: "binary" } },
            example: { title: "Through the window", category: 1, description: "", rate: 5 },
        },
    })
    @ApiCreatedResponse({ status: 201, description: "Movie is created successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't create this movie" })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileExtender)
    @UseInterceptors(FileInterceptor('image'))
    @Roles(UserRole.admin)
    @Post("/")
    public async createMovie(@UploadedFile() req: any, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const payload = this.movieMapper.createMovieMapper(req);
            const movie = await this.movieService.createMovie(payload);
            return res.status(200).json({ bit: "success", message: "Movie are created successfully", movie });
        } catch (error) {
            const createMovieErrorMessage = { tag: tag + ":createMovie", message: "There is an error while creating movie", error, status: 500 };
            logger(createMovieErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't create movie" });
        }
    }
    @ApiCookieAuth("token")
    @ApiBody({
        schema: {
            type: "object",
            properties: { id: { type: "number" }, title: { type: "string" }, category: { type: "number" }, description: { type: "string" }, image: { type: "string", format: "binary" } },
            example: { id: 1, title: "Through the window", category: 1, description: "", rate: 5 },
        },
    })
    @ApiCreatedResponse({ status: 200, description: "Movie is updated successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't update this movie" })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileExtender)
    @UseInterceptors(FileInterceptor('image'))
    @Roles(UserRole.admin)
    @Put("/")
    public async updateMovie(@UploadedFile() req: any, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const payload = this.movieMapper.updateMovieMapper(req);
            await this.movieService.updateMovie(payload);
            return res.status(200).json({ bit: "success", message: "Movie are updated successfully" });
        } catch (error) {
            const updateMovieErrorMessage = { tag: tag + ":updateMovie", message: "There is an error while updating movie", error, status: 500 };
            logger(updateMovieErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't update movie" });
        }
    }
    @ApiCookieAuth("token")
    @ApiParam({ type: "string", name: "id", example: "1", required: true })
    @ApiCreatedResponse({ status: 200, description: "Movie is deleted successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't delete this movie" })
    @Roles(UserRole.admin)
    @Delete("/:id")
    public async deleteMovie(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.movieService.deleteMovie(id);
            return res.status(200).json({ bit: "success", message: "Movie are deleted successfully" });
        } catch (error) {
            const deleteMovieErrorMessage = { tag: tag + ":deleteMovie", message: "There is an error while deleting movie", error, status: 500 };
            logger(deleteMovieErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't delete movie" });
        }
    }
}
