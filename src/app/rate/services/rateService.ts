import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { logger } from "../../shared/logger";
import { Repository } from "typeorm";
import { Rate } from "../models/entities/rate.model";
import { IRateService } from "../models/interfaces/classes/IRateService";
const tag = "movies-dashboard-be:rate:rateServices";
@Injectable()
export class RateServices implements IRateService {
    constructor(@InjectRepository(Rate) private readonly rateRepository: Repository<Rate>) {}
    public async getRates(rate: any): Promise<Rate[]> {
        try {
            return await this.rateRepository.find({ where: { movie: rate.movie, user: rate.user } });
        } catch (error) {
            const getRatesErrorMessage = { tag: tag + ":getRate", message: "There is an error while getting rates", error, status: 500 };
            logger(getRatesErrorMessage);
        }
    }
    public async createRate(rate: any): Promise<Rate> {
        try {
            return await this.rateRepository.save(rate);
        } catch (error) {
            const createRateErrorMessage = { tag: tag + ":createRate", message: "There is an error while creating rate", error, status: 500 };
            logger(createRateErrorMessage);
        }
    }
    public async updateRate(rate: any): Promise<any> {
        try {
            return await this.rateRepository.update(rate.id, rate);
        } catch (error) {
            const updateRateErrorMessage = { tag: tag + ":updateRate", message: "There is an error while updating rate", error, status: 500 };
            logger(updateRateErrorMessage);
        }
    }
}
