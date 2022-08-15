import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { logger } from "../../shared/logger";
import { Repository } from "typeorm";
import { User } from "../models/entities/user.model";
import { IUserService } from "../models/interfaces/classes/IUserService";
import { ILoginRequest } from "../models/interfaces/requests/ILoginRequest";
import { IRegisterUserRequest } from "../models/interfaces/requests/IRegisterUserRequest";
const tag = "kortoba-test-be:user:userServices";
@Injectable()
export class UserServices implements IUserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    public async getUser(userData: ILoginRequest): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: [{ name: userData.name }, { email: userData.name }, { password: userData.password }] });
        } catch (error) {
            const getUserErrorMessage = { tag: tag + ":getUser", message: "There is an error while getting this user", error, status: 500 };
            logger(getUserErrorMessage);
        }
    }
    public async register(userData: IRegisterUserRequest): Promise<User> {
        try {
            return await this.userRepository.save(userData);
        } catch (error) {
            const registerErrorMessage = { tag: tag + ":register", message: "There is an error while registering user", error, status: 500 };
            logger(registerErrorMessage);
        }
    }
}
