import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { ICreateMovieRequest } from "../../models/interfaces/requests/ICreateMovieRequest";
const tag = "movies-dashboard-be:movie:createMovieInputValidator";
export class CreateMovieInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: ICreateMovieRequest): any {
        try {
            let errorMessages: any[] = [];
            const inputsToValidate = [{ key: "Movie Title", value: input.title }];
            if (input.description) inputsToValidate.push({ key: "Movie Description", value: input.description });
            const areStrings = this.typeValidators.areStrings(inputsToValidate);
            const isFile = this.typeValidators.areFiles([input.image], "image");
            const isNumber = this.typeValidators.areNumbers([{ key: "Movie Category", value: input.category }]);
            errorMessages = errorMessages.concat(areStrings?.errorMessages, isNumber?.errorMessages, isFile?.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}