import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    userId: { type: Schema.Types.ObjectId,ref: "userdetail" },
    eventBannerImage: [{ type: String }],
    description:{ type: String },
    video: [{ type: String }],
    attechment: [{ type: String }],
    userName:{ type: String },
    eventName:{ type: String },
    postLikeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    PostCommentCount: { type: Number, default: 0 },
    postFavouriteCount: { type: Number, default: 0 },
    PostLike: [{
        type: Schema.Types.ObjectId, ref: "userdetail"
    }],
    PostFavourite: [{
        type: Schema.Types.ObjectId, ref: "userdetail"
    }],
    PostComment: [{
        userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        comment: { type: String },
        dateTime: { type: Date },
    }],
    sharePost: [{
       post: { type: Schema.Types.ObjectId, ref: "event" },
       userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    }],
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IPost extends Document {
    eventId: ObjectId,
    userId: ObjectId,
   
    eventBannerImage: [String],
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
    active: Boolean,
    isDeleted: Boolean
}

export default model<IPost>("post", schema);