import { Category } from "../../entities/category.model";
import { ICreateCategoryRequest } from "../requests/ICreateCategoryRequest";
import { IGetAllCategoriesRequest } from "../requests/IGetAllCategoriesRequest";
import { IUpdateCategoryRequest } from "../requests/IUpdateCategoryRequest";
export interface ICategoryService {
    getCategories(query: IGetAllCategoriesRequest): Promise<Category[]>;
    countCategories(): Promise<number>;
    getCategory(id: number): Promise<Category>;
    createCategory(Category: ICreateCategoryRequest): Promise<Category>;
    updateCategory(Category: IUpdateCategoryRequest): Promise<Category>;
    deleteCategory(id: number): Promise<any>;
}
