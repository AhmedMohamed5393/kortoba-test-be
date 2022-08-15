import { Inject, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { logger } from "../../../shared/logger";
import { IProductService } from "../../models/interfaces/classes/IProductService";
import { ProductServices } from "../../services/productService";
const tag = "kortoba-test-be:product:canEditMiddleware";
export class CanEditMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService, @Inject(ProductServices) private readonly productService: IProductService) {}
    public async use(req: any, res: any, next: () => void) {
        try {
            const productId = req.body.id || req.params.id;
            const product = await this.productService.getProduct(productId);
            const payload = this.jwtService.decode(req.cookies.token);
            if (payload["userId"] !== product.user.id) {
                const middlewareErrorMessage = { tag, message: "Unauthorized", status: 401 };
                logger(middlewareErrorMessage);
                return res.status(401).json({ message: "Unauthorized" });
            }
        } catch (error) {
            const middlewareErrorMessage = { tag: tag, message: "Internal Server Error", error, status: 500 };
            logger(middlewareErrorMessage);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
