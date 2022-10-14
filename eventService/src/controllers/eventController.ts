import FuzzySearch from 'fuzzy-search';
import moment from 'moment';
import event, { IEvent } from '../models/event'
import userActivity from '../models/userActivity';
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
        const eventList: IEvent[] = await event.find({ isDeleted: false, isActive: true, isEventVerified: true });
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

    // public async filterEvent(

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





    // ) {
    //     let products: any[] = [];
    //     let totalPages: any;
    //     let sortBy: any;


    //     let query: any = {};

    //     query = { $and: [{ isDeleted: false, isActive: true, }] };
    //     let queryColl: any = { $and: [{ isDeleted: false, }] };


    //     if (category) {
    //         query.$and.push({ categoryId: category });
    //     }
    //     if (subCategory && subCategory.length > 0) {
    //         let arr = [];
    //         for (let i = 0; i < subCategory.length; i++) {
    //             arr.push({ subCategoryId: subCategory[i] });
    //         }
    //         query.$and.push({ $or: arr });
    //     }
    //     if (subSubCategory && subSubCategory.length > 0) {
    //         let arr = [];
    //         for (let i = 0; i < subSubCategory.length; i++) {
    //             arr.push({ subSubCategoryId: subSubCategory[i] });
    //         }
    //         query.$and.push({ $or: arr });
    //     }

    //     if (priceLt && priceGt) {
    //         query.$and.push({
    //             $elemMatch: { price: { $gte: priceLt, $lte: priceGt } },
    //         });
    //     }
    //     if (discountLt && discountGt) {
    //         query.$and.push({
    //             variations: { $elemMatch: { discountPercentage: { $gte: discountLt, $lte: discountGt } } },
    //         });
    //     }

    //     if (search) {
    //         let searchString = search.trim().toLowerCase();
    //         let arr = [];
    //         arr.push({ productName: { $regex: searchString, $options: "i" } });
    //         arr.push({ ribbon: { $regex: searchString, $options: "i" } });
    //         arr.push({ gender: { $regex: searchString, $options: "i" } });
    //         arr.push({ productDescription: { $regex: searchString, $options: "i" } });
    //         arr.push({
    //             variations: {
    //                 $elemMatch: { color: { $regex: searchString, $options: "i" } },
    //             },
    //         });
    //         arr.push({
    //             variations: {
    //                 $elemMatch: { size: { $regex: searchString, $options: "i" } },
    //             },
    //         });
    //         arr.push({
    //             variations: {
    //                 $elemMatch: {
    //                     variationName: { $regex: searchString, $options: "i" },
    //                 },
    //             },
    //         });
    //         query.$and.push({ $or: arr });
    //     }
    //     else {
    //         products = await event.find({ ...query })
    //             .sort(sortBy)
    //             .skip((page - 1) * limit)
    //             .limit(limit)
    //             .lean();
    //         totalPages = (await event.find({ ...query }).countDocuments()) / limit;
    //     }

    //     if (sortMethod === "oldToNew") {
    //         sortBy = "createdAt";
    //     } else if (sortMethod === "lowToHigh") {
    //         sortBy = "price";
    //     } else if (sortMethod === "highToLow") {
    //         sortBy = "-price";
    //     } else {
    //         sortBy = "-createdAt";
    //     }

    //     console.log(products);
    //     return { productList: products, pages: Math.ceil(totalPages) };



    // }

    public async eventActivity(userId: any, eventId: any, status: any, eventcomment: any, eventcommentId: any, body: any) {
        let userInfo: any;
        let data: any = []
        let a: any = []
        let info: any;

        userInfo = await userActivity.findOne({ userId: userId }).lean();
        if (!userInfo) {
            userInfo = await userActivity.create({ userId: userId })
        }
        if (status == "eventLike") {

            info = await userActivity.findOne({ "eventLike.$.eventId": eventId }).lean();


            if (!info) {


                for (let i = 0; i < body.eventLike.length; i++) {
                    userInfo = await userActivity.updateMany(
                        {
                            userId: userId,
                        },
                        {
                            $push: {
                                eventLike: {
                                    eventId: body.eventLike[i].eventId
                                }
                            }
                        })
                    let eventInfo: any = await event.findOne({ _id: body.eventLike[i].eventId })
                    console.log("eventInfo", eventInfo);
                    eventInfo = eventInfo.likeCount
                    eventInfo = eventInfo + 1
                    await event.findOneAndUpdate({ _id: body.eventLike[i].eventId }, { $set: { likeCount: eventInfo } })
                }
                return userInfo;
            }
        }
        if (status == "removeeventLike") {
            userInfo = await userActivity.updateMany(
                { _id: userId },
                { $pull: { eventLike: { eventId: eventId } } }
            );
            let eventInfo: any = await event.findOne({ _id: eventId })


            eventInfo = eventInfo.likeCount
            eventInfo = eventInfo - 1
            await event.findOneAndUpdate({ _id: eventId }, { $set: { likeCount: eventInfo } })
            return userInfo;
        } if (status == "readeventLike") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventLike;
            for (let i = 0; i < userInfo.length; i++) {
                let eventInfo: any = await event.findOne({ _id: userInfo[i].eventId })

                data.push(eventInfo)
            }
            return data;
        }
        if (status == "eventFavorite") {

            info = await userActivity.findOne({ "eventFavorite.$.eventId": eventId }).lean();


            if (!info) {


                for (let i = 0; i < body.eventFavorite.length; i++) {
                    userInfo = await userActivity.updateMany(
                        {
                            userId: userId,
                        },
                        {
                            $push: {
                                eventFavorite: {
                                    eventId: body.eventFavorite[i].eventId
                                }
                            }
                        })

                    let eventInfo: any = await event.findOne({ _id: body.eventLike[i].eventId })


                    eventInfo = eventInfo.favoriteCount
                    eventInfo = eventInfo + 1
                    await event.findOneAndUpdate({ _id: body.eventFavorite[i].eventId }, { $set: { favoriteCount: eventInfo } })
                }
                return userInfo;
            }
        }
        if (status == "removeeventFavorite") {
            userInfo = await userActivity.updateMany(
                { _id: userId },
                { $pull: { eventFavorite: { eventId: eventId } } }
            );
            let eventInfo: any = await event.findOne({ _id: eventId })
            eventInfo = eventInfo.eventFavorite
            eventInfo = eventInfo - 1
            await event.findOneAndUpdate({ _id: eventId }, { $set: { favoriteCount: eventInfo } })
            return userInfo;
        } if (status == "readeventFavorite") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventFavorite;
            for (let i = 0; i < userInfo.length; i++) {
                let eventInfo: any = await event.findOne({ _id: userInfo[i].eventId })

                data.push(eventInfo)
            }
            return data;
        }
        if (status == "eventcomment") {
            let currentTime: any = new Date();;
            for (let i = 0; i < body.eventcomment.length; i++) {
                userInfo = await userActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            eventcomment: {
                                eventId: body.eventcomment[i].eventId,
                                comment: body.eventcomment[i].comment,
                                time: currentTime
                            }
                        }
                    })

                await event.aggregate([
                    { $group: { _id: eventId, commentCount: { $sum: 1 } } }
                ])

                return userInfo;
            }
        }
        if (status == "removeeventcomment") {
            userInfo = await userActivity.updateMany(
                { _id: userId },
                { $pull: { eventcomment: { eventId: eventId } } }
            );

            return userInfo;
        } if (status == "readeventcomment") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventcomment;

            console.log("comment", userInfo);
            for (let i = 0; i < userInfo.length; i++) {
                let eventInfo: any = await event.findOne({ _id: userInfo[i].eventId })

                let comment: any = userInfo[i].comment
                let commentTime: any = userInfo[i].time

                data.push({ eventInfo, comment, commentTime })
            }
            return data;
        }
    }

    public async eventCreateBYOrganizer(body: any) {
        let eventInfo: IEvent;
        eventInfo = await event.create(body);

        return eventInfo;

    }

    public async filterEvent(order: any, category: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
        let eventInfo: any;
        if (category) {
            eventInfo = await event.find({ category: category, isDeleted: false });

        } else if (subCategory) {
            eventInfo = await event.find({ subCategory: subCategory, isDeleted: false });
        } else if (subSubCategory) {
            eventInfo = await event.find({ subSubCategory: subSubCategory, isDeleted: false });
        }
        else if (order == "htl") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.noOfPosition - a.noOfPosition });
        }
        else if (order == "htl") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.noOfPosition - a.noOfPosition });
        }
        else if (order == "htl") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.noOfPosition - a.noOfPosition });
        } else if (order == "htl") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.noOfPosition - a.noOfPosition });
        }
        if (search) {
            const searcher = new FuzzySearch(eventInfo, ["shopName"], {
                caseSensitive: false,
            });
            eventInfo = searcher.search(search);
        }

        if (limit && skip) {

            eventInfo = eventInfo.slice(skip).slice(0, limit);

        } else {
            let eventInfo: any = await event.find({ category: category, isDeleted: false });
        }
        return eventInfo;
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

    // public async findAllJob(instituteId: any, position: any, status: any, order: any, search: any, limit: any, skip: any) {
    //     if (instituteId) {
    //         let allJobInfo = undefined;
    //         if (position) {
    //             allJobInfo = await Vacancy.find({ institute: instituteId, position: position, isDeleted: false }).lean();
    //         }
    //         else if (status) {
    //             allJobInfo = await Vacancy.find({ institute: instituteId, isStatus: status, isDeleted: false }).lean();
    //         }
    //         else if (order == "lth") {
    //             const JobInfo = await Vacancy.find({ institute: instituteId, isDeleted: false }).lean();
    //             allJobInfo = JobInfo.sort(function (a: any, b: any) { return a.noOfPosition - b.noOfPosition });
    //         }
    //         else if (order == "htl") {
    //             const JobInfo = await Vacancy.find({ institute: instituteId, isDeleted: false }).lean();
    //             allJobInfo = JobInfo.sort(function (a: any, b: any) { return b.noOfPosition - a.noOfPosition });
    //         }
    //         else if (search) {
    //             allJobInfo = await Vacancy.find({ institute: instituteId, isDeleted: false }).lean();
    //             const searcher = new FuzzySearch(allJobInfo, ['title', 'qualification'], {
    //                 caseSensitive: false,
    //             });
    //             allJobInfo = searcher.search(search);

    //         }
    //         else {
    //             allJobInfo = await Vacancy.find({ institute: instituteId, isDeleted: false }).lean();
    //             allJobInfo = await this.updateExpiredData(allJobInfo, instituteId);
    //         }
    //         for (let i = 0; i < allJobInfo.length; i++) {
    //             const total = await Applicant.find({ vacancy: allJobInfo[i]._id, isDeleted: false }).count();
    //             allJobInfo[i] = { ...allJobInfo[i], applicants: total };
    //         }

    //         if (limit && skip) {
    //             const total = allJobInfo.length;
    //             allJobInfo = allJobInfo.slice(skip).slice(0, limit);
    //             return { total, allJobInfo };
    //         }

    //         return { allJobInfo };

    //     }
    //     else {
    //         const allJobInfo = await Vacancy.find({ isDeleted: false }).lean();
    //         return { allJobInfo };
    //     }

    // }

}



