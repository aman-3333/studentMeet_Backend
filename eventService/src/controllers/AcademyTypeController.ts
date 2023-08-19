import AcademyType, { IAcademyType } from "../models/academyType";

export default class AcademyTypeController {

    public async createAcademyType(body: any) {

        let AcademyTypeInfo: any;
       
            AcademyTypeInfo = await AcademyType.create(body);
        
        return AcademyTypeInfo;

    }

    public async editAcademyType(body: IAcademyType, AcademyTypeId: string) {
        const AcademyTypeInfo: IAcademyType = await AcademyType.findOneAndUpdate({ _id: AcademyTypeId, isDeleted: false }, body, { new: true }).lean();
        return AcademyTypeInfo;
    }

    public async getAcademyTypeList(categoryId:any) {
        const AcademyTypeList: any = await AcademyType.find({categoryId: categoryId, isDeleted: false });
        return AcademyTypeList;
    }

    public async getAcademyTypeInfoById(AcademyTypeId: any) {
        const AcademyTypeInfo: any = await AcademyType.findOne({ _id: AcademyTypeId, isDeleted: false }).lean();
        return AcademyTypeInfo;
    }

    public async deleteAcademyType(AcademyTypeId: String) {
        const AcademyTypeInfo: IAcademyType = await AcademyType.findOneAndUpdate({ _id: AcademyTypeId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return AcademyTypeInfo;
    }
}