import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IGetAllProductsRequest } from "../../models/interfaces/requests/IGetAllProductsRequest";
const tag = "kortoba-test-be:product:getProductsInputValidator";
export class GetProductsInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: IGetAllProductsRequest): any {
        try {
            let errorMessages: any[] = [];
            const numbersToBeValidate = [];
            if (!!input.size) numbersToBeValidate.push({ key: "Number of listed Items", value: Number(input.size) });
            if (!!input.index) numbersToBeValidate.push({ key: "Page Number", value: Number(input.index) });
            if (!!input.userId) numbersToBeValidate.push({ key: "ID of Product creator", value: Number(input.userId) });
            const areNumbers = this.typeValidators.areNumbers(numbersToBeValidate);
            errorMessages = errorMessages.concat(areNumbers.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}