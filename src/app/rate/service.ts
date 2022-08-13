import { Controller, Inject, Next, Put, Req, Res, UseGuards } from "@nestjs/common";
import { ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiBody, ApiCookieAuth } from "@nestjs/swagger";
import { Request, Response, NextFunction } from "express";
import { Roles } from "../shared/decorators/role.decorator";
import { UserRole } from "../shared/enums/roles.enum";
import { AuthGuard } from "../shared/guards/auth.guard";
import { RolesGuard } from "../shared/guards/role.guard";
import { logger } from "../shared/logger";
import { IRateService } from "./models/interfaces/classes/IRateService";
import { IService } from "./models/interfaces/classes/IService";
import { RateServices } from "./services/rateService";
const tag = "movies-dashboard-be:rate:rateService";
@Controller("/api/rate")
@UseGuards(AuthGuard, RolesGuard)
export class RateService implements IService {
    constructor (@Inject(RateServices) private readonly rateService: IRateService) {}
    @ApiCookieAuth("token")
    @ApiBody({
        schema: {
            type: "object",
            properties: { id: { type: "number" }, user: { type: "number" }, movie: { type: "number" }, value: { type: "number" } },
            example: { id: 1, user: 2, movie: 1, value: 5 },
        },
    })
    @ApiCreatedResponse({ status: 200, description: "Rate is updated successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't update this rate" })
    @Roles(UserRole.admin, UserRole.guest)
    @Put("/")
    public async updateRate(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const rates = await this.rateService.getRates(req.body);
            if (rates.length) await this.rateService.updateRate(req.body);
            else this.rateService.createRate(req.body);
            return res.status(200).json({ bit: "success", message: "Rate are updated successfully" });
        } catch (error) {
            const updateRateErrorMessage = { tag: tag + ":updateRate", message: "There is an error while updating rate", error, status: 500 };
            logger(updateRateErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't update rate" });
        }
    }
}
