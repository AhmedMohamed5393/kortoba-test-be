import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IRegisterUserRequest } from "../../models/interfaces/requests/IRegisterUserRequest";
const tag = "kortoba-test-be:user:registerInputValidator";
export class RegisterInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(input: IRegisterUserRequest): any {
        try {
            let errorMessages: any[] = [];
            const isObject = this.typeValidators.areObjects([{ key: "Register Body Request Object", value: input }]);
            const areStrings = this.typeValidators.areStrings([
                { key: "User Name", value: input.name },
                { key: "Password", value: input.password },
                { key: "Birth Date", value: input.birthdate },
            ]);
            const isEmail = this.typeValidators.areEmails([{ key: "Email Address", value: input.email }]);
            errorMessages = errorMessages.concat(isObject.errorMessages, areStrings.errorMessages, isEmail.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}