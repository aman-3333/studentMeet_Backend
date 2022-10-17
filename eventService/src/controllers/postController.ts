import Post, { IPost } from "../models/post";
import userActivity from "../models/userActivity";

export default class PostController {

    public async createPost(body: any) {
        let PostInfo: any;
       
            PostInfo = await Post.create(body);
        
        return PostInfo;

    }

    public async editPost(body: IPost, PostId: string) {
        const PostInfo: IPost = await Post.findOneAndUpdate({ _id: PostId, isDeleted: false }, body, { new: true }).lean();
        return PostInfo;
    }

    public async getPostList() {
        const PostList: IPost[] = await Post.find({ isDeleted: false });
        return PostList;
    }

    public async getPostInfoById(PostId: string) {
        const PostInfo: IPost = await Post.findOne({ _id: PostId, isDeleted: false }).lean();
        return PostInfo;
    }

    public async deletePost(PostId: String) {
        const PostInfo: IPost = await Post.findOneAndUpdate({ _id: PostId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return PostInfo;
    }

//  public async PostActivity(userId: any, eventId: any, PostId: any, status: any, Postcomment: any, PostcommentId: any, body: any) {
//         let userInfo: any;
//         let data: any = []
//         let a: any = []
//         let info: any;

//         userInfo = await userActivity.findOne({ userId: userId }).lean();
//         if (!userInfo) {
//             userInfo = await userActivity.create({ userId: userId })
//         }
//         if (status == "PostLike") {

//             info = await userActivity.findOne({ "PostLike.$.PostId": PostId }).lean();


//             if (!info) {


//                 for (let i = 0; i < body.PostLike.length; i++) {
//                     userInfo = await userActivity.updateMany(
//                         {
//                             userId: userId,
//                         },
//                         {
//                             $push: {
//                                 PostLike: {
//                                     PostId: body.PostLike[i].PostId
//                                 }
//                             }
//                         })
//                     let PostInfo: any = await Post.findOne({ _id: body.PostLike[i].PostId })
//                     console.log("PostInfo", PostInfo);
//                     PostInfo = PostInfo.likeCount
//                     PostInfo = PostInfo + 1
//                     await Post.findOneAndUpdate({ _id: body.PostLike[i].PostId }, { $set: { likeCount: PostInfo } })
//                 }
//                 return userInfo;
//             }
//         }
//         if (status == "removePostLike") {
//             userInfo = await userActivity.updateMany(
//                 { _id: userId },
//                 { $pull: { PostLike: { PostId: PostId } } }
//             );
//             let PostInfo: any = await Post.findOne({ _id: PostId })


//             PostInfo = PostInfo.likeCount
//             PostInfo = PostInfo - 1
//             await Post.findOneAndUpdate({ _id: PostId }, { $set: { likeCount: PostInfo } })
//             return userInfo;
//         } if (status == "readPostLike") {
//             userInfo = await userActivity.findOne({ userId: userId }).lean();
//             userInfo = userInfo.PostLike;
//             for (let i = 0; i < userInfo.length; i++) {
//                 let PostInfo: any = await Post.findOne({ _id: userInfo[i].PostId })
//                 // let eventInfo: any = await Event.findOne({ _id: PostInfo.eventId })
//                 data.push(eventInfo)
//             }
//             return data;
//         }
//         if (status == "PostFavorite") {

//             info = await userActivity.findOne({ "PostFavorite.$.PostId": PostId }).lean();


//             if (!info) {


//                 for (let i = 0; i < body.PostFavorite.length; i++) {
//                     userInfo = await userActivity.updateMany(
//                         {
//                             userId: userId,
//                         },
//                         {
//                             $push: {
//                                 PostFavorite: {
//                                     PostId: body.PostFavorite[i].PostId
//                                 }
//                             }
//                         })

//                     let PostInfo: any = await Post.findOne({ _id: body.PostLike[i].PostId })


//                     PostInfo = PostInfo.favoriteCount
//                     PostInfo = PostInfo + 1
//                     await Post.findOneAndUpdate({ _id: body.PostFavorite[i].PostId }, { $set: { favoriteCount: PostInfo } })
//                 }
//                 return userInfo;
//             }
//         }
//         if (status == "removePostFavorite") {
//             userInfo = await userActivity.updateMany(
//                 { _id: userId },
//                 { $pull: { PostFavorite: { PostId: PostId } } }
//             );
//             let PostInfo: any = await Post.findOne({ _id: PostId })
//             PostInfo = PostInfo.PostFavorite
//             PostInfo = PostInfo - 1
//             await Post.findOneAndUpdate({ _id: PostId }, { $set: { favoriteCount: PostInfo } })
//             return userInfo;
//         } if (status == "readPostFavorite") {
//             userInfo = await userActivity.findOne({ userId: userId }).lean();
//             userInfo = userInfo.PostFavorite;
//             for (let i = 0; i < userInfo.length; i++) {
//                 let PostInfo: any = await Post.findOne({ _id: userInfo[i].PostId })
//                 let eventInfo: any = await Event.findOne({ _id: PostInfo.eventId })
//                 data.push(eventInfo)
//             }
//             return data;
//         }
//         if (status == "Postcomment") {
//             let currentTime: any = new Date();;
//             for (let i = 0; i < body.Postcomment.length; i++) {
//                 userInfo = await userActivity.updateMany(
//                     {
//                         userId: userId,
//                     },
//                     {
//                         $push: {
//                             Postcomment: {
//                                 PostId: body.Postcomment[i].PostId,
//                                 comment: body.Postcomment[i].comment,
//                                 time: currentTime
//                             }
//                         }
//                     })

//                 await Post.aggregate([
//                     { $group: { _id: PostId, commentCount: { $sum: 1 } } }
//                 ])

//                 return userInfo;
//             }
//         }
//         if (status == "removePostcomment") {
//             userInfo = await userActivity.updateMany(
//                 { _id: userId },
//                 { $pull: { Postcomment: { PostId: PostId } } }
//             );

//             return userInfo;
//         } if (status == "readPostcomment") {
//             userInfo = await userActivity.findOne({ userId: userId }).lean();
//             userInfo = userInfo.Postcomment;

//             console.log("comment", userInfo);
//             for (let i = 0; i < userInfo.length; i++) {
//                 let PostInfo: any = await Post.findOne({ _id: userInfo[i].PostId })
//                 let eventInfo: any = await Event.findOne({ _id: PostInfo.eventId })
//                 let comment: any = userInfo[i].comment
//                 let commentTime: any = userInfo[i].time

//                 data.push({ eventInfo, PostInfo, comment, commentTime })
//             }
//             return data;
//         }
//     }




}