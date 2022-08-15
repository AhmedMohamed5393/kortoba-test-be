import { NestMiddleware } from "@nestjs/common";
import { logger } from "../../../shared/logger";
import { RegisterInputValidator } from "../validators/registerInputValidator";
const tag = "kortoba-test-be:user:registerMiddleware";
export class RegisterMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const validateRequestBody = new RegisterInputValidator().validateInputs(req.body);
            if (!validateRequestBody.errorMessages) next();
            else {
                const middlewareErrorMessage = { tag, message: "Invalid inputs", error: validateRequestBody.errorMessages, status: 400 };
                logger(middlewareErrorMessage);
                return res.status(400).json({ message: "Invalid inputs", error: validateRequestBody.errorMessages });
            }
        } catch (error) {
            const middlewareErrorMessage = { tag: tag, message: "Internal Server Error", error, status: 500 };
            logger(middlewareErrorMessage);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
