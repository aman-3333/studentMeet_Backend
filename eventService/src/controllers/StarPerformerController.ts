import StarPerformer from "../models/StarPerformer";
const mongoose = require("mongoose");
import FuzzySearch from "fuzzy-search";
import userDetails from "../models/userDetails";
export default class StarPerformerController {

    public async createStarPerformer(body: any) {
        let starPerformerInfo: any;
    
            starPerformerInfo = await StarPerformer.create(body);
       return starPerformerInfo;
    }

    public async editStarPerformer(body: any) {
        const starPerformerInfo: any = await StarPerformer.findOneAndUpdate({ _id: body._id, isDeleted: false }, body, { new: true }).lean();
        return starPerformerInfo;
    }

    public async getStarPerformerList(schoolId:any) {
       
        const StarPerformerList: any[] = await StarPerformer.aggregate([
            {
              $match: {
                schoolId: new mongoose.Types.ObjectId(schoolId), isDeleted: false
              },
            },
            {
              $lookup: {
                localField: "starPerformerId",
                from: "userdetails",
                foreignField: "_id",
                as: "users",
              }
            }])
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

    public async getStarPerformerInfoById(starPerformerId: any) {
        const starPerformerInfo: any = await StarPerformer.findOne({ _id: starPerformerId, isDeleted: false }).lean();
        return starPerformerInfo;
    }

    
    public async filterStarPerformer(type: any, sort: any, earningCoin: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
        let starPerformerInfo: any;
            if (earningCoin =="silver") {
                starPerformerInfo = await StarPerformer.find({ earningCoin: "silver", isDeleted: false });
    
            } else if (earningCoin=="gold") {
                starPerformerInfo = await StarPerformer.find({ subCategory: "gold", isDeleted: false });
            } else if (earningCoin == "diamond") {
                starPerformerInfo = await StarPerformer.find({ earningCoin: "diamond", isDeleted: false });
            }
            else if (sort == "lessEvent") {
                starPerformerInfo = await StarPerformer.find({ isDeleted: false });
    
                starPerformerInfo = starPerformerInfo.sort(function (a: any, b: any) { return a.noOfEventOriginze - b.noOfEventOriginze });
                
            }
            else if (sort == "mostEvent") {
                starPerformerInfo = await StarPerformer.find({ isDeleted: false });
                starPerformerInfo = starPerformerInfo.sort(function (a: any, b: any) { return b.noOfEventOriginze - a.noOfEventOriginze });
               
            }
            else if (sort == "lessRating") {
                starPerformerInfo = await StarPerformer.find({ isDeleted: false });
                starPerformerInfo = starPerformerInfo.sort(function (a: any, b: any) { return a.rating - b.rating });
             
    
            } else if (sort == "mostRating") {
                starPerformerInfo = await StarPerformer.find({ isDeleted: false });
                starPerformerInfo = starPerformerInfo.sort(function (a: any, b: any) { return b.rating - a.rating });
               
            }
            if (search) {
                starPerformerInfo = await StarPerformer.find({ isDeleted: false });
                console.log("starPerformerInfo",starPerformerInfo);
    
                const searcher = new FuzzySearch(starPerformerInfo, ["starPerformerName"], {
                    caseSensitive: false,
                });
                starPerformerInfo = searcher.search(search);
               console.log("starPerformerInfo",starPerformerInfo);
               
            }
            if (limit && skip) {
    
                starPerformerInfo = starPerformerInfo.slice(skip).slice(0, limit);
    
            }
    
        return starPerformerInfo
    
    
    }
   
  

    public async deleteStarPerformer(StarPerformerId: String) {
        const starPerformerInfo: any = await StarPerformer.findOneAndUpdate({ _id: StarPerformerId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return starPerformerInfo;
    }

    
   
}