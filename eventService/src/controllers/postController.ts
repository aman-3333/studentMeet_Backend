import Post, { IPost } from "../models/post";
import userActivity from "../models/userActivity";
import userDetails from "../models/userDetails";

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

    public async PostActivity(userId: any, PostId: any, status: any, Postcomment: any, PostcommentId: any, body: any) {
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

        if (status == "PostLike") {
            info = await userActivity.findOne({ PostLike:body.PostLike }).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await userActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            PostLike:
                                body.PostLike
                        }
                    })
                let PostInfo: any = await Post.findOne({ _id: body.PostLike })
                console.log("PostInfo", PostInfo);
                PostInfo = PostInfo.PostLikeCount
                PostInfo = PostInfo + 1
                await Post.findOneAndUpdate({ _id: body.PostLike}, { $set: { PostLikeCount: PostInfo } },{new:true})
                await Post.findOneAndUpdate({
                    _id: body.PostLike
                }, {
                    $push: {
                        likePost:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removePostLike") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        PostLike
                       :body.PostLike
                    }
                })
               
            let PostInfo: any = await Post.findOne({ _id: body.PostLike})
            console.log("PostInfo",PostInfo);


            PostInfo = PostInfo.PostLikeCount
            PostInfo = PostInfo - 1
            await Post.findOneAndUpdate({ _id: body.PostLike}, { $set: { PostLikeCount: PostInfo } })
            await Post.findOneAndUpdate({
                _id: body.PostLike
            }, {
                $pull: {
                    likePost:
                    userId
                }
            })
            return userInfo;
        } if (status == "readPostLike") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.PostLike;
         console.log("userInfo",userInfo);
         
                let PostInfo: any = await Post.find({ _id:{$in:userInfo}})

           
            
            return PostInfo;
        }
      

        if (status == "PostFavorite") {
            info = await userActivity.findOne({ PostFavorite:{$in:body.PostFavorite }}).lean();
            console.log("info", info);

            if (!info) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            PostFavorite:
                                body.PostFavorite
                        }
                    })
                let PostInfo: any = await Post.findOne({ _id: body.PostFavorite })
                console.log("PostInfo", PostInfo);
                PostInfo = PostInfo.PostFavoriteCount
                PostInfo = PostInfo + 1
                await Post.findOneAndUpdate({ _id: body.PostFavorite}, { $set: { PostFavoriteCount: PostInfo } },{new:true})
                await Post.findOneAndUpdate({
                    _id: body.PostFavorite
                }, {
                    $push: {
                        PostFavorite:
                            userId

                    }
                })
                return userInfo;
            }
        }
        if (status == "removePostFavorite") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        PostFavorite:
                        body.PostFavorite
                    }
                })
               
            let PostInfo: any = await Post.findOne({ _id: body.PostFavorite})
            console.log("PostInfo",PostInfo);


            PostInfo = PostInfo.PostFavoriteCount
            PostInfo = PostInfo - 1
            await Post.findOneAndUpdate({ _id: {$in:body.PostFavorite} }, { $set: { PostFavoriteCount: PostInfo } })
            await Post.findOneAndUpdate({
                _id: body.PostFavorite
            }, {
                $pull: {
                    PostFavorite:
                   userId
                }
            })
            return userInfo;
        } if (status == "readPostFavorite") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.PostFavorite;
         console.log("userInfo",userInfo);
         
                let PostInfo: any = await Post.find({ _id:{$in:userInfo}})

           
            
            return PostInfo;
        }

        if (status == "Postcomment") {
            let currentTime: any = new Date();;
            for (let i = 0; i < body.Postcomment.length; i++) {
                userInfo = await userActivity.updateMany(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            Postcomment: {
                                PostId: body.Postcomment[i].PostId,
                                comment: body.Postcomment[i].comment,
                                time: currentTime
                            }
                        }
                    })

                await Post.aggregate([
                    { $group: { _id: PostId, commentCount: { $sum: 1 } } }
                ])

                return userInfo;
            }
        }
        if (status == "removePostcomment") {
            userInfo = await userActivity.updateMany(
                { _id: userId },
                { $pull: { Postcomment: { PostId: PostId } } }
            );

            return userInfo;
        } if (status == "readPostcomment") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.Postcomment;

            console.log("comment", userInfo);
            for (let i = 0; i < userInfo.length; i++) {
                let PostInfo: any = await Post.findOne({ _id: userInfo[i].PostId })

                let comment: any = userInfo[i].comment
                let commentTime: any = userInfo[i].time

                data.push({ PostInfo, comment, commentTime })
            }
            return data;
        }
    }

    public async readActivity(PostId:any,status:any){
        let PostInfo:any
        if(status=="readPostlike"){
            PostInfo = await Post.findOne({ _id: PostId }).lean();
            PostInfo = PostInfo.likePost;
     
         
                let userInfo: any = await userDetails.find({ _id:{$in:PostInfo}})
          return userInfo
        }
        if(status=="readPostcomment"){
            PostInfo = await Post.findOne({ _id: PostId }).lean();
            PostInfo = PostInfo.likePost;
                let userInfo: any = await userDetails.find({ _id:{$in:PostInfo}})
          return userInfo
        }if(status=="readPostfav"){
            PostInfo = await Post.findOne({ _id: PostId }).lean();
            PostInfo = PostInfo.likePost;
                let userInfo: any = await userDetails.find({ _id:{$in:PostInfo}})
          return userInfo
        }
    }




}