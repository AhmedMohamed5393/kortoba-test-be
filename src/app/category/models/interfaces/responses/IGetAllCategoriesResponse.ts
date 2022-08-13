import { Category } from "../../entities/category.model";
export interface IGetAllCategoriesResponse { total: number; size: number; index: number; categories: Category[]; }
