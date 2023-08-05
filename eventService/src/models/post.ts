import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId,ref: "userdetails" },
    city: { type: Schema.Types.ObjectId,ref: "cities" },
    state: { type: Schema.Types.ObjectId,ref: "states" },
    country: { type: Schema.Types.ObjectId,ref: "countries" },
    Image: [{ type: String }],
    description:{ type: String },
    video: [{ type: String }],
    attechment: [{ type: String }],
    userName:{ type: String,index:true },
    postType:{ type: String,enum:["General"]},
    seePost:{ type: String,enum:["anyone","friend","group"],default:"anyone"},
    commentOnPost:{ type: String,enum:["anyone","friend","group"],default:"anyone"},
    postLikeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    isAnyAchievement: { type: Boolean, default: false },
    postCommentCount: { type: Number, default: 0 },
    postFavouriteCount: { type: Number, default: 0 },
    postLike: [{
        type: Schema.Types.ObjectId, ref: "userdetails",
        
    }],
    PostFavourite: [{
        type: Schema.Types.ObjectId, ref: "userdetails",
        
    }],
    postComment: [{
        userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        comment: { type: String },
        dateTime: { type: Date },
      
    }],
    sharePost: [{
       post: { type: Schema.Types.ObjectId, ref: "posts" },
       userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetails" },
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
location: ObjectId,
    attechment: [String],
  
    postLikeCount: Number,
    shareCount: Number,
    postCommentCount: Number,
    postFavouriteCount: Number,
    postLike: [ObjectId],
    PostFavourite: [ObjectId],
    postComment: [{
        userId: ObjectId,
        comment: String,
        dateTime: Date,
    }],
    sharePost: [{
       Post: ObjectId,
       userId: ObjectId,
        friendId: ObjectId,
    }],
    seePost:String,
    commentOnPost:String,
    isAnyAchievement: Boolean,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IPost>("post", schema);