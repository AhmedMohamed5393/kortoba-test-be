import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { ICreateProductRequest } from "../../models/interfaces/requests/ICreateProductRequest";
const tag = "kortoba-test-be:product:createProductInputValidator";
export class CreateProductInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: ICreateProductRequest): any {
        try {
            let errorMessages: any[] = [];
            const isString = this.typeValidators.areStrings([{ key: "Product Title", value: input.title }]);
            const isNumber = this.typeValidators.areNumbers([{ key: "Product Price", value: input.price }]);
            const isFile = this.typeValidators.areFiles([input.image], "image");
            errorMessages = errorMessages.concat(isString?.errorMessages, isNumber?.errorMessages, isFile?.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}