

// import User from "../models/Users"



// export default class  eventProviderController {

//     public async createventProvider(body: IEventProvider) {
//         let eventProviderInfo: IEventProvider;
//         eventProviderInfo = await eventProvider.create(body);

//         return eventProviderInfo;
//     }


//     public async editeventProvider(body: IEventProvider, eventProviderId: string) {
       
//         const eventProviderInfo: IEventProvider = await eventProvider.findOneAndUpdate({ _id: eventProviderId, isDeleted: false }, body, { new: true }).lean();
//         return eventProviderInfo;

//     }

//     public async geteventProvider() {
//         const eventProviderList: IEventProvider[] = await eventProvider.find({ isDeleted: false });
//         return eventProviderList;
//     }

//     public async geteventProviderInfo(eventProviderId: any,status:any) {
//         let eventProviderInfo: any ;
//         let organizerInfo:any;
//         eventProviderInfo  = await eventProvider.findOne({ _id: eventProviderId, isDeleted: false }).lean();
//         if(status=="organizerDetail"){
//             organizerInfo =await User.find({_id:{$in:eventProviderInfo.organizerId}}).lean()
//         }
//         return {eventProviderInfo,organizerInfo};
//     }

//     public async deleteeventProvider(eventProviderId: string, userId: String) {
        
//         const eventProviderInfo: IEventProvider = await eventProvider.findOneAndUpdate({ _id: eventProviderId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
//         return eventProviderInfo;


//     }


    

//     public async filterProduct(
   
//         category: any,
//         subCategory: any[],
//         subSubCategory: any[],
//         search: any,
//         priceLt: any,
//         priceGt: any,
//         discountLt: any,
//         discountGt: any,
        
//         page: any = 1,
//         limit: any = 10,
//         sortMethod: any,
    
    
//         price: any,
       
       
//       ) {
//         let products: any[] = [];
//         let totalPages: any;
//         let sortBy: any;
    
      
//         let query: any = {};
    
//           query = { $and: [{ isDeleted: false,  isActive: true, }] };
//           let queryColl: any = { $and: [{ isDeleted: false, }] };
    
         
//           if (category) {
//             query.$and.push({ categoryId: category });
//           }
//           if (subCategory && subCategory.length > 0) {
//             let arr = [];
//             for (let i = 0; i < subCategory.length; i++) {
//               arr.push({ subCategoryId: subCategory[i] });
//             }
//             query.$and.push({ $or: arr });
//           }
//           if (subSubCategory && subSubCategory.length > 0) {
//             let arr = [];
//             for (let i = 0; i < subSubCategory.length; i++) {
//               arr.push({ subSubCategoryId: subSubCategory[i] });
//             }
//             query.$and.push({ $or: arr });
//           }
       
//           if (priceLt && priceGt) {
//             query.$and.push({
//              $elemMatch: { price: { $gte: priceLt, $lte: priceGt } },
//             });
//           }
//           if (discountLt && discountGt) {
//             query.$and.push({
//               variations: { $elemMatch: { discountPercentage: { $gte: discountLt, $lte: discountGt } } },
//             });
//           }
        
//           if (search) {
//             let searchString = search.trim().toLowerCase();
//             let arr = [];
//             arr.push({ productName: { $regex: searchString, $options: "i" } });
//             arr.push({ ribbon: { $regex: searchString, $options: "i" } });
//             arr.push({ gender: { $regex: searchString, $options: "i" } });
//             arr.push({ productDescription: { $regex: searchString, $options: "i" } });
//             arr.push({
//               variations: {
//                 $elemMatch: { color: { $regex: searchString, $options: "i" } },
//               },
//             });
//             arr.push({
//               variations: {
//                 $elemMatch: { size: { $regex: searchString, $options: "i" } },
//               },
//             });
//             arr.push({
//               variations: {
//                 $elemMatch: {
//                   variationName: { $regex: searchString, $options: "i" },
//                 },
//               },
//             });
//             query.$and.push({ $or: arr });
//           }
//           else  {
//             products = await eventProvider.find({ ...query })
//               .sort(sortBy)
//               .skip((page - 1) * limit)
//               .limit(limit)
//               .lean();
//             totalPages = (await eventProvider.find({ ...query }).countDocuments()) / limit;
//           }
          
