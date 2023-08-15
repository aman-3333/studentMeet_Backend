import {Document, model,ObjectId, Schema} from "mongoose";
import { ObjectID } from 'bson';

const academyModel = new Schema(
  {
    academyName: { type: String, index:true},
    fullAddress: { type: String },
    schoolId: { type:Schema.Types.ObjectId, ref: "school" },
    lat:{ type: String },
    long:{ type: String },
   country: { type:Schema.Types.ObjectId, ref: "country" },
    city: { type:Schema.Types.ObjectId, ref: "city" },
    state: { type:Schema.Types.ObjectId, ref: "State" },
    instituteId: { type:Schema.Types.ObjectId, ref: "institute" },
    profile_picture:{ type: String },
    banner_image:[{ type: String }],
    followers:[{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    followersCount: { type: Number, default: 0 },
    academyLikeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },  
   academyCommentCount: { type: Number, default: 0 },
   academyFavouriteCount: { type: Number, default: 0 },
   academyLike: [{
        type: Schema.Types.ObjectId, ref: "userdetails",
        
    }],
   academyFavourite: [{
        type: Schema.Types.ObjectId, ref: "userdetails",
        
    }],
   academyComment: [{
        userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        comment: { type: String },
        dateTime: { type: Date },
      
    }],
    sharePost: [{
      academy: { type: Schema.Types.ObjectId, ref: "posts" },
       userId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        friendId: { type: Schema.Types.ObjectId, ref: "userdetails" },
        dateTime: { type: Date },
    }],
    
    isDeleted:{type:Boolean,default:false},

  },
  { timestamps: true }
);

 

export interface IAcademy extends Document {
  academyName: String,
    fullAddress: String,
    lat:String,
    long:String,
    schoolId: ObjectId,
    instituteId: ObjectId,
    city: ObjectId,
    state: ObjectId,
    profile_picture:String,
    banner_image:[String],
    followers:[{ type: Schema.Types.ObjectId, ref: "userdetails" }],
    followersCount: { type: Number, default: 0 },

 academyLikeCount: Number,
    shareCount: Number,
    
   academyCommentCount: Number,
   academyFavouriteCount: Number,
   academyLike: [ObjectId],
   academyFavourite: [ObjectId],
   academyComment: [{
        userId:ObjectId,
        comment: String,
        dateTime: Date,
      
    }],
    sharePost: [{
      academy: ObjectId,
       userId: ObjectId,
        friendId: ObjectId,
        dateTime: Date,
    }],
    isDeleted:Boolean,
}

// const academy =model("academy", academyModel);
export default model<IAcademy>("academy", academyModel);

// module.exports = academy;
