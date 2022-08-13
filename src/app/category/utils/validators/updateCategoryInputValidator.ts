import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IUpdateCategoryRequest } from "../../models/interfaces/requests/IUpdateCategoryRequest";
const tag = "movies-dashboard-be:category:updateCategoryInputValidator";
export class UpdateCategoryInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: IUpdateCategoryRequest): any {
        try {
            let errorMessages: any[] = [];
            const areStrings = this.typeValidators.areStrings([{ key: "Category Title", value: input.title }]);
            const isNumber = this.typeValidators.areNumbers([{ key: "Category ID", value: input.id }]);
            errorMessages = errorMessages.concat(areStrings.errorMessages, isNumber.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}