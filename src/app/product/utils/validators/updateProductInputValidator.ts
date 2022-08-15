import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IUpdateProductRequest } from "../../models/interfaces/requests/IUpdateProductRequest";
const tag = "kortoba-test-be:store:updateProductInputValidator";
export class UpdateProductInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: IUpdateProductRequest): any {
        try {
            let errorMessages: any[] = [];
            const numbersToValidate = [{ key: "Product ID", value: input.id }];
            if (input.price) numbersToValidate.push({ key: "Product Price", value: input.price });
            const areNumbers = this.typeValidators.areNumbers(numbersToValidate);
            const stringsToValidate = [];
            if (input.title) stringsToValidate.push({ key: "Product Title", value: input.title });
            const isString = this.typeValidators.areStrings(stringsToValidate);
            const filesToValidate = [];
            if (input.image) filesToValidate.push(input.image);
            const isFile = this.typeValidators.areFiles(filesToValidate, "image");
            errorMessages = errorMessages.concat(isString.errorMessages, areNumbers.errorMessages, isFile.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}