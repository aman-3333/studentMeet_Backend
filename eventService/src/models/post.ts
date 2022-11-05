import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    userId: { type: Schema.Types.ObjectId },
    image: [{ type: String }],
    video: [{ type: String }],
    attechment: [{ type: String }],
    hashtagId: { type: Schema.Types.ObjectId, ref: "hashtag" },
    postLikeCount: { type: Number, default: 0 },
    shareount: { type: Number, default: 0 },
    PostCommentCount: { type: Number, default: 0 },
    postFavouriteCount: { type: Number, default: 0 },
    PostLike: [{
        type: Schema.Types.ObjectId, ref: "userDetails"
    }],
    PostFavourite: [{
        type: Schema.Types.ObjectId, ref: "userDetails"
    }],
    PostComment: [{
        userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
        comment: { type: String },
        dateTime: { type: Date },
    }],
    sharePost: [{
       post: { type: Schema.Types.ObjectId, ref: "event" },
       userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IPost extends Document {
    eventId: ObjectId,
    userId: ObjectId,
   
    image: [String],
    video: [String],
    attechment: [String],
    hashtagId: ObjectId,
    postLikeCount: Number,
    shareount: Number,
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