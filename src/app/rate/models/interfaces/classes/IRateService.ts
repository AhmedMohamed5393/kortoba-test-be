import { Rate } from "../../entities/rate.model";
import { IUpdateRateRequest } from "../requests/IUpdateRateRequest";
export interface IRateService {
    getRates(rate: IUpdateRateRequest): Promise<Rate[]>;
    createRate(rate: IUpdateRateRequest): Promise<Rate>;
    updateRate(rate: IUpdateRateRequest): Promise<any>;
}
