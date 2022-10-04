import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    categoryName: { type: String, required: true, default: 'Fashion', enum: ['Fashion', 'Food', 'Electronics', 'Decore', 'Beauty', 'Cleaning', 'Plumber', 'Electrition', 'Painter', 'Yoga Trainer', 'Home Beautician'], unique: true },
    businessType: {
        type: Schema.Types.ObjectId
        , requried: true
    },
    Description: { type: String },
    picture: { type: String },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId }
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
    businessType: ObjectId
}

export default model<ICategory>("category", schema);