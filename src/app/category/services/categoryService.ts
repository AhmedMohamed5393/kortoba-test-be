import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { logger } from "../../shared/logger";
import { Repository } from "typeorm";
import { Category } from "../models/entities/category.model";
import { ICategoryService } from "../models/interfaces/classes/ICategoryService";
import { ICreateCategoryRequest } from "../models/interfaces/requests/ICreateCategoryRequest";
import { IUpdateCategoryRequest } from "../models/interfaces/requests/IUpdateCategoryRequest";
import { IGetAllCategoriesRequest } from "../models/interfaces/requests/IGetAllCategoriesRequest";
const tag = "movies-dashboard-be:category:categoryServices";
@Injectable()
export class CategoryServices implements ICategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}
    public async getCategories(query: IGetAllCategoriesRequest): Promise<Category[]> {
        try {
            return await this.categoryRepository.find({ order: { id: "DESC" }, take: query.size, skip: query.index });
        } catch (error) {
            const getCategoriesErrorMessage = { tag: tag + ":getCategories", message: "There is an error while getting all categories", error, status: 500 };
            logger(getCategoriesErrorMessage);
        }
    }
    public async countCategories(): Promise<number> {
        try {
            return await this.categoryRepository.count();
        } catch (error) {
            const countCategoriesErrorMessage = { tag: tag + ":countCategories", message: "There is an error while counting all categories", error, status: 500 };
            logger(countCategoriesErrorMessage);
        }
    }
    public async getCategory(id: number): Promise<Category> {
        try {
            return await this.categoryRepository.findOneBy({ id });
        } catch (error) {
            const getCategoryErrorMessage = { tag: tag + ":getCategory", message: "There is an error while getting category by id", error, status: 500 };
            logger(getCategoryErrorMessage);
        }
    }
    public async createCategory(store: ICreateCategoryRequest): Promise<Category> {
        try {
            return await this.categoryRepository.save(store);
        } catch (error) {
            const createCategoryErrorMessage = { tag: tag + ":createCategory", message: "There is an error while creating category", error, status: 500 };
            logger(createCategoryErrorMessage);
        }
    }
    public async updateCategory(category: IUpdateCategoryRequest): Promise<any> {
        try {
            return await this.categoryRepository.update(category.id, category);
        } catch (error) {
            const updateCategoryErrorMessage = { tag: tag + ":updateCategory", message: "There is an error while updating category", error, status: 500 };
            logger(updateCategoryErrorMessage);
        }
    }
    public async deleteCategory(id: number): Promise<any> {
        try {
            return await this.categoryRepository.delete(id);
        } catch (error) {
            const deleteCategoryErrorMessage = { tag: tag + ":deleteCategory", message: "There is an error while deleting category", error, status: 500 };
            logger(deleteCategoryErrorMessage);
        }
    }
}
