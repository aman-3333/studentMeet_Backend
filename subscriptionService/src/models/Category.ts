import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    categoryName:{type:String,required:true},
    Description:{type:String},
    picture:{type:String},
    active:{type:String},
    isDeleted: {type: Boolean, default: false}
}, {
    timestamps: true
});

export interface ICategory extends Document {
    categoryName: String,
    Description: String,
    picture: String,
    active: String,
    isDeleted: Boolean
}

export default model("category", schema);