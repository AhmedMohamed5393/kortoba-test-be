import { logger } from "../../../shared/logger";
import { IInputValidation } from "../../../shared/interfaces/IInputValidation";
import { TypeValidators } from "../../../shared/validators/typeValidators";
import { IUpdateMovieRequest } from "../../models/interfaces/requests/IUpdateMovieRequest";
const tag = "movies-dashboard-be:movie:updateMovieInputValidator";
export class UpdateMovieInputValidator implements IInputValidation {
    private typeValidators: TypeValidators;
    constructor() { this.typeValidators = new TypeValidators(); }
    public validateInputs(body: IUpdateMovieRequest): any {
        try {
            let errorMessages: any[] = [];
            const stringsToValidate = [];
            if (body.title) stringsToValidate.push({ key: "Movie Title", value: body.title });
            if (body.description) stringsToValidate.push({ key: "Movie Description", value: body.description });
            const areStrings = this.typeValidators.areStrings(stringsToValidate);
            const filesToValidate = [];
            if (body.image) filesToValidate.push(body.image);
            const isFile = this.typeValidators.areFiles(filesToValidate, "image");
            const numbersToValidate = [{ key: "Movie ID", value: body.id }];
            if (body.category) numbersToValidate.push({ key: "Movie Category", value: body.category },);
            const areNumbers = this.typeValidators.areNumbers(numbersToValidate);
            errorMessages = errorMessages.concat(areStrings?.errorMessages, areNumbers?.errorMessages, isFile?.errorMessages);
            errorMessages = errorMessages.filter((errorMessage) => errorMessage);
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const validateInputsErrorMessage = { tag: tag + ":validateInputs", message: "Internal Server Error", error, status: 500 };
            logger(validateInputsErrorMessage);
        }
    }
}