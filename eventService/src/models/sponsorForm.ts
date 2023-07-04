import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
   
  userId:{type: Schema.Types.ObjectId},
    Description:{type:String},
    picture:{type:String},
    active:{type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    ownerId:{type: Schema.Types.ObjectId}
}, {
    timestamps: true
});

export interface ICategory extends Document {
    categoryName: String,
    Description: String,
    picture: String,
    active: Boolean,
    isDeleted: Boolean,
    userId: ObjectId,
    
}

export default model<ICategory>("eventform", schema);