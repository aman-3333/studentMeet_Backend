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

    
    public async filterStarPerformer(type: any, sort: any, category: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
        let StarPerformerInfo: any;
            if (category) {
                StarPerformerInfo = await StarPerformer.find({ category: category, isDeleted: false });
    
            } else if (subCategory) {
                StarPerformerInfo = await StarPerformer.find({ subCategory: subCategory, isDeleted: false });
            } else if (subSubCategory) {
                StarPerformerInfo = await StarPerformer.find({ subSubCategory: subSubCategory, isDeleted: false });
            }
            else if (sort == "lessEarning") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
                return StarPerformerInfo
            }
            else if (sort == "mostEarning") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
                return StarPerformerInfo
            }
            else if (sort == "oldtonew") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
                return StarPerformerInfo
    
            } else if (sort == "newtoold") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
                return StarPerformerInfo
            } else if (sort == "lessAdvanced") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.advancedStarPerformerMoney - b.advancedStarPerformerMoney });
                return StarPerformerInfo
            } else if (sort == "mostAdvanced") {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
                StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.advancedStarPerformerMoney - a.advancedStarPerformerMoney });
                return StarPerformerInfo
            }
            if (search) {
                StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    
    
                const searcher = new FuzzySearch(StarPerformerInfo, ["StarPerformerName", "StarPerformerPartnerName"], {
                    caseSensitive: false,
                });
                StarPerformerInfo = searcher.search(search);
                return StarPerformerInfo
            }
            if (limit && skip) {
    
                StarPerformerInfo = StarPerformerInfo.slice(skip).slice(0, limit);
    
            }
    
        
    
    
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