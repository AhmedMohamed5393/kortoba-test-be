import { Controller, Inject, Next, Post, Req, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiBody, ApiOkResponse, ApiInternalServerErrorResponse, ApiConflictResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { Request, Response, NextFunction } from "express";
import { logger } from "../shared/logger";
import { UserMapper } from "./mappers/userMapper";
import { IService } from "./models/interfaces/classes/IService";
import { IUserService } from "./models/interfaces/classes/IUserService";
import { ILoginRequest } from "./models/interfaces/requests/ILoginRequest";
import { UserServices } from "./services/userService";
import * as bcrypt from "bcrypt";
import { User } from "./models/entities/user.model";
const tag = "kortoba-test-be:user:userService";
@Controller("/api/user")
export class UserService implements IService {
    private userMapper: UserMapper;
    constructor (private jwtService: JwtService, @Inject(UserServices) private readonly userService: IUserService) {
        this.userMapper = new UserMapper();
    }
    @ApiBody({
        schema: {
            type: "object",
            properties: { name: { type: "string" }, password: { type: "string" }, birthdate: { type: "string" }, email: { type: "string" } },
            example: { name: "Ahmed Mohamed", password: "hamada5393", birthdate: "1993-03-05", email: "ahmedmohamedalex93@gmail.com" }
        },
        required: true,
    })
    @ApiOkResponse({ description: "User is registered successfully" })
    @ApiConflictResponse({ description: "This user is already exists" })
    @ApiInternalServerErrorResponse({ status: 500, description: "User can't register" })
    @Post("/register")
    public async register(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const query: ILoginRequest = { name: req.body.email , password: req.body.password };
            const user = await this.userService.getUser(query);
            if (user) return res.status(409).json({ message: "This user is already exists" });
            req.body.password = await bcrypt.hash(req.body.password, 10);
            await this.userService.register(req.body);
            return res.status(201).json({ bit: "success", message: "User is registered successfully" });
        } catch (error) {
            const registerErrorMessage = { tag: tag + ":register", message: "There is an error while registering user", error, status: 500 };
            logger(registerErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't register this user" });
        }
    }
    @ApiBody({
        schema: {
            type: "object",
            properties: { name: { type: "string" }, password: { type: "string" } },
            example: { name: "Ahmed Mohamed", password: "hamada5393" }
        },
        required: true,
    })
    @ApiOkResponse({ status: 200, description: "User is logged in successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Credentials or username are incorrect" })
    @ApiForbiddenResponse({ status: 403, description: "You should logout first" })
    @ApiInternalServerErrorResponse({ status: 500, description: "User can't sign in" })
    @Post("/login")
    public async login(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            if (req.cookies.token) return res.status(403).json({ message: "You should logout first" });
            const user = await this.userService.getUser(req.body);
            let match: boolean;
            if (user) match = await bcrypt.compare(req.body.password, user.password);
            if (!user || !match) return res.status(401).json({ message: "Credentials or username are incorrect" });
            const token = this.encodeToken(user);
            return res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }).status(200).json({ message: "Logged in successfully" });
        } catch (error) {
            const loginErrorMessage = { tag: tag + ":login", message: "There is an error while logging in user", error, status: 500 };
            logger(loginErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't login this user" });
        }
    }
    private encodeToken(user: User): string {
        try {
            const payload = this.userMapper.prepareTokenPayload(user);
            return this.jwtService.sign(payload, { expiresIn: "2000s" });
        } catch (error) {
            const encodeTokenErrorMessage = { tag: tag + ":encodeToken", message: "There is an error while getting user token", error, status: 500 };
            logger(encodeTokenErrorMessage);
        }
    }
}
