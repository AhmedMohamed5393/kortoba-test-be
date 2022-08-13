import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { ICreateCategoryRequest } from "../../models/interfaces/requests/ICreateCategoryRequest";
const tag = "movies-dashboard-be:category:createCategoryInputValidator";
export class CreateCategoryInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: ICreateCategoryRequest): any {
        try {
            let errorMessages: any[] = [];
            const isString = this.typeValidators.areStrings([{ key: "Category Title", value: input.title }]);
            errorMessages = errorMessages.concat(isString.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}