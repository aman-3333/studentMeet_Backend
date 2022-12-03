import FuzzySearch from 'fuzzy-search';
import moment from 'moment';
import event, { IEvent } from '../models/event'
import userActivity from '../models/userActivity';
import User from "../models/userDetails"
import bookevent from "../models/eventBook"
import userDetails from '../models/userDetails';
import { sendNotification } from '../services/notification';
import post from '../models/post';
export default class eventController {

    public async createevent(body: IEvent) {

        let eventInfo: IEvent;
        eventInfo = await event.create(body);

        return eventInfo;
    }
    public async editevent(body: IEvent, eventId: string) {

        const eventInfo: IEvent = await event.findOneAndUpdate({ _id: eventId, isDeleted: false }, body, { new: true }).lean();
        await post.findOneAndUpdate({ _id: eventId }, { $set: { eventName: eventInfo.eventName } })
        return eventInfo;

    }
    public async geteventEventScreen(type: any) {
        const eventList: IEvent[] = await event.find({ type: type, isDeleted: false }).populate("organizerId", "fullname");
        return eventList;
    }
    public async getEventByUserId(userId: any) {
        const eventList: IEvent[] = await event.find({ organizerId: userId, isDeleted: false })
        return eventList;
    }
    public async getEventCreateByUser(userId: any) {
        const eventList: IEvent[] = await event.find({ organizerId: userId, isDeleted: false, isCreateByOrganizer: true })
        return eventList;
    }
    public async geteventOnHomeScreen(type: any) {
        const eventList: IEvent[] = await event.find({ type: type, isDeleted: false, isActive: true, isEventVerified: true, isBookEventPaid: true, }).populate("organizerId", "fullname");;
        return eventList;
    }
    public async geteventInfo(eventId: any, status: any) {
        let eventInfo: any;
        eventInfo = await event.find({ _id: eventId, isDeleted: false }).populate("organizerId")
       console.log("eventInfo", eventInfo);
       
        return  eventInfo;
    }


