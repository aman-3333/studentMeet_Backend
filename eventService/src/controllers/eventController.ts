import moment from 'moment';
import event, { IEvent } from '../models/event'
import User from "../models/Users"

export default class eventController {

    public async createevent(body: IEvent) {
        let eventInfo: IEvent;
        eventInfo = await event.create(body);

        return eventInfo;
    }


    public async editevent(body: IEvent, eventId: string) {

        const eventInfo: IEvent = await event.findOneAndUpdate({ _id: eventId, isDeleted: false }, body, { new: true }).lean();
        return eventInfo;

    }

    public async getevent() {
        var currentTime = new Date();
     let addhours=   moment(currentTime).format("dddd, MMMM Do YYYY, h:mm:ss a");  
     console.log("addhours",addhours);
     
        const eventList: IEvent[] = await event.find({ isDeleted: false,isActive:true });
        return eventList;
    }

    public async geteventInfo(eventId: any, status: any) {
        let eventInfo: any;
        let organizerInfo: any;
        eventInfo = await event.findOne({ _id: eventId, isDeleted: false }).lean();
        if (status == "organizerDetail") {
            organizerInfo = await User.find({ _id: { $in: eventInfo.organizerId } }).lean()
        }
        return { eventInfo, organizerInfo };
    }

    public async deleteevent(eventId: string, userId: String) {

        const eventInfo: IEvent = await event.findOneAndUpdate({ _id: eventId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return eventInfo;


    }

    public async filterEvent(

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
            arr.push({ productName: { $regex: searchString, $options: "i" } });
            arr.push({ ribbon: { $regex: searchString, $options: "i" } });
            arr.push({ gender: { $regex: searchString, $options: "i" } });
            arr.push({ productDescription: { $regex: searchString, $options: "i" } });
            arr.push({
                variations: {
                    $elemMatch: { color: { $regex: searchString, $options: "i" } },
                },
            });
            arr.push({
                variations: {
                    $elemMatch: { size: { $regex: searchString, $options: "i" } },
                },
            });
            arr.push({
                variations: {
                    $elemMatch: {
                        variationName: { $regex: searchString, $options: "i" },
                    },
                },
            });
            query.$and.push({ $or: arr });
        }
        else {
            products = await event.find({ ...query })
                .sort(sortBy)
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            totalPages = (await event.find({ ...query }).countDocuments()) / limit;
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






    // public async filterProduct(

    //     category: any,
    //     subCategory: any[],
    //     subSubCategory: any[],
    //     search: any,
    //     priceLt: any,
    //     priceGt: any,
    //     discountLt: any,
    //     discountGt: any,

    //     page: any = 1,
    //     limit: any = 10,
    //     sortMethod: any,


    //   ) {
    //     let products: any[] = [];
    //     let totalPages: any;
    //     let sortBy: any;
    //     let maxPrice: any = 0;
    //     let prodCategories: any[] = [];
    //     let prodVariations: any = new Map();
    //     let cat: any[] = [];
    //     let catName: any[] = [];
    //     let BusinessInfo: any = [];

    //     let query: any = {};
    //     let queryColl: any = {};
    //     if (BusinessInfo) {
    //       query = { $and: [{ isDeleted: false },  { productActive: true }] };
    //       //queryColl = { $and: [{ isDeleted: false, businessShopId: new ObjectId(BusinessInfo._id) }] };

    //       if (search) {
    //         products = await Product.aggregate([
    //           { $match: { $text: { $search: search }, isDeleted: false, productActive: true } },
    //           { $sort: { score: { $meta: "textScore" } } },
    //           { $project: { productPicture: 1, discountPercentage: 1, price: 1, salePrice: 1, stock: 1,  productName: 1 } },
    //           { $skip: (page - 1) * limit },
    //           { $limit: limit }
    //         ]);
    //         totalPages = await Product.aggregate([
    //           { $match: { $text: { $search: search }, isDeleted: false,  productActive: true } },
    //           { $group: { _id: null, myCount: { $sum: 1 } } }
    //         ]);
    //         if (totalPages && totalPages.length > 0 && totalPages[0].myCount) {
    //           totalPages = totalPages[0].myCount / limit;
    //         } else {
    //           totalPages = 0;
    //         }
    //       } else {
    //         if (category) {
    //           query.$and.push({ categoryId: category });
    //         }
    //         if (subCategory && subCategory.length > 0) {
    //           let arr = [];
    //           for (let i = 0; i < subCategory.length; i++) {
    //             arr.push({ subCategoryId: new ObjectId(subCategory[i]) });
    //           }
    //           query.$and.push({ $or: arr });
    //         }
    //         if (subSubCategory && subSubCategory.length > 0) {
    //           let arr = [];
    //           for (let i = 0; i < subSubCategory.length; i++) {
    //             arr.push({ subSubCategoryId: subSubCategory[i] });
    //           }
    //           query.$and.push({ $or: arr });
    //         }
    //         if (varColor && varColor.length > 0) {
    //           let arr = [];
    //           for (let i = 0; i < varColor.length; i++) {
    //             arr.push({ variations: { $elemMatch: { color: varColor[i] } } });
    //           }
    //           query.$and.push({ $or: arr });
    //           // console.log('111', varColor);
    //         }
    //         if (varSize && varSize.length > 0) {
    //           let arr = [];
    //           for (let i = 0; i < varSize.length; i++) {
    //             arr.push({ variations: { $elemMatch: { size: varSize[i] } } });
    //           }
    //           query.$and.push({ $or: arr });
    //         }
    //         if (priceLt && priceGt) {
    //           query.$and.push({
    //             variations: { $elemMatch: { salePrice: { $gte: priceLt, $lte: priceGt } } },
    //           });
    //         }
    //         if (discountLt && discountGt) {
    //           query.$and.push({
    //             variations: { $elemMatch: { discountPercentage: { $gte: discountLt, $lte: discountGt } } },
    //           });
    //         }
    //         if (packSize && packSize.length > 0) {
    //           let arr = [];
    //           for (let i = 0; i < packSize.length; i++) {
    //             arr.push({ variations: { $elemMatch: { packSize: packSize[i] } } });
    //           }
    //           query.$and.push({ $or: arr });
    //         }
    //         if (sortMethod === "old To New") {
    //           sortBy = { createdAt: 1 };
    //         } else if (sortMethod === "low To High") {
    //           sortBy = { "variations.salePrice": 1 };
    //         } else if (sortMethod === "high To Low") {
    //           sortBy = { "variations.salePrice": -1 };
    //         } else {
    //           sortBy = { createdAt: -1 };
    //         }

    //         // if (varCollection && varCollection.length > 0) {
    //         //   let varquery: any = [];
    //         //   varquery.push({ '$match': { '$expr': { '$in': ['$_id', '$$id'] }, 'isDeleted': false, 'businessShopId': new ObjectId(BusinessInfo._id), 'productActive': true } })
    //         //   // varquery.push({ '$match': { "isDeleted": false, "businessShopId": BusinessInfo._id, "productActive": true } })
    //         //   // varquery = { '$and': [{ 'isDeleted': false }, { 'businessShopId': BusinessInfo._id }, { 'productActive': true }] };
    //         //   // if (category) {
    //         //   //   varquery['$and'].push({ 'categoryId': category });
    //         //   // }
    //         //   if (subCategory && subCategory.length > 0) {
    //         //     let arr = subCategory.map(v => new ObjectId(v));
    //         //     // for (let i = 0; i < subCategory.length; i++) {
    //         //     //   arr.push({ 'subCategoryId': new ObjectId(subCategory[i]) });
    //         //     // }
    //         //     // varquery['$and'].push({ '$or': arr });
    //         //     varquery.push({ '$match': { '$expr': { '$in': ['$subCategoryId', arr] } } });
    //         //   }
    //         //   // if (varColor && varColor.length > 0) {
    //         //   //   let arr = [];
    //         //   //   for (let i = 0; i < varColor.length; i++) {
    //         //   //     arr.push({ 'variations': { '$elemMatch': { 'color': varColor[i] } } });
    //         //   //   }
    //         //   //   varquery['$and'].push({ '$or': arr });
    //         //   //   // console.log('111', varColor);
    //         //   // }
    //         //   // if (varSize && varSize.length > 0) {
    //         //   //   let arr = [];
    //         //   //   for (let i = 0; i < varSize.length; i++) {
    //         //   //     arr.push({ 'variations': { '$elemMatch': { 'size': varSize[i] } } });
    //         //   //   }
    //         //   //   varquery['$and'].push({ '$or': arr });
    //         //   // }
    //         //   // if (priceLt && priceGt) {
    //         //   //   varquery['$and'].push({
    //         //   //     'variations': { '$elemMatch': { 'salePrice': { '$gte': priceLt, '$lte': priceGt } } },
    //         //   //   });
    //         //   // }
    //         //   // if (discountLt && discountGt) {
    //         //   //   varquery['$and'].push({
    //         //   //     'variations': { '$elemMatch': { 'discountPercentage': { '$gte': discountLt, '$lte': discountGt } } },
    //         //   //   });
    //         //   // }
    //         //   // varquery['$expr'] = { '$in': ['$_id', '$$id'] };

    //         //   let arr = [];
    //         //   for (let i = 0; i < varCollection.length; i++) {
    //         //     arr.push({ _id: new ObjectId(varCollection[i]) });
    //         //   }
    //         //   queryColl.$and.push({ $or: arr });
    //         //   let data = await Collection.aggregate([
    //         //     { $match: { ...queryColl } },
    //         //     {
    //         //       $lookup: {
    //         //         'from': 'products',
    //         //         'let': { 'id': '$productId' },
    //         //         'pipeline': [
    //         //           ...varquery,
    //         //           { '$sort': sortBy },
    //         //           { '$skip': (page - 1) * limit },
    //         //           {
    //         //             '$limit': limit
    //         //           }
    //         //         ],
    //         //         'as': 'productId'
    //         //       }
    //         //     }
    //         //   ]);
    //         //   console.log('111', data);

    //         //   if (data && data.length > 0) {
    //         //     for (let i = 0; i < data.length; i++) {
    //         //       products = [...products, ...data[i].productId];
    //         //       // console.log(data[i].productId);
    //         //     }
    //         //     const productSet = new Set([...products]);
    //         //     products = Array.from(productSet);
    //         //   }
    //         //   let pages: any = await Collection.aggregate([
    //         //     { $match: { ...queryColl } },
    //         //     { $project: { productId: 1 } }
    //         //   ]);
    //         //   totalPages = await pages.reduce((tot: any, v: any, ind: number) => {
    //         //     return tot + v.productId.length;
    //         //   }, 0);
    //         //   totalPages = totalPages / limit;
    //         // }

    //         if (varCollection && varCollection.length > 0) {
    //           const lim = Math.ceil(limit / varCollection.length);
    //           let arr = [];
    //           for (let i = 0; i < varCollection.length; i++) {
    //             arr.push({ _id: varCollection[i] });
    //           }
    //           queryColl.$and.push({ $or: arr });
    //           let data = await Collection.find({ ...queryColl })
    //             .populate({
    //               path: "productId",
    //               match: { ...query },
    //               // perDocumentLimit: limit,
    //               // options: { skip: (page - 1) * lim, sort: sortBy, limit: lim },
    //             })
    //             .lean();
    //           if (data && data.length > 0) {
    //             for (let i = 0; i < data.length; i++) {
    //               products = [...products, ...data[i].productId];
    //               // console.log(data[i].productId);
    //             }
    //             const productSet = new Set([...products]);
    //             products = Array.from(productSet);
    //             totalPages = products.length / limit;
    //             console.log("line no 641", totalPages, products.length, limit)
    //             products = products.slice((page - 1) * limit, page * limit);
    //             // totalPages = totalPages / limit;
    //           }
    //           // let pages: any = await Collection.find({ ...queryColl });
    //           // totalPages = await pages.reduce((tot: any, v: any, ind: number) => {
    //           //   return tot + v.productId.length;
    //           // }, 0);
    //           // totalPages = totalPages / limit;
    //         }
    //         else {
    //           products = await Product.aggregate([
    //             { $match: { ...query } },
    //             { $sort: sortBy },
    //             { $project: { productPicture: 1, discountPercentage: 1, price: 1, salePrice: 1, stock: 1, variationOption: 1, productName: 1 } },
    //             { $skip: (page - 1) * limit },
    //             { $limit: limit }
    //           ]);
    //           totalPages = await Product.aggregate([
    //             { $match: { ...query } },
    //             { $group: { _id: null, myCount: { $sum: 1 } } }
    //           ]);
    //           if (totalPages && totalPages.length > 0 && totalPages[0].myCount) {
    //             totalPages = totalPages[0].myCount / limit;
    //           } else {
    //             totalPages = 0;
    //           }


    //         }
    //       }
    //       let priceArr = await Product.aggregate([
    //         { $match: { businessShopId: BusinessInfo._id, isDeleted: false, productActive: true } },
    //         { $project: { variations: 1, subCategoryId: 1, subCategoryName: 1, variationOption: 1, salePrice: 1 } }
    //       ]);
    //       if (priceArr && priceArr.length > 0) {
    //         for (let i = 0; i < priceArr.length; i++) {
    //           if (priceArr[i].salePrice > maxPrice) {
    //             maxPrice = priceArr[i].salePrice;
    //           }
    //           if (priceArr[i].subCategoryId && priceArr[i].subCategoryName) {
    //             cat.push(priceArr[i].subCategoryId.toString());
    //             catName.push(priceArr[i].subCategoryName);
    //           }
    //           if (priceArr[i].variationOption && priceArr[i].variationOption.length > 0) {
    //             for (let k = 0; k < priceArr[i].variationOption.length; k++) {
    //               if (prodVariations.has(priceArr[i].variationOption[k].name)) {
    //                 let variation: any[] = prodVariations.get(priceArr[i].variationOption[k].name);
    //                 variation = [...variation, ...priceArr[i].variationOption[k].value];
    //                 prodVariations.set(priceArr[i].variationOption[k].name, [...new Set(variation)]);
    //               } else {
    //                 prodVariations.set(priceArr[i].variationOption[k].name, [...priceArr[i].variationOption[k].value]);
    //               }
    //             }
    //           }
    //         }
    //       }

    //       let vars: any = {};
    //       for (const [key, value] of prodVariations) {
    //         vars[key] = value;
    //       }
    //       if (cat.length > 0 && catName.length > 0) {
    //         cat = [...new Set(cat)]
    //         catName = [...new Set(catName)]
    //         prodCategories = cat.map((v, i) => {
    //           return {
    //             subCategoryId: v,
    //             subCategoryName: catName[i]
    //           }
    //         });
    //       }
    //       return { productList: products, pages: Math.ceil(totalPages), maxPrice, prodCategories, prodVariations: vars };
    //     }

    //   }


    public async eventActivity(userId: any, eventId: any, status: any, body: any) {

        let userInfo: any;
        if (status == "addToWishList") {
            userInfo = await User.findOne(
                { wishListProduct: { $in: eventId } },
                { _id: userId }
            );

            if (!userInfo) {
                userInfo = await User.updateOne(
                    { _id: userId },
                    { $push: { wishListProduct: eventId } }
                );
            }
            console.log("userInfo", userInfo);

            return userInfo;
        }
        if (status == "removeWishList") {
            userInfo = await User.updateOne(
                { _id: userId },
                { $pull: { wishListProduct: eventId } }
            );
            console.log("userInfo", userInfo);

            return userInfo;
        } else if (status == "readWishList") {
            userInfo = await User.findOne({ _id: userId });
            let wishlistInfo = userInfo.wishListProduct;
            let eventInfo: any = await event.find({ _id: { $in: { wishlistInfo } } }).lean()


            return eventInfo;
        } if (status == "addToPurchaceList") {
            userInfo = await User.findOne(
                { PurchaceList: { $in: eventId } },
                { _id: userId }
            );

            if (!userInfo) {
                userInfo = await User.updateOne(
                    { _id: userId },
                    { $push: { PurchaceList: eventId } }
                );
            }
            console.log("userInfo", userInfo);

            return userInfo;
        }
        if (status == "removePurchaceList") {
            userInfo = await User.updateOne(
                { _id: userId },
                { $pull: { PurchaceList: eventId } }
            );
            console.log("userInfo", userInfo);

            return userInfo;
        } else if (status == "readPurchaceList") {
            userInfo = await User.findOne({ _id: userId });
            let wishlistInfo = userInfo.PurchaceList;
            let eventInfo: any = await event.find({ _id: { $in: { wishlistInfo } } }).lean()


            return eventInfo;
        }
        if (status == "addPricedownReminder") {
            userInfo = await User.findOne(
                { pricedownReminder: { $in: eventId } },
                { _id: userId }
            );

            if (!userInfo) {
                userInfo = await User.updateOne(
                    { _id: userId },
                    { $push: { pricedownReminder: eventId } }
                );
            }
            console.log("userInfo", userInfo);

            return userInfo;
        }
        if (status == "removePricedownReminder") {
            userInfo = await User.updateOne(
                { _id: userId },
                { $pull: { pricedownReminder: eventId } }
            );
            console.log("userInfo", userInfo);

            return userInfo;
        } else if (status == "readPricedownReminder") {
            userInfo = await User.findOne({ _id: userId });
            let pricedownReminderInfo = userInfo.pricedownReminder;
            let eventInfo: any = await event.find({ _id: { $in: { pricedownReminderInfo } } }).lean()


            return eventInfo;
        }

        if (status == "likeevent") {
            userInfo = await User.findOne(
                { likeevent: { $in: eventId } },
                { _id: userId }
            );

            if (!userInfo) {
                userInfo = await User.updateOne(
                    { _id: userId },
                    { $push: { likeevent: eventId } }
                );
            }
            console.log("userInfo", userInfo);

            return userInfo;
        }
        if (status == "removelikeevent") {
            userInfo = await User.updateOne(
                { _id: userId },
                { $pull: { likeevent: eventId } }
            );
            console.log("userInfo", userInfo);

            return userInfo;
        } else if (status == "readlikeevent") {
            userInfo = await User.findOne({ _id: userId });
            let likeeventInfo = userInfo.likeevent;
            let eventInfo: any = await event.find({ _id: { $in: { likeeventInfo } } }).lean()


            return eventInfo;
        }

    }


    
    public async bookForEventOrganize(eventId: any, organizerId: any, formId: any, status: any) {

        let eventInfo: any = await event.findOne({ _id: eventId, isOrganized: false, isDeleted: false, isActive: true, isBookEventPaid: true }).lean()
        if (!eventInfo) {

            eventInfo = await event.updateOne(
                { _id: eventId },
                { $push: { organizerId: organizerId } }
            );
            return eventInfo
        }
        else {
            return ({ message: "already book" })
        }
    }



}



