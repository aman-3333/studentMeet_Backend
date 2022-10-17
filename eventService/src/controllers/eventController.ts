import FuzzySearch from 'fuzzy-search';
import moment from 'moment';
import event, { IEvent } from '../models/event'
import userActivity from '../models/userActivity';
import User from "../models/userDetails"
import bookevent from "../models/eventBook"
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

    public async geteventEventScreen() {
        const eventList: IEvent[] = await event.find({ isDeleted: false, isActive: true, isEventVerified: true,isBookEventPaid: true });
        return eventList;
    }
    public async geteventOnHomeScreen() {
        const eventList: IEvent[] = await event.find({ isDeleted: false, isActive: true, isEventVerified: true,isBookEventPaid:true, });
        return eventList;
    }

    public async geteventInfo(eventId: any, status: any) {
        let eventInfo: any;
        let organizerInfo: any;
        eventInfo = await event.findOne({ _id: eventId, isDeleted: false }).lean();
        if (status == "organizerDetail") {
            console.log("eventInfo.organizerId",eventInfo.organizerId);
            
            organizerInfo = await User.find({ _id: { $in: eventInfo.organizerId } }).lean()
        }
        return { eventInfo, organizerInfo };
    }

    public async deleteevent(eventId: string, userId: String) {

        const eventInfo: IEvent = await event.findOneAndUpdate({ _id: eventId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return eventInfo;


    }

    

    public async eventActivity(userId: any, eventId: any, status: any, eventcomment: any, eventcommentId: any, body: any) {
        let userInfo: any;
        let data: any = []
        let a: any = []
        let info: any;

        userInfo = await userActivity.findOne({ userId: userId }).lean();
        
        
        if (!userInfo) {
            userInfo = await userActivity.create({ userId: userId })
            console.log("userInfo",userInfo);
        }
//         if (status == "eventLike") {

//             info = await userActivity.findOne({ "eventLike.$.eventId": eventId,userId:userId }).lean();


//             if (!info) {


//                 for (let i = 0; i < body.eventLike.length; i++) {
//                     userInfo = await userActivity.updateMany(
//                         {
//                             userId: userId,
//                         },
//                         {
//                             $push: {
//                                 eventLike: {
//                                     eventId: body.eventLike[i].eventId
//                                 }
//                             }
//                         })
//                     let eventInfo: any = await event.findOne({ _id: body.eventLike[i].eventId })
//                     console.log("eventInfo", eventInfo);
//                     eventInfo = eventInfo.eventLikeCount
//                     eventInfo = eventInfo + 1
//                     await event.findOneAndUpdate({ _id: body.eventLike[i].eventId }, { $set: { eventLikeCount: eventInfo } })
//                   await event.updateMany({
// _id:eventId
//                   },{
//                     $push:{
//                         likeEvent:
//                     }
//                   })
//                 }
//                 return userInfo;
//             }
//         }
        if (status == "removeeventLike") {
            userInfo = await userActivity.updateMany(
                { _id: userId },
                { $pull: { eventLike: { eventId: eventId } } }
            );
            let eventInfo: any = await event.findOne({ _id: eventId })


            eventInfo = eventInfo.eventLikeCount
            eventInfo = eventInfo - 1
            await event.findOneAndUpdate({ _id: eventId }, { $set: { eventLikeCount: eventInfo } })
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


                    eventInfo = eventInfo.eventFavoriteCount
                    eventInfo = eventInfo + 1
                    await event.findOneAndUpdate({ _id: body.eventFavorite[i].eventId }, { $set: { eventFavoriteCount: eventInfo } })
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
            eventInfo = eventInfo.eventFavoriteCount
            eventInfo = eventInfo - 1
            await event.findOneAndUpdate({ _id: eventId }, { $set: { eventFavoriteCount: eventInfo } })
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
        let eventInfo: any;
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
        else if (order == "lessEarning") {
            eventInfo = await event.find({ isDeleted: false });
            
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
            return eventInfo
        }
        else if (order == "mostEarning") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
            return eventInfo
        }
        else if (order == "oldtonew") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
            return eventInfo
           
        } else if (order == "newtoold") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
            return eventInfo
        }else if (order == "lessAdvanced") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.advancedEventMoney - b.advancedEventMoney });
            return eventInfo
        }else if (order == "mostAdvanced") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.advancedEventMoney - a.advancedEventMoney });
            return eventInfo
        }
        if (search) {
            eventInfo = await event.find({ isDeleted: false });
            console.log("eventInfo",eventInfo);
            
            const searcher = new FuzzySearch(eventInfo, ["eventName","eventPartnerName"], {
                caseSensitive: false,
            });
            eventInfo = searcher.search(search);
            return eventInfo
        }

        if (limit && skip) {

            eventInfo = eventInfo.slice(skip).slice(0, limit);

        } else {
            eventInfo = await event.find({ category: category, isDeleted: false });
            return eventInfo;
        }
        return eventInfo;
    }





public async  bookEvent(eventId:any,userId:any){
    let eventInfo:any =await bookevent.findOne({eventId:eventId,userId:userId,isDeleted:false}).lean()
    if(eventInfo) return({message:"you already booked this event"})
    eventInfo=await bookevent.create({eventId:eventId,userId:userId})
    return eventInfo
}

    public async applyForEventOrganize(eventId: any, organizerId: any, formId: any, status: any) {
        let eventInfo: any = await event.findOne({ _id: eventId, isOrganized: true, isDeleted: false, isActive: true, isBookEventPaid: true }).lean()
        if (!eventInfo) {
            eventInfo = await event.updateOne(
                { _id: eventId },
                { $push: { organizerId: organizerId } }
            );
            await event.findOneAndUpdate({_id: eventId,isOrganized: true})
            return eventInfo
        }
        else {
            return ({ message: "already book" })
        }
    }

}



