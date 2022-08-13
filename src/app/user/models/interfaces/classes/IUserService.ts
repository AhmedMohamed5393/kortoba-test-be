import { User } from "../../entities/user.model";
import { ILoginRequest } from "../requests/ILoginRequest";
import { IRegisterUserRequest } from "../requests/IRegisterUserRequest";
export interface IUserService {
    register(userData: IRegisterUserRequest): Promise<User>;
    getUser(userData: ILoginRequest): Promise<User>;
}
