import Hashtag, { IHashtag } from "../models/Hashtag";
import User from "../models/Users";
import Event from "../models/event"
import UserActivity, { IUserActivity } from "../models/userActivity"
export default class HashtagController {

    public async createHashtag(body: any) {
        let HashtagInfo: any;

        HashtagInfo = await Hashtag.create(body);

        return HashtagInfo;
    }

    public async editHashtag(body: IHashtag, HashtagId: string) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, body, { new: true }).lean();
        return HashtagInfo;
    }

    public async getHashtagList() {
        const HashtagList: IHashtag[] = await Hashtag.find({ isDeleted: false, isActive: true }).sort({ totalClick: -1 });
        return HashtagList;
    }

    public async getHashtagInfoById(HashtagId: string) {
        const HashtagInfo: IHashtag = await Hashtag.findOne({ _id: HashtagId, isDeleted: false }).lean();
        return HashtagInfo;
    }
  


    public async hashtagActivity(userId: any, eventId: any, hashtagId: any, status: any, hashtagcomment: any, hashtagcommentId: any, body: any) {
        let userInfo: any;
        let data: any = []
        let a: any = []
        let info: any;

        userInfo = await UserActivity.findOne({ userId: userId }).lean();
        if (!userInfo) {
            userInfo = await UserActivity.create({ userId: userId })
        }
        if (status == "hashtagLike") {

            info = await UserActivity.findOne({ "hashtagLike.$.hashtagId": hashtagId }).lean();


            if (!info) {


                for (let i = 0; i < body.hashtagLike.length; i++) {
                    userInfo = await UserActivity.updateMany(
                        {
                            userId: userId,
                        },
                        {
                            $push: {
                                hashtagLike: {
                                    hashtagId: body.hashtagLike[i].hashtagId
                                }
                            }
                        })
                    let hashtagInfo: any = await Hashtag.findOne({ _id: body.hashtagLike[i].hashtagId })
                    console.log("hashtagInfo", hashtagInfo);
                    hashtagInfo = hashtagInfo.likeCount
                    hashtagInfo = hashtagInfo + 1
                    await Hashtag.findOneAndUpdate({ _id: body.hashtagLike[i].hashtagId }, { $set: { likeCount: hashtagInfo } })
                }
                return userInfo;
            }
        }
        if (status == "removehashtagLike") {
            userInfo = await UserActivity.updateMany(
                { _id: userId },
                { $pull: { hashtagLike: { hashtagId: hashtagId } } }
            );
            let hashtagInfo: any = await Hashtag.findOne({ _id: hashtagId })


            hashtagInfo = hashtagInfo.likeCount
            hashtagInfo = hashtagInfo - 1
            await Hashtag.findOneAndUpdate({ _id: hashtagId }, { $set: { likeCount: hashtagInfo } })
            return userInfo;
        } if (status == "readhashtagLike") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.hashtagLike;
            for (let i = 0; i < userInfo.length; i++) {
                let hashtagInfo: any = await Hashtag.findOne({ _id: userInfo[i].hashtagId })
                let eventInfo: any = await Event.findOne({ _id: hashtagInfo.eventId })
                data.push(eventInfo)
            }
            return data;
        }
        if (status == "hashtagFavorite") {

            info = await UserActivity.findOne({ "hashtagFavorite.$.hashtagId": hashtagId }).lean();


            if (!info) {


                for (let i = 0; i < body.hashtagFavorite.length; i++) {
                    userInfo = await UserActivity.updateMany(
                        {
                            userId: userId,
                        },
                        {
                            $push: {
                                hashtagFavorite: {
                                    hashtagId: body.hashtagFavorite[i].hashtagId
                                }
                            }
                        })

                    let hashtagInfo: any = await Hashtag.findOne({ _id: body.hashtagLike[i].hashtagId })


                    hashtagInfo = hashtagInfo.favoriteCount
                    hashtagInfo = hashtagInfo + 1
                    await Hashtag.findOneAndUpdate({ _id: body.hashtagFavorite[i].hashtagId }, { $set: { favoriteCount: hashtagInfo } })
                }
                return userInfo;
            }
        }
        if (status == "removehashtagFavorite") {
            userInfo = await UserActivity.updateMany(
                { _id: userId },
                { $pull: { hashtagFavorite: { hashtagId: hashtagId } } }
            );
            let hashtagInfo: any = await Hashtag.findOne({ _id: hashtagId })
            hashtagInfo = hashtagInfo.hashtagFavorite
            hashtagInfo = hashtagInfo - 1
            await Hashtag.findOneAndUpdate({ _id: hashtagId }, { $set: { favoriteCount: hashtagInfo } })
            return userInfo;
        } if (status == "readhashtagFavorite") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.hashtagFavorite;
            for (let i = 0; i < userInfo.length; i++) {
                let hashtagInfo: any = await Hashtag.findOne({ _id: userInfo[i].hashtagId })
                let eventInfo: any = await Event.findOne({ _id: hashtagInfo.eventId })
                data.push(eventInfo)
            }
            return data;
        }
        if (status == "hashtagcomment") {
            let currentTime: any = new Date();;
            for (let i = 0; i < body.hashtagcomment.length; i++) {
                userInfo = await UserActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            hashtagcomment: {
                                hashtagId: body.hashtagcomment[i].hashtagId,
                                comment: body.hashtagcomment[i].comment,
                                time: currentTime
                            }
                        }
                    })

                await Hashtag.aggregate([
                    { $group: { _id: hashtagId, commentCount: { $sum: 1 } } }
                ])

                return userInfo;
            }
        }
        if (status == "removehashtagcomment") {
            userInfo = await UserActivity.updateMany(
                { _id: userId },
                { $pull: { hashtagcomment: { hashtagId: hashtagId } } }
            );

            return userInfo;
        } if (status == "readhashtagcomment") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.hashtagcomment;

            console.log("comment", userInfo);
            for (let i = 0; i < userInfo.length; i++) {
                let hashtagInfo: any = await Hashtag.findOne({ _id: userInfo[i].hashtagId })
                let eventInfo: any = await Event.findOne({ _id: hashtagInfo.eventId })
                let comment: any = userInfo[i].comment
                let commentTime: any = userInfo[i].time

                data.push({ eventInfo, hashtagInfo, comment, commentTime })
            }
            return data;
        }
    }

    public async deleteHashtag(HashtagId: String, userId: any) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, { $set: { isDeleted: true, deletedPersonId: userId } }, { new: true }).lean();
        return HashtagInfo;
    }
}