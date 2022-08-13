import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
const tag = "movies-dashboard-be:movie:getMovieMoviesInputValidator";
export class GetMoviesInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: any): any {
        try {
            let errorMessages: any[] = [];
            if (!!input.size || !!input.index) {
                const areNumbers = this.typeValidators.areNumbers([{ key: "Number of listed Items", value: Number(input.size) }, { key: "Page Number", value: Number(input.index) }]);
                errorMessages = errorMessages.concat(areNumbers.errorMessages);
                errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}