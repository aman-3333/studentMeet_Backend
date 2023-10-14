import Post, { IPost } from "../models/post";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";
import FuzzySearch from "fuzzy-search";
import event from "../models/sponsorshipDetails";
import academy from "../models/academy";
import sponsorPartner from "../models/sponsorPartner";
import { createLessThan } from "typescript";
const mongoose = require("mongoose");
const currentTime: any = new Date();
export default class PostController {
  public async createPost(body: any) {
    let PostInfo: any;
    PostInfo = await Post.create(body);
    // let userInfo:any=await userDetails.findOne({_id:body.userId,isDeleted:false}).lean()
    // await Post.findOneAndUpdate({_id:PostInfo._id},{$set:{userName:userInfo.fullname}})

    return PostInfo;
  }

  public async editPost(body: any) {
    const PostInfo: any = await Post.findOneAndUpdate(
      { _id: body.PostId, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return PostInfo;
  }

  public async getPostList(user: any) {
    let PostLike = await Post.aggregate([
      { $match: { isDeleted: false, postLike: { $in: [user._id] } } },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "academyId",
          from: "academies",
          foreignField: "_id",
          as: "academyObj",
        },
      },
      { $unwind: { path: "$academyObj", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "sponsorId",
          from: "sponsorshipdetails",
          foreignField: "_id",
          as: "sponsorshipObj",
        },
      },
      {
        $unwind: { path: "$sponsorshipObj", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "instituteId",
          from: "institutes",
          foreignField: "_id",
          as: "institutes",
        },
      },
      { $unwind: { path: "$institutes", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "schoolId",
          from: "schools",
          foreignField: "_id",
          as: "school",
        },
      },
      { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "_id",
          from: "states",
          foreignField: "state",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          isLikes: true,
        },
      },
    ]);
    let PostList = await Post.aggregate([
      { $match: { isDeleted: false, postLike: { $nin: [user._id] } } },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "academyId",
          from: "academies",
          foreignField: "_id",
          as: "academyObj",
        },
      },
      { $unwind: { path: "$academyObj", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "sponsorId",
          from: "sponsorshipdetails",
          foreignField: "_id",
          as: "sponsorshipObj",
        },
      },
      {
        $unwind: { path: "$sponsorshipObj", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "instituteId",
          from: "institutes",
          foreignField: "_id",
          as: "institutes",
        },
      },
      { $unwind: { path: "$institutes", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          localField: "schoolId",
          from: "schools",
          foreignField: "_id",
          as: "school",
        },
      },
      { $unwind: { path: "$school", preserveNullAndEmptyArrays: true } },

