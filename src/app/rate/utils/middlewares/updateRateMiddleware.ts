import { NestMiddleware } from "@nestjs/common";
import { logger } from "../../../shared/logger";
import { UpdateRateInputValidator } from "../validators/updateRateInputValidator";
const tag = "movies-dashboard-be:rate:updateRateMiddleware";
export class UpdateRateMiddleware implements NestMiddleware {
    public use(req: any, res: any, next: () => void) {
        try {
            const { id, value, user, movie } = req.body;
            if (!id && !value && !user && !movie) return res.status(400).json({ message: "Bad Request" });
            const validateRequestBody = new UpdateRateInputValidator().validateInputs(req.body);
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
