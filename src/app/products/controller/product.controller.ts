
import { Request, Response, NextFunction } from "express";
import { productService,ProductService } from "../service/product.service";
import { validateBody } from "../../../common/validation/validate";
import { CreateProductDTO, UpdateProductDTO } from "../product.dto";
import { system_role_ent } from "../../user/enums";

export class ProductController {

    constructor(
        private readonly productService: ProductService){}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(CreateProductDTO, req.body);
            const product = await this.productService.create(
                Number(req.params.restaurantId),
                req.user?.userId!,
                req.user?.role! as system_role_ent,
                data,
            );
            res.status(201).json({message: "Product created", product});
        } catch (err) {
            next(err);
        }
    }
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(UpdateProductDTO, req.body);
            const branchId = req.query.branchId ? Number(req.query.branchId) : undefined;
            const result = await this.productService.update(
                Number(req.params.id),
                req.user?.userId!,
                req.user?.role! as system_role_ent,
                data,
                branchId,
            );
            res.status(200).json({message: "Product updated", ...result});
        } catch (err) {
            next(err);
        }
    }
    findCategories = async (req: Request,res: Response,next: NextFunction) => {

        try {

            const restaurantId = Number(req.params.restaurantId);

            const result =
                await this.productService.findCategories(restaurantId);

            res.status(200).json({
                data: result
            });

        } catch (err) {

            next(err);

        }
    };

    findProductsByBranch = async (req: Request,res: Response,next: NextFunction) => {
        try {
            const branchId = Number(req.params.branchId);

            const result = await productService.findProductsByBranchService(branchId);

            res.status(200).json({
                data: result
            });

        } catch (err) {
            next(err);
        }
    };

    findByRestaurant = async (req: Request,res: Response,next: NextFunction) => {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const userId = req.user!.userId;
            const role = req.user!.role;
            const result = await productService.findByRestaurant(restaurantId,userId,role);
            res.status(200).json({
            data: result
            });

        } catch (err) {
            next(err);
        }
    };
    findById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await this.productService.findById(Number(req.params.id));
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }
}

export const productController = new ProductController(productService);