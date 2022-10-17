import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    userId: { type: Schema.Types.ObjectId },
    image: [{ type: String }],
    video: [{ type: String }],
    attechment: [{ type: String }],
    hashtagId: { type: Schema.Types.ObjectId, ref: "hashtag" },
    likeCount: { type: Number, default: 0 },
    shareount: { type: Number, default: 0 },
    CommentCount: { type: Number, default: 0 },
    favouriteCount: { type: Number, default: 0 },
    likePost: [{
        userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    favouritePost: [{
        userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    commentPost: [{
        userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
        commentMessage:{ type: String },
        dateTime:{ type: Date },
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
    likeCount: Number,
    shareount: Number,
    CommentCount: Number,
    favouriteCount: Number,
    likePost: [{
        userId: ObjectId,
    }],
    favouritePost: [{
        userId: ObjectId,
    }],
    commentPost: [{
        userId: ObjectId,
        commentMessage:String,
        dateTime:Date,
    }],
    sharePost: [{
       Post: ObjectId,
       userId: ObjectId,
        friendId: ObjectId,
    }],
    active: Boolean,
    isDeleted: Boolean
}

export default model<IPost>("bookevent", schema);