import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

   
    userId: { type: Schema.Types.ObjectId,ref: "userdetail" },
    Image: [{ type: String }],
    description:{ type: String },
    video: [{ type: String }],
    attechment: [{ type: String }],
    userName:{ type: String },
    postType:{ type: String,enum:["General"]},
    postLikeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    isAnyAchievement: { type: Boolean, default: false },
    PostCommentCount: { type: Number, default: 0 },
    postFavouriteCount: { type: Number, default: 0 },
    PostLike: [{
        type: Schema.Types.ObjectId, ref: "userdetail",
        
    }],
    PostFavourite: [{
        type: Schema.Types.ObjectId, ref: "userdetail",
        
    }],
    PostComment: [{
        userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        comment: { type: String },
        dateTime: { type: Date },
      
    }],
    sharePost: [{
       post: { type: Schema.Types.ObjectId, ref: "post" },
       userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        dateTime: { type: Date },
    }],
    isisActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IPost extends Document {

    userId: ObjectId,
    Image: [String],
    description: String,
    video: [String],
    attechment: [String],
    hashtagId: ObjectId,
    postLikeCount: Number,
    shareCount: Number,
    postCommentCount: Number,
    postFavouriteCount: Number,
    PostLike: [ObjectId],
    PostFavourite: [ObjectId],
    PostComment: [{
        userId: ObjectId,
        comment: String,
        dateTime: Date,
    }],
    sharePost: [{
       Post: ObjectId,
       userId: ObjectId,
        friendId: ObjectId,
    }],
    isAnyAchievement: Boolean,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IPost>("post", schema);