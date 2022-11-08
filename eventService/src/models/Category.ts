import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    categoryName: { type: String, required: true},
  type:{type:String},
    Description:{type:String},
    picture:{type:String},
    active:{type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    userId:{type: Schema.Types.ObjectId}
}, {
    timestamps: true
});

export interface ICategory extends Document {
    categoryName: String,
    Description: String,
    picture: String,
    type:String,
    active: Boolean,
    isDeleted: Boolean,
    userId: ObjectId,
    
}

export default model<ICategory>("category", schema);