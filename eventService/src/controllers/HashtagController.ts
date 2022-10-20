import Hashtag, { IHashtag } from "../models/Hashtag";
import User from "../models/Users";
import Event from "../models/event"
import UserActivity from "../models/userActivity"
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

    public async getHashtagInfoById(HashtagId: any) {
        const HashtagInfo: any = await Hashtag.findOne({ _id: HashtagId, isDeleted: false }).lean();
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
    public async HashtagActivity(userId: any, HashtagId: any, status: any, Hashtagcomment: any, HashtagcommentId: any, body: any) {
        let userInfo: any;
        let data: any = []
        let a: any = []
        let info: any;

        userInfo = await UserActivity.findOne({ userId: userId }).lean();


        if (!userInfo) {
            userInfo = await UserActivity.create({ userId: userId })
            console.log("userInfo", userInfo);
        }
        console.log("userInfo", userInfo);

        if (status == "HashtagLike") {
            info = await UserActivity.findOne({ HashtagLike:body.HashtagLike }).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await UserActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            HashtagLike:
                                body.HashtagLike
                        }
                    })
                let HashtagInfo: any = await Hashtag.findOne({ _id: body.HashtagLike })
                console.log("HashtagInfo", HashtagInfo);
                HashtagInfo = HashtagInfo.HashtagLikeCount
                HashtagInfo = HashtagInfo + 1
                await Hashtag.findOneAndUpdate({ _id: body.HashtagLike}, { $set: { HashtagLikeCount: HashtagInfo } },{new:true})
                await Hashtag.findOneAndUpdate({
                    _id: body.HashtagLike
                }, {
                    $push: {
                        likeHashtag:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removeHashtagLike") {
            userInfo = await UserActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        HashtagLike
                       :body.HashtagLike
                    }
                })
               
            let HashtagInfo: any = await Hashtag.findOne({ _id: body.HashtagLike})
            console.log("HashtagInfo",HashtagInfo);


            HashtagInfo = HashtagInfo.HashtagLikeCount
            HashtagInfo = HashtagInfo - 1
            await Hashtag.findOneAndUpdate({ _id: body.HashtagLike}, { $set: { HashtagLikeCount: HashtagInfo } })
            await Hashtag.findOneAndUpdate({
                _id: body.HashtagLike
            }, {
                $pull: {
                    likeHashtag:
                    userId
                }
            })
            return userInfo;
        } if (status == "readHashtagLike") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.HashtagLike;
         console.log("userInfo",userInfo);
         
                let HashtagInfo: any = await Hashtag.find({ _id:{$in:userInfo}})

           
            
            return HashtagInfo;
        }
      

        if (status == "HashtagFavorite") {
            info = await UserActivity.findOne({ HashtagFavorite:{$in:body.HashtagFavorite }}).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await UserActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            HashtagFavorite:
                                body.HashtagFavorite
                        }
                    })
                let HashtagInfo: any = await Hashtag.findOne({ _id: body.HashtagFavorite })
                console.log("HashtagInfo", HashtagInfo);
                HashtagInfo = HashtagInfo.HashtagFavoriteCount
                HashtagInfo = HashtagInfo + 1
                await Hashtag.findOneAndUpdate({ _id: body.HashtagFavorite}, { $set: { HashtagFavoriteCount: HashtagInfo } },{new:true})
                await Hashtag.findOneAndUpdate({
                    _id: body.HashtagFavorite
                }, {
                    $push: {
                        HashtagFavorite:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removeHashtagFavorite") {
            userInfo = await UserActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        HashtagFavorite:
                        body.HashtagFavorite
                    }
                })
               
            let HashtagInfo: any = await Hashtag.findOne({ _id: body.HashtagFavorite})
            console.log("HashtagInfo",HashtagInfo);


            HashtagInfo = HashtagInfo.HashtagFavoriteCount
            HashtagInfo = HashtagInfo - 1
            await Hashtag.findOneAndUpdate({ _id: {$in:body.HashtagFavorite} }, { $set: { HashtagFavoriteCount: HashtagInfo } })
            await Hashtag.findOneAndUpdate({
                _id: body.HashtagFavorite
            }, {
                $pull: {
                    HashtagFavorite:
                   userId
                }
            })
            return userInfo;
        } if (status == "readHashtagFavorite") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.HashtagFavorite;
         console.log("userInfo",userInfo);
         
                let HashtagInfo: any = await Hashtag.find({ _id:{$in:userInfo}})

           
            
            return HashtagInfo;
        }

        if (status == "Hashtagcomment") {
            let currentTime: any = new Date();;
            for (let i = 0; i < body.Hashtagcomment.length; i++) {
                userInfo = await UserActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            Hashtagcomment: {
                                HashtagId: body.Hashtagcomment[i].HashtagId,
                                comment: body.Hashtagcomment[i].comment,
                                time: currentTime
                            }
                        }
                    })

                await Hashtag.aggregate([
                    { $group: { _id: HashtagId, commentCount: { $sum: 1 } } }
                ])

                return userInfo;
            }
        }
        if (status == "removeHashtagcomment") {
            userInfo = await UserActivity.updateMany(
                { _id: userId },
                { $pull: { Hashtagcomment: { HashtagId: HashtagId } } }
            );

            return userInfo;
        } if (status == "readHashtagcomment") {
            userInfo = await UserActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.Hashtagcomment;

            console.log("comment", userInfo);
            for (let i = 0; i < userInfo.length; i++) {
                let HashtagInfo: any = await Hashtag.findOne({ _id: userInfo[i].HashtagId })

                let comment: any = userInfo[i].comment
                let commentTime: any = userInfo[i].time

                data.push({ HashtagInfo, comment, commentTime })
            }
            return data;
        }
    }



    
    public async deleteHashtag(HashtagId: String, userId: any) {
        const HashtagInfo: IHashtag = await Hashtag.findOneAndUpdate({ _id: HashtagId, isDeleted: false }, { $set: { isDeleted: true, deletedPersonId: userId } }, { new: true }).lean();
        return HashtagInfo;
    }
}