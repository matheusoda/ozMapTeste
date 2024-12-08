import { Region, RegionModel } from "../models";

export class RegionService {
    static async createRegion(data: Partial<Region>) {
        return await RegionModel.create(data);
    }

    static async getRegions() {
        return await RegionModel.find().populate("user").lean();
    }

    static async getRegionById(id: string) {
        return await RegionModel.findById(id).populate("user").lean();
    }

    static async updateRegion(id: string, data: Partial<Region>) {
        return await RegionModel.findByIdAndUpdate(id, data, {
            new: true
        }).lean();
    }

    static async deleteRegion(id: string) {
        return await RegionModel.findByIdAndDelete(id);
    }
}
