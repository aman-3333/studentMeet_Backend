import StarPerformer, {IPerformer } from "../models/StarPerformer";
import { ICategory } from "../models/Category";
import FuzzySearch from "fuzzy-search";
import userDetails from "../models/userDetails";
export default class StarPerformerController {

    public async createStarPerformer(body: any) {
        let StarPerformerInfo: any;
        if (body.length > 0) {
            StarPerformerInfo = await StarPerformer.create(body);
        }
        return StarPerformerInfo;
    }

    public async editStarPerformer(body: IPerformer, StarPerformerId: string) {
        const StarPerformerInfo: IPerformer = await StarPerformer.findOneAndUpdate({ _id: StarPerformerId, isDeleted: false }, body, { new: true }).lean();
        return StarPerformerInfo;
    }

    public async getStarPerformerList(stateId: any,cityId:any,instituteId:any) {
        const StarPerformerList: IPerformer[] = await StarPerformer.find({  isDeleted: false,isActive:true });
        return StarPerformerList;
    }

    public async getStarPerformerInfoById(StarPerformerId: string) {
        const StarPerformerInfo: IPerformer = await StarPerformer.findOne({ _id: StarPerformerId, isDeleted: false }).lean();
        return StarPerformerInfo;
    }

   
    public async deleteStarPerformer(StarPerformerId: String) {
        const StarPerformerInfo: IPerformer = await StarPerformer.findOneAndUpdate({ _id: StarPerformerId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return StarPerformerInfo;
    }

    
    public async createStarPerformerThought(body: any) {
        let StarPerformerInfo: any;
        StarPerformerInfo=await StarPerformer.findOne({starPerformerId:body.starPerformerId,isDeleted:false,isActive:true})
       
        if (StarPerformerInfo) {
            StarPerformerInfo = await StarPerformer.create(body);
        }
        return StarPerformerInfo;
    }

    public async editStarPerformerThought(body: IPerformer) {
     
        const StarPerformerInfo: IPerformer = await StarPerformer.findOneAndUpdate({ starPerformerId: body.starPerformerId, isDeleted: false }, body, { new: true }).lean();
       
        return StarPerformerInfo;
      
    }

    public async getStarPerformerListThought(stateId: any,cityId:any,instituteId:any) {
        const StarPerformerList: IPerformer[] = await StarPerformer.find({  isDeleted: false,isActive:true });
        return StarPerformerList;
    }

    public async getStarPerformerThoughtById(StarPerformerId: string) {
        const StarPerformerInfo: IPerformer = await StarPerformer.findOne({ _id: StarPerformerId, isDeleted: false }).lean();
        return StarPerformerInfo;
    }

    public async deleteStarPerformerThought(StarPerformerId: String,) {
        const StarPerformerInfo: IPerformer = await StarPerformer.findOneAndUpdate({ _id: StarPerformerId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return StarPerformerInfo;
    }


    // public async filterStarPerformer(order: any, category: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
    
       
    //     let StarPerformerInfo: any;
    //     if (bluetick) {
    //         StarPerformerInfo = await StarPerformer.find({ category: category, isDeleted: false });

    //     } else if (subCategory) {
    //         StarPerformerInfo = await StarPerformer.find({ subCategory: subCategory, isDeleted: false });
    //     } else if (subSubCategory) {
    //         StarPerformerInfo = await StarPerformer.find({ subSubCategory: subSubCategory, isDeleted: false });
    //     }
    //     else if (order == "lessEarning") {
    //         StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
            
    //         StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
    //         return StarPerformerInfo
    //     }
    //     else if (order == "mostEarning") {
    //         StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    //         StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
    //         return StarPerformerInfo
    //     }
    //     else if (order == "oldtonew") {
    //         StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    //         StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
    //         return StarPerformerInfo
           
    //     } else if (order == "bluetick") {
    //         StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    //         StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
    //         return StarPerformerInfo
    //     }else if (order == "lessAdvanced") {
    //         StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    //         StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return a.advancedStarPerformerMoney - b.advancedStarPerformerMoney });
    //         return StarPerformerInfo
    //     }else if (order == "mostAdvanced") {
    //         StarPerformerInfo = await StarPerformer.find({ isDeleted: false });
    //         StarPerformerInfo = StarPerformerInfo.sort(function (a: any, b: any) { return b.advancedStarPerformerMoney - a.advancedStarPerformerMoney });
    //         return StarPerformerInfo
    //     }
    //     if (search) {
    //         StarPerformerInfo = await userDetails.find({isStarPerformer:true, isDeleted: false });
    //         console.log("StarPerformerInfo",StarPerformerInfo);
            
    //         const searcher = new FuzzySearch(StarPerformerInfo, ["fullname"], {
    //             caseSensitive: false,
    //         });
    //         StarPerformerInfo = searcher.search(search);
    //         return StarPerformerInfo
    //     }

    //     if (limit && skip) {

    //         StarPerformerInfo = StarPerformerInfo.slice(skip).slice(0, limit);

    //     } else {
    //         StarPerformerInfo = await StarPerformer.find({ category: category, isDeleted: false });
    //         return StarPerformerInfo;
    //     }
    //     return StarPerformerInfo;
    // }
}