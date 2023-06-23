import sports, { ISports } from "../models/sportsCategory";
import { ICategory } from "../models/category";
export default class sportsController {

    public async createSports(body: any) {

        let sportsInfo: any;
       
            sportsInfo = await sports.create(body);
        
        return sportsInfo;
     }

    public async editSports(body: ISports, sportsId: string) {
        const sportsInfo: ISports = await sports.findOneAndUpdate({ _id: sportsId, isDeleted: false }, body, { new: true }).lean();
        return sportsInfo;
    }

    public async getSportsList(stateId: any) {
        const sportsList: ISports[] = await sports.find({ stateId: stateId, isDeleted: false });
        return sportsList;
    }

    public async getSportsInfoById(sportsId: any) {
        const sportsInfo: any = await sports.findOne({ _id: sportsId, isDeleted: false }).lean();
        return sportsInfo;
    }

    public async deleteSports(sportsId: String) {
        const sportsInfo: ISports = await sports.findOneAndUpdate({ _id: sportsId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return sportsInfo;
    }
}