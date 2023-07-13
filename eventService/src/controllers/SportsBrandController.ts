import SportsBrand, { ISportsBrand } from "../models/sportsBrand";
import { ICategory } from "../models/category";
export default class SportsBrandController {

    public async createSportsBrand(body: any) {

        let SportsBrandInfo: any;
       
            SportsBrandInfo = await SportsBrand.create(body);
        
        return SportsBrandInfo;

    }

    public async editSportsBrand(body: ISportsBrand, SportsBrandId: string) {
        const SportsBrandInfo: ISportsBrand = await SportsBrand.findOneAndUpdate({ _id: SportsBrandId, isDeleted: false }, body, { new: true }).lean();
        return SportsBrandInfo;
    }

    public async getSportsBrandList(stateId: any) {
        const SportsBrandList: ISportsBrand[] = await SportsBrand.find({ stateId: stateId, isDeleted: false });
        return SportsBrandList;
    }

    public async getSportsBrandInfoById(SportsBrandId: any) {
        const SportsBrandInfo: any = await SportsBrand.findOne({ _id: SportsBrandId, isDeleted: false }).lean();
        return SportsBrandInfo;
    }

    public async deleteSportsBrand(SportsBrandId: String) {
        const SportsBrandInfo: ISportsBrand = await SportsBrand.findOneAndUpdate({ _id: SportsBrandId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return SportsBrandInfo;
    }
}