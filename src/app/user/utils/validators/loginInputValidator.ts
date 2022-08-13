import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { ILoginRequest } from "../../models/interfaces/requests/ILoginRequest";
const tag = "movies-dashboard-be:user:loginInputValidator";
export class LoginInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: ILoginRequest): any {
        try {
            let errorMessages: any[] = [];
            const isObject = this.typeValidators.areObjects([{ key: "Login Body Request Object", value: input }]);
            const areStrings = this.typeValidators.areStrings([
                { key: "User Name", value: input.name },
                { key: "Password", value: input.password },
            ]);
            errorMessages = errorMessages.concat(isObject.errorMessages, areStrings.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}