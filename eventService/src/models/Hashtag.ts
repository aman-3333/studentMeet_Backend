import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    Hashtag: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    description:{type: String},
    likeCount: { type: Number,default:0 },
    favoriteCount: { type: Number },
    hashtagcommentCount:  { type: Number,default:0},
    shareCount: { type: Number,default:0  },
    totalClick: { type: Number,default:0  },
    bannerImage: [{ type: String }],

    likeHashtag: [{
        userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    favouriteHashtag: [{
        userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    commentHashtag: [{
        userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
        commentMessage:{ type: String },
        dateTime:{ type: Date },
    }],
    shareHashtag: [{
       Hashtag: { type: Schema.Types.ObjectId, ref: "event" },
       userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userDetails" },
    }],
    deletedPersonId:{ type: Schema.Types.ObjectId, ref: "userDetails" },
    userId:{ type: Schema.Types.ObjectId, ref: "userDetails" },
    isEventHashtag:{type: Boolean, default: false},
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IHashtag extends Document {
    Hashtag: String,
    eventId: ObjectId,
    deletedPersonId: ObjectId,
    userId: ObjectId,
    likeCount: Number,
    favoriteCount: Number,
    hashtagcommentCount:  Number,
    totalClick: Number,
    shareCount: String,
    bannerImage: [String],
    likeHashtag: [{
        userId: ObjectId,
    }],
    favouriteHashtag: [{
        userId: ObjectId,
    }],
    commentHashtag: [{
        userId: ObjectId,
        commentMessage:String,
        dateTime:Date,
    }],
    shareHashtag: [{
       Hashtag: ObjectId,
       userId: ObjectId,
        friendId: ObjectId,
    }],
    isEventHashtag: Boolean,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IHashtag>("hashtag", schema);