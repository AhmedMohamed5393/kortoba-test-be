import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
const tag = "kortoba-test-be:store:getDeleteProductInputValidator";
export class GetDeleteProductInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: string): any {
        try {
            let errorMessages: any[] = [];
            const isNumber = this.typeValidators.areNumbers([{ key: "Product ID", value: Number(input) }]);
            errorMessages = errorMessages.concat(isNumber.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}