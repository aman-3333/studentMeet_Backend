

import school from "../models/school";
import FuzzySearch from "fuzzy-search";
import { ObjectId } from "mongoose";


import Institute from "../models/InstituteModel";



export default class InstituteController {

  

//////////////////////////////school///////////////////////////////////////////////////////////


    public async createschool(body: any) {
        let schoolInfo: any;
        schoolInfo = await school.create(body);

        return schoolInfo;
    }


    public async editschool(body: any, schoolId: string) {
       
        const schoolInfo: any = await school.findOneAndUpdate({ _id: schoolId, isDeleted: false }, body, { new: true }).lean();
        return schoolInfo;

    }


    public async getschool(stateId:any) {
        const schoolList: any[] = await school.find({ schoolStateId:stateId, isDeleted: false });
        return schoolList;
    }
    public async searchschool(stateId:any,searchValue:any) {
        if(searchValue){
        let schoolList: any = await school.find({schoolStateId:stateId,isDeleted: false });
        schoolList = new FuzzySearch(schoolList, ["schoolName"], {
            caseSensitive: false,
        });
        schoolList = schoolList.search(searchValue);
        return schoolList;
    }}


    public async getschoolInfoById(schoolId: any) {
        const schoolInfo: any = await school.findOne({ _id: schoolId, isDeleted: false }).lean();
       
        return schoolInfo;
    }

    public async deleteschool(schoolId: any) {
       
        const schoolInfo: any = await school.findOneAndUpdate({ _id: schoolId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return schoolInfo;


    }


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
    public async searchInstitute(stateId:any,searchValue:any) {
        if(searchValue){
        let InstituteList: any = await Institute.find({instituteStateId:stateId,isDeleted: false });
        InstituteList = new FuzzySearch(InstituteList, ["instituteName"], {
            caseSensitive: false,
        });
        InstituteList = InstituteList.search(searchValue);
        return InstituteList;
    }}


    public async getInstituteInfoById(InstituteId: any) {
        const InstituteInfo: any = await Institute.findOne({ _id: InstituteId, isDeleted: false }).lean();
       
        return InstituteInfo;
    }

    public async deleteInstitute(InstituteId: any) {
       
        const InstituteInfo: any = await Institute.findOneAndUpdate({ _id: InstituteId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return InstituteInfo;


    }
    //////////////////////Subschool////////////////////////////////////////////////////////////
    
}






