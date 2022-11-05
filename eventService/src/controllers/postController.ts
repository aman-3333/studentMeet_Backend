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

    public async PostActivity(userId: any, PostId: any, status: any, PostComment: any, PostCommentId: any, body: any) {
        let userInfo: any;
        let data: any = []
        let a: any = []
        let info: any;
    
        userInfo = await userActivity.findOne({ userId: userId }).lean();
    
    
        if (!userInfo) {
            userInfo = await userActivity.create({ userId: userId })
    
        }
    
    
        if (status == "PostLike") {
            info = await userActivity.findOne({ PostLike: body.PostLike }).lean();
    
    
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
    
                await Post.findOneAndUpdate({ _id: body.PostLike },
                    { $inc: { PostLikeCount: 1 } }, { new: true }).lean()
                await Post.findOneAndUpdate({
                    _id: body.PostLike
                }, {
                    $push: {
                        PostLike:
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
                            : body.PostLike
                    }
                })
    
            await Post.findOneAndUpdate({ _id: body.PostLike },
                { $inc: { PostLikeCount: -1 } }, { new: true })
            await Post.findOneAndUpdate({
                _id: body.PostLike
            }, {
                $pull: {
                    PostLike:
                        userId
                }
            })
            return userInfo;
        } if (status == "readPostLike") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.PostLike;
    
    
            let PostInfo: any = await Post.find({ _id: { $in: userInfo } })
    
    
    
            return PostInfo;
        }
    
    
        if (status == "PostFavourite") {
            info = await userActivity.findOne({ PostFavourite: { $in: body.PostFavourite } }).lean();
    
    
            if (!info) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            PostFavourite:
                                body.PostFavourite
                        }
                    })
                await Post.findOneAndUpdate({ _id: body.PostFavourite },
                    { $inc: { PostFavouriteCount: 1 } }, { new: true })
                await Post.findOneAndUpdate({
                    _id: body.PostFavourite
                }, {
                    $push: {
                        PostFavourite:
                            userId
    
                    }
                })
                return userInfo;
            }
        }
        if (status == "removePostFavourite") {
            userInfo = await userActivity.findOneAndUpdate(
                {
                    userId: userId,
                },
                {
                    $pull: {
                        PostFavourite:
                            body.PostFavourite
                    }
                })
            await Post.findOneAndUpdate({ _id: body.PostFavourite },
                { $inc: { PostFavouriteCount: -1 } }, { new: true })
    
            await Post.findOneAndUpdate({
                _id: body.PostFavourite
            }, {
                $pull: {
                    PostFavourite:
                        userId
                }
            })
            return userInfo;
        } if (status == "readPostFavourite") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.PostFavourite;
    
    
            let PostInfo: any = await Post.find({ _id: { $in: userInfo } })
    
    
    
            return PostInfo;
        }
    
        if (status == "PostComment") {
    
    
            let currentTime: any = new Date();
            for (let i = 0; i < body.PostComment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $push: {
                            PostComment: {
                                PostId: body.PostComment[i].PostId,
                                comment: body.PostComment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                await Post.findOneAndUpdate(
                    {
                        _id: body.PostComment[i].PostId,
                    },
                    {
                        $push: {
                            PostComment: {
                                userId: userId,
                                comment: body.PostComment[i].comment,
                                dateTime: currentTime
                            }
                        }
                    })
                await Post.findOneAndUpdate({ _id: body.PostComment[i].PostId },
                    { $inc: { PostCommentCount: 1 } }, { new: true })
    
    
    
                return userInfo;
            }
        }
        if (status == "removePostComment") {
            for (let i = 0; i < body.PostComment.length; i++) {
                userInfo = await userActivity.findOneAndUpdate(
                    {
                        userId: userId,
                    },
                    {
                        $pull: {
                            PostComment: {
                                PostId: body.PostComment[i].PostId,
                                comment: body.PostComment[i].comment,
    
                            }
                        }
                    })
                await Post.findOneAndUpdate(
                    {
                        _id: body.PostComment[i].PostId,
                    },
                    {
                        $pull: {
                            PostComment: {
                                userId: userId,
                                comment: body.PostComment[i].comment,
    
                            }
                        }
                    })
    
                await Post.findOneAndUpdate({ _id: body.PostComment[i].PostId },
                    { $inc: { PostCommentCount: -1 } }, { new: true })
    
                return userInfo;
            }
    
        } if (status == "readPostComment") {
            userInfo = await userActivity.findOne({ userId: userId }).lean();
            userInfo = userInfo.PostComment;
    
    
            for (let i = 0; i < userInfo.length; i++) {
                let PostInfo: any = await Post.findOne({ _id: userInfo[i].PostId })
    
                let comment: any = userInfo[i].comment
                let DateTime: any = userInfo[i].dateTime
    
                data.push({ PostInfo, comment, DateTime })
            }
            return data;
        }
    }
    
    public async readPostActivity(PostId: any, status: any) {
        let PostInfo: any
        if (status == "readPostlike") {
            PostInfo = await Post.findOne({ _id: PostId }).lean();
            PostInfo = PostInfo.PostLike;
            let userInfo: any = await userDetails.find({ _id: { $in: PostInfo } })
            return userInfo
        }
        if (status == "readPostComment") {
            let a = []
            PostInfo = await Post.findOne({ _id: PostId }).lean();
            PostInfo = PostInfo.PostComment;
            for (let i = 0; i < PostInfo.length; i++) {
                let userInfo: any = await userDetails.findOne({ _id: PostInfo[i].userId }, { fullname: true })
                let comment = PostInfo[i].comment
                let DateTime: any = PostInfo[i].dateTime
    
                a.push({ userInfo, comment, DateTime })
            }
            return a
    
    
    
        } if (status == "readPostFavourite") {
            PostInfo = await Post.findOne({ _id: PostId }).lean();
            PostInfo = PostInfo.PostFavourite;
            let userInfo: any = await userDetails.find({ _id: { $in: PostInfo } })
            return userInfo
        }
    }




}