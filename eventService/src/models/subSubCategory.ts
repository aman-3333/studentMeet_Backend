import { Document, model, ObjectId, Schema } from "mongoose";
const schema = new Schema({
    categoryId: { type: Schema.Types.ObjectId },
    subSubCategoryName: { type: String, required: true },
    subCategoryId: { type: Schema.Types.ObjectId },
    subSubCategoryDescription: { type: String },
    picture: { type: String },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

export interface ISubSubCategory extends Document {
    subSubCategoryName: String,
    subCategoryId: ObjectId,
    categoryId: ObjectId,
    subSubCategoryDescription: String,
    picture: String,
    active: Boolean,
    isDeleted: Boolean,
    userId: ObjectId
}

export default model<ISubSubCategory>("subSubCategory", schema);