import GuideLines, { IGuideLines } from "../models/guidelines";
import { ICategory } from "../models/category";
export default class GuideLinesController {

    public async createGuideLines(body: any) {

        let GuideLinesInfo: any;
       
            GuideLinesInfo = await GuideLines.create(body);
        
        return GuideLinesInfo;

    }

    public async editGuideLines(body: IGuideLines, GuideLinesId: string) {
        const GuideLinesInfo: IGuideLines = await GuideLines.findOneAndUpdate({ _id: GuideLinesId, isDeleted: false }, body, { new: true }).lean();
        return GuideLinesInfo;
    }

    public async getGuideLinesList(categoryId:any) {
        const GuideLinesList: any = await GuideLines.find({categoryId: categoryId, isDeleted: false });
        return GuideLinesList;
    }

    public async getGuideLinesInfoById(GuideLinesId: any) {
        const GuideLinesInfo: any = await GuideLines.findOne({ _id: GuideLinesId, isDeleted: false }).lean();
        return GuideLinesInfo;
    }

    public async deleteGuideLines(GuideLinesId: String) {
        const GuideLinesInfo: IGuideLines = await GuideLines.findOneAndUpdate({ _id: GuideLinesId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return GuideLinesInfo;
    }
}