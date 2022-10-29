import FuzzySearch from 'fuzzy-search';
import moment from 'moment';
import event, { IEvent } from '../models/event'
import userActivity from '../models/userActivity';
import User from "../models/userDetails"
import bookevent from "../models/eventBook"
import userDetails from '../models/userDetails';
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
        const eventList: IEvent[] = await event.find({ isDeleted: false, isActive: true, isEventVerified: true, isBookEventPaid: true });
        return eventList;
    }
    public async geteventOnHomeScreen() {
        const eventList: IEvent[] = await event.find({ isDeleted: false, isActive: true, isEventVerified: true, isBookEventPaid: true, });
        return eventList;
    }

    public async geteventInfo(eventId: any, status: any) {
        let eventInfo: any;
        let organizerInfo: any;
        eventInfo = await event.findOne({ _id: eventId, isDeleted: false }).lean();
        if (status == "organizerDetail") {
            console.log("eventInfo.organizerId", eventInfo.organizerId);

            organizerInfo = await User.find({ _id: { $in: eventInfo.organizerId } }).lean()
        }
        return { eventInfo, organizerInfo };
    }

    public async geteventbyuserId(userId:any){
let eventInfo:any=await event.find({organizerId:userId,isDeleted:false}).lean()
console.log("eventInfo",eventInfo);

return eventInfo
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
            console.log("userInfo", userInfo);
        }
        console.log("userInfo", userInfo);

        if (status == "eventLike") {
            info = await userActivity.findOne({ eventLike:body.eventLike }).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await userActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            eventLike:
                                body.eventLike
                        }
                    })
                
                await event.findOneAndUpdate({ _id: body.eventLike},
                    {$inc: {eventLikeCount:1}},{new:true}).lean()
                await event.findOneAndUpdate({
                    _id: body.eventLike
                }, {
                    $push: {
                        likeEvent:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removeeventLike") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        eventLike
                       :body.eventLike
                    }
                })
               
                await event.findOneAndUpdate({ _id: body.eventLike},
                    {$inc: {eventLikeCount:-1}},{new:true})
            await event.findOneAndUpdate({
                _id: body.eventLike
            }, {
                $pull: {
                    likeEvent:
                    userId
                }
            })
            return userInfo;
        } if (status == "readeventLike") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventLike;
         console.log("userInfo",userInfo);
         
                let eventInfo: any = await event.find({ _id:{$in:userInfo}})

           
            
            return eventInfo;
        }
      

        if (status == "eventFavorite") {
            info = await userActivity.findOne({ eventFavorite:{$in:body.eventFavorite }}).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            eventFavorite:
                                body.eventFavorite
                        }
                    })
                await event.findOneAndUpdate({ _id: body.eventFavorite},
                    {$inc: {eventFavoriteCount:1}},{new:true})
                await event.findOneAndUpdate({
                    _id: body.eventFavorite
                }, {
                    $push: {
                        eventFavorite:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removeeventFavorite") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        eventFavorite:
                        body.eventFavorite
                    }
                })
            await event.findOneAndUpdate({ _id: body.eventFavorite},
                {$inc: {eventFavoriteCount:-1}},{new:true})
            
            await event.findOneAndUpdate({
                _id: body.eventFavorite
            }, {
                $pull: {
                    eventFavorite:
                   userId
                }
            })
            return userInfo;
        } if (status == "readeventFavorite") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventFavorite;
         console.log("userInfo",userInfo);
         
                let eventInfo: any = await event.find({ _id:{$in:userInfo}})

           
            
            return eventInfo;
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

                    await event.findOneAndUpdate({ _id: body.eventcomment.eventId},
                        {$inc: {commentCount:1}},{new:true})

                

                return userInfo;
            }
        }
        if (status == "removeeventcomment") {
            userInfo = await userActivity.updateMany(
                { _id: userId },
                { $pull: { eventcomment: { eventId: eventId } } }
            );

            await event.findOneAndUpdate({ _id: body.eventcomment.eventId},
                {$inc: {commentCount:-1}},{new:true})

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

    public async readActivity(eventId:any,status:any){
        let eventInfo:any
        if(status=="readeventlike"){
            eventInfo = await event.findOne({ _id: eventId }).lean();
            eventInfo = eventInfo.likeEvent;
     
         
                let userInfo: any = await userDetails.find({ _id:{$in:eventInfo}})
          return userInfo
        }
        if(status=="readeventcomment"){
            eventInfo = await event.findOne({ _id: eventId }).lean();
            eventInfo = eventInfo.likeEvent;
                let userInfo: any = await userDetails.find({ _id:{$in:eventInfo}})
          return userInfo
        }if(status=="readeventfav"){
            eventInfo = await event.findOne({ _id: eventId }).lean();
            eventInfo = eventInfo.likeEvent;
                let userInfo: any = await userDetails.find({ _id:{$in:eventInfo}})
          return userInfo
        }
    }
    public async eventCreateBYOrganizer(body: any) {
        let eventInfo: any;
        eventInfo = await event.create(body);

        return eventInfo;

    }

    public async filterEvent(type:any,sort: any, category: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
        let eventInfo: any;
      if (type=="event") {
    

      
        if (category) {
            eventInfo = await event.find({ category: category,type:"event", isDeleted: false });

        } else if (subCategory) {
            eventInfo = await event.find({ subCategory: subCategory, type:"event",isDeleted: false });
        } else if (subSubCategory) {
            eventInfo = await event.find({ subSubCategory: subSubCategory,type:"event", isDeleted: false });
        }
        else if (sort == "lessEarning") {
            eventInfo = await event.find({ isDeleted: false,type:"event" });

            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
            return eventInfo
        }
        else if (sort == "mostEarning") {
            eventInfo = await event.find({ isDeleted: false, type:"event"});
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
            return eventInfo
        }
        else if (sort == "oldtonew") {
            eventInfo = await event.find({ isDeleted: false, type:"event" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
            return eventInfo

        } else if (sort == "newtoold") {
            eventInfo = await event.find({ isDeleted: false, type:"event" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
            return eventInfo
        } else if (sort == "lessAdvanced") {
            eventInfo = await event.find({ isDeleted: false, type:"event" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.advancedEventMoney - b.advancedEventMoney });
            return eventInfo
        } else if (sort == "mostAdvanced") {
            eventInfo = await event.find({ isDeleted: false, type:"event" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.advancedEventMoney - a.advancedEventMoney });
            return eventInfo
        }
        if (search) {
            eventInfo = await event.find({ isDeleted: false, type:"event" });
            console.log("eventInfo", eventInfo);

            const searcher = new FuzzySearch(eventInfo, ["eventName", "eventPartnerName"], {
                caseSensitive: false,
            });
            eventInfo = searcher.search(search);
            return eventInfo
        }

        if (limit && skip) {

            eventInfo = eventInfo.slice(skip).slice(0, limit);

        } 


    }
    if (type=="affilate") {
    

       
        if (category) {
            eventInfo = await event.find({ category: category,type:"affilate", isDeleted: false });

        } else if (subCategory) {
            eventInfo = await event.find({ subCategory: subCategory, type:"affilate",isDeleted: false });
        } else if (subSubCategory) {
            eventInfo = await event.find({ subSubCategory: subSubCategory,type:"affilate", isDeleted: false });
        }
        else if (sort == "lessEarning") {
            eventInfo = await event.find({ isDeleted: false,type:"affilate" });

            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
            return eventInfo
        }
        else if (sort == "mostEarning") {
            eventInfo = await event.find({ isDeleted: false, type:"affilate"});
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
            return eventInfo
        }
        else if (sort == "oldtonew") {
            eventInfo = await event.find({ isDeleted: false, type:"affilate" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
            return eventInfo

        } else if (sort == "newtoold") {
            eventInfo = await event.find({ isDeleted: false, type:"affilate" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
            return eventInfo
        } else if (sort == "lessAdvanced") {
            eventInfo = await event.find({ isDeleted: false, type:"affilate" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.advancedEventMoney - b.advancedEventMoney });
            return eventInfo
        } else if (sort == "mostAdvanced") {
            eventInfo = await event.find({ isDeleted: false, type:"affilate" });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.advancedEventMoney - a.advancedEventMoney });
            return eventInfo
        }
        if (search) {
            eventInfo = await event.find({ isDeleted: false, type:"affilate" });
            console.log("eventInfo", eventInfo);

            const searcher = new FuzzySearch(eventInfo, ["eventName", "eventPartnerName"], {
                caseSensitive: false,
            });
            eventInfo = searcher.search(search);
            return eventInfo
        }

        if (limit && skip) {

            eventInfo = eventInfo.slice(skip).slice(0, limit);

        } 

        
    }
    else{
        if (category) {
            eventInfo = await event.find({ category: category, isDeleted: false });

        } else if (subCategory) {
            eventInfo = await event.find({ subCategory: subCategory, isDeleted: false });
        } else if (subSubCategory) {
            eventInfo = await event.find({ subSubCategory: subSubCategory, isDeleted: false });
        }
        else if (sort == "lessEarning") {
            eventInfo = await event.find({ isDeleted: false });

            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
            return eventInfo
        }
        else if (sort == "mostEarning") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
            return eventInfo
        }
        else if (sort == "oldtonew") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
            return eventInfo

        } else if (sort == "newtoold") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
            return eventInfo
        } else if (sort == "lessAdvanced") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return a.advancedEventMoney - b.advancedEventMoney });
            return eventInfo
        } else if (sort == "mostAdvanced") {
            eventInfo = await event.find({ isDeleted: false });
            eventInfo = eventInfo.sort(function (a: any, b: any) { return b.advancedEventMoney - a.advancedEventMoney });
            return eventInfo
        }
        if (search) {
            eventInfo = await event.find({ isDeleted: false });
            console.log("eventInfo", eventInfo);

            const searcher = new FuzzySearch(eventInfo, ["eventName", "eventPartnerName"], {
                caseSensitive: false,
            });
            eventInfo = searcher.search(search);
            return eventInfo
    }
    if (limit && skip) {

        eventInfo = eventInfo.slice(skip).slice(0, limit);

    } 

    }


    }

public async createEventOrganizerTeam(organizerId:any,eventId:any,suborganizerId:any){

    let eventInfo:any=await event.findOneAndUpdate({
        _id:eventId,
        organizerId:organizerId
    },
    {
        $push:{
            suborganizerId:suborganizerId
        }
    })
return eventInfo
}
    public async bookEvent(eventId: any, userId: any,status:any) {
        let eventInfo: any
        if(status=="book event"){
        eventInfo  = await bookevent.findOne({ eventId: eventId, userId: userId, isDeleted: false,isEventBook:true }).lean()
        if (eventInfo) return ({ message: "you already booked this event" })
        eventInfo = await bookevent.create({ eventId: eventId, userId: userId,isEventBook:true })
        return eventInfo
    }if(status=="origanize event "){
        eventInfo = await bookevent.findOne({ eventId: eventId, userId: userId, isDeleted: false, isEventOrganize:true}).lean()
        if (eventInfo) return ({ message: "you already origanize this event" })
        eventInfo = await bookevent.create({ eventId: eventId, userId: userId , isEventOrganize:true})
        return eventInfo
    }else{
        return ({message:"try another event"})
    }

    }

    public async applyForEventOrganize(eventId: any, organizerId: any, formId: any, status: any) {
        let eventInfo: any = await event.findOne({ _id: eventId, isOrganized: true, isDeleted: false, isActive: true, isBookEventPaid: true }).lean()
        if (!eventInfo) {
            eventInfo = await event.updateOne(
                { _id: eventId },
                { $push: { organizerId: organizerId } }
            );
            await event.findOneAndUpdate({ _id: eventId, isOrganized: true })
            return eventInfo
        }
        else {
            return ({ message: "already book" })
        }
    }

public async following(userId:any,followingId:any){
    let userInfo:any
    userInfo=await userActivity.findOne({following:{$in:followingId}}).lean()
if(!userInfo){
    userInfo=await userActivity.findOneAndUpdate({userId:userId,
    },{
        $push:{
            following:followingId
        }
    }).lean()
    await userActivity.findOneAndUpdate({userId:followingId,
    },{
        $push:{
            followers:userId
        }
    }).lean()

    await userActivity.findOneAndUpdate({userId:userId,
    },
    {$inc: {followingCount:1}}).lean()
    await userActivity.findOneAndUpdate({userId:followingId,
    },
    {$inc: {followersCount:1}}).lean()

}

return userInfo
}


public async unfollowing(userId:any,followingId:any){
    let userInfo:any
    userInfo=await userActivity.findOne({following:{$in:followingId}}).lean()
if(userInfo){
    userInfo=await userActivity.findOneAndUpdate({userId:userId,
    },{
        $pull:{
            following:followingId
        }
    }).lean()
    await userActivity.findOneAndUpdate({userId:followingId,
    },{
        $pull:{
            followers:userId
        }
    }).lean()

    await userActivity.findOneAndUpdate({userId:userId,
    },
    {$inc: {followingCount:-1}}).lean()
    await userActivity.findOneAndUpdate({userId:followingId,
    },
    {$inc: {followersCount:-1}}).lean()

}

return userInfo
}


}



