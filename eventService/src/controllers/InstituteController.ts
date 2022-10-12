

import Institute from "../models/Institute";
import FuzzySearch from "fuzzy-search";
import { ObjectId } from "mongoose";




export default class InstituteController {

  

//////////////////////////////Institute///////////////////////////////////////////////////////////


    public async createInstitute(body: any) {
        let InstituteInfo: any;
        InstituteInfo = await Institute.create(body);

        return InstituteInfo;
    }


    public async editInstitute(body: any, InstituteId: string) {
       
        const InstituteInfo: any = await Institute.findOneAndUpdate({ _id: InstituteId, isDeleted: false }, body, { new: true }).lean();
        return InstituteInfo;

    }


    public async getInstitute(stateId:any) {
        const InstituteList: any[] = await Institute.find({ instituteStateId:stateId, isDeleted: false });
        return InstituteList;
    }
    public async searchInstitute(stateId:any,search:any) {
        let InstituteList: any = await Institute.find({instituteStateId:stateId,isDeleted: false });
        InstituteList = new FuzzySearch(InstituteList, ["instituteName"], {
            caseSensitive: false,
        });
        InstituteList = InstituteList.search(search);
        return InstituteList;
    }


    public async getInstituteInfoById(InstituteId: any) {
        const InstituteInfo: any = await Institute.findOne({ _id: InstituteId, isDeleted: false }).lean();
       
        return InstituteInfo;
    }

    public async deleteInstitute(InstituteId: any) {
       
        const InstituteInfo: any = await Institute.findOneAndUpdate({ _id: InstituteId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return InstituteInfo;


    }
    //////////////////////SubInstitute////////////////////////////////////////////////////////////
    
}