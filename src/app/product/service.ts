import { Body, Controller, Delete, Get, Inject, Next, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiCookieAuth, ApiQuery, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiParam, ApiBody, ApiCreatedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request, Response, NextFunction } from "express";
import { AuthGuard } from "../shared/guards/auth.guard";
import { logger } from "../shared/logger";
import { IProductService } from "./models/interfaces/classes/IProductService";
import { IService } from "./models/interfaces/classes/IService";
import { IGetAllProductsRequest } from "./models/interfaces/requests/IGetAllProductsRequest";
import { ProductServices } from "./services/productService";
const tag = "kortoba-test-be:product:productService";
@Controller("/api/product")
@UseGuards(AuthGuard)
export class ProductService implements IService {
    constructor (@Inject(ProductServices) private readonly productService: IProductService, private jwtService: JwtService) {}
    @ApiCookieAuth("token")
    @ApiQuery({ type: "string", name: "size", example: "15", required: false })
    @ApiQuery({ type: "string", name: "index", example: "1", required: false })
    @ApiQuery({ type: "string", name: "userId", example: "1", required: false })
    @ApiOkResponse({ status: 200, description: "Products are fetched successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't get all products" })
    @Get("/")
    public async getAllProducts(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const size = (!!Number(req.query.size) && Number(req.query.size) > 10 ? 10 : Number(req.query.size)) || 10;
            const index = (!!Number(req.query.index) && Number(req.query.index) - 1) * size || 0;
            const userId = Number(req.query.userId);
            const query: IGetAllProductsRequest = { size, index, userId };
            const products = await this.productService.getProducts(query);
            const total = products?.length || 0;
            const data = { total, size, index, products };
            return res.status(200).json({ bit: "success", message: "Products are fetched successfully", data });
        } catch (error) {
            const getAllProductsErrorMessage = { tag: tag + ":getAllProducts", message: "There is an error while getting all products", error, status: 500 };
            logger(getAllProductsErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't get all products" });
        }
    }
    @ApiCookieAuth("token")
    @ApiParam({ type: "string", name: "id", example: "1", required: true })
    @ApiOkResponse({ status: 200, description: "Product is fetched successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't get product by its id" })
    @Get("/:id")
    public async getProductById(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            const data = await this.productService.getProduct(id) || {};
            return res.status(200).json({ bit: "success", message: "Product is fetched successfully", data });
        } catch (error) {
            const getProductByIdErrorMessage = { tag: tag + ":getProductById", message: "There is an error while getting the product by id", error, status: 500 };
            logger(getProductByIdErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't get the product by id" });
        }
    }
    @ApiCookieAuth("token")
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: "object",
            properties: { title: { type: "string" }, image: { type: "string", format: "binary" }, price: { type: "number" } },
        },
    })
    @ApiCreatedResponse({ status: 201, description: "Product is created successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't create this product" })
    @UseInterceptors(FileInterceptor('file'))
    @Post("/")
    public async createProduct(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const decodeTokenPayload = this.jwtService.decode(req.cookies.token);
            const request = body;
            request.image = file.originalname;
            request.userId = decodeTokenPayload["userId"];
            const product = await this.productService.createProduct(request);
            return res.status(200).json({ bit: "success", message: "Product are created successfully", product });
        } catch (error) {
            const createProductErrorMessage = { tag: tag + ":createProduct", message: "There is an error while creating product", error, status: 500 };
            logger(createProductErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't create product" });
        }
    }
    @ApiCookieAuth("token")
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: "object",
            properties: { id: { type: "number" }, title: { type: "string" }, image: { type: "string", format: "binary" }, price: { type: "number" } },
        }, 
    })
    @ApiCreatedResponse({ status: 200, description: "Product is updated successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't update this product" })
    @UseInterceptors(FileInterceptor('file'))
    @Put("/")
    public async updateProduct(@UploadedFile() file: Express.Multer.File, @Body() body: any, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const request = body;
            request.image = file.originalname;
            if (!request.image) delete request.image;
            await this.productService.updateProduct(request);
            return res.status(200).json({ bit: "success", message: "Product are updated successfully" });
        } catch (error) {
            const updateProductErrorMessage = { tag: tag + ":updateProduct", message: "There is an error while updating product", error, status: 500 };
            logger(updateProductErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't update product" });
        }
    }
    @ApiCookieAuth("token")
    @ApiParam({ type: "string", name: "id", example: "1", required: true })
    @ApiCreatedResponse({ status: 200, description: "Product is deleted successfully" })
    @ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
    @ApiInternalServerErrorResponse({ status: 500, description: "Can't delete this product" })
    @Delete("/:id")
    public async deleteProduct(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const id = Number(req.params.id);
            await this.productService.deleteProduct(id);
            return res.status(200).json({ bit: "success", message: "Product are deleted successfully" });
        } catch (error) {
            const deleteProductErrorMessage = { tag: tag + ":deleteProduct", message: "There is an error while deleting product", error, status: 500 };
            logger(deleteProductErrorMessage);
            return res.status(500).json({ bit: "fail", message: "Can't delete product" });
        }
    }
}
