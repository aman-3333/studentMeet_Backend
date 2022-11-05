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

    public async geteventEventScreen(type:any) {
        const eventList: IEvent[] = await event.find({type:type ,isDeleted: false }).populate("organizerId", "fullname");
        return eventList;
    }
    public async geteventOnHomeScreen(type:any) {
        const eventList: IEvent[] = await event.find({type:type , isDeleted: false, isActive: true, isEventVerified: true, isBookEventPaid: true, }).populate("organizerId", "fullname");;
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

    public async geteventbyuserId(userId: any) {
        let eventInfo: any = await event.find({ organizerId: userId, isDeleted: false }).lean()


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

        }


        if (status == "eventLike") {
            info = await userActivity.findOne({ eventLike: body.eventLike }).lean();


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

                await event.findOneAndUpdate({ _id: body.eventLike },
                    { $inc: { eventLikeCount: 1 } }, { new: true }).lean()
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
                            : body.eventLike
                    }
                })

            await event.findOneAndUpdate({ _id: body.eventLike },
                { $inc: { eventLikeCount: -1 } }, { new: true })
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


            let eventInfo: any = await event.find({ _id: { $in: userInfo } })



            return eventInfo;
        }


        if (status == "eventFavorite") {
            info = await userActivity.findOne({ eventFavorite: { $in: body.eventFavorite } }).lean();


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
                await event.findOneAndUpdate({ _id: body.eventFavorite },
                    { $inc: { eventFavoriteCount: 1 } }, { new: true })
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
            await event.findOneAndUpdate({ _id: body.eventFavorite },
                { $inc: { eventFavoriteCount: -1 } }, { new: true })

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


            let eventInfo: any = await event.find({ _id: { $in: userInfo } })



            return eventInfo;
        }

        if (status == "eventcomment") {


            let currentTime: any = new Date();
            for (let i = 0; i < body.eventcomment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: body.eventcomment[i].userId,
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
                await event.findOneAndUpdate(
                    {
                        _id: body.eventcomment[i].eventId,
                    },
                    {
                        $push: {
                            eventcomment: {
                                userId: body.eventcomment[i].userId,
                                comment: body.eventcomment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                await event.findOneAndUpdate({ _id: body.eventcomment[i].eventId },
                    { $inc: { eventCommentCount: 1 } }, { new: true })



                return userInfo;
            }
        }
        if (status == "removeeventcomment") {
            for (let i = 0; i < body.eventcomment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: body.eventcomment[i].userId,
                    },
                    {
                        $pull: {
                            eventcomment: {
                                eventId: body.eventcomment[i].eventId,
                                comment: body.eventcomment[i].comment,

                            }
                        }
                    })
                await event.findOneAndUpdate(
                    {
                        _id: body.eventcomment[i].eventId,
                    },
                    {
                        $pull: {
                            eventcomment: {
                                userId: body.eventcomment[i].userId,
                                comment: body.eventcomment[i].comment,

                            }
                        }
                    })

                await event.findOneAndUpdate({ _id: body.eventcomment[i].eventId },
                    { $inc: { eventCommentCount: -1 } }, { new: true })

                return userInfo;
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
            eventInfo = await event.findOne({ _id: eventId }).lean();
            eventInfo = eventInfo.likeEvent;


            let userInfo: any = await userDetails.find({ _id: { $in: eventInfo } })
            return userInfo
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



        } if (status == "readeventfav") {
            eventInfo = await event.findOne({ _id: eventId }).lean();
            eventInfo = eventInfo.likeEvent;
            let userInfo: any = await userDetails.find({ _id: { $in: eventInfo } })
            return userInfo
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

            } else if (subCategory) {
                eventInfo = await event.find({ subCategory: subCategory, type: "event", isDeleted: false });
            } else if (subSubCategory) {
                eventInfo = await event.find({ subSubCategory: subSubCategory, type: "event", isDeleted: false });
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

        eventInfo = await bookevent.findOne({ eventId: eventId, userId: userId, isDeleted: false, isEventBook: true }).lean()
        if (eventInfo) return ({ message: "you already booked this event" })
        eventInfo = await bookevent.create({ eventId: eventId, userId: userId, isEventBook: true })

        let eventData: any = await event.findOne({ _id: eventId, isDeleted: false }).lean()

        let noOfParticipent = eventData.noOfParticipentBook


        let remainingSeat = eventData.totalParticipent - noOfParticipent
        await event.findOneAndUpdate({ _id: eventId, isDeleted: false, }, { $set: { noOfParticipentBook: noOfParticipent, remainingSeat: remainingSeat } }).lean()
        return eventInfo


    }

    public async applyForEventOrganize(eventId: any, organizerId: any, formId: any, status: any) {
        let eventInfo: any = await event.findOne({ _id: eventId, isOrganized: true, isDeleted: false, isBookEventPaidz: true }).lean()

        if (eventInfo) {
            return ({ message: "already book" })
        }
        else {

            eventInfo = await event.findOneAndUpdate(
                { _id: eventId },
                { $push: { organizerId: organizerId } }
            );


            eventInfo = await event.findOneAndUpdate({ _id: eventId }, { $set: { isOrganized: true, isBookEventPaid: true } }).lean()
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


    public async feadbackEvent() {

    }

}



