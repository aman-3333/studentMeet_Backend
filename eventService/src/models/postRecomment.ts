import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

   
    postId: { type: Schema.Types.ObjectId,ref: "post" },
    postCommentId: { type: Schema.Types.ObjectId,ref: "post" },
   
   reCommentPost: [{
        userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        comment: { type: String },
        dateTime: { type: Date },
      
    }],
    
    isisActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IPostRecomment extends Document {

    postId: ObjectId,
    postCommentId: ObjectId,
    reCommentPost: [{
        userId: ObjectId,
        comment: String,
        dateTime: Date,
    }],
    
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IPostRecomment>("recomment", schema);