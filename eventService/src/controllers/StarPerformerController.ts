import StarPerformer from "../models/StarPerformer";

import FuzzySearch from "fuzzy-search";
import userDetails from "../models/userDetails";
export default class StarPerformerController {

    public async createStarPerformer(body: any) {
        let StarPerformerInfo: any;
    
            StarPerformerInfo = await StarPerformer.create(body);
      
       let StarPerformername=await userDetails.findOne({_id:body.StarPerformerId,isDeleted:false}).lean();
       StarPerformername=StarPerformername.fullname
       await StarPerformer.findOneAndUpdate({starPerformerId:body.StarPerformerId,isDeleted:false},{$set:{starPerformerName:StarPerformername}}).lean();
     
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

    
    public async filterStarPerformer(type: any, sort: any, earningCoin: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
        let StarPerformerInfo: any;
            if (earningCoin =="silver") {
                StarPerformerInfo = await StarPerformer.find({ earningCoin: "silver", isDeleted: false });
    
            } else if (earningCoin=="gold") {
                StarPerformerInfo = await StarPerformer.find({ subCategory: "gold", isDeleted: false });
            } else if (earningCoin == "diamond") {
                StarPerformerInfo = await StarPerformer.find({ earningCoin: "diamond", isDeleted: false });
            }
            else if (sort == "lessEvent") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.noOfEventOriginze - b.noOfEventOriginze });
                
            }
            else if (sort == "mostEvent") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.noOfEventOriginze - a.noOfEventOriginze });
               
            }
            else if (sort == "lessRating") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.rating - b.rating });
             
    
            } else if (sort == "mostRating") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.rating - a.rating });
               
            }
            if (search) {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    
    
                const searcher = new FuzzySearch(StarPerformerInfo, ["StarPerformerName"], {
                    caseSensitive: false,
                });
                StarPerformerInfo = searcher.search(search);
               
            }
            if (limit && skip) {
    
                StarPerformerInfo = StarPerformerInfo.slice(skip).slice(0, limit);
    
            }
    
        return StarPerformerInfo
    
    
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