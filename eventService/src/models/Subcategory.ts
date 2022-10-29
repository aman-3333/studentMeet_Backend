import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    categoryId: { type: Schema.Types.ObjectId },
    subCategoryName: { type: String, required: true,},

    subCategoryDescription: { type: String },
    picture: { type: String },
    userId: { type: Schema.Types.ObjectId },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

}, {
    timestamps: true
});

export interface ISubCategory extends Document {
    subCategoryName: String,
    userId: ObjectId,
    categoryId: ObjectId,
    subCategoryDescription: String,
    picture: String,
    active: Boolean,
    isDeleted: Boolean,

}

export default model<ISubCategory>("SubCategory", schema);