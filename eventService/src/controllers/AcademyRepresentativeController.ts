


import FuzzySearch from "fuzzy-search";
import { ObjectId } from "mongoose";


import academyRepresentative from "../models/sponsorRepresentative";



export default class academyRepresentativeController {
    public async createAcademyRepresentative(body: any) {
        let academyRepresentativeInfo: any;
        academyRepresentativeInfo = await academyRepresentative.create(body);
        return academyRepresentativeInfo;
    }


    public async editAcademyRepresentative(body: any, academyRepresentativeId: string) {
       
        const academyRepresentativeInfo: any = await academyRepresentative.findOneAndUpdate({ _id: academyRepresentativeId, isDeleted: false }, body, { new: true }).lean();
        return academyRepresentativeInfo;

    }


    public async getAcademyRepresentative() {
        const academyRepresentativeList: any[] = await academyRepresentative.find({ isDeleted: false });
        return academyRepresentativeList;
    }
    public async getAcademyRepresentativeInfobyId(representativeId:any) {
        const academyRepresentativeList: any[] = await academyRepresentative.find({ _id:representativeId,isDeleted: false });
        return academyRepresentativeList;
    }
    public async searchAcademyRepresentative(stateId:any,searchValue:any) {
        if(searchValue){
        let academyRepresentativeList: any = await academyRepresentative.find({academyRepresentativeStateId:stateId,isDeleted: false });
        academyRepresentativeList = new FuzzySearch(academyRepresentativeList, ["academyRepresentativeName"], {
            caseSensitive: false,
        });
        academyRepresentativeList = academyRepresentativeList.search(searchValue);
        return academyRepresentativeList;
    }}



    public async deleteAcademyRepresentative(academyRepresentativeId: any) {
       
        const academyRepresentativeInfo: any = await academyRepresentative.findOneAndUpdate({ _id: academyRepresentativeId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return academyRepresentativeInfo;


    }
   
    
}






