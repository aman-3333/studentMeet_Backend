import Achivement, { IAchivement } from "../models/achivement";
import { ICategory } from "../models/category";
export default class AchivementController {

    public async createAchivement(body: any) {

        let AchivementInfo: any;
       
            AchivementInfo = await Achivement.create(body);
        
        return AchivementInfo;

    }

    public async editAchivement(body: IAchivement, AchivementId: string) {
        const AchivementInfo: IAchivement = await Achivement.findOneAndUpdate({ _id: AchivementId, isDeleted: false }, body, { new: true }).lean();
        return AchivementInfo;
    }

    public async getAchivementList(stateId: any) {
        const AchivementList: IAchivement[] = await Achivement.find({ stateId: stateId, isDeleted: false });
        return AchivementList;
    }

    public async getAchivementInfoById(AchivementId: any) {
        const AchivementInfo: any = await Achivement.findOne({ _id: AchivementId, isDeleted: false }).lean();
        return AchivementInfo;
    }

    public async deleteAchivement(AchivementId: String) {
        const AchivementInfo: IAchivement = await Achivement.findOneAndUpdate({ _id: AchivementId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return AchivementInfo;
    }
}