      {
        $addFields: {
          isLikes: false,
        },
      },
    ]);

    PostLike = PostLike.concat(PostList);

    const mergedArray = [...PostLike, ...PostList];

    mergedArray.sort((a, b) => b.createdAt - a.createdAt);

    return mergedArray;
  }

  // public async getPostListBYUserId(userId:any) {
  //     const PostList: IPost[] = await Post.find({userId:userId, isDeleted: false }).lean();
  //     return PostList;
  // }

  public async getPostListBYUserId(userId: any) {
    let PostInfo: any = await Post.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          localField: "city",
          from: "cities",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $lookup: {
          localField: "state",
          from: "states",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $lookup: {
          localField: "country",
          from: "countries",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    return PostInfo;
  }

  public async deletePost(postId: any) {


    const PostInfo: IPost = await Post.findOneAndUpdate(
      { _id: postId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return PostInfo;
  }
  public async PostActivity(
    userId: any,
    PostId: any,
    status: any,
    postComment: any,
    postCommentId: any,
    body: any
  ) {
    let userInfo: any;
    let data: any = [];
    let a: any = [];
    let info: any;
    let PostInfo: any;
console.log(body,"body");

    if (status == "postLike") {
      await Post.findOneAndUpdate(
        { _id: body.postId },
        { $inc: { postLikeCount: 1 } },
        { new: true }
      ).lean();
      PostInfo = await Post.findOneAndUpdate(
        {
          _id: body.postId,isDeleted:false
        },
        {
          $push: {
            postLike: userId,
          },
        },
        { new: true }
      );

      console.log(PostInfo);

      await userActivity.findOneAndUpdate(
        { userId: PostInfo.userId },
        { $inc: { postLikeCount: 1 } },
        { new: true }
      );
      return PostInfo;
    }
    if (status == "removePostLike") {
      await Post.findOneAndUpdate(
        { _id: body.postId ,isDeleted:false},
        { $inc: { postLikeCount: -1 } },
        { new: true }
      );

      PostInfo = await Post.findOneAndUpdate(
        {
          _id: body.postId,
        },
        {
          $pull: {
            postLike: userId,
          },
        },
        { new: true }
      );
      await userActivity.findOneAndUpdate(
        { userId: PostInfo.userId },
        { $inc: { postLikeCount: -1 } },
        { new: true }
      );
      return PostInfo;
    }

    if (status == "postComment") {
     
      for (let i = 0; i < body.postComment.length; i++) {
        PostInfo = await Post.findOneAndUpdate(
          {
            _id: body.postId,isDeleted:false
          },
          {
            $push: {
              postComment: {
                userId: body.postComment[i].userId,
                comment: body.postComment[i].comment,
                dateTime: currentTime,
              },
            },
          }
        );
        console.log(PostInfo, "PostInfo");

        PostInfo = await Post.findOneAndUpdate(
          { _id: body.postId,isDeleted:false },
          { $inc: { postCommentCount: 1 } },
          { new: true }
        );

        await userActivity.findOneAndUpdate(
          { userId: PostInfo.userId,isDeleted:false },
          { $inc: { postCommentCount: 1 } },
          { new: true }
        );
        return PostInfo;
      }
    }
    if (status == "removePostComment") {
      PostInfo = await Post.updateOne(
        { _id: body.postId},
        {
          $pull: {
            postComment: { _id: body._id }
          }
        },
        {
          multi: true
        }
      )
return PostInfo;
    }
    if (status == "readpostComment") {
      userInfo = await userActivity.findOne({ userId: body.userId }).lean();
      userInfo = userInfo.postComment;

      for (let i = 0; i < userInfo.length; i++) {
        let PostInfo: any = await Post.findOne({ _id: userInfo[i].postId });

        let comment: any = userInfo[i].comment;
        let DateTime: any = userInfo[i].dateTime;

        data.push({ PostInfo, comment, DateTime });
      }
      return data;
    }
  }





  public async sharePost( body:any ) {
for (let i = 0; i < body.sharePostByOther.length; i++) {
  let  PostInfo = await userActivity.findOneAndUpdate(
    {
      userId: body.sharePostByOther[i].friendId,
      isDeleted:false
    },
    {
      $push: {
        sharePostByOther: {
          friendId: body.userId,
          post: body.sharePostByOther[i].postId,
          dateTime: currentTime,
        },
      },
    },{new:true}
  );
 
  return PostInfo;
}
  }
   

 


    
  

  public async readPostActivity(PostId: any, status: any, userId: any) {
    console.log(PostId, status);
    let isDeleteable: any;
    let PostInfo: any;
    if (status == "readPostLike") {
      PostInfo = await Post.findOne({ _id: PostId }).populate("postLike");
      PostInfo = PostInfo.postLike;
      return PostInfo;
    }
    if (status == "readPostComment") {
      let a = [];
      PostInfo = await Post.findOne({ _id: PostId }).lean();
      PostInfo = PostInfo.postComment;

      for (let i = 0; i < PostInfo.length; i++) {
        let userInfo: any = await userDetails.findOne(
          { _id: PostInfo[i].userId },
          { fullName: true, profile_picture: true }
        );
        let comment = PostInfo[i].comment;
        let DateTime: any = PostInfo[i].dateTime;

        if (userId == PostInfo[i].userId) {
          isDeleteable = true;
        } else {
          isDeleteable = false;
        }
        a.push({ userInfo, comment, DateTime,isDeleteable });
      }
      var y = [...a].reverse();
      return y;
    }
    if (status == "readPostFavourite") {
      PostInfo = await Post.findOne({ _id: PostId }).populate("PostFavourite");
      PostInfo = PostInfo.PostFavourite;
      return PostInfo;
    }
  }

  public async searchPost(search: any) {
    let PostInfo: any = await userActivity.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          localField: "userId",
          from: "userdetails",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    PostInfo = new FuzzySearch(PostInfo, ["name"], {
      caseSensitive: false,
    });
    PostInfo = PostInfo.search(search);
    return PostInfo;
  }
}
