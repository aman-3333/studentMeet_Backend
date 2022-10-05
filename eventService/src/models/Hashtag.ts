import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    Hashtag: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    likeCount: { type: Number,default:0 },
    favoriteCount: { type: Number },
    hashtagcommentCount:  { type: Number,default:0  },
    shareCount: { type: Number,default:0  },
    totalClick: { type: Number,default:0  },
    picture: { type: String },
    deletedPersonId:{ type: Schema.Types.ObjectId, ref: "User" },
    createPersonId:{ type: Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IHashtag extends Document {
    Hashtag: String,
    eventId: ObjectId,
    deletedPersonId: ObjectId,
    createPersonId: ObjectId,
    likeCount: Number,
    favoriteCount: Number,
    hashtagcommentCount:  Number,
    totalClick: Number,
    shareCount: String,
    picture: String,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IHashtag>("hashtag", schema);