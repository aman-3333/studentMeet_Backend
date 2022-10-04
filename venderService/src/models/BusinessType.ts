import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    BusinessTypeName: { type: String, required: true, enum: ['business', 'individual'], unique: true },

    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

export interface IBusinessType extends Document {
    BusinessTypeName: String,

    active: Boolean,
    isDeleted: Boolean,
    userId: ObjectId
}

export default model<IBusinessType>("BusinessType", schema);