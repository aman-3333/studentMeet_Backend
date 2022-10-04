import StarPerformer, {IPerformer } from "../models/StarPerformer";
import { ICategory } from "../models/Category";
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

    public async filterStarPerformer(
        category: any,
        subCategory: any[],
        subSubCategory: any[],
        search: any,
        priceLt: any,
        priceGt: any,
        discountLt: any,
        discountGt: any,
        page: any = 1,
        limit: any = 10,
        sortMethod: any,
        price: any,
    ) {
        let products: any[] = [];
        let totalPages: any;
        let sortBy: any;


        let query: any = {};

        query = { $and: [{ isDeleted: false, isActive: true, }] };
        let queryColl: any = { $and: [{ isDeleted: false, }] };


        if (category) {
            query.$and.push({ categoryId: category });
        }
        if (subCategory && subCategory.length > 0) {
            let arr = [];
            for (let i = 0; i < subCategory.length; i++) {
                arr.push({ subCategoryId: subCategory[i] });
            }
            query.$and.push({ $or: arr });
        }
        if (subSubCategory && subSubCategory.length > 0) {
            let arr = [];
            for (let i = 0; i < subSubCategory.length; i++) {
                arr.push({ subSubCategoryId: subSubCategory[i] });
            }
            query.$and.push({ $or: arr });
        }

        if (priceLt && priceGt) {
            query.$and.push({
                $elemMatch: { price: { $gte: priceLt, $lte: priceGt } },
            });
        }
        if (discountLt && discountGt) {
            query.$and.push({
                variations: { $elemMatch: { discountPercentage: { $gte: discountLt, $lte: discountGt } } },
            });
        }

        if (search) {
            let searchString = search.trim().toLowerCase();
            let arr = [];
            arr.push({ producName: { $regex: searchString, $options: "i" } });
            arr.push({ ribbon: { $regex: searchString, $options: "i" } });
            arr.push({ gender: { $regex: searchString, $options: "i" } });
            arr.push({ productDescription: { $regex: searchString, $options: "i" } });
           
            query.$and.push({ $or: arr });
        }
        else {
            products = await StarPerformer.find({ ...query })
                .sort(sortBy)
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            totalPages = (await StarPerformer.find({ ...query }).countDocuments()) / limit;
        }

        if (sortMethod === "oldToNew") {
            sortBy = "createdAt";
        } else if (sortMethod === "lowToHigh") {
            sortBy = "price";
        } else if (sortMethod === "highToLow") {
            sortBy = "-price";
        } else {
            sortBy = "-createdAt";
        }

        console.log(products);
        return { productList: products, pages: Math.ceil(totalPages) };



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
}