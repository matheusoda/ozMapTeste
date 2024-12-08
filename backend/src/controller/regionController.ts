import { Request, Response, NextFunction } from "express";
import { RegionService } from "../service/regionService";
import { STATUS } from "../utils/responseDefault";

export class RegionController {
    static async createRegion(req: Request, res: Response, next: NextFunction) {
        try {
            const region = await RegionService.createRegion(req.body);
            res.status(STATUS.CREATED).json(region);
        } catch (error) {
            next(error);
        }
    }

    static async getRegions(req: Request, res: Response, next: NextFunction) {
        try {
            const regions = await RegionService.getRegions();
            res.json(regions);
        } catch (error) {
            next(error);
        }
    }

    static async getRegionById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        try {
            const region = await RegionService.getRegionById(req.params.id);
            if (!region) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json({ message: "Region not found" });
            }
            res.json(region);
        } catch (error) {
            next(error);
        }
    }

    static async updateRegion(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        try {
            const region = await RegionService.updateRegion(
                req.params.id,
                req.body
            );
            if (!region) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json({ message: "Region not found" });
            }
            res.json(region);
        } catch (error) {
            next(error);
        }
    }

    static async deleteRegion(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | any> {
        try {
            const region = await RegionService.deleteRegion(req.params.id);
            if (!region) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json({ message: "Region not found" });
            }
            res.status(STATUS.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
}
