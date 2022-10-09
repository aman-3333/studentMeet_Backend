import Institute, { IInstitute } from "../models/Institute";
import State from "../models/State";
export default class InstituteController {

    public async createInstitute(body: any) {
        let InstituteInfo: any = await Institute.create(body);
        return InstituteInfo;
    }

    public async editInstitute(body: IInstitute, InstituteId: string) {
        const InstituteInfo: IInstitute = await Institute.findOneAndUpdate({ _id: InstituteId, isDeleted: false }, body, { new: true }).lean();
        return InstituteInfo;
    }

    public async getInstitute() {
        const InstituteList: IInstitute[] = await Institute.find({ isDeleted: false });
        return InstituteList;
    }

    public async searchInstitute(stateId: any, searchValue: any) {
        let InstituteInfo: any = await Institute.findOne({ StateId: stateId, isDeleted: false }).lean()
   
        
        InstituteInfo = InstituteInfo.instituteName;
      
       

        InstituteInfo = InstituteInfo.filter((value:any) => searchValue.test(value));

        
        return InstituteInfo

    }

    public async getInstituteInfoById(InstituteId: string) {
        const InstituteInfo: IInstitute = await Institute.findOne({ _id: InstituteId, isDeleted: false }).lean();
        return InstituteInfo;
    }

    public async deleteInstitute(InstituteId: String) {
        const InstituteInfo: IInstitute = await Institute.findOneAndUpdate({ _id: InstituteId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return InstituteInfo;
    }
}