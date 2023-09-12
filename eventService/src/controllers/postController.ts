import Post, { IPost } from "../models/post";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";
import FuzzySearch from "fuzzy-search";
import event from "../models/sponsorshipDetails";
import academy from "../models/academy";
import sponsorPartner from "../models/sponsorPartner";

export default class PostController {
    public async createPost(body: any) {
    body.userId= body.user._id
        let PostInfo: any;
            PostInfo = await Post.create(body);
            let userInfo:any=await userDetails.findOne({_id:body.userId,isDeleted:false}).lean()
            await Post.findOneAndUpdate({_id:PostInfo._id},{$set:{userName:userInfo.fullname}})

        return PostInfo;

    }

    public async editPost(body: any) {
        const PostInfo: any = await Post.findOneAndUpdate({ _id: body.PostId, isDeleted: false }, body, { new: true }).lean();
        return PostInfo;
    }
 

    public async getPostList(user:any) {
   
      
        let PostLike = await Post.aggregate([
            { $match: {isDeleted:false,postLike:{$in:[user._id]}}},
            {
              $lookup: {
                'localField': 'userId',
                'from': 'userdetails',
                'foreignField': '_id',
                'as': 'user',
              },
            },
            {
              $lookup: {
                'localField': 'state',
                'from': 'state',
                'foreignField': '_id',
                'as': 'state',
              },
            },  {
                $lookup: {
                  'localField': 'city',
                  'from': 'city',
                  'foreignField': '_id',
                  'as': 'city',
                },
              },  {
                $lookup: {
                  'localField': 'country',
                  'from': 'country',
                  'foreignField': '_id',
                  'as': 'country',
                },
              },  {
                $lookup: {
                  'localField': 'instituteId',
                  'from': 'institute',
                  'foreignField': '_id',
                  'as': 'state',
                },
              },  {
                $lookup: {
                  'localField': 'schoolId',
                  'from': 'school',
                  'foreignField': '_id',
                  'as': 'school',
                },
              },  {
                $lookup: {
                  'localField': '_id',
                  'from': 'states',
                  'foreignField': 'state',
                  'as': 'state',
                },
              },    {
                $lookup: {
                  'localField': 'sponsorPartnerId',
                  'from': 'sponsorPartner',
                  'foreignField': '_id',
                  'as': 'sponsorPartner',
                },
              },
              {
                $addFields: {
                isLikes: true, 
              }}
           
          ]);
          let PostList = await Post.aggregate([
            { $match: {isDeleted:false,postLike:{$ne:[user._id]}}},
            {
              $lookup: {
                'localField': 'userId',
                'from': 'userdetails',
                'foreignField': '_id',
                'as': 'user',
              },
            },
            {
              $lookup: {
                'localField': 'state',
                'from': 'state',
                'foreignField': '_id',
                'as': 'state',
              },
            },  {
                $lookup: {
                  'localField': 'city',
                  'from': 'city',
                  'foreignField': '_id',
                  'as': 'city',
                },
              },  {
                $lookup: {
                  'localField': 'country',
                  'from': 'country',
                  'foreignField': '_id',
                  'as': 'country',
                },
              },  {
                $lookup: {
                  'localField': 'instituteId',
                  'from': 'institute',
                  'foreignField': '_id',
                  'as': 'state',
                },
              },  {
                $lookup: {
                  'localField': 'schoolId',
                  'from': 'school',
                  'foreignField': '_id',
                  'as': 'school',
                },
              },  {
                $lookup: {
                  'localField': '_id',
                  'from': 'states',
                  'foreignField': 'state',
                  'as': 'state',
                },
              },  {
                $lookup: {
                  'localField': '_id',
                  'from': 'states',
                  'foreignField': 'state',
                  'as': 'state',
                },
              },  {
                $lookup: {
                  'localField': 'sponsorPartnerId',
                  'from': 'sponsorPartner',
                  'foreignField': '_id',
                  'as': 'sponsorPartner',
                },
              },
              {
                $addFields: {
                isLikes: false, 
              }}
           
          ]);


          PostLike=PostLike.concat(PostList)


          const mergedArray = [...PostLike, ...PostList];


mergedArray.sort((a, b) => a.createdAt - b.createdAt);
         
            
        return mergedArray;
    }

    public async getPostListBYUserId(userId:any) {
        const PostList: IPost[] = await Post.find({userId:userId, isDeleted: false }).lean();
        return PostList;
    }

    public async getPostInfoById(PostId: any) {
        const PostInfo: IPost = await Post.findOne({ _id: PostId, isDeleted: false }).lean();
        return PostInfo;
    }

