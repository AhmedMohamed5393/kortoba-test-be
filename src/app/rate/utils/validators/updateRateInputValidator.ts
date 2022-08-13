import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IUpdateRateRequest } from "../../models/interfaces/requests/IUpdateRateRequest";
const tag = "movies-dashboard-be:rate:updateRateInputValidator";
export class UpdateRateInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: IUpdateRateRequest): any {
        try {
            let errorMessages: any[] = [];
            const numbersToValidate = [{ key: "Rate Value", value: input.value }];
            if (input.value > 5 || input.value < 0) errorMessages.push("Movie Rate should be in range of 0 - 5");
            if (input.id) numbersToValidate.push({ key: "Rate ID", value: input.id });
            if (input.user) numbersToValidate.push({ key: "Rate User ID", value: input.user });
            if (input.movie) numbersToValidate.push({ key: "Rate Movie ID", value: input.movie });
            const areNumbers = this.typeValidators.areNumbers(numbersToValidate);
            errorMessages = errorMessages.concat(areNumbers.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}