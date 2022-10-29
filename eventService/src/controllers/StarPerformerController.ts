import StarPerformer from "../models/StarPerformer";

import FuzzySearch from "fuzzy-search";
import userDetails from "../models/userDetails";
export default class StarPerformerController {

    public async createStarPerformer(body: any) {
        let StarPerformerInfo: any;
    
            StarPerformerInfo = await StarPerformer.create(body);
        console.log("StarPerformerInfo",StarPerformerInfo);
       let StarPerformername=await userDetails.findOne({_id:body.StarPerformerId,isDeleted:false}).lean();
       StarPerformername=StarPerformername.fullname
       await userDetails.findOneAndUpdate({starPerformerId:body.StarPerformerId,isDeleted:false},{$set:{starPerformerName:StarPerformername}}).lean();
     
       return StarPerformerInfo;
    }

    public async editStarPerformer(body: any, StarPerformerId: string) {
        const StarPerformerInfo: any = await StarPerformer.findOneAndUpdate({ _id: StarPerformerId, isDeleted: false }, body, { new: true }).lean();
        return StarPerformerInfo;
    }

    public async getStarPerformerList() {
        const StarPerformerList: any[] = await StarPerformer.find({  isDeleted: false,isActive:true });
        return StarPerformerList;
    }

    public async searchStarPerformer(searchValue:any) {
        if(searchValue){
        let StarPerformerList: any = await StarPerformer.find({isDeleted: false})
        console.log("StarPerformerList",StarPerformerList);
        
        StarPerformerList = new FuzzySearch(StarPerformerList, ["starPerformerName"], {
            caseSensitive: false,
        });
        StarPerformerList = StarPerformerList.search(searchValue);
        return StarPerformerList;
    }}

    public async getStarPerformerInfoById(StarPerformerId: any) {
        const StarPerformerInfo: any = await StarPerformer.findOne({ _id: StarPerformerId, isDeleted: false }).lean();
        return StarPerformerInfo;
    }

   
    public async deleteStarPerformer(StarPerformerId: String) {
        const StarPerformerInfo: any = await StarPerformer.findOneAndUpdate({ _id: StarPerformerId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return StarPerformerInfo;
    }

    
    public async createStarPerformerThought(body: any) {
        let StarPerformerInfo: any;
        StarPerformerInfo=await StarPerformer.findOneAndUpdate({starPerformerId:body.starPerformerId,isDeleted:false,isActive:true},{$set:{starPerformerThought:body.starPerformerThought}})
       
       
        return StarPerformerInfo;
    }

    public async editStarPerformerThought(body: any) {
     
        let StarPerformerInfo: any;
        StarPerformerInfo=await StarPerformer.findOneAndUpdate({starPerformerId:body.starPerformerId,isDeleted:false,isActive:true},{$set:{starPerformerThought:body.starPerformerThought}})
       
       
        return StarPerformerInfo;
      
    }

    public async getStarPerformerListThought() {
        const StarPerformerList: any[] = await StarPerformer.find({  isDeleted: false,isActive:true });
        return StarPerformerList;
    }

    public async getStarPerformerThoughtById(StarPerformerId: string) {
        const StarPerformerInfo: any = await StarPerformer.findOne({ _id: StarPerformerId, isDeleted: false }).lean();
        return StarPerformerInfo;
    }

    public async deleteStarPerformerThought(StarPerformerId: String,) {
        const StarPerformerInfo: any = await StarPerformer.findOneAndUpdate({ _id: StarPerformerId, isDeleted: false }, { $set: { starPerformerThought: "" } }, { new: true }).lean();
        return StarPerformerInfo;
    }


   
}