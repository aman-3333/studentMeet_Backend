import Stage, { IStage } from "../models/stages";

export default class StageController {

    public async createStage(body: any) {


        const {academySUbTypeId,name,Description}=body;
        let stageInfo: any;
       
            stageInfo = new Stage({
                academySUbTypeId:academySUbTypeId,
                name:name,
                Description:Description
            });
           
            await stageInfo.save()
            console.log(stageInfo);
        return stageInfo
     }

    public async editStage(body: IStage, stageId: string) {
        const stageInfo: IStage = await Stage.findOneAndUpdate({ _id: stageId, isDeleted: false }, body, { new: true }).lean();
        return stageInfo;
    }

    public async getStageList(academySubTypeId: any) {
        console.log(academySubTypeId,"academySubTypeId");
        
        const stageList = await Stage.find({ academySUbTypeId: academySubTypeId, isDeleted: false });
        return stageList;
    }

    public async getstageInfoById(stageId: any) {
        const stageInfo: any = await Stage.findOne({ _id: stageId, isDeleted: false }).lean();
        return stageInfo;
    }

    public async deleteStage(stageId: String) {
        const stageInfo: IStage = await Stage.findOneAndUpdate({ _id: stageId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return stageInfo;
    }
}