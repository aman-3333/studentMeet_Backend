import AcademySubType, { IAcademySubType } from "../models/academySubType";

export default class AcademySubTypeController {

    public async createAcademySubType(body: any) {
        let AcademySubTypeInfo: any;
            AcademySubTypeInfo = await AcademySubType.create(body);
        return AcademySubTypeInfo;

    }

    public async editAcademySubType(body: IAcademySubType, AcademySubTypeId: string) {
        const AcademySubTypeInfo: IAcademySubType = await AcademySubType.findOneAndUpdate({ _id: AcademySubTypeId, isDeleted: false }, body, { new: true }).lean();
        return AcademySubTypeInfo;
    }

    public async getAcademySubTypeList(academyTypeId:any) {
        const AcademySubTypeList: any = await AcademySubType.find({academyTypeId: academyTypeId, isDeleted: false });
        return AcademySubTypeList;
    }

    public async getList() {
        const AcademySubTypeList: any = await AcademySubType.find({ isDeleted: false });
        return AcademySubTypeList;
    }

    public async getAcademySubTypeInfoById(AcademySubTypeId: any) {
        const AcademySubTypeInfo: any = await AcademySubType.findOne({ _id: AcademySubTypeId, isDeleted: false }).lean();
        return AcademySubTypeInfo;
    }

    public async deleteAcademySubType(AcademySubTypeId: String) {
        const AcademySubTypeInfo: IAcademySubType = await AcademySubType.findOneAndUpdate({ _id: AcademySubTypeId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return AcademySubTypeInfo;
    }
}