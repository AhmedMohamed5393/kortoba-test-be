import { logger } from "../../shared/logger";
import { User } from "../models/entities/user.model";
import { IUserPayload } from "../models/interfaces/responses/IUserPayload";
const tag = "kortoba-test-be:user:userMapper";
export class UserMapper {
    public prepareTokenPayload(user: User): IUserPayload {
        try {
            return { userId: user.id, name: user.name, email: user.email };
        } catch (error) {
            const prepareTokenPayloadErrorMessage = { tag: tag + ":prepareTokenPayload", message: "There is an error while prepare token payload for this user", error, status: 500 };
            logger(prepareTokenPayloadErrorMessage);
        }
    }
}