import { Controller, Delete, Get, Inject, Next, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBody, ApiCookieAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiParam, ApiQuery, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Request, Response, NextFunction } from "express";
import { Roles } from "../shared/decorators/role.decorator";
import { UserRole } from "../shared/enums/roles.enum";
import { AuthGuard } from "../shared/guards/auth.guard";
import { RolesGuard } from "../shared/guards/role.guard";
import { logger } from "../shared/logger";
import { IService } from "./models/interfaces/classes/IService";
import { ICategoryService } from "./models/interfaces/classes/ICategoryService";
import { IGetAllCategoriesRequest } from "./models/interfaces/requests/IGetAllCategoriesRequest";
import { CategoryServices } from "./services/categoryService";
const tag = "movies-dashboard-be:category:categoryService";
@Controller("/api/category")
@UseGuards(AuthGuard, RolesGuard)
export class CategoryService implements IService {
    constructor (@Inject(CategoryServices) private readonly categoryService: ICategoryService) {}
    @ApiCookieAuth("token")
    @ApiQuery({ type: "string", name: "size", example: "15", required: false })
    @ApiQuery({ type: "string", name: "index", example: "1", required: false })
    @ApiOkResponse({ status: 200, description: "Categories are fetched successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't get all categories" })
    @Roles(UserRole.admin, UserRole.guest)
    @Get("/")
    public async getAllCategories(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const size = (Number(req.query.size) > 10 ? 10 : Number(req.query.size)) || 10;
            const index = (Number(req.query.index) - 1) * size || 0;
            const query: IGetAllCategoriesRequest = { size, index };
            const categories = await this.categoryService.getCategories(query);
            const total = await this.categoryService.countCategories();
            const data = { total, limit: size, offset: index, categories };
            return res.status(200).json({ bit: "success", message: "Categories are fetched successfully", data });
        } catch (error) {
            const getAllCategoriesErrorMessage = { tag: tag + ":getAllCategories", message: "There is an error while getting all categories", error, status: 500 };
            logger(getAllCategoriesErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't get all categories" });
        }
    }
    @ApiCookieAuth("token")
    @ApiParam({ type: "string", name: "id", example: "1", required: true })
    @ApiOkResponse({ status: 200, description: "Category is fetched successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't get category by its id" })
    @Roles(UserRole.admin, UserRole.guest)
    @Get("/:id")
    public async getCategoryById(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const data = await this.categoryService.getCategory(id);
            return res.status(200).json({ bit: "success", message: "Category is fetched successfully", data });
        } catch (error) {
            const getCategoryByIdErrorMessage = { tag: tag + ":getCategoryById", message: "There is an error while getting category by its id", error, status: 500 };
            logger(getCategoryByIdErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't get category by its id" });
        }
    }
    @ApiCookieAuth("token")
    @ApiBody({
        schema: {
            type: "object",
            properties: { title: { type: "string" } },
            example: { title: "Action" },
        },
        required: true,
    })
    @ApiCreatedResponse({ status: 201, description: "Category is created successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't create this category" })
    @Roles(UserRole.admin)
    @Post("/")
    public async createCategory(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const category = await this.categoryService.createCategory(req.body);
            return res.status(201).json({ bit: "success", message: "Category is created successfully", category });
        } catch (error) {
            const createCategoryErrorMessage = { tag: tag + ":createCategory", message: "There is an error while creating category", error, status: 500 };
            logger(createCategoryErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't create this category" });
        }
    }
    @ApiCookieAuth("token")
    @ApiBody({
        schema: {
            type: "object",
            properties: { id: { type: "number" }, title: { type: "string" } },
            example: { id: 1, title: "Action" },
        },
        required: true,
    })
    @ApiCreatedResponse({ status: 200, description: "Category is updated successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't update this category" })
    @Roles(UserRole.admin)
    @Put("/")
    public async updateCategory(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            await this.categoryService.updateCategory(req.body);
            return res.status(200).json({ bit: "success", message: "Category is updated successfully" });
        } catch (error) {
            const updateCategoryErrorMessage = { tag: tag + ":updateCategory", message: "There is an error while updating category", error, status: 500 };
            logger(updateCategoryErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't update this category" });
        }
    }
    @ApiCookieAuth("token")
    @ApiParam({ type: "string", name: "id", example: "1", required: true })
    @ApiCreatedResponse({ status: 200, description: "Category is deleted successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't delete this category" })
    @Roles(UserRole.admin)
    @Delete("/:id")
    public async deleteCategory(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.categoryService.deleteCategory(id);
            return res.status(200).json({ bit: "success", message: "Category is deleted successfully" });
        } catch (error) {
            const deleteCategoryErrorMessage = { tag: tag + ":deleteCategory", message: "There is an error while deleting category", error, status: 500 };
            logger(deleteCategoryErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't delete this category" });
        }
    }
}
