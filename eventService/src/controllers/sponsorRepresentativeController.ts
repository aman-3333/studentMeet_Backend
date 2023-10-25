


import FuzzySearch from "fuzzy-search";
import { ObjectId } from "mongoose";


import sonsorRepresentative from "../models/sponsorRepresentative";



export default class sonsorRepresentativeController {

  

//////////////////////////////sonsorRepresentative///////////////////////////////////////////////////////////

    public async createsonsorRepresentative(body: any) {
        let sonsorRepresentativeInfo: any;
        sonsorRepresentativeInfo = await sonsorRepresentative.create(body);
        return sonsorRepresentativeInfo;
    }


    public async editsonsorRepresentative(body: any, sonsorRepresentativeId: string) {
        const sonsorRepresentativeInfo: any = await sonsorRepresentative.findOneAndUpdate({ _id: sonsorRepresentativeId, isDeleted: false }, body, { new: true }).lean();
        return sonsorRepresentativeInfo;
    }


    public async getsonsorRepresentative() {
        const sonsorRepresentativeList: any[] = await sonsorRepresentative.find({ isDeleted: false });
        return sonsorRepresentativeList;
    }

    public async getsonsorRepresentativeInfobyId(representativeId:any) {
        const sonsorRepresentativeList: any[] = await sonsorRepresentative.find({ _id:representativeId,isDeleted: false });
        return sonsorRepresentativeList;
    }

    public async searchsonsorRepresentative(stateId:any,searchValue:any) {
        if(searchValue){
        let sonsorRepresentativeList: any = await sonsorRepresentative.find({sonsorRepresentativeStateId:stateId,isDeleted: false });
        sonsorRepresentativeList = new FuzzySearch(sonsorRepresentativeList, ["sonsorRepresentativeName"], {
            caseSensitive: false,
        });
        sonsorRepresentativeList = sonsorRepresentativeList.search(searchValue);
        return sonsorRepresentativeList;
    }}



    public async deletesonsorRepresentative(sonsorRepresentativeId: any) {
       
        const sonsorRepresentativeInfo: any = await sonsorRepresentative.findOneAndUpdate({ _id: sonsorRepresentativeId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return sonsorRepresentativeInfo;


    }
   
    
}






