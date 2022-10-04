import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    code: [{ type: String, unique: true }],
    count: { type: Number },
    discountPercent: { type: Number },
    discountPrice: {
        type: Number
    },
    amount: { type: Number },
    validityStart: { type: Date },
    expireDate: { type: Date },
    isActive: { type: Boolean, default: true },
    planId: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    categoryId: { type: Schema.Types.ObjectId, ref: 'category' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'user' },
    vendorId: { type: Schema.Types.ObjectId, ref: 'vendor' },
    isDeleted: { type: Boolean, default: false },
    codeCopy: [{ type: String }],
}, {
    timestamps: true
});

export interface ICoupon extends Document {
    code: [String],
    validityStart: Date,
    discountPrice: Number,
    count: Number,
    discountPercent: Number,

    amount: Number, // if is percent, then number must be ≤ 100, else it’s amount of discount
    expireDate: Date,
    isActive: Boolean,
    planId: ObjectId,
    categoryId: ObjectId,
    ownerId: ObjectId,
    vendorId: ObjectId,
    isDeleted: Boolean,
    codeCopy: [String]
}
// user

export default model<ICoupon>("coupons", schema);