    public async deletePost(postId: any) {
        console.log(postId,"postId");
        
        const PostInfo: IPost = await Post.findOneAndUpdate({ _id: postId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return PostInfo;
    }
    public async PostActivity(userId: any, PostId:any, status: any, postComment: any, postCommentId: any, body: any) {
        let userInfo: any;
        let data: any = [];
        let a: any = [];
        let info: any;
       let PostInfo :any;
      
        if (status == "postLike") {  
      

                    
    
                await Post.findOneAndUpdate({ _id: body.postId },
                    { $inc: { postLikeCount: 1 } }, { new: true }).lean()
                    PostInfo =   await Post.findOneAndUpdate({
                    _id: body.postId
                }, {
                    $push: {
                        postLike:
                            userId
    
                    }
                },{ new: true })

                console.log(PostInfo);
                
                await userActivity.findOneAndUpdate({ userId: PostInfo.userId },
                    { $inc: { postLikeCount: 1 } }, { new: true })
                return PostInfo;
            
        }
        if (status == "removePostLike") {
     
            await Post.findOneAndUpdate({ _id: body.postId },
                { $inc: { postLikeCount: -1 } }, { new: true })
                
                PostInfo =   await Post.findOneAndUpdate({
                _id: body.postId
            }, {
                $pull: {
                    postLike:
                        userId
                }
            },{ new: true })
            await userActivity.findOneAndUpdate({ userId: PostInfo.userId },
                { $inc: { postLikeCount: -1 } }, { new: true })
            return PostInfo;
        }
   
        if (status == "postComment") {
            let currentTime: any = new Date();
            for (let i = 0; i < body.postComment.length; i++) {
                    PostInfo =    await Post.findOneAndUpdate(
                    {
                        _id: body.postId,
                    },
                    {
                        $push: {
                            postComment: {
                                userId: body.postComment[i].userId,
                                comment: body.postComment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                    console.log(PostInfo,"PostInfo");
                    
                    PostInfo=   await Post.findOneAndUpdate({ _id: body.postId },
                    { $inc: { postCommentCount: 1 } }, { new: true })
    
    
                    await userActivity.findOneAndUpdate({ userId: PostInfo.userId },
                        { $inc: { postCommentCount: 1 } }, { new: true })
                return  PostInfo ;
            }
        }
        if (status == "removePostComment") {
            for (let i = 0; i < body.postComment.length; i++) {
             
                    PostInfo =    await Post.findOneAndUpdate(
                    {
                        _id: body.postComment[i].postId,
                    },
                    {
                        $pull: {
                            postComment: {
                                _id: body.postComment[i]._id,
    
                            }
                        },
                    })
    
           
                    PostInfo =     await Post.findOneAndUpdate({ _id: body.postComment[i].postId },
                    { $inc: { postCommentCount: -1 } }, { new: true })
    
                    await userActivity.findOneAndUpdate({ userId: PostInfo.userId },
                        { $inc: { postCommentCount: -1 } }, { new: true })
                return  PostInfo ;
            }
    
        } if (status == "readpostComment") {
            userInfo = await userActivity.findOne({ userId: body.userId }).lean();
            userInfo = userInfo.postComment;
    
    
            for (let i = 0; i < userInfo.length; i++) {
                let PostInfo: any = await Post.findOne({ _id: userInfo[i].postId })
    
                let comment: any = userInfo[i].comment
                let DateTime: any = userInfo[i].dateTime
    
                data.push({ PostInfo, comment, DateTime })
            }
            return data;
        }
    }

public async reCommentPost(userId:any,commentId:any){
    let PostInfo:any

}

    public async readPostActivity(PostId: any, status: any) {
       
        console.log(PostId,status);
        
        let PostInfo: any
        if (status == "readPostLike") {
            PostInfo = await Post.findOne({ _id: PostId }).populate("postLike")
            PostInfo=PostInfo.postLike
            return PostInfo
        }
        if (status == "readPostComment") {
            let a = []
            PostInfo = await Post.findOne({ _id: PostId }).lean();
            PostInfo = PostInfo.postComment;
           
            
            for (let i = 0; i < PostInfo.length; i++) {
                let userInfo: any = await userDetails.findOne({ _id: PostInfo[i].userId }, { fullName: true,profile_picture:true })
                let comment = PostInfo[i].comment
                let DateTime: any = PostInfo[i].dateTime
    
                a.push({ userInfo, comment, DateTime })
            }
            var y = [...a].reverse();
            return y
    
    
    
        } if (status == "readPostFavourite") {
            PostInfo = await Post.findOne({ _id: PostId }).populate("PostFavourite");
            PostInfo=PostInfo.PostFavourite
            return PostInfo
        }
    }
  

    public async searchPost(search:any){

    
      let PostInfo:any=await userActivity.aggregate(
          [
             {$match:{isDeleted:false}}, {
              $lookup: {
                'localField': 'userId',
                'from': 'userdetails',
                'foreignField': '_id',
                'as': 'user',
              },
            },
            ])
  
     PostInfo = new FuzzySearch(PostInfo, ["name"], {
      caseSensitive: false,
  });
  PostInfo = PostInfo.search(search);
    return  PostInfo 
  
  }
    
}