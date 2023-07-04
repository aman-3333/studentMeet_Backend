import FuzzySearch from "fuzzy-search";
import academy, { IAcademy } from "../models/academy";
import { ICategory } from "../models/category";
export default class academyController {

    public async createAcademy(body: any) {

       
     let academyInfo:any= await academy.create(body);
        
        return academyInfo;

    }

    public async editAcademy(body: IAcademy, academyId: string) {
        const academyInfo: IAcademy = await academy.findOneAndUpdate({ _id: academyId, isDeleted: false }, body, { new: true }).lean();
        return academyInfo;
    }

    public async getAcademyList(stateId: any,userId:any) {
        const academyList: IAcademy[] = await academy.find({ stateId: stateId, isDeleted: false });
        return academyList;
    }

    public async getAcademyInfoById(academyId: any) {
        const academyInfo: any = await academy.findOne({ _id: academyId, isDeleted: false }).lean();
        return academyInfo;
    }

    public async deleteAcademy(academyId: String) {
        const academyInfo: IAcademy = await academy.findOneAndUpdate({ _id: academyId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return academyInfo;
    }

    public async getAcademyfilter() {
        const academyInfo: any = await academy.findOne({ isDeleted: false }).lean();
        return academyInfo;
    }


    public async searchAcademy(search:any){
 
        let academyInfo:any=await academy.aggregate(
        [
            {
              $search: {
                index: "search-text",
                text: {
                  query: search,
                  path: {
                    wildcard: "*"
                  }
                }
              }
            }
          ])
      return  academyInfo 
    
    }

public async filterAcademy(sports:any){

}
}