//           if (sortMethod === "oldToNew") {
//             sortBy = "createdAt";
//           } else if (sortMethod === "lowToHigh") {
//             sortBy = "price";
//           } else if (sortMethod === "highToLow") {
//             sortBy = "-price";
//           } else {
//             sortBy = "-createdAt";
//           }
    
         
    
        
//           console.log(products);
//           return { productList: products, pages: Math.ceil(totalPages) };
        
       
    
//       }


//       public async eventProvider(userId: any, eventProviderId: any,  status: any, body: any)
       
//       {

// let userInfo:any;
//           if (status == "addToWishList") {
//             userInfo = await User.findOne(
//               { wishListProduct: { $in: eventProviderId } },
//               { _id: userId }
//             );
      
//             if (!userInfo) {
//               userInfo = await User.updateOne(
//                 { _id: userId },
//                 { $push: { wishListProduct: eventProviderId } }
//               );
//             }
//             console.log("userInfo", userInfo);
      
//             return userInfo;
//           }
//           if (status == "removeWishList") {
//             userInfo = await User.updateOne(
//               { _id: userId },
//               { $pull: { wishListProduct: eventProviderId } }
//             );
//             console.log("userInfo", userInfo);
      
//             return userInfo;
//           } else if (status == "readWishList") {
//             userInfo = await User.findOne({ _id: userId });
//            let wishlistInfo = userInfo.wishListProduct;
//       let eventInfo:any=await eventProvider.find({_id:{$in:{wishlistInfo}}}).lean()
           

//             return eventInfo;
//           }
//           if (status == "addPricedownReminder") {
//             userInfo = await User.findOne(
//               { pricedownReminder: { $in: eventProviderId } },
//               { _id: userId }
//             );
      
//             if (!userInfo) {
//               userInfo = await User.updateOne(
//                 { _id: userId },
//                 { $push: { pricedownReminder: eventProviderId } }
//               );
//             }
//             console.log("userInfo", userInfo);
      
//             return userInfo;
//           }
//           if (status == "removePricedownReminder") {
//             userInfo = await User.updateOne(
//               { _id: userId },
//               { $pull: { pricedownReminder: eventProviderId } }
//             );
//             console.log("userInfo", userInfo);
      
//             return userInfo;
//           } else if (status == "readPricedownReminder") {
//             userInfo = await User.findOne({ _id: userId });
//            let pricedownReminderInfo = userInfo.pricedownReminder;
//       let eventInfo:any=await eventProvider.find({_id:{$in:{pricedownReminderInfo}}}).lean()
           

//             return eventInfo;
//           }

//           if (status == "likeeventProvider") {
//             userInfo = await User.findOne(
//               { likeeventProvider: { $in: eventProviderId } },
//               { _id: userId }
//             );
      
//             if (!userInfo) {
//               userInfo = await User.updateOne(
//                 { _id: userId },
//                 { $push: { likeeventProvider: eventProviderId } }
//               );
//             }
//             console.log("userInfo", userInfo);
      
//             return userInfo;
//           }
//           if (status == "removelikeeventProvider") {
//             userInfo = await User.updateOne(
//               { _id: userId },
//               { $pull: { likeeventProvider: eventProviderId } }
//             );
//             console.log("userInfo", userInfo);
      
//             return userInfo;
//           } else if (status == "readlikeeventProvider") {
//             userInfo = await User.findOne({ _id: userId });
//            let likeeventProviderInfo = userInfo.likeeventProvider;
//       let eventInfo:any=await eventProvider.find({_id:{$in:{likeeventProviderInfo}}}).lean()
           

//             return eventInfo;
//           }

//       }
//       }




