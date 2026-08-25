import {Request, Response, NextFunction} from "express";
import {validateBody} from "../../../common/validation/validate";
import {system_role_ent} from "../../user/enums";
import {CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO} from "../dto/branch.dto";
import {BranchService, branchService} from "../service/branch.service";

export class BranchController {
    constructor(private readonly branchService: BranchService) {
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await validateBody(CreateBranchDTO, req.body);
            const branch = await this.branchService.create(Number(req.params.restaurantId), req.user?.userId!, req.user?.role! as system_role_ent, data);
            res.status(201).json({message: "Branch added", branch});
        } catch (err) {
            next(err);
        }
    }

    findNearby = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const results = await this.branchService.findNearby( Number(req.query.lat), Number(req.query.lng))
            res.status(200).json({data :results});
        } catch (err) {
            next(err);
        }
    }
    branchesOfRestaurant = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const result = await this.branchService.branchesOfRestaurant(restaurantId)
            res.status(200).json({ data: result });
        } catch (err) {
            next(err);
        }
    }
    updateBranch = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = await validateBody(UpdateBranchDTO,req.body);

            const userId = req.user!.userId;

            const branchId = Number(req.params.id);
            
            const role = req.user!.role;
            const result = await this.branchService.updateBranch(data,userId,branchId,role);
            res.status(200).json({ message: "Branch updated", branch: result });

        }
        catch(err){
            next(err);
        }
    }

    updateBranchStatus = async (req: Request,res: Response,next: NextFunction) => {

    try {
        const branchId = Number(req.params.id);

        const data = await validateBody(
            UpdateBranchStatusDTO,
            req.body
        );

        const userRole = (req.user!.role);

        const branch =
            await this.branchService.updateBranchStatus(branchId,userRole,data);

        res.status(200).json({
            data: branch
        });

    } catch (err) {
        next(err);
    }
};
}

export const branchController = new BranchController(branchService)