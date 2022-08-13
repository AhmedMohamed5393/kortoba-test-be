import { IInputObject } from "../interfaces/IInputObject";
import { logger } from "../logger";
const tag = "movies-dashboard-be:typeValidators";
export class TypeValidators {
    public arePhones(inputObjects: IInputObject[]): any {
        try {
            const regexWithoutPlus = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            const regexWithPlus = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || !inputObject.value.match(regexWithPlus) && !inputObject.value.match(regexWithoutPlus)) {
                    errorMessages.push(`${inputObject.key} is not a phone number`);
                }
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const arePhonesErrorMessage = { tag: tag + ":arePhones", message: "internal server error", error, status: 500 };
            logger(arePhonesErrorMessage);
        }
    }
    public areEmails(inputObjects: IInputObject[]): any {
        try {
            const regex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || String(inputObject.value).search(regex) === -1) errorMessages.push(`${inputObject.key} is not an email address`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areEmailsErrorMessage = { tag: tag + ":areEmails", message: "internal server error", error, status: 500 };
            logger(areEmailsErrorMessage);
        }
    }
    public areNumbers(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || typeof inputObject.value !== "number") errorMessages.push(`${inputObject.key} must be a number`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areNumbersErrorMessage = { tag: tag + ":areNumbers", message: "internal server error", error, status: 500 };
            logger(areNumbersErrorMessage);
        }
    }
    public areArrays(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || !Array.isArray(inputObject.value)) errorMessages.push(`${inputObject.key} must be an array`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areArraysErrorMessage = { tag: tag + ":areArrays", message: "internal server error", error, status: 500 };
            logger(areArraysErrorMessage);
        }
    }
    public areObjects(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || typeof inputObject.value !== "object") errorMessages.push(`${inputObject.key} must be an object`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areObjectsErrorMessage = { tag: tag + ":areObjects", message: "internal server error", error, status: 500 };
            logger(areObjectsErrorMessage);
        }
    }
    public areFiles(inputObjects: Express.Multer.File[], type: string): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                const invalidMimeType = !inputObject.mimetype || inputObject.mimetype.split("/")[0] !== type;
                const invalidDestination = !inputObject.destination;
                const invalidBuffer = !inputObject.buffer;
                const invalidFileName = !inputObject.filename || !inputObject.originalname || typeof inputObject.filename !== "string" || typeof inputObject.originalname !== "string";
                const invalidFieldName = !inputObject.fieldname || inputObject.fieldname !== "string";
                const invalidPath = !inputObject.path || typeof inputObject.path !== "string";
                const invalidSize = !inputObject.size || !Number(inputObject.size);
                const invalidStream = !inputObject.stream;
                if (invalidMimeType || invalidDestination || invalidBuffer || invalidFileName || invalidFieldName || invalidPath || invalidSize || invalidStream) {
                    errorMessages.push(`Invalid File`);
                }
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areFilesErrorMessage = { tag: tag + ":areFiles", message: "internal server error", error, status: 500 };
            logger(areFilesErrorMessage);
        }
    }
    public areStrings(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || typeof inputObject.value !== "string") errorMessages.push(`${inputObject.key} must be a string`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areStringsErrorMessage = { tag: tag + ":areStrings", message: "internal server error", error, status: 500 };
            logger(areStringsErrorMessage);
        }
    }
}