    public async deleteevent(eventId: string, userId: String) {

        const eventInfo: IEvent = await event.findOneAndUpdate({ _id: eventId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return eventInfo;


    }

    public async eventActivity(userId: any, eventId: any, status: any, eventcomment: any, eventcommentId: any, body: any) {
        let userInfo: any;
        let eventInfo: any;
        let data: any = []
        let a: any = []
        let info: any;

        userInfo = await userActivity.findOne({ userId: userId }).lean();


        if (!userInfo) {
            userInfo = await userActivity.create({ userId: userId })

        }


        if (status == "eventLike") {
            info = await userActivity.findOne({ eventLike: body.eventLike }).lean();
            if (info) return { message: "alreadyEventLike" }

            if (!info) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            eventLike:
                                body.eventLike
                        }
                    })

                eventInfo = await event.findOneAndUpdate({ _id: body.eventLike },
                    { $inc: { eventLikeCount: 1 } }, { new: true }).lean()
                eventInfo = await event.findOneAndUpdate({
                    _id: body.eventLike
                }, {
                    $push: {
                        likeEvent:
                            userId

                    }
                })
                return eventInfo;
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
                            : body.eventLike
                    }
                })

            eventInfo = await event.findOneAndUpdate({ _id: body.eventLike },
                { $inc: { eventLikeCount: -1 } }, { new: true })
            eventInfo = await event.findOneAndUpdate({
                _id: body.eventLike
            }, {
                $pull: {
                    likeEvent:
                        userId
                }
            })
            return eventInfo;
        } if (status == "readeventLike") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventLike;


            eventInfo = await event.find({ _id: { $in: userInfo } })



            return eventInfo;
        }


        if (status == "eventFavorite") {
            info = await userActivity.findOne({ eventFavorite: { $in: body.eventFavorite } }).lean();
            if (info) return { message: "alreadyEventFavorite" }

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
                eventInfo = await event.findOneAndUpdate({ _id: body.eventFavorite },
                    { $inc: { eventFavoriteCount: 1 } }, { new: true })
                eventInfo = await event.findOneAndUpdate({
                    _id: body.eventFavorite
                }, {
                    $push: {
                        eventFavorite:
                            userId

                    }
                })
                return eventInfo;
            }
        }
        if (status == "removeeventFavorite") {
            eventInfo = userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        eventFavorite:
                            body.eventFavorite
                    }
                })
            eventInfo = await event.findOneAndUpdate({ _id: body.eventFavorite },
                { $inc: { eventFavoriteCount: -1 } }, { new: true })

            eventInfo = await event.findOneAndUpdate({
                _id: body.eventFavorite
            }, {
                $pull: {
                    eventFavorite:
                        userId
                }
            })
            return eventInfo;
        } if (status == "readeventFavorite") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventFavorite;


            eventInfo = await event.find({ _id: { $in: userInfo } })



            return eventInfo;
        }

        if (status == "eventcomment") {


            let currentTime: any = new Date();
            for (let i = 0; i < body.eventcomment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            eventcomment: {
                                eventId: body.eventcomment[i].eventId,
                                comment: body.eventcomment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                eventInfo = await event.findOneAndUpdate(
                    {
                        _id: body.eventcomment[i].eventId,
                    },
                    {
                        $push: {
                            eventcomment: {
                                userId: userId,
                                comment: body.eventcomment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                eventInfo = await event.findOneAndUpdate({ _id: body.eventcomment[i].eventId },
                    { $inc: { eventCommentCount: 1 } }, { new: true })



                return eventInfo;
            }
        }
        if (status == "removeeventcomment") {
            for (let i = 0; i < body.eventcomment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $pull: {
                            eventcomment: {
                                eventId: body.eventcomment[i].eventId,
                                comment: body.eventcomment[i].comment,

                            }
                        }
                    })
                eventInfo = await event.findOneAndUpdate(
                    {
                        _id: body.eventcomment[i].eventId,
                    },
                    {
                        $pull: {
                            eventcomment: {
                                userId: userId,
                                comment: body.eventcomment[i].comment,

                            }
                        }
                    })

                eventInfo = await event.findOneAndUpdate({ _id: body.eventcomment[i].eventId },
                    { $inc: { eventCommentCount: -1 } }, { new: true })

                return eventInfo;
            }

        } if (status == "readeventcomment") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.eventcomment;


            for (let i = 0; i < userInfo.length; i++) {
                let eventInfo: any = await event.findOne({ _id: userInfo[i].eventId })

                let comment: any = userInfo[i].comment
                let DateTime: any = userInfo[i].dateTime

                data.push({ eventInfo, comment, DateTime })
            }
            return data;
        }
    }

    public async readActivity(eventId: any, status: any) {
        let eventInfo: any
        if (status == "readeventlike") {
            eventInfo = await event.findOne({ _id: eventId }).populate("likeEvent");
            eventInfo = eventInfo.likeEvent;

            return eventInfo
        }
        if (status == "readeventcomment") {
            let a = []
            eventInfo = await event.findOne({ _id: eventId }).lean();

            eventInfo = eventInfo.eventcomment;




            for (let i = 0; i < eventInfo.length; i++) {
                let userInfo: any = await userDetails.findOne({ _id: eventInfo[i].userId }, { fullname: true })


                let comment = eventInfo[i].comment
                let DateTime: any = eventInfo[i].dateTime

                a.push({ userInfo, comment, DateTime })
            }
            return a



        } if (status == "readEventFavourite") {
            eventInfo = await event.findOne({ _id: eventId }).populate("eventFavorite");
            eventInfo = eventInfo.eventFavorite;
            return eventInfo
        }
    }
    public async eventCreateBYOrganizer(body: any) {
        let eventInfo: any;
        eventInfo = await event.create(body);

        return eventInfo;

    }

    public async filterEvent(type: any, sort: any, category: any, subCategory: any, subSubCategory: any, limit: any, skip: any, search: any) {
        let eventInfo: any;
        if (type == "event") {



            if (category) {
                eventInfo = await event.find({ category: category, type: "event", isDeleted: false });
                return eventInfo
            }
            else if (sort == "lessEarning") {
                eventInfo = await event.find({ isDeleted: false, type: "event" });

                eventInfo = eventInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
                return eventInfo
            }
            else if (sort == "mostEarning") {
                eventInfo = await event.find({ isDeleted: false, type: "event" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
                return eventInfo
            }
            else if (sort == "oldtonew") {
                eventInfo = await event.find({ isDeleted: false, type: "event" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
                return eventInfo

            } else if (sort == "newtoold") {
                eventInfo = await event.find({ isDeleted: false, type: "event" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
                return eventInfo
            } else if (sort == "lessAdvanced") {
                eventInfo = await event.find({ isDeleted: false, type: "event" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return a.advancedEventMoney - b.advancedEventMoney });
                return eventInfo
            } else if (sort == "mostAdvanced") {
                eventInfo = await event.find({ isDeleted: false, type: "event" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return b.advancedEventMoney - a.advancedEventMoney });
                return eventInfo
            }
            if (search) {
                eventInfo = await event.find({ isDeleted: false, type: "event" });


                const searcher = new FuzzySearch(eventInfo, ["eventName", "eventPartnerName"], {
                    caseSensitive: false,
                });
                eventInfo = searcher.search(search);
                return eventInfo
            }

            if (limit && skip) {

                eventInfo = eventInfo.slice(skip).slice(0, limit);

            }

            return eventInfo
        }
        if (type == "affilate") {



            if (category) {
                eventInfo = await event.find({ category: category, type: "affilate", isDeleted: false });

            } else if (subCategory) {
                eventInfo = await event.find({ subCategory: subCategory, type: "affilate", isDeleted: false });
            } else if (subSubCategory) {
                eventInfo = await event.find({ subSubCategory: subSubCategory, type: "affilate", isDeleted: false });
            }
            else if (sort == "lessEarning") {
                eventInfo = await event.find({ isDeleted: false, type: "affilate" });

                eventInfo = eventInfo.sort(function (a: any, b: any) { return a.organizerTotalIncome - b.organizerTotalIncome });
                return eventInfo
            }
            else if (sort == "mostEarning") {
                eventInfo = await event.find({ isDeleted: false, type: "affilate" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return b.organizerTotalIncome - a.organizerTotalIncome });
                return eventInfo
            }
            else if (sort == "oldtonew") {
                eventInfo = await event.find({ isDeleted: false, type: "affilate" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return a.createdAt - b.createdAt });
                return eventInfo

            } else if (sort == "newtoold") {
                eventInfo = await event.find({ isDeleted: false, type: "affilate" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return b.createdAt - a.createdAt });
                return eventInfo
            } else if (sort == "lessAdvanced") {
                eventInfo = await event.find({ isDeleted: false, type: "affilate" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return a.advancedEventMoney - b.advancedEventMoney });
                return eventInfo
            } else if (sort == "mostAdvanced") {
                eventInfo = await event.find({ isDeleted: false, type: "affilate" });
                eventInfo = eventInfo.sort(function (a: any, b: any) { return b.advancedEventMoney - a.advancedEventMoney });
                return eventInfo
            }
            if (search) {
                eventInfo = await event.find({ isDeleted: false, type: "affilate" });


                const searcher = new FuzzySearch(eventInfo, ["eventName", "eventPartnerName"], {
                    caseSensitive: false,
                });
                eventInfo = searcher.search(search);
                return eventInfo
            }

            if (limit && skip) {

                eventInfo = eventInfo.slice(skip).slice(0, limit);

            }
            return eventInfo

        }
        else {
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

    public async createEventOrganizerTeam(organizerId: any, eventId: any, suborganizerId: any) {

        let eventInfo: any = await event.findOneAndUpdate({
            _id: eventId,
            organizerId: organizerId
        },
            {
                $push: {
                    suborganizerId: suborganizerId
                }
            })
        return eventInfo
    }

    public async bookEvent(eventId: any, userId: any, status: any) {
        let eventInfo: any
        let bookeventData: any 
        eventInfo = await event.findOne({ _id: eventId,  isDeleted: false }).lean()
        bookeventData = await bookevent.findOne({ eventId: eventId, userId: userId, isDeleted: false, isEventBook: true }).lean()

        if (bookeventData) return ({ message: "you already booked this event" })
        bookeventData = await bookevent.create({ eventId: eventId, userId: userId })
        bookeventData = await bookevent.findOneAndUpdate({ _id: bookeventData._id, isDeleted: false }, { $set: { orderTotal: eventInfo.priceForParticipent } }, { new: true }).lean()
        return bookeventData
    }

    public async applyForEventOrganize(eventId: any, organizerId: any, formId: any, status: any) {
        let eventInfo: any = await event.findOne({ _id: eventId, isOrganized: true, isDeleted: false, isBookEventPaid: true }).lean()
        console.log("eventInfo", eventInfo);
        
        if (eventInfo) {
            return ({ message: "already book" })
        }
        else {

            eventInfo = await event.findOneAndUpdate(
                { _id: eventId },
                { $set: { organizerId: organizerId } }
            );

            let bookeventData: any = await bookevent.create({ eventId: eventId, userId: organizerId,isEventOrganize:true })
            bookeventData = await bookevent.findOneAndUpdate({ _id: bookeventData._id, isDeleted: false }, { $set: { orderTotal: eventInfo.priceForParticipent } }, { new: true }).lean()
            
            return eventInfo
        }
    }

    public async following(userId: any, followingId: any) {
        let userInfo: any
        userInfo = await userActivity.findOne({ following: { $in: followingId } }).lean()
        if (!userInfo) {
            userInfo = await userActivity.findOneAndUpdate({
                userId: userId,
            }, {
                $push: {
                    following: followingId
                }
            }).lean()
            await userActivity.findOneAndUpdate({
                userId: followingId,
            }, {
                $push: {
                    followers: userId
                }
            }).lean()

            await userActivity.findOneAndUpdate({
                userId: userId,
            },
                { $inc: { followingCount: 1 } }).lean()
            await userActivity.findOneAndUpdate({
                userId: followingId,
            },
                { $inc: { followersCount: 1 } }).lean()

        }

        return userInfo
    }




    ///////////////////////////////////eventActivity/////////////////////////////////////////////////
    public async unfollowing(userId: any, followingId: any) {
        let userInfo: any
        userInfo = await userActivity.findOne({ following: { $in: followingId } }).lean()
        if (userInfo) {
            userInfo = await userActivity.findOneAndUpdate({
                userId: userId,
            }, {
                $pull: {
                    following: followingId
                }
            }).lean()
            await userActivity.findOneAndUpdate({
                userId: followingId,
            }, {
                $pull: {
                    followers: userId
                }
            }).lean()

            await userActivity.findOneAndUpdate({
                userId: userId,
            },
                { $inc: { followingCount: -1 } }).lean()
            await userActivity.findOneAndUpdate({
                userId: followingId,
            },
                { $inc: { followersCount: -1 } }).lean()

        }

        return userInfo
    }


    public async feadBackEvent(body: any, eventId: any, reting: any, feadBackComment: any) {
        let eventInfo: any;

        for (let i = 0; i < body.feadBackEvent.length; i++) {
            eventInfo = await event.findOneAndUpdate(
                {
                    _id: body.eventId
                },
                {
                    $push: {
                        feadBackEvent: {
                            reting: body.feadBackEvent[i].reting,
                            userId: body.feadBackEvent[i].userId,
                            feadBackComment: body.feadBackEvent[i].feadBackComment
                        }
                    }
                })


        }

        return eventInfo
    }
    public async getActivity(userId: any, status: any) {
        let userInfo: any;
        if (status == "following") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("following", "fullname")
        } if (status == "followers") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("followers", "fullname")
        } if (status == "blockbyOther") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("blockbyOther", "fullname")
        } if (status == "friendList") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("friendList", "fullname")
        } if (status == "blockList") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("blockList", "fullname")
        } if (status == "sendFriendRequest") {
            userInfo = await userActivity.find({ userId: userId, isDeleted: false }).populate("sendFriendRequest", "fullname")
        }
        return userInfo
    }
    public async RemoveActivity(userId: any, status: any, removeUserId: any) {
        let userInfo: any;
        if (status == "removeFollowing") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    following: removeUserId
                }
            })


        }
        if (status == "removeFollowers") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    followers: removeUserId
                }
            })
        } if (status == "removeFriendList") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    friendList: { $in: removeUserId }
                }
            })
        } if (status == "removeSendFriendRequest") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    sendFriendRequest: { $in: removeUserId }
                }
            }, { new: true })
        } if (status == "removeBlockList") {
            userInfo = await userActivity.findOneAndUpdate({ userId: userId, isDeleted: false }, {
                $pull: {
                    blockList: { $in: removeUserId }
                }
            }, { new: true })
        }

        return userInfo

    }



}



