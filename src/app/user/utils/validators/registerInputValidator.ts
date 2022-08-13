import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IRegisterUserRequest } from "../../models/interfaces/requests/IRegisterUserRequest";
import { IValidRoleResponse } from "../../models/interfaces/responses/IValidRoleResponse";
import { userRoles } from "../../../shared/constants";
const tag = "movies-dashboard-be:user:registerInputValidator";
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
                { key: "User Role", value: input.role },
            ]);
            const isEmail = this.typeValidators.areEmails([{ key: "Email Address", value: input.email }]);
            const isValidRole = this.isValidRole(input.role);
            errorMessages = errorMessages.concat(isObject.errorMessages, areStrings.errorMessages, isEmail.errorMessages, isValidRole.errorMessage);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
    private isValidRole(role: string): IValidRoleResponse {
        const roles: string[] = userRoles;
        const isValid = roles.includes(role);
        return { valid: isValid, errorMessage: !isValid ? "Please enter valid user role" : null };
    